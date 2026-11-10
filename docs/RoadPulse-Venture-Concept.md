# RoadPulse — Complete Venture Concept & Strategic Plan

> **Tagline:** *"Every road has a pulse. We read it in real time."*  
> **Industry:** Automotive & Auto Components / Smart Transportation Infrastructure  
> **Location:** Amaravati & Vijayawada, Andhra Pradesh, India  
> **Institution of Origin:** School of Computer Science & Engineering, VIT-AP University  

---

## 1. Executive Summary

**RoadPulse** is an intelligent dual-module road-monitoring camera network that detects critical road hazards—specifically **potholes, multi-vehicle collisions, and lane-blocking obstacles**—at the instant they occur. 

Unlike traditional road maintenance that relies on periodic manual inspections or retrospective citizen complaint apps, RoadPulse turns ordinary vehicle windshields and highway roadside poles into a continuous, synchronized vision sensor network. 

By employing **spatiotemporal multi-camera corroboration**, RoadPulse eliminates false positives before broadcasting sub-90-second emergency telemetry to 108 trauma care networks and generating automated maintenance work orders for highway concessionaires.

---

## 2. Problem Statement & Ground Truth Data

### The Highway Crisis in India (MoRTH 2024 Benchmark)
Drivers and highway authorities currently possess **no real-time mechanism to detect acute road hazards** until after those hazards have caused vehicle damage, severe injury, or death.

| Ground Truth Metric | Data Point | Source | Strategic Implication |
|---|---|---|---|
| **Annual Road Deaths** | **1,77,000+** (~20 deaths/hour) | MoRTH *Road Accidents in India 2024* | National public safety emergency requiring automated early warning. |
| **National Highway Share** | **36.6% of all deaths** (31% of total crashes) | MoRTH 2024 Report | NHs represent only 2% of India's road length, making them the ultimate beachhead. |
| **Pothole Mortality Surge** | **+53% over 5 years** (1,555 in 2020 to 2,385 in 2024) | MoRTH Statistical Analysis | Progressive pavement deterioration is going unchecked at highway speeds. |
| **Golden Hour Survival** | **< 20% reach care within 60 mins** | National Trauma Registry & MoRTH | Civilian bystander call delays cause fatal emergency response lags. |

### Root Causes
1. **Complaint-Driven, Reactive Infrastructure:** Concessionaires inspect corridors every 15–30 days. Potholes that form overnight due to heavy rains or overloaded axle loads remain unflagged until a crash occurs.
2. **Lack of Corroborated Channels:** Crowdsourced mobile apps (e.g., GPS speed bumps) generate enormous noise (speed breakers, rough patches, dropped phones) which road authorities discard as unreliable.
3. **Siloed Stakeholder Systems:** Police, 108 Emergency Ambulance Dispatch, and National Highways Authority of India (NHAI) concessionaires operate on separate data islands with zero automated telemetry exchange.

---

## 3. Team Story & Personal Connect

> *"Our team travels daily along the NH-16 corridor between Vijayawada and the VIT-AP University campus in Amaravati. During the monsoon construction phase of the capital region, sudden axle-snapping crater depressions and unmarked diversions appeared overnight. A classmate’s two-wheeler suffered a severe rim blowout on an unlit NH-16 stretch near the Mangalagiri bypass; the ambulance arrived more than 40 minutes later simply because passing drivers could not give the precise chainage location. We realized that thousands of commercial trucks and state buses pass these exact hazard spots every hour with dashcams and smartphones that capture everything, but communicate nothing. RoadPulse was founded to make the road itself communicate."*

---

## 4. Hardware System Architecture

RoadPulse is engineered around a **dual-module vision architecture**:

```
 ┌──────────────────────────┐          ┌──────────────────────────┐
 │   RoadPulse R1 (Vehicle) │          │  RoadPulse M1 (Roadside) │
 │  Windshield In-Cabin HUD │          │  Solar 4K Mast Camera    │
 └─────────────┬────────────┘          └────────────┬─────────────┘
               │                                    │
               │ Sub-meter GPS & Video Features     │ Fixed Chainage High-Angle Stream
               ▼                                    ▼
       ┌──────────────────────────────────────────────────┐
       │   RoadPulse Spatial Corroboration Engine         │
       │   • 3+ Camera Consensus Verification             │
       │   • Millimeter Pothole Depth Estimation          │
       │   • False-Positive Puddle/Shadow Filter          │
       └────────────────────────┬─────────────────────────┘
                                │
        ┌───────────────────────┴───────────────────────┐
        ▼                                               ▼
┌──────────────────────────┐                 ┌──────────────────────────┐
│  Incoming Drivers        │                 │  Authorities & EMS (108) │
│  In-Cabin HUD Warning    │                 │  Automated Dispatch &    │
│  (350m reaction buffer)  │                 │  SLA Concessionaire WO   │
└──────────────────────────┘                 └──────────────────────────┘
```

### Module Specifications

#### 1. RoadPulse M1 — Highway Roadside Mast Unit
* **Primary Role:** Fixed continuous surveillance at high-risk blackspots, curves, interchanges, and toll approaches.
* **Optics:** Sony Starvis 2 4K HDR optical sensor with anti-reflective nanocoating and hydrophobic heated glass.
* **Edge NPU:** Hailo-8™ AI Processor delivering **26 TOPS** of neural compute running custom TinyYOLO-Road v4 at 60 FPS.
* **Power & Network:** Monocrystalline solar panel array + 72-hour LiFePO4 battery pack. 5G/4G LTE Cat-4 dual-SIM + LoRa mesh. Zero road trenching required.
* **Durability:** IP68 waterproof, IK10 vandal-resistant aluminum housing rated for -20°C to +75°C.

#### 2. RoadPulse R1 — Automotive Windshield Module
* **Primary Role:** Fleet crowdsourcing unit installed on commercial trucks, state transport buses, and pilot vehicles.
* **Optics:** 140° ultra-wide low-distortion forward-facing optical block.
* **Edge Compute:** 12 TOPS edge processor for on-chassis lane tracking and obstacle extraction.
* **Driver Interface:** Integrated rear-facing OLED Heads-Up Display (HUD) and multi-tone acoustic alarm.
* **Localization:** Multi-band RTK GNSS receiver providing sub-40cm chainage accuracy with 6-axis IMU dead-reckoning.

---

## 5. The Corroboration Moat

Single-camera vision systems suffer from high false-alarm rates caused by:
* Water puddles reflecting sunlight
* Dark tree shadows across asphalt
* Discarded plastic bags mimicking boulders

**RoadPulse Proprietary Corroboration Protocol:**
1. When an R1 vehicle camera flags a road depression, it logs the spatial bounding polygon, timestamp, and RTK coordinates.
2. The RoadPulse cloud spatial index checks whether a subsequent vehicle or fixed M1 roadside mast confirms the depression within **±1.5 meters**.
3. Once **3 independent camera detections** agree with a confidence score > 95%, the hazard is locked into the live registry.
4. Alerts are pushed to incoming vehicle HUDs within **350 milliseconds**, while a verified work order is dispatched to the NHAI portal.

---

## 6. Competitive Analysis

| Competitor | Core Strength (35 chars) | Critical Weakness (35 chars) | RoadPulse Advantage |
|---|---|---|---|
| **Nayan Tech** | Good municipal civic crowd vision | High latency; batch crowd review | Real-time edge latency (< 90s) |
| **Road Metrics** | Mobile smartphone accelerometer | Cannot detect sudden crashes/debris | Dual-camera optical corroboration |
| **Google Maps** | Massive global user GPS base | Passive delay; relies on victim taps | Zero driver interaction required |
| **Mobileye** | Automotive OEM ADAS market leader | Closed ecosystem; no public agency sync | Open GIS export for public NHAI |
| **HERE Tech** | Strong HD map spatial layers | Enterprise mapping without edge cams | Active edge camera hardware fleet |

---

## 7. Bottom-Up Market Sizing

* **India Total National Highway Network:** 1,46,145 km (MoRTH official data)
* **Andhra Pradesh National Highway Network:** 8,683 km
* **Benchmark Pricing:** ₹1,00,000 per M1 Mast Camera per year (~₹20,000 per km per year with 1 camera per 5 km spacing)

### 1. Total Addressable Market (TAM)
$$\text{TAM} = 1,46,145\text{ km} \times ₹20,000/\text{km/year} \approx ₹292\text{ Crore / year}$$

### 2. Serviceable Addressable Market (SAM)
Focusing on the 25% highest-density National Highway stretches in Andhra Pradesh (e.g., NH-16 Chennai–Kolkata Golden Quadrilateral stretch):
$$\text{SAM} = 8,683\text{ km} \times 25\% \times ₹20,000/\text{km/year} \approx ₹4.34\text{ Crore / year}$$

### 3. Serviceable Obtainable Market (SOM — Years 1 to 2)
Initial 20 M1 hardware units deployed across high-risk blackspots on the Amaravati–Vijayawada–Guntur corridor:
$$\text{SOM} = 20\text{ cameras} \times ₹1,00,000/\text{camera/year} = ₹20,00,000\text{ (₹20 Lakhs)}$$

---

## 8. Business Model & Unit Economics

### Revenue Streams
1. **Highway Authority Corridor SaaS (Primary Beachhead):**  
   Annual monitoring subscription of **₹1,00,000 per camera/year** (or ₹20,000/km/yr). Includes hardware deployment, automated concessionaire SLA penalty reports, and 108 EMS integration.
2. **Commercial Fleet Safety Subscriptions:**  
   **₹300 per vehicle per month** for logistics fleets (e.g., VRL, Safechem, AP State RTC buses) for real-time in-cabin driver HUD warnings and corridor risk telematics.
3. **Data APIs for Insurance Underwriters:**  
   Road corridor risk rating APIs sold to commercial auto insurers to incentivize blackspot speed reduction.

### Unit Economics per M1 Mast Unit
* **Hardware Manufacturing Cost (BOM):** ₹45,000 (Sony sensor, Hailo NPU, solar mast, IP68 casing).
* **Capitalized Hardware Cost:** ₹1,875 / month (amortized over 24 months).
* **Monthly Subscription Revenue:** ₹8,333 / month (₹1,00,000 ÷ 12).
* **Gross Margin per Hardware Node:** **~68%**.

---

## 9. 12-Month Financial Projections (SOM Year 1)

| Month | Deployed Cameras | Monthly Revenue (₹) | Fixed Operating Costs (₹) | Cumulative Cash Flow (₹) | Milestone |
|---|---|---|---|---|---|
| **M1** | 2 | 16,666 | 35,000 | -18,334 | Pilot units on Mangalagiri stretch |
| **M3** | 4 | 33,332 | 35,000 | -42,000 | Initial MoRTH test corridor certification |
| **M6** | 8 | 66,664 | 40,000 | -38,000 | 108 EMS dispatch integration complete |
| **M9** | 14 | 1,16,662 | 45,000 | +12,000 | Cash-flow positive month |
| **M12** | 20 | 1,66,660 | 50,000 | +1,24,000 | 20-unit corridor fully operational |

* **Year 1 Total Revenue:** ~₹9.8 Lakhs  
* **Year 1 Operating Profit:** ~₹1.8 Lakhs  
* **Break-Even Point:** Reached between **Month 8 and Month 9**.

---

## 10. Prototype Validation Plan & Survey Template

To adhere to Wadhwani validation criteria, the team conducts real on-corridor validation with 3 key stakeholder personas:
1. **Highway Engineers (NHAI Project Implementation Unit, Vijayawada)**
2. **Commercial Fleet Dispatchers (Vijayawada Transport Hub)**
3. **Commuters & Drivers (NH-16 Daily Commuters)**

### Standardized 6-Question Survey Template

```markdown
RoadPulse Corridor Safety Validation Survey
Target: Highway Engineers & Fleet Operators

1. On average, how many days elapse between a severe pothole forming on your corridor and repair completion?
   [ ] < 24 hours    [ ] 2-7 days    [ ] 8-21 days    [ ] > 21 days (Only after complaints)

2. What percentage of road hazard reports currently received from the public turn out to be false alarms or inaccurate chainages?
   [ ] < 10%    [ ] 10-30%    [ ] 31-60%    [ ] > 60%

3. Would an automated monthly contractor SLA penalty audit with certified video chainage stamps help enforce concessionaire maintenance contracts?
   [ ] Extremely valuable    [ ] Somewhat helpful    [ ] Not needed

4. For fleet operators: What is the maximum monthly fee per commercial vehicle for an in-cabin audio warning that alerts drivers 350m before critical highway hazards?
   [ ] ₹150/mo    [ ] ₹300/mo    [ ] ₹500/mo    [ ] Would not pay

5. In highway collisions on your stretch, what is the single largest cause of delay in dispatching emergency medical assistance?
   [ ] Exact location unknown    [ ] Late notification by bystanders    [ ] Traffic congestion en route

6. Would your division be open to hosting a 60-day, 5-camera zero-cost demonstration corridor on a high-risk 15km stretch?
   [ ] Yes, immediate interest    [ ] Requires tender approval    [ ] No
```

---

## 11. 24-Month Execution Roadmap

```
2026 Q1 - Q2: Prototype & Lab Testing
├── Complete 6-view interactive simulation & Wadhwani submission
├── Fabricate 2 RoadPulse M1 bench prototypes using Hailo-8 NPU
└── Validate TinyYOLO-Road v4 model on Indian monsoon road dataset

2026 Q3 - Q4: Beachhead Corridor Pilot (Amaravati–Vijayawada)
├── Deploy 5 demonstration units along NH-16 Mangalagiri bypass
├── Equip 20 local fleet/bus vehicles with R1 windshield modules
└── Conduct live 108 EMS simulated emergency broadcast trial

2027 Q1 - Q2: Commercial Tender Onboarding
├── GeM portal product catalog listing under ATMS equipment
├── Secure first paid contract (20 cameras, ₹20L annual ARR)
└── Publish peer-reviewed corridor accident reduction case study

2027 Q3 - Q4: Regional Corridor Expansion
├── Expand monitoring to NH-65 (Vijayawada–Hyderabad link)
├── Launch fleet subscription program for regional logistics operators
└── Target ₹1.2 Crore ARR across 120 deployed camera nodes
```

