/**
 * Central configuration and constants loader for RoadPulse.
 * Multi-portal Phase 2 settings: Supabase, Razorpay, Roles, Geofencing.
 */
const config = {
  supabaseUrl:
    (typeof process !== 'undefined' && process.env && process.env.SUPABASE_URL) ||
    'https://pbgohgbzsmgtezhqcbqi.supabase.co',
  supabaseAnonKey:
    (typeof process !== 'undefined' && process.env && process.env.SUPABASE_ANON_KEY) ||
    'sb_publishable_1QQRR73ZEc1fHgN7cd-EDw_yc29DJ_V',
  port: (typeof process !== 'undefined' && process.env && process.env.PORT) || 3000,

  // Phase 2: Billing & Subscription Configuration
  billing: {
    provider: 'razorpay',
    planId: 'plan_roadpulse_monthly_300',
    planName: 'RoadPulse Dashcam Vision Pro',
    amountInr: 300.0,
    currency: 'INR',
    interval: 'monthly',
    gracePeriodDays: 3
  },

  // Phase 2: Freemium vs Paid Boundaries
  tiers: {
    freeCameraRadiusKm: 1.5, // Radius for free camera owners without active subscription
    paidCorridorLookaheadKm: 50.0, // Lookahead corridor distance for paid subscribers
    warningSpeedThresholdKmh: 80, // Lookahead timing calculation baseline
    slaDeadlineHours: 48 // IRC:SP:84 Concessionaire repair SLA
  },

  // Phase 2: User Roles
  roles: {
    AUTHORITY_ADMIN: 'authority_admin',
    AUTHORITY_OFFICER: 'authority_officer',
    AUTHORITY_VIEWER: 'authority_viewer',
    CUSTOMER_PAID: 'customer_paid',
    CUSTOMER_FREE: 'customer_free'
  },

  // Phase 2: Hardware Device Types
  deviceTypes: {
    M1_SOLAR_MAST: 'm1_solar_mast',
    FLEET_DASHCAM: 'fleet_dashcam',
    CONSUMER_DASHCAM: 'consumer_dashcam'
  },

  features: {
    enableSupabasePersistence: true,
    enableAudioChime: true,
    enablePostGIS: true
  }
};

/**
 * Validates a 6-digit hardware pairing code
 * @param {string} code
 * @returns {boolean}
 */
function isValidPairingCode(code) {
  if (!code || typeof code !== 'string') return false;
  const cleaned = code.trim().replace(/[-\s]/g, '');
  return /^[A-Za-z0-9]{6}$/.test(cleaned);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ...config,
    config,
    isValidPairingCode
  };
}

if (typeof window !== 'undefined') {
  window.RoadPulseConfig = config;
  window.isValidPairingCode = isValidPairingCode;
}
