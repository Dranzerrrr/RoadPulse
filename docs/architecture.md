# RoadPulse System Architecture & Monorepo Structure

> **Status:** Active Reference Document  
> **Last Updated:** November 2026  

---

## 1. System Overview

RoadPulse is an intelligent dual-module road-monitoring camera network that detects critical road hazards—specifically **potholes, multi-vehicle collisions, and lane-blocking obstacles**—in real time.

```
       [ Roadside M1 Solar Mast ]             [ In-Cabin Vehicle HUD / Dashcam ]
       (Stationary 4.5m Blackspots)               (Moving Fleet Crowdsourcing)
                    \                                    /
                     \                                  /
              [ Edge Neural Inference: Bounding Boxes + Vector Embeddings ]
                                    \    /
                                     \  /
                     [ Central Corroboration Engine ]
                    (Spatiotemporal Consensus ±1.5m)
                                    /    \
                                   /      \
             [ 108 Emergency CAD Bridge ]  [ Authority Workorder SLA Dispatch ]
             (Sub-90s Medical Telemetry)     (NHAI / Concessionaire Repair API)
```

---

## 2. Monorepo Organization

RoadPulse uses **npm workspaces** to separate concerns across public presentations, shared tokens, and future authenticated portals:

```
roadpulse/
├── apps/
│   ├── landing/                     # Canonical public landing page (pure static HTML/CSS/JS)
│   ├── prototype/                   # 6-View Simulated Dashboard Prototype (Placeholder)
│   └── portals/                     # Future Authenticated Portals (Design Seams Only)
│       ├── authority-portal/        # For NHAI / Concessionaires / State PWDs
│       └── fleet-portal/            # For Commercial Logistics & Bus Fleets
│
├── packages/
│   ├── mock-data/                   # Shared single source of truth for telemetry & simulation
│   ├── design-tokens/               # Centralized styling variables (CSS + JSON)
│   └── config/                      # Environment settings, feature flags, Supabase service
│
├── supabase/
│   ├── migrations/                  # Versioned PostgreSQL schema migrations
│   ├── seed/                        # Demo seed data (NH-16 beachhead corridor)
│   └── policies.md                  # RLS multi-tenant security specifications
│
└── docs/                            # Concept documentation, architecture, ADRs, brand assets
```

---

## 3. Future Portal Seams & Multi-Tenancy

The monorepo design anticipates authenticated enterprise portals without requiring structural rewrites:

### Authority Monitoring Portal (`apps/portals/authority-portal/`)
- **Target Audience:** Highway Concessionaires, NHAI Project Directors, State PWD Road Safety Cells.
- **Key Modules:**
  - Active Incident Queue & Verification Review.
  - Multi-Feed Video Corroboration Inspector.
  - Concessionaire SLA Repair Ticketing (48h timeline tracking).
  - Corridor Road Roughness (IRI) Heatmaps.

### Fleet Operator Portal (`apps/portals/fleet-portal/`)
- **Target Audience:** Interstate Logistics Trucking Companies, State Transport Undertakings (APSRTC/KSRTC), Private Bus Operators.
- **Key Modules:**
  - Real-time Driver Heads-Up Display Telemetry Feed.
  - Pothole & Road Dip Pre-warnings along assigned routes.
  - Fleet Maintenance & Suspension Damage Risk Analytics.
  - Crowdsourcing Reward / Rebate Accounting.

### Multi-Tenancy by Design
All enterprise data is isolated by `organisation_id` in Supabase using **Row Level Security (RLS)**. Access control is enforced at the database layer, ensuring that no client-side query can leak cross-tenant telemetry.
