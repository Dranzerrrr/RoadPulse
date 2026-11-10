# RoadPulse — Canonical Public Landing Page

The official, production-grade static landing page and interactive corridor simulation for **RoadPulse**.

---

## 🌟 Architecture & Structure

This application is built with **pure static HTML5, CSS3, and modern ES modules** (zero bundlers, zero framework overhead).

```
apps/landing/
├── index.html            # Semantic HTML5 markup
├── vercel.json           # Vercel static routing configuration
├── css/
│   ├── tokens.css        # Design tokens & CSS custom properties (:root)
│   ├── main.css          # Layout, typography, bento grid, pricing, FAQ, modal
│   └── cockpit.css       # Window frame, radar SVG, HUD, and stream styles
└── js/
    ├── main.js           # UI controller, event listeners, modal and clock lifecycle
    ├── cockpit.js        # GIS radar simulation, optical streams, audio chime, countdown
    ├── calculator.js     # Corridor sizing & investment slider
    └── pilot-form.js     # Pilot inquiry validation & Supabase/demo submission
```

---

## 🚀 Running Locally

You can preview the landing page locally using any standard static web server:

```bash
# From repo root:
npm run serve:landing

# Or from this directory:
npx serve . -p 3000
```

Open `http://localhost:3000` in your browser.

---

## ☁️ Deploying to Vercel

When deploying this monorepo to Vercel:

1. Import the Git repository in your Vercel Dashboard.
2. In the **Project Settings**:
   - **Framework Preset:** `Other`
   - **Root Directory:** `apps/landing`
   - **Build Command:** *(Leave empty)*
   - **Output Directory:** `.` *(Current directory)*
3. If connecting to a live Supabase backend, set environment variables in Vercel:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
4. Deploy!
