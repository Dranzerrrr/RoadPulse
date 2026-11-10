/**
 * RoadPulse Corridor Sizing & Investment Calculator
 * Mathematically grounded formula: Length / 5 km = Cameras. Cameras * ₹1,00,000 = Investment.
 */

export function recalcCorridor() {
  const lenInput = document.getElementById('rangeLen');
  if (!lenInput) return;
  const len = parseInt(lenInput.value, 10);

  const lenText = document.getElementById('calcLenText');
  if (lenText) lenText.innerText = `${len} km`;

  const cameras = Math.ceil(len / 5);
  const camEl = document.getElementById('outCameras');
  if (camEl) camEl.innerText = `${cameras} Units`;

  const totalCost = cameras * 100000;
  const totEl = document.getElementById('outTotal');
  if (totEl) totEl.innerText = `₹${(totalCost / 100000).toFixed(1)} Lakhs / yr`;
}

export function initCalculator() {
  const rangeInput = document.getElementById('rangeLen');
  if (rangeInput) {
    rangeInput.addEventListener('input', recalcCorridor);
  }
  recalcCorridor();
}
