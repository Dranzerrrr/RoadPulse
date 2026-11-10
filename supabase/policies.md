# RoadPulse Database Security & Row Level Security (RLS) Guide

> **Target Platform:** Supabase (PostgreSQL 15+)  
> **Security Philosophy:** Defense-in-depth via database kernel policies  

---

## 1. Current Phase: Public Prototype Security

In the current prototype phase, access requirements are straightforward:

1. **`pilot_requests` Table:**
   - **Anonymous Visitors (`anon`):** Can `INSERT` new trial requests.
   - **Read Access:** Restricted to authenticated platform administrators. Anonymous users cannot read existing rows.
   ```sql
   CREATE POLICY "Allow public insert to pilot_requests"
       ON public.pilot_requests FOR INSERT TO anon
       WITH CHECK (true);
   ```

2. **`road_incidents` Table:**
   - **Public Read (`anon`):** Can query incidents where `status = 'active'` to populate the public simulation map.
   - **Write Access:** Restricted to authenticated service role or corridor telemetry ingestion API.
   ```sql
   CREATE POLICY "Public can view active road incidents"
       ON public.road_incidents FOR SELECT TO anon
       USING (status = 'active');
   ```

---

## 2. Future Phase: Multi-Tenant Enterprise Authorization

When the **Authority Monitoring Portal** and **Fleet Operator Portal** are launched, the system will enforce multi-tenant isolation using Supabase Auth and Row Level Security.

### Planned Roles Hierarchy
- `platform_admin`: Superuser managing system health and cross-corridor provisioning.
- `authority_admin`: Project Director at NHAI / Concessionaire managing team members and camera licenses.
- `authority_officer`: Road safety engineer authorized to verify incidents, approve workorders, and trigger dispatches.
- `authority_viewer`: Read-only stakeholder inspecting reports and IRI road roughness indexes.
- `fleet_manager`: Logistics operations lead managing vehicles, OBD-II telemetry, and driver HUD alerts.
- `driver`: In-cabin vehicle operator receiving heads-up hazard warnings.

### Multi-Tenant Policy Pattern
Every record in tenant-scoped tables (`incidents`, `workorders`, `cameras`, `fleet_telemetry`) references `organisation_id`.

```sql
-- Helper function to fetch the authenticated user's organization
CREATE OR REPLACE FUNCTION auth.get_user_org_id()
RETURNS UUID AS $$
  SELECT organisation_id FROM public.profiles WHERE id = auth.uid() LIMIT 1;
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- Tenant Isolation RLS Policy Example
CREATE POLICY "Tenant isolation for incidents"
    ON public.road_incidents
    FOR ALL
    TO authenticated
    USING (
      organisation_id = auth.get_user_org_id()
      OR EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE profiles.id = auth.uid() AND profiles.role = 'platform_admin'
      )
    );
```

### Security Guarantees
- No tenant can read or modify another tenant's highway corridor telemetry.
- Telemetry ingestion from roadside masts validates cryptographic device tokens before inserting rows.
- Data residency: All records hosted in MeitY-compliant Indian cloud regions (e.g. AWS Mumbai / GCP Delhi).
