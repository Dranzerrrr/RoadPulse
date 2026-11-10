/**
 * RoadPulse Pilot Application Form Handler
 * Validates user input and routes submission via Supabase or local simulation testbed.
 */

// Runtime Supabase Configuration (Optional - populates when credentials are set)
export const CONFIG = {
  supabaseUrl: '',
  supabaseAnonKey: ''
};

export async function handlePilotSubmit(e) {
  e.preventDefault();
  const feedback = document.getElementById('formFeedback');
  const btnSubmit = document.getElementById('btnSubmitForm');
  if (btnSubmit) btnSubmit.disabled = true;

  const payload = {
    name: document.getElementById('pName').value,
    email: document.getElementById('pEmail').value,
    org: document.getElementById('pOrg').value,
    corridor: document.getElementById('pCorridor').value,
    notes: document.getElementById('pNotes') ? document.getElementById('pNotes').value : '',
    submitted_at: new Date().toISOString()
  };

  // 1. Live Supabase Transmission
  if (CONFIG.supabaseUrl && CONFIG.supabaseAnonKey) {
    try {
      const res = await fetch(`${CONFIG.supabaseUrl}/rest/v1/pilot_requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': CONFIG.supabaseAnonKey,
          'Authorization': `Bearer ${CONFIG.supabaseAnonKey}`
        },
        body: JSON.stringify({
          full_name: payload.name,
          work_email: payload.email,
          organization: payload.org,
          corridor_region: payload.corridor,
          notes: payload.notes,
          role_type: 'highway_authority',
          status: 'pending'
        })
      });

      if (res.ok) {
        showFeedback(feedback, '✓ Inquiry successfully saved. Our student venture team will review your corridor request.', 'success');
        e.target.reset();
        if (btnSubmit) btnSubmit.disabled = false;
        return;
      }
    } catch (err) {
      console.warn('Supabase transmission error, falling back to local simulation storage:', err);
    }
  }

  // 2. Demo Mode Fallback (Local Storage)
  try {
    const existing = JSON.parse(localStorage.getItem('roadpulse_pilot_inquiries') || '[]');
    existing.push(payload);
    localStorage.setItem('roadpulse_pilot_inquiries', JSON.stringify(existing));

    showFeedback(
      feedback,
      '✓ Application saved locally in browser testbed (Demo Mode). When Supabase keys are configured, submissions route to our team.',
      'demo'
    );
    setTimeout(() => {
      e.target.reset();
      if (btnSubmit) btnSubmit.disabled = false;
    }, 2000);
  } catch (err) {
    showFeedback(feedback, 'Error saving submission: ' + err.message, 'error');
    if (btnSubmit) btnSubmit.disabled = false;
  }
}

function showFeedback(el, message, type) {
  if (!el) return;
  el.innerHTML = message;
  el.style.display = 'block';

  if (type === 'success') {
    el.style.background = 'rgba(16, 185, 129, 0.15)';
    el.style.border = '1px solid rgba(16, 185, 129, 0.4)';
    el.style.color = '#10B981';
  } else if (type === 'demo') {
    el.style.background = 'rgba(42, 217, 198, 0.12)';
    el.style.border = '1px solid rgba(42, 217, 198, 0.35)';
    el.style.color = 'var(--brand-teal)';
  } else {
    el.style.background = 'rgba(239, 68, 68, 0.15)';
    el.style.border = '1px solid rgba(239, 68, 68, 0.4)';
    el.style.color = '#EF4444';
  }
}

export function initPilotForm() {
  const form = document.getElementById('pilotForm');
  if (form) {
    form.addEventListener('submit', handlePilotSubmit);
  }
}
