# ADR 0003: Supabase and PostgreSQL Row Level Security (RLS) for Backend

## Context
RoadPulse requires persistent pilot inquiry intake from public visitors, real-time telemetry storage for verified road incidents, and future multi-tenant authenticated access for highway authorities and commercial fleet operators.

## Decision
We select Supabase (managed PostgreSQL) as the data layer, relying on **Row Level Security (RLS)** as the primary boundary for data authorization rather than custom backend microservices.

## Consequences
- **Positive:**
  - Client applications can query the database directly using the public anon key while RLS strictly prevents unauthorized reads and writes.
  - Public visitors can insert into `pilot_requests` via an insert-only policy without reading existing submissions.
  - Multi-tenant tenant boundaries (`organisation_id`) are enforced at the database kernel level.
- **Negative:**
  - Requires disciplined SQL migration versioning and careful policy unit testing.
