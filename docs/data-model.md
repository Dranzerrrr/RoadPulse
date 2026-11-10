# RoadPulse Data Model & Schema Specification

> **Status:** Active Reference Document  
> **Target Storage:** PostgreSQL (Supabase) + Local Mock JSON  
> **Last Updated:** November 2026  

---

## 1. Core Incident Entity (`road_incidents`)

The canonical representation of a detected road hazard or accident event across simulation and live telemetry:

| Field | Type | Description | Allowed Values / Constraints |
|---|---|---|---|
| `id` | `UUID` / `String` | Unique incident identifier. | e.g., `INC-102` or UUID v4 |
| `incident_type` | `String` | Category of road anomaly. | `'pothole'`, `'accident'`, `'debris'`, `'congestion'`, `'workzone'` |
| `severity` | `String` | Assessed hazard impact. | `'critical'`, `'severe'`, `'moderate'`, `'advisory'` |
| `highway_code` | `String` | Official highway classification. | e.g., `'NH-16'`, `'NH-65'`, `'SH-2'` |
| `landmark` | `String` | Human-readable location description. | e.g., `'Km 418.2, Vijayawada-Guntur Link'` |
| `latitude` | `Numeric(10, 7)` | WGS84 GPS Latitude coordinate. | e.g., `16.5062` |
| `longitude` | `Numeric(10, 7)` | WGS84 GPS Longitude coordinate. | e.g., `80.6480` |
| `corroboration_count` | `Integer` | Number of distinct cameras agreeing. | Minimum `1` |
| `verified` | `Boolean` | Spatial multi-camera consensus flag. | `true` if $\ge 2$ agreeing feeds within $\pm 1.5$m |
| `status` | `String` | Operational lifecycle stage. | `'unverified'`, `'active'`, `'dispatched'`, `'resolved'`, `'false_positive'` |
| `detected_at` | `Timestamp` | Instant of first optical trigger. | ISO 8601 UTC |
| `organisation_id` | `UUID` | Scope owner (future multi-tenancy). | Foreign Key to `organisations.id` |

---

## 2. Pilot Request Entity (`pilot_requests`)

Captures incoming highway corridor trial requests from government authorities and fleet operators:

| Field | Type | Description |
|---|---|---|
| `id` | `UUID` | Primary Key (Default: `gen_random_uuid()`). |
| `created_at` | `Timestamp` | Ingestion timestamp (UTC). |
| `full_name` | `Text` | Official/Representative contact name. |
| `work_email` | `Text` | Organizational email address. |
| `organization` | `Text` | Authority / Concessionaire / Fleet Company. |
| `role_type` | `Text` | `'highway_authority'`, `'fleet_operator'`, `'police_ems'`, `'research_academic'`, `'other'` |
| `corridor_region`| `Text` | Proposed highway stretch and length (km). |
| `notes` | `Text` | Safety objectives and blackspot history. |
| `status` | `Text` | `'pending'`, `'contacted'`, `'approved'`, `'rejected'` |

---

## 3. Future Multi-Tenant Entities (Design Specifications)

When authenticated portals are activated, the following tables enforce role-based access:

### `organisations`
- `id` (UUID PK)
- `name` (Text, e.g. "NHAI Regional Office Vijayawada", "L&T IDPL Tollways", "Interstate Express Logistics")
- `org_type` (`'authority'`, `'concessionaire'`, `'fleet'`, `'emergency'`)
- `created_at` (Timestamp)

### `profiles` (Linked to `auth.users`)
- `id` (UUID PK, references `auth.users.id`)
- `organisation_id` (UUID, references `organisations.id`)
- `role` (`'platform_admin'`, `'authority_admin'`, `'authority_officer'`, `'authority_viewer'`, `'fleet_manager'`, `'driver'`)
- `full_name` (Text)
- `phone` (Text)

### `incident_events` (Audit Trail)
- `id` (UUID PK)
- `incident_id` (UUID, references `road_incidents.id`)
- `event_type` (`'detected'`, `'corroborated'`, `'dispatched'`, `'workorder_created'`, `'resolved'`)
- `actor_id` (UUID, references `profiles.id`, nullable for automated AI triggers)
- `metadata` (JSONB: vector embeddings, bounding boxes, audio chime log)
- `created_at` (Timestamp)
