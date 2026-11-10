/**
 * RoadPulse Cockpit Simulator & Audio Controller
 * Handles Corridor GIS Radar, Optical Streams, and Driver HUD Countdown.
 */

// Sourced Incident Database for Simulation
const INCIDENTS = [
  {
    id: "INC-102",
    type: "collision",
    severity: "critical",
    title: "Km 418.2 Multi-Car Collision",
    location: "Vijayawada-Guntur Express Link",
    gps: "16.5062° N, 80.6480° E • NH-16",
    corroboration: "2+ Independent Feeds",
    verified: true
  },
  {
    id: "HAZ-204",
    type: "pothole",
    severity: "severe",
    title: "Km 414.8 Pothole Depression",
    location: "Mangalagiri Junction Overpass",
    gps: "16.4300° N, 80.5600° E • NH-16",
    corroboration: "2 Independent Feeds",
    verified: false
  },
  {
    id: "DEB-108",
    type: "debris",
    severity: "moderate",
    title: "Km 422.0 Fallen Cargo Obstacle",
    location: "Amaravati Seed Access Road",
    gps: "16.5130° N, 80.5180° E • NH-16",
    corroboration: "2 Independent Feeds",
    verified: false
  }
];

let currentIncidentIdx = 0;
let countdownTimer = null;

export function renderIncidentQueue() {
  const listEl = document.getElementById('cockpitIncidentList');
  if (!listEl) return;
  listEl.innerHTML = '';

  let verifiedNum = 0;
  INCIDENTS.forEach((item, index) => {
    if (item.verified) verifiedNum++;

    const div = document.createElement('div');
    div.className = `incident-item ${index === currentIncidentIdx ? 'selected' : ''}`;
    div.setAttribute('tabindex', '0');
    div.setAttribute('role', 'button');
    div.setAttribute('aria-label', `${item.id}: ${item.title}`);
    div.onclick = () => selectIncident(index);
    div.onkeydown = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectIncident(index);
      }
    };

    const badge = item.verified
      ? `<span class="badge-status badge-verified">VERIFIED</span>`
      : `<span class="badge-status ${item.severity === 'critical' ? 'badge-critical' : 'badge-severe'}">${item.severity}</span>`;

    div.innerHTML = `
      <div style="display:flex; justify-content:space-between; margin-bottom:2px;">
        <span class="mono" style="font-size:0.75rem; font-weight:700; color:#FFFFFF;">${item.id}</span>
        ${badge}
      </div>
      <div style="font-size:0.8rem; font-weight:600; color:#FFFFFF;">${item.title}</div>
      <div style="font-size:0.7rem; color:var(--text-dim);" class="mono">${item.location}</div>
    `;
    listEl.appendChild(div);
  });

  const activeEl = document.getElementById('activeIncidentsNum');
  const verEl = document.getElementById('verifiedCount');
  if (activeEl) activeEl.innerText = String(INCIDENTS.length).padStart(2, '0');
  if (verEl) verEl.innerText = String(verifiedNum).padStart(2, '0');
}

export function selectIncident(index) {
  currentIncidentIdx = index;
  renderIncidentQueue();
  const item = INCIDENTS[index];

  const tEl = document.getElementById('insTitle');
  const gEl = document.getElementById('insGps');
  const cEl = document.getElementById('insCorroboration');
  const btn = document.getElementById('btnVerifyAction');

  if (tEl) tEl.innerText = item.title;
  if (gEl) gEl.innerText = `GPS: ${item.gps}`;
  if (cEl) cEl.innerText = item.corroboration;

  if (btn) {
    if (item.verified) {
      btn.innerText = "Already Verified ✓";
      btn.disabled = true;
      btn.style.opacity = "0.5";
    } else {
      btn.innerText = "Mark as Verified in Simulation ✓";
      btn.disabled = false;
      btn.style.opacity = "1";
    }
  }
}

export function verifyCurrentHazard() {
  INCIDENTS[currentIncidentIdx].verified = true;
  selectIncident(currentIncidentIdx);
}

export function switchCockpit(tab) {
  const tabs = ['radar', 'optical', 'hud'];
  tabs.forEach(t => {
    const btn = document.getElementById(`btnTab${t.charAt(0).toUpperCase() + t.slice(1)}`);
    const view = document.getElementById(
      t === 'radar'
        ? 'cockpitRadarView'
        : t === 'optical'
        ? 'cockpitOpticalView'
        : 'cockpitHudView'
    );
    if (btn) {
      btn.classList.toggle('active', t === tab);
      btn.setAttribute('aria-selected', t === tab ? 'true' : 'false');
    }
    if (view) {
      view.style.display = t === tab ? (t === 'radar' ? 'grid' : 'flex') : 'none';
    }
  });
}

// Realistic Physics Countdown: 80 km/h = 22.2 m/s.
// 300 meters takes ~13.5 seconds.
export function runRealisticCountdown() {
  let distance = 300;
  let seconds = 13.5;
  const distEl = document.getElementById('hudDistance');
  const secEl = document.getElementById('hudSeconds');

  if (countdownTimer) clearInterval(countdownTimer);
  playCockpitChime();

  countdownTimer = setInterval(() => {
    distance -= 22;
    seconds -= 1.0;

    if (distance <= 0) {
      clearInterval(countdownTimer);
      if (distEl) distEl.innerText = "0m (HAZARD PASSED)";
      if (secEl) secEl.innerText = "0.0s";
    } else {
      if (distEl) distEl.innerText = `${Math.max(0, distance)}m`;
      if (secEl) secEl.innerText = `${Math.max(0, seconds).toFixed(1)}s`;
    }
  }, 1000);
}

// Web Audio Synthesized Chime (880Hz -> 1174Hz dual tone)
export function playCockpitChime() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.setValueAtTime(1174.66, ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.35);
  } catch (err) {
    console.warn("Audio Context unavailable:", err);
  }
}
