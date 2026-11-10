/**
 * RoadPulse Main Application Controller
 * Orchestrates event listeners, modals, navigation, and simulator lifecycle.
 */
import {
  renderIncidentQueue,
  selectIncident,
  verifyCurrentHazard,
  switchCockpit,
  runRealisticCountdown,
  playCockpitChime
} from './cockpit.js';
import { initCalculator } from './calculator.js';
import { initPilotForm } from './pilot-form.js';

// FAQ Accordion
function initFaq() {
  const headers = document.querySelectorAll('.faq-header');
  headers.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.faq-item');
      if (!item) return;
      const isOpen = item.classList.contains('open');

      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('open');
        const h = i.querySelector('.faq-header');
        if (h) h.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('open');
        header.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

// Mobile Navigation Drawer
export function toggleMobileNav() {
  const m = document.getElementById('navMobileMenu');
  if (m) m.classList.toggle('open');
}

// Legal Transparency Modal
export function openLegalModal() {
  const m = document.getElementById('legalModal');
  if (m) m.style.display = 'flex';
}

export function closeLegalModal() {
  const m = document.getElementById('legalModal');
  if (m) m.style.display = 'none';
}

// Live Simulated IST Clock
function initClock() {
  const clockEl = document.getElementById('clockDisplay');
  if (!clockEl) return;
  const update = () => {
    const now = new Date();
    clockEl.innerText = now.toTimeString().split(' ')[0] + ' IST';
  };
  update();
  setInterval(update, 1000);
}

// DOM Ready Lifecycle
window.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Simulator
  renderIncidentQueue();
  selectIncident(0);

  // Bind cockpit tabs
  const tabRadar = document.getElementById('btnTabRadar');
  const tabOptical = document.getElementById('btnTabOptical');
  const tabHud = document.getElementById('btnTabHud');
  if (tabRadar) tabRadar.addEventListener('click', () => switchCockpit('radar'));
  if (tabOptical) tabOptical.addEventListener('click', () => switchCockpit('optical'));
  if (tabHud) tabHud.addEventListener('click', () => switchCockpit('hud'));

  // Bind simulator action buttons
  const btnVerify = document.getElementById('btnVerifyAction');
  if (btnVerify) btnVerify.addEventListener('click', verifyCurrentHazard);

  const btnChimeNav = document.getElementById('btnNavChime');
  if (btnChimeNav) btnChimeNav.addEventListener('click', playCockpitChime);

  const btnHudCountdown = document.getElementById('btnHudCountdown');
  if (btnHudCountdown) btnHudCountdown.addEventListener('click', runRealisticCountdown);

  const btnHudChime = document.getElementById('btnHudChime');
  if (btnHudChime) btnHudChime.addEventListener('click', playCockpitChime);

  // Bind mobile nav toggle
  const btnNavMobile = document.getElementById('btnNavMobileToggle');
  if (btnNavMobile) btnNavMobile.addEventListener('click', toggleMobileNav);

  // Close mobile nav on link click
  const mobileLinks = document.querySelectorAll('.nav-mobile-menu a, .nav-mobile-menu button');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      const menu = document.getElementById('navMobileMenu');
      if (menu) menu.classList.remove('open');
    });
  });

  // Bind modal triggers
  const btnOpenModal = document.getElementById('btnOpenLegalModal');
  if (btnOpenModal) btnOpenModal.addEventListener('click', openLegalModal);

  const modalFooterTriggers = document.querySelectorAll('[data-open-legal]');
  modalFooterTriggers.forEach(el => el.addEventListener('click', openLegalModal));

  const btnCloseModal = document.getElementById('btnCloseLegalModal');
  if (btnCloseModal) btnCloseModal.addEventListener('click', closeLegalModal);

  const btnDismissModal = document.getElementById('btnDismissLegalModal');
  if (btnDismissModal) btnDismissModal.addEventListener('click', closeLegalModal);

  window.addEventListener('click', e => {
    const modal = document.getElementById('legalModal');
    if (e.target === modal) closeLegalModal();
  });

  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLegalModal();
  });

  // 2. Initialize Calculator & Form
  initCalculator();
  initPilotForm();

  // 3. Initialize FAQ & Clock
  initFaq();
  initClock();
});
