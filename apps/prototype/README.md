# RoadPulse — 6-View Simulated Dashboard Prototype

> **Status:** Workspace Placeholder for Incoming Prototype File  
> **Target File:** `RoadPulse-Website-Prototype.html` (to be placed as `index.html` here)  

---

## 📌 Purpose

This directory hosts the interactive, multi-screen entrepreneurship simulation dashboard for **RoadPulse**. While `apps/landing/` serves as the public-facing product marketing and architecture overview, this prototype allows stakeholders, mentors, and government evaluation panels to step through the operational lifecycle of a highway incident.

---

## 🖥️ The 6 Interactive Views

When `RoadPulse-Website-Prototype.html` is added to this directory, it provides the following synchronized views:

1. **Live Corridor GIS Map:**
   - Real-time highway blackspot pins across the Andhra Pradesh NH-16 beachhead corridor (Amaravati–Vijayawada–Guntur).
   - Moving vehicle pings and fixed solar mast nodes.

2. **Incident Verification Queue:**
   - Active triage of optical triggers (Potholes, Collisions, Fallen Cargo).
   - Multi-camera consensus validation inspector showing confidence scores.

3. **In-Cabin Driver HUD Simulation:**
   - Windshield holographic alert view for moving commercial vehicles.
   - Realistic speed-calibrated countdown and audible chime warning.

4. **Authority Command Center:**
   - NHAI and highway concessionaire administrative view.
   - Pothole depth logging, geo-tagged photographic proof, and automated 48-hour SLA repair ticketing.

5. **Emergency 108 CAD Dispatch Gateway:**
   - Sub-90-second automated accident telemetry relay.
   - Victim impact classification, coordinates, and nearest trauma care routing.

6. **Scripted Venture Demo Walkthrough:**
   - Interactive guided tour demonstrating the complete flow from optical trigger to emergency response.

---

## 🚀 How to Add the Prototype File

1. Copy your `RoadPulse-Website-Prototype.html` file into this directory and name it `index.html`.
2. Run `npx serve apps/prototype -p 3001` to preview the prototype independently.
