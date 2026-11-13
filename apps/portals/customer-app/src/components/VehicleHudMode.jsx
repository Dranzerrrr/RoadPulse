import React, { useState, useEffect } from 'react';
import {
  FlipHorizontal,
  Volume2,
  VolumeX,
  AlertTriangle,
  X,
  ShieldAlert,
  ArrowUpRight,
  Gauge
} from 'lucide-react';

export default function VehicleHudMode({ onExit, isPaid, hasCamera, upcomingHazard }) {
  const [isMirrored, setIsMirrored] = useState(false);
  const [speed, setSpeed] = useState(78); // km/h
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Play Web Audio 880 Hz attention tone
  const playHazardChime = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime); // 880 Hz (A5)
      osc.frequency.exponentialRampToValueAtTime(440, audioCtx.currentTime + 0.35);

      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.35);
    } catch (e) {
      console.warn('Audio Context error:', e);
    }
  };

  // Trigger chime on mount or when approaching hazard
  useEffect(() => {
    if (upcomingHazard && isPaid) {
      playHazardChime();
    }
  }, [upcomingHazard, isPaid]);

  // Calculate reaction window at current speed
  // Distance in meters: e.g. 290m. Speed in m/s = speed / 3.6
  const distanceMeters = 290;
  const speedMs = (speed || 60) / 3.6;
  const reactionSeconds = (distanceMeters / speedMs).toFixed(1);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: '#000000',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '1.5rem',
        transition: 'transform 0.3s ease'
      }}
      className={isMirrored ? 'hud-mirrored' : ''}
    >
      {/* Top HUD Controls */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #1E293B',
          paddingBottom: '1rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 800,
              padding: '0.3rem 0.75rem',
              borderRadius: '6px',
              backgroundColor: isPaid ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)',
              color: isPaid ? '#10B981' : '#F59E0B'
            }}
          >
            {isPaid ? 'PRO HUD (50 KM RADAR)' : 'FREEMIUM HUD (1.5 KM LOCAL)'}
          </span>
          <span style={{ fontSize: '0.8rem', color: '#64748B', fontFamily: 'monospace' }}>
            GPS: 16.4300° N, 80.5600° E
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Windshield Mirror Flip Button */}
          <button
            onClick={() => setIsMirrored(!isMirrored)}
            title="Mirror for Windshield Reflection"
            style={{
              padding: '0.5rem 0.9rem',
              backgroundColor: isMirrored ? '#F59E0B' : '#0F1420',
              color: isMirrored ? '#090D16' : '#E2E8F0',
              border: '1px solid #1E293B',
              borderRadius: '8px',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <FlipHorizontal size={18} />
            {isMirrored ? 'Normal Display' : 'Windshield HUD Mode'}
          </button>

          {/* Audio Chime Button */}
          <button
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              playHazardChime();
            }}
            style={{
              padding: '0.5rem',
              backgroundColor: '#0F1420',
              color: soundEnabled ? '#10B981' : '#64748B',
              border: '1px solid #1E293B',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>

          {/* Close HUD */}
          <button
            onClick={onExit}
            style={{
              padding: '0.5rem',
              backgroundColor: '#0F1420',
              color: '#EF4444',
              border: '1px solid #1E293B',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Main HUD Center: Giant Speed & Hazard Banner */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          flex: 1,
          gap: '2rem'
        }}
      >
        {/* Speedometer Block */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div
            style={{
              fontSize: '7.5rem',
              fontWeight: 900,
              lineHeight: 0.9,
              fontFamily: 'monospace',
              color: '#FFFFFF',
              textShadow: '0 0 40px rgba(255, 255, 255, 0.4)'
            }}
          >
            {speed}
          </div>
          <div
            style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              color: '#94A3B8',
              letterSpacing: '0.2em'
            }}
          >
            KM / H • CRUISE
          </div>
        </div>

        {/* Hazard Warning Card */}
        {upcomingHazard ? (
          <div
            className="animate-hazard-glow"
            style={{
              maxWidth: '680px',
              width: '100%',
              backgroundColor: '#0A0F1D',
              border: '2px solid #F59E0B',
              borderRadius: '20px',
              padding: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1.5rem'
            }}
          >
            <div style={{ textAlign: 'left' }}>
              <div
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  color: '#F59E0B',
                  letterSpacing: '0.1em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                <AlertTriangle size={18} color="#F59E0B" />
                ADVANCE HAZARD ALERT ({distanceMeters} METERS AHEAD)
              </div>
              <div
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  marginTop: '0.25rem'
                }}
              >
                {upcomingHazard.landmark}
              </div>
              <div style={{ fontSize: '0.9rem', color: '#CBD5E1', marginTop: '0.35rem' }}>
                Type: <strong>{upcomingHazard.hazard_type.toUpperCase()}</strong> • Depth:{' '}
                <strong>{upcomingHazard.depth_cm || 6.5} cm</strong>
              </div>
            </div>

            <div
              style={{
                textAlign: 'center',
                backgroundColor: '#000000',
                padding: '1rem 1.25rem',
                borderRadius: '16px',
                border: '1px solid #1E293B',
                minWidth: '150px'
              }}
            >
              <div style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 600 }}>
                REACTION WINDOW
              </div>
              <div
                style={{
                  fontSize: '2.25rem',
                  fontWeight: 900,
                  color: '#F59E0B',
                  fontFamily: 'monospace'
                }}
              >
                {reactionSeconds}s
              </div>
              <div style={{ fontSize: '0.7rem', color: '#10B981', fontWeight: 700 }}>
                PREPARE BRAKING
              </div>
            </div>
          </div>
        ) : (
          <div
            style={{
              fontSize: '1.2rem',
              fontWeight: 700,
              color: '#10B981',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              padding: '1rem 2rem',
              borderRadius: '12px'
            }}
          >
            ✓ Corridor Clear • No Severe Hazards in Next 2.5 km
          </div>
        )}
      </div>

      {/* Bottom HUD Bar: Speed Simulator Buttons */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid #1E293B',
          paddingTop: '1rem'
        }}
      >
        <div style={{ fontSize: '0.8rem', color: '#64748B' }}>
          💡 Tip: Place phone flat on dashboard beneath windshield for night head-up projection.
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Simulate Speed:</span>
          {[0, 45, 78, 95].map(s => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              style={{
                padding: '0.3rem 0.6rem',
                borderRadius: '6px',
                border: speed === s ? '1px solid #F59E0B' : '1px solid #1E293B',
                backgroundColor: speed === s ? '#F59E0B' : '#0F1420',
                color: speed === s ? '#090D16' : '#CBD5E1',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              {s} km/h
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
