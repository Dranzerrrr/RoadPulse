<div align="center">

  <img src="docs/assets/brand/RoadPulse-Logo-Lockup.svg" alt="RoadPulse Logo" width="560">

  <p><strong>Intelligent Dual-Module Road-Monitoring Camera Network</strong></p>

  <p>
    <a href="#quick-start">Quick Start</a> •
    <a href="#monorepo-structure">Architecture</a> •
    <a href="#deployment">Deployment</a> •
    <a href="#database-groundwork">Database</a> •
    <a href="docs/RoadPulse-Venture-Concept.md">Venture Plan</a> •
    <a href="CONTRIBUTING.md">Contributing</a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/Architecture-npm_workspaces-2AD9C6?style=flat-square" alt="Monorepo Workspaces">
    <img src="https://img.shields.io/badge/Frontend-Static_HTML5_/_ES6-2563EB?style=flat-square" alt="Static Frontend">
    <img src="https://img.shields.io/badge/Database-Supabase_/_PostgreSQL-10B981?style=flat-square" alt="Database">
    <img src="https://img.shields.io/badge/License-MIT-F97316?style=flat-square" alt="License">
  </p>

</div>

---

## 🚦 About RoadPulse

**RoadPulse** is an intelligent dual-module road-monitoring camera network that detects critical road hazards—specifically **potholes, multi-vehicle collisions, and lane-blocking obstacles**—at the instant they occur.

- **Roadside Module (Fixed M1 Mast):** Solar-powered edge camera deployed at highway blackspots and junctions reporting directly to road authorities.
- **Vehicle Module (In-Cabin HUD):** Dashcam and windshield holographic heads-up display providing commercial fleet drivers with advance hazard warnings while crowdsourcing road roughness telemetry.
- **Central Corroboration Engine:** Spatiotemporal multi-camera consensus engine that filters out puddles and shadows to eliminate false alarms before triggering emergency response.

> **Status:** Student Venture Prototype under engineering evaluation (developed at VIT-AP University).

---

## 📁 Monorepo Structure

```
roadpulse/
├── apps/
│   ├── landing/                     # Canonical public landing page (static HTML/CSS/JS)
│   ├── prototype/                   # 6-View Simulated Dashboard Prototype (Placeholder)
│   └── portals/                     # Future Authenticated Portals (Design Seams Only)
│       ├── authority-portal/        # For NHAI / Concessionaires / State PWDs
│       └── fleet-portal/            # For Commercial Logistics & Bus Fleets
│
├── packages/
│   ├── mock-data/                   # Shared single source of truth for telemetry & simulation
│   ├── design-tokens/               # Centralized styling variables (CSS variables + JSON)
│   └── config/                      # Environment settings, feature flags, Supabase service
│
├── supabase/
│   ├── migrations/                  # Versioned PostgreSQL schema migrations
│   ├── seed/                        # Demo seed data (Andhra Pradesh NH-16 corridor)
│   └── policies.md                  # RLS multi-tenant security specifications
│
├── docs/
│   ├── architecture.md              # System architecture, monorepo seams, and future portal flows
│   ├── data-model.md                # Canonical entities, status workflows, and RBAC table schemas
│   ├── decisions/                   # Architectural Decision Records (ADRs)
│   ├── assets/brand/                # Official vector logos and icons
│   └── RoadPulse-Venture-Concept.md # Business case, team narrative, MoRTH ground truth
│
├── scripts/                         # Repository maintenance and validation scripts
└── .github/workflows/               # Continuous Integration (lint, format, HTML validation)
```

---

## ⚡ Quick Start

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher)
- npm (version 9 or higher)

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/Dranzerrrr/RoadPulse.git
cd RoadPulse
npm install
```

### 3. Run the Landing Page Locally
Start the static development server:
```bash
npm run serve:landing
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

*Alternatively, you can open `apps/landing/index.html` directly in any web browser without running a server.*

---

## ☁️ Deployment Guide

### Deploying the Landing Page to Vercel
The canonical public landing page in `apps/landing/` is ready for static deployment on Vercel:

1. Import your RoadPulse repository into [Vercel](https://vercel.com).
2. Configure **Project Settings**:
   - **Framework Preset:** `Other`
   - **Root Directory:** `apps/landing`
   - **Build Command:** *(Leave empty)*
   - **Output Directory:** `.` *(Current directory)*
3. *(Optional)* Add your Supabase environment variables:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
4. Deploy! Clean routing is managed by `apps/landing/vercel.json`.

---

## 🗄️ Database Groundwork (Supabase)

To connect a persistent backend database:

1. Create a project on [Supabase](https://supabase.com).
2. In the Supabase SQL Editor, execute the migration:
   ```sql
   -- Copy contents from:
   supabase/migrations/0001_initial_schema.sql
   ```
3. *(Optional)* Seed demo records for the NH-16 corridor:
   ```sql
   -- Copy contents from:
   supabase/seed/seed.sql
   ```
4. Copy `.env.example` to `.env` and fill in your Supabase credentials:
   ```bash
   cp .env.example .env
   ```

For detailed security documentation and future multi-tenant RLS specifications, see [`supabase/policies.md`](docs/../supabase/policies.md).

---

## 🛠️ Quality & Code Standards

```bash
# Validate HTML structure & accessibility
npm run validate

# Lint JavaScript files
npm run lint

# Check code formatting
npm run format:check

# Auto-format codebase
npm run format
```

---

## 📄 License & Intellectual Honesty

- **License:** Distributed under the [MIT License](LICENSE).
- **Prototype Disclosure:** RoadPulse is currently an early-stage startup concept and interactive system simulation. The hardware specifications (M1 Mast and R1 In-Cabin HUD) represent planned reference architectures developed for highway authority feasibility trials. Fatality benchmarks are sourced from the official Ministry of Road Transport and Highways (MoRTH) 2024 annual report.
