# ADR 0002: Monorepo Architecture with Native npm Workspaces

## Context
RoadPulse is evolving from a single HTML page into a multi-application platform consisting of:
1. Public Landing Page (`apps/landing/`)
2. Simulated 6-View Dashboard Prototype (`apps/prototype/`)
3. Planned authenticated portals (`apps/portals/authority-portal/`, `apps/portals/fleet-portal/`)
4. Shared assets: design tokens, mock telemetry, database schema, and environment config.

## Decision
We organize the repository as a monorepo using standard **npm workspaces** without heavy orchestration tooling (like Turborepo or Nx).

## Consequences
- **Positive:**
  - Built directly into Node.js/npm (zero extra global tool installation required).
  - Clean boundary isolation: `apps/*` for runnable targets, `packages/*` for shared code.
  - Future portals can adopt modern frameworks (e.g., Svelte or React) without altering the static landing page.
- **Negative:**
  - Workspace linking must be kept clean when consuming local packages from vanilla browser scripts.
