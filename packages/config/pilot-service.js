/**
 * Shared Pilot Request Submission Service
 * Decouples the form UI from the persistent storage mechanism.
 */

/**
 * Submits a highway corridor pilot request.
 * @param {Object} payload - Form inputs { name, email, org, corridor, notes, submitted_at }
 * @param {Object} [configOverride] - Optional runtime Supabase configuration { supabaseUrl, supabaseAnonKey }
 * @returns {Promise<{ success: boolean, mode: 'live' | 'demo', message: string }>}
 */
async function submitPilotRequest(payload, configOverride = {}) {
  const url = configOverride.supabaseUrl || '';
  const key = configOverride.supabaseAnonKey || '';

  // 1. Live Supabase Transmission Path
  if (url && key) {
    try {
      const response = await fetch(`${url}/rest/v1/pilot_requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': key,
          'Authorization': `Bearer ${key}`,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          full_name: payload.name,
          work_email: payload.email,
          organization: payload.org,
          corridor_region: payload.corridor,
          notes: payload.notes || '',
          role_type: 'highway_authority',
          status: 'pending'
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
      }

      return {
        success: true,
        mode: 'live',
        message: '✓ Application successfully transmitted to live project database. Thank you!'
      };
    } catch (err) {
      console.warn('Live transmission failed, falling back to local simulation testbed:', err);
    }
  }

  // 2. Demo Mode Fallback (Local Storage)
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const existing = JSON.parse(window.localStorage.getItem('roadpulse_pilot_inquiries') || '[]');
      existing.push({
        ...payload,
        submitted_at: payload.submitted_at || new Date().toISOString()
      });
      window.localStorage.setItem('roadpulse_pilot_inquiries', JSON.stringify(existing));
    }
    return {
      success: true,
      mode: 'demo',
      message: '✓ Application logged in simulation testbed (Demo Mode). Configure Supabase credentials to persist to live database.'
    };
  } catch (err) {
    return {
      success: false,
      mode: 'demo',
      message: 'Unable to save submission to local testbed: ' + err.message
    };
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { submitPilotRequest };
}
