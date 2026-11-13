import React, { useState } from 'react';
import { Siren, PhoneCall, Check, AlertTriangle, Hospital } from 'lucide-react';

export default function EmergencyCadRelay({ incident }) {
  const [dispatched, setDispatched] = useState(false);

  if (!incident || incident.hazard_type !== 'accident') {
    return null;
  }

  return (
    <div
      style={{
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        border: '1px solid rgba(239, 68, 68, 0.4)',
        borderRadius: '16px',
        padding: '1rem 1.25rem',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div
          style={{
            padding: '0.6rem',
            borderRadius: '12px',
            backgroundColor: '#EF4444',
            color: '#FFFFFF',
            animation: 'pulse-slow 1.5s infinite'
          }}
        >
          <Siren size={24} />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span
              style={{
                fontSize: '0.7rem',
                fontWeight: 800,
                color: '#EF4444',
                letterSpacing: '0.05em'
              }}
            >
              CRITICAL GOLDEN HOUR ALERT • COLLISION DETECTED
            </span>
            <span
              style={{
                fontSize: '0.65rem',
                color: '#CBD5E1',
                backgroundColor: '#090D16',
                padding: '1px 6px',
                borderRadius: '4px'
              }}
            >
              T+42s
            </span>
          </div>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#F8FAFC' }}>
            {incident.landmark} (Km {incident.chainage_km})
          </h4>
          <div
            style={{
              fontSize: '0.75rem',
              color: '#FCA5A5',
              marginTop: '2px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <Hospital size={13} /> Nearest Trauma Center: AIIMS Mangalagiri (4.2 km away)
          </div>
        </div>
      </div>

      <div>
        {dispatched ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: '#10B981',
              fontWeight: 700,
              fontSize: '0.85rem',
              backgroundColor: '#090D16',
              padding: '0.5rem 0.9rem',
              borderRadius: '8px'
            }}
          >
            <Check size={18} /> Dispatched to 108 Emergency Control Room
          </div>
        ) : (
          <button
            onClick={() => setDispatched(true)}
            style={{
              padding: '0.65rem 1.2rem',
              backgroundColor: '#EF4444',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 800,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 0 20px rgba(239, 68, 68, 0.4)'
            }}
          >
            <PhoneCall size={18} /> Transmit CAD Telemetry to 108
          </button>
        )}
      </div>
    </div>
  );
}
