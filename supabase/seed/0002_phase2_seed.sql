-- ==============================================================================
-- RoadPulse: 0002 Phase 2 Seed Data (NH-16 Corridor Beachhead)
-- ==============================================================================

-- 1. Insert Government & Concessionaire Organizations
INSERT INTO public.organizations (id, name, org_type, jurisdiction_code, contact_email, contact_phone)
VALUES
    ('11111111-1111-1111-1111-111111111111', 'NHAI Regional Office Vijayawada', 'nhai', 'NHAI-RO-VJA-NH16', 'ro.vijayawada@nhai.org', '+91-866-2456789'),
    ('22222222-2222-2222-2222-222222222222', 'L&T IDPL Tollways Concessionaire', 'concessionaire', 'LT-NH16-CONCESS', 'ops.nh16@lntidpl.com', '+91-866-2498765'),
    ('33333333-3333-3333-3333-333333333333', 'Andhra Pradesh Highway Patrol Zone-3', 'police_traffic', 'AP-TRAFFIC-Z3', 'traffic.patrol@appolice.gov.in', '112'),
    ('44444444-4444-4444-4444-444444444444', '108 Emergency Medical Services Hub', 'ems_108', 'AP-108-DISPATCH', 'dispatch.vja@emri108.in', '108')
ON CONFLICT (id) DO NOTHING;

-- 2. Insert Hardware Camera Devices (M1 Masts & Dashcams with 6-digit codes & QR tokens)
INSERT INTO public.camera_devices (id, serial_number, pairing_code, qr_token, device_type, model_name, firmware_version, is_active, last_heartbeat, last_known_lat, last_known_lon, highway_corridor)
VALUES
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'M1-MAST-4182', '882104', 'QR-M1-4182-VJA', 'm1_solar_mast', 'RoadPulse Mast M1 Solar', 'v2.1.0', true, NOW(), 16.5062, 80.6480, 'NH-16'),
    ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'DC-PRO-9012', '901234', 'QR-DC-9012-TRUCK', 'fleet_dashcam', 'RoadPulse Dashcam Pro-AI', 'v1.4.2', true, NOW(), 16.4300, 80.5600, 'NH-16'),
    ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'DC-STD-5581', '558192', 'QR-DC-5581-AUTO', 'consumer_dashcam', 'RoadPulse Dashcam Mini', 'v1.1.0', true, NOW(), 16.5130, 80.5180, 'NH-16')
ON CONFLICT (id) DO NOTHING;

-- 3. Insert Road Hazards (Corroborated Telemetry along NH-16)
INSERT INTO public.road_hazards (id, hazard_type, severity, highway_code, chainage_km, landmark, latitude, longitude, corroboration_count, verified, priority_score, status, depth_cm, evidence_image_url)
VALUES
    ('h1111111-1111-1111-1111-111111111111', 'accident', 'critical', 'NH-16', 418.20, 'Km 418.2 Vijayawada-Guntur Express Link', 16.5062, 80.6480, 3, true, 96.5, 'verified', NULL, 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600'),
    ('h2222222-2222-2222-2222-222222222222', 'pothole', 'severe', 'NH-16', 414.80, 'Mangalagiri Junction Overpass (Left Lane)', 16.4300, 80.5600, 2, true, 84.0, 'dispatched', 6.8, 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600'),
    ('h3333333-3333-3333-3333-333333333333', 'debris', 'moderate', 'NH-16', 422.00, 'Amaravati Seed Access Road Underpass', 16.5130, 80.5180, 2, false, 58.0, 'detected', NULL, 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600'),
    ('h4444444-4444-4444-4444-444444444444', 'pothole', 'severe', 'NH-65', 88.50, 'Ibrahimpatnam Bypass Outer Curve', 16.5870, 80.5210, 4, true, 88.5, 'verified', 7.2, 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600')
ON CONFLICT (id) DO NOTHING;

-- 4. Insert 48-Hour Concessionaire SLA Work Orders
INSERT INTO public.work_orders (id, hazard_id, assigned_org_id, contractor_name, contractor_phone, status, sla_deadline, notes)
VALUES
    ('w1111111-1111-1111-1111-111111111111', 'h2222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', 'L&T Highway Rapid Maintenance Unit 4', '+91-98480-11223', 'in_progress', NOW() + INTERVAL '34 hours', 'Cold-mix asphalt patch team dispatched under IRC:SP:84 guidelines.')
ON CONFLICT (id) DO NOTHING;

