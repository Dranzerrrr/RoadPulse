/**
 * Central configuration loader for RoadPulse.
 * Reads environment variables if available or falls back to browser runtime constants.
 */
const config = {
  supabaseUrl: (typeof process !== 'undefined' && process.env && process.env.SUPABASE_URL) || '',
  supabaseAnonKey: (typeof process !== 'undefined' && process.env && process.env.SUPABASE_ANON_KEY) || '',
  port: (typeof process !== 'undefined' && process.env && process.env.PORT) || 3000,
  features: {
    enableSupabasePersistence: (typeof process !== 'undefined' && process.env && process.env.ENABLE_SUPABASE_PERSISTENCE === 'true') || false,
    enableAudioChime: true
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = config;
}
