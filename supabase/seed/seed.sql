-- ==============================================================================
-- RoadPulse: Seed Data (Andhra Pradesh NH-16 Beachhead Corridor)
-- ==============================================================================

INSERT INTO public.road_incidents (
    incident_type,
    severity,
    highway_code,
    landmark,
    latitude,
    longitude,
    corroboration_count,
    verified,
    status
)
VALUES 
    ('accident', 'critical', 'NH-16', 'Km 418.2, Vijayawada-Guntur Express Link', 16.5062000, 80.6480000, 4, true, 'active'),
    ('pothole', 'severe', 'NH-16', 'Km 414.8, Mangalagiri Junction Overpass', 16.4300000, 80.5600000, 3, true, 'active'),
    ('debris', 'moderate', 'NH-16', 'Km 422.0, Amaravati Seed Access Road', 16.5130000, 80.5180000, 2, false, 'active'),
    ('pothole', 'severe', 'NH-65', 'Km 88.5, Ibrahimpatnam Bypass', 16.5870000, 80.5210000, 5, true, 'active')
ON CONFLICT DO NOTHING;
