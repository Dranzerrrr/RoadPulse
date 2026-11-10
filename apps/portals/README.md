# RoadPulse — Enterprise Authenticated Portals (Future Seams)

> **Status:** Architectural Seams (Implementation Scheduled Post-Validation)  
> **Security:** Multi-Tenant Row Level Security (RLS) via Supabase Auth  

---

## 🏛️ Planned Portals Overview

RoadPulse operates a dual-sided data network: highway infrastructure authorities and commercial fleet operators. The following two authenticated applications will live in this directory:

### 1. `authority-portal/` (Highway & Municipal Authorities)
- **Users:** NHAI Project Directors, Concessionaire Operations Teams, State PWD Road Safety Cells.
- **Roles:** `authority_admin`, `authority_officer`, `authority_viewer`.
- **Primary Function:** Continuous blackspot monitoring, multi-camera corroboration review, concessionaire maintenance SLA compliance, and Golden Hour emergency telemetry audit.

### 2. `fleet-portal/` (Commercial Logistics & Fleet Operators)
- **Users:** Interstate Trucking Fleet Managers, State Transport Corporations (APSRTC/KSRTC), Cab Fleet Leads.
- **Roles:** `fleet_manager`, `driver`.
- **Primary Function:** In-cabin HUD telemetry telemetry streams, route hazard pre-warnings, suspension damage risk analytics, and crowdsourcing credit rewards.

---

## 🔒 Authorization Architecture

All portals share the common database layer in `supabase/` and are strictly partitioned by `organisation_id`. Users only see data belonging to their verified organization.
