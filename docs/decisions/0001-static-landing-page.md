# ADR 0001: Zero-Build Static Architecture for Public Landing Page

## Context
The RoadPulse public landing page is an entrepreneurship and technology showcase designed for highway authorities, mentors, and investors. It contains rich interactive cockpit simulations (SVG GIS radar, optical feeds, Web Audio synthesized warning chime, corridor investment calculator, and FAQ).

## Decision
We choose to maintain `apps/landing/` as pure vanilla static HTML/CSS/JS without introducing build frameworks (Next.js, Vite, React) or bundling steps.

## Consequences
- **Positive:**
  - Zero compilation latency; runs instantly in any browser via file protocol or static HTTP server (`npx serve`).
  - Trivially deployable to Vercel, Netlify, or Cloudflare Pages with zero build configuration.
  - Highly accessible for non-developer stakeholders inspecting the codebase.
- **Negative:**
  - Requires standard manual asset path management rather than bundler-managed imports.
