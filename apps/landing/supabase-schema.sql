-- ==============================================================================
-- RoadPulse: 0001 Initial Schema & Row Level Security
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Pilot Requests Table (Public Insert Only via Row Level Security)
CREATE TABLE IF NOT EXISTS public.pilot_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    full_name TEXT NOT NULL,
    work_email TEXT NOT NULL,
    organization TEXT NOT NULL,
    role_type TEXT NOT NULL DEFAULT 'highway_authority' CHECK (role_type IN ('highway_authority', 'fleet_operator', 'police_ems', 'research_academic', 'other')),
    corridor_region TEXT NOT NULL,
    fleet_or_km_scale TEXT,
    notes TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'approved', 'rejected'))
);

-- Enable Row Level Security on pilot_requests
ALTER TABLE public.pilot_requests ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous visitors to submit a pilot request
CREATE POLICY "Allow public insert to pilot_requests"
    ON public.pilot_requests
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Policy: Restrict read access to authenticated dashboard users
CREATE POLICY "Admins can view all pilot requests"
    ON public.pilot_requests
    FOR SELECT
    TO authenticated
    USING (true);

-- 2. Road Incidents Table (For telemetry feeds & prototype sync)
CREATE TABLE IF NOT EXISTS public.road_incidents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    incident_type TEXT NOT NULL CHECK (incident_type IN ('pothole', 'accident', 'debris', 'congestion', 'workzone')),
    severity TEXT NOT NULL CHECK (severity IN ('critical', 'severe', 'moderate', 'advisory')),
    highway_code TEXT NOT NULL,       -- e.g. 'NH-16'
    landmark TEXT NOT NULL,           -- e.g. 'Km 412.4, Amaravati Bypass'
    latitude NUMERIC(10, 7) NOT NULL,
    longitude NUMERIC(10, 7) NOT NULL,
    corroboration_count INT DEFAULT 1,
    verified BOOLEAN DEFAULT false,
    verified_at TIMESTAMPTZ,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'dispatched', 'resolved', 'false_positive'))
);

-- Enable Row Level Security on road_incidents
ALTER TABLE public.road_incidents ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read of active road incidents for public simulation & dashboard
CREATE POLICY "Public can view active road incidents"
    ON public.road_incidents
    FOR SELECT
    TO anon
    USING (status = 'active');
