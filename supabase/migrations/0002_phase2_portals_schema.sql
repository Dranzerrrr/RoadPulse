-- ==============================================================================
-- RoadPulse: 0002 Phase 2 Portals & Multi-Tenant Schema
-- ==============================================================================
-- Covers:
-- 1. Organizations (NHAI, State PWD, Concessionaires, Fleets, Police, EMS)
-- 2. Profiles (Role-based access: authority_admin, authority_officer, customer_paid, customer_free)
-- 3. Camera Devices (M1 solar mast, fleet/consumer dashcams with 6-digit pairing & QR tokens)
-- 4. Subscriptions (Razorpay ₹300/month recurring billing lifecycle)
-- 5. Road Hazards (Corroborated potholes, accidents, debris with priority & blackspots)
-- 6. Work Orders (Concessionaire 48-hour SLA maintenance tracking)
-- ==============================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Organizations Table
CREATE TABLE IF NOT EXISTS public.organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    name TEXT NOT NULL,
    org_type TEXT NOT NULL CHECK (org_type IN ('nhai', 'state_pwd', 'concessionaire', 'police_traffic', 'ems_108', 'commercial_fleet')),
    jurisdiction_code TEXT NOT NULL, -- e.g. 'NHAI-RO-VJA-NH16'
    contact_email TEXT NOT NULL,
    contact_phone TEXT,
    is_active BOOLEAN DEFAULT true NOT NULL
);

-- 2. Profiles Table (Linked to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    organization_id UUID REFERENCES public.organizations(id) ON DELETE SET NULL,
    role TEXT NOT NULL DEFAULT 'customer_free' CHECK (role IN ('authority_admin', 'authority_officer', 'authority_viewer', 'customer_paid', 'customer_free')),
    full_name TEXT NOT NULL,
    phone TEXT,
    gov_badge_id TEXT, -- Government official ID/badge for authority users
    avatar_url TEXT
);

-- 3. Camera Devices Table (Physical hardware registry: M1 Masts + Dashcams)
CREATE TABLE IF NOT EXISTS public.camera_devices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    serial_number TEXT UNIQUE NOT NULL, -- Hardware MAC / Serial
    pairing_code TEXT NOT NULL,         -- 6-digit alphanumeric pairing code (e.g. 'RP-8821' or '739201')
    qr_token TEXT UNIQUE NOT NULL,      -- Unique token embedded in camera display QR code
    owner_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    device_type TEXT NOT NULL CHECK (device_type IN ('m1_solar_mast', 'fleet_dashcam', 'consumer_dashcam')),
    model_name TEXT DEFAULT 'RoadPulse Vision AI v1' NOT NULL,
    firmware_version TEXT DEFAULT '1.4.2' NOT NULL,
    is_active BOOLEAN DEFAULT true NOT NULL,
    last_heartbeat TIMESTAMPTZ,
    last_known_lat NUMERIC(10, 7),
    last_known_lon NUMERIC(10, 7),
    highway_corridor TEXT DEFAULT 'NH-16'
);

-- Index for instant pairing lookup
CREATE INDEX IF NOT EXISTS idx_camera_pairing ON public.camera_devices(pairing_code);
CREATE INDEX IF NOT EXISTS idx_camera_qr_token ON public.camera_devices(qr_token);
CREATE INDEX IF NOT EXISTS idx_camera_owner ON public.camera_devices(owner_id);

-- 4. Subscriptions Table (Razorpay ₹300/month Recurring Engine)
CREATE TABLE IF NOT EXISTS public.subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    camera_device_id UUID REFERENCES public.camera_devices(id) ON DELETE SET NULL,
    plan_name TEXT DEFAULT 'dashcam_monthly_300' NOT NULL,
    amount_inr NUMERIC(10, 2) DEFAULT 300.00 NOT NULL,
    status TEXT NOT NULL DEFAULT 'expired' CHECK (status IN ('active', 'past_due', 'grace_period', 'expired', 'canceled')),
    current_period_start TIMESTAMPTZ NOT NULL,
    current_period_end TIMESTAMPTZ NOT NULL,
    payment_provider TEXT DEFAULT 'razorpay' NOT NULL,
    razorpay_customer_id TEXT,
    razorpay_subscription_id TEXT UNIQUE,
    razorpay_payment_id TEXT
);

CREATE INDEX IF NOT EXISTS idx_sub_user_status ON public.subscriptions(user_id, status);

-- 5. Upgraded Road Hazards Table
CREATE TABLE IF NOT EXISTS public.road_hazards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    detected_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    hazard_type TEXT NOT NULL CHECK (hazard_type IN ('pothole', 'accident', 'debris', 'waterlogging', 'congestion', 'cow_stray')),
    severity TEXT NOT NULL CHECK (severity IN ('critical', 'severe', 'moderate', 'advisory')),
    highway_code TEXT NOT NULL,       -- e.g. 'NH-16'
    chainage_km NUMERIC(7, 2),        -- e.g. 418.25 km marker
    landmark TEXT NOT NULL,
    latitude NUMERIC(10, 7) NOT NULL,
    longitude NUMERIC(10, 7) NOT NULL,
    corroboration_count INT DEFAULT 1 NOT NULL,
    verified BOOLEAN DEFAULT false NOT NULL,
    priority_score NUMERIC(5, 2) DEFAULT 50.0 NOT NULL, -- 0-100 Blackspot Risk Index
    status TEXT NOT NULL DEFAULT 'detected' CHECK (status IN ('detected', 'verified', 'dispatched', 'resolved', 'false_positive')),
    detected_by_device UUID REFERENCES public.camera_devices(id) ON DELETE SET NULL,
    evidence_image_url TEXT,
    depth_cm NUMERIC(4, 1),            -- For potholes (e.g. 6.5 cm)
    metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_hazards_coords ON public.road_hazards(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_hazards_status ON public.road_hazards(status, highway_code);

-- 6. Concessionaire SLA Work Orders Table
CREATE TABLE IF NOT EXISTS public.work_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    hazard_id UUID REFERENCES public.road_hazards(id) ON DELETE CASCADE NOT NULL,
    assigned_org_id UUID REFERENCES public.organizations(id) ON DELETE RESTRICT NOT NULL,
    contractor_name TEXT,
    contractor_phone TEXT,
    status TEXT NOT NULL DEFAULT 'assigned' CHECK (status IN ('assigned', 'in_progress', 'repaired', 'inspected', 'sla_breached')),
    sla_deadline TIMESTAMPTZ NOT NULL, -- IRC:SP:84 standard: 48h from detection
    resolved_at TIMESTAMPTZ,
    repair_verification_image_url TEXT,
    penalty_incurred_inr NUMERIC(10, 2) DEFAULT 0.00,
    notes TEXT
);

CREATE INDEX IF NOT EXISTS idx_workorders_org_status ON public.work_orders(assigned_org_id, status);

-- ==============================================================================
-- Geospatial Distance Helper (Haversine Formula in KM)
-- Pure SQL function works universally without requiring PostGIS extension
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.haversine_distance_km(
    lat1 NUMERIC, lon1 NUMERIC,
    lat2 NUMERIC, lon2 NUMERIC
) RETURNS NUMERIC AS $$
DECLARE
    r NUMERIC := 6371.0; -- Earth radius in kilometers
    dlat NUMERIC;
    dlon NUMERIC;
    a NUMERIC;
    c NUMERIC;
BEGIN
    dlat := radians(lat2 - lat1);
    dlon := radians(lon2 - lon1);
    a := sin(dlat/2)^2 + cos(radians(lat1)) * cos(radians(lat2)) * sin(dlon/2)^2;
    c := 2 * asin(sqrt(a));
    RETURN r * c;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- ==============================================================================
-- Stored Procedures: Device Pairing (6-digit code or QR token)
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.pair_camera_device(
    p_code TEXT
) RETURNS JSONB AS $$
DECLARE
    v_user_id UUID := auth.uid();
    v_camera_id UUID;
    v_device_type TEXT;
    v_serial TEXT;
BEGIN
    IF v_user_id IS NULL THEN
        RETURN jsonb_build_object('success', false, 'message', 'Unauthorized. Please sign in first.');
    END IF;

    -- Look up device by 6-digit code OR QR token
    SELECT id, device_type, serial_number
    INTO v_camera_id, v_device_type, v_serial
    FROM public.camera_devices
    WHERE (pairing_code = UPPER(TRIM(p_code)) OR qr_token = TRIM(p_code))
      AND is_active = true
    LIMIT 1;

    IF v_camera_id IS NULL THEN
        RETURN jsonb_build_object('success', false, 'message', 'Invalid pairing code or QR token.');
    END IF;

    -- Assign camera to the current user
    UPDATE public.camera_devices
    SET owner_id = v_user_id,
        last_heartbeat = NOW()
    WHERE id = v_camera_id;

    RETURN jsonb_build_object(
        'success', true,
        'message', 'Camera successfully paired with account!',
        'camera_id', v_camera_id,
        'device_type', v_device_type,
        'serial_number', v_serial
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ==============================================================================
-- Row Level Security (RLS) Policies
-- ==============================================================================
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.camera_devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.road_hazards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.work_orders ENABLE ROW LEVEL SECURITY;

-- Helper to retrieve current authenticated user role
CREATE OR REPLACE FUNCTION public.get_auth_role()
RETURNS TEXT AS $$
    SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- 1. Profiles Policies
CREATE POLICY "Users can view own profile"
    ON public.profiles FOR SELECT
    TO authenticated
    USING (id = auth.uid());

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    TO authenticated
    USING (id = auth.uid());

-- 2. Organizations Policies (Gov/Authority read, Admins manage)
CREATE POLICY "Authorities can view organizations"
    ON public.organizations FOR SELECT
    TO authenticated
    USING (public.get_auth_role() IN ('authority_admin', 'authority_officer', 'authority_viewer'));

-- 3. Camera Devices Policies
CREATE POLICY "Owners can view their registered cameras"
    ON public.camera_devices FOR SELECT
    TO authenticated
    USING (owner_id = auth.uid() OR public.get_auth_role() IN ('authority_admin', 'authority_officer'));

-- 4. Subscriptions Policies
CREATE POLICY "Users view own subscriptions"
    ON public.subscriptions FOR SELECT
    TO authenticated
    USING (user_id = auth.uid());

-- 5. Work Orders Policies (Strictly restricted to Government Authorities)
CREATE POLICY "Authority officials view work orders"
    ON public.work_orders FOR SELECT
    TO authenticated
    USING (public.get_auth_role() IN ('authority_admin', 'authority_officer', 'authority_viewer'));

CREATE POLICY "Authority admins update work orders"
    ON public.work_orders FOR ALL
    TO authenticated
    USING (public.get_auth_role() IN ('authority_admin', 'authority_officer'));

-- 6. Road Hazards Tiered Access:
-- A) Government officials: View all hazards
CREATE POLICY "Government authority view all hazards"
    ON public.road_hazards FOR SELECT
    TO authenticated
    USING (public.get_auth_role() IN ('authority_admin', 'authority_officer', 'authority_viewer'));

-- B) Paid Subscribers (₹300/mo): Full corridor hazard view
CREATE POLICY "Paid customers view full corridor hazards"
    ON public.road_hazards FOR SELECT
    TO authenticated
    USING (
        public.get_auth_role() = 'customer_paid'
        AND status IN ('detected', 'verified', 'dispatched')
    );

-- C) Free Camera Owners: Limited geofenced visibility (within 1.5 km of their camera)
CREATE POLICY "Free camera owners view local 1.5km hazards"
    ON public.road_hazards FOR SELECT
    TO authenticated
    USING (
        public.get_auth_role() = 'customer_free'
        AND EXISTS (
            SELECT 1 FROM public.camera_devices cd
            WHERE cd.owner_id = auth.uid()
              AND cd.is_active = true
              AND cd.last_known_lat IS NOT NULL
              AND cd.last_known_lon IS NOT NULL
              AND public.haversine_distance_km(road_hazards.latitude, road_hazards.longitude, cd.last_known_lat, cd.last_known_lon) <= 1.5
        )
    );

-- D) Anonymous / Demo fallback for public showcase
CREATE POLICY "Anonymous preview of verified active hazards"
    ON public.road_hazards FOR SELECT
    TO anon
    USING (status = 'verified' AND severity IN ('critical', 'severe'));

