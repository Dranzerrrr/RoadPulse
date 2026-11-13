import React, { useState } from 'react';
import {
  MapPin,
  AlertOctagon,
  Flame,
  Eye,
  Video,
  Radio,
  ShieldAlert,
  ArrowUpRight,
  Activity
} from 'lucide-react';

export default function GisBlackspotMap({ hazards, onSelectHazard, selectedHazard }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [zoomLevel, setZoomLevel] = useState(1);

  const filteredHazards = hazards.filter(h => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'pothole') return h.hazard_type === 'pothole';
    if (activeFilter === 'accident') return h.hazard_type === 'accident';
    if (activeFilter === 'blackspot') return h.priority_score >= 80;
    return true;
  });

  // Stationary M1 Solar Masts along NH-16
  const stationaryMasts = [
    {
      id: 'M1-4182',
      km: 418.2,
      lat: 16.5062,
      lon: 80.648,
      status: 'online',
      battery: 98,
      solar: '14.2V'
    },
    {
      id: 'M1-4148',
      km: 414.8,
      lat: 16.43,
      lon: 80.56,
      status: 'online',
      battery: 92,
      solar: '13.8V'
    },
    {
      id: 'M1-4220',
      km: 422.0,
      lat: 16.513,
      lon: 80.518,
      status: 'online',
      battery: 95,
      solar: '14.1V'
    }
  ];

  return (
    <div
      style={{
        backgroundColor: '#0F1420',
        border: '1px solid #1E293B',
        borderRadius: '16px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      {/* Map Header / Filters */}
      <div
        style={{
          padding: '1rem 1.25rem',
          borderBottom: '1px solid #1E293B',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem',
          backgroundColor: '#0B0F19'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Activity size={18} color="#F59E0B" />
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#F8FAFC' }}>
            Tactical GIS Corridor Blackspot Map — NH-16 (Km 408 to Km 426)
          </h3>
          <span
            style={{
              fontSize: '0.75rem',
              padding: '0.2rem 0.5rem',
              borderRadius: '9999px',
              backgroundColor: 'rgba(16, 185, 129, 0.15)',
              color: '#10B981',
              fontWeight: 600
            }}
          >
            Live Corroboration Engine Active
          </span>
        </div>

        <div style={{ display: 'flex', gap: '0.4rem' }}>
          {[
            { id: 'all', label: 'All Feeds' },
            { id: 'blackspot', label: 'High-Priority Blackspots' },
            { id: 'accident', label: 'Accidents / Collisions' },
            { id: 'pothole', label: 'Pothole Depressions' }
          ].map(btn => (
            <button
              key={btn.id}
              onClick={() => setActiveFilter(btn.id)}
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                padding: '0.35rem 0.75rem',
                borderRadius: '6px',
                border: activeFilter === btn.id ? '1px solid #F59E0B' : '1px solid #1E293B',
                backgroundColor: activeFilter === btn.id ? 'rgba(245, 158, 11, 0.15)' : '#090D16',
                color: activeFilter === btn.id ? '#F59E0B' : '#94A3B8',
                cursor: 'pointer'
              }}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Tactical Map Canvas Simulation */}
      <div
        style={{
          position: 'relative',
          flex: 1,
          minHeight: '440px',
          backgroundColor: '#070A10',
          backgroundImage: 'radial-gradient(circle at 50% 50%, #111827 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          overflow: 'hidden'
        }}
      >
        {/* National Highway 16 Main Artery Vector Line */}
        <svg
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none'
          }}
        >
          <defs>
            <linearGradient id="nh16Grad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="50%" stopColor="#475569" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Highway Shoulders */}
          <path
            d="M 50 400 Q 300 280, 550 240 T 950 80"
            fill="none"
            stroke="#1E293B"
            strokeWidth="28"
            strokeLinecap="round"
          />
          {/* Highway Main Dual-Carriageway */}
          <path
            d="M 50 400 Q 300 280, 550 240 T 950 80"
            fill="none"
            stroke="url(#nh16Grad)"
            strokeWidth="16"
            strokeLinecap="round"
          />
          {/* Dashed Center Lane */}
          <path
            d="M 50 400 Q 300 280, 550 240 T 950 80"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="2"
            strokeDasharray="8 8"
            opacity="0.6"
          />

          {/* Chainage Milestones */}
          <text x="70" y="420" fill="#64748B" fontSize="10" fontFamily="monospace">
            Km 408.0 (Toll Plaza)
          </text>
          <text x="360" y="290" fill="#64748B" fontSize="10" fontFamily="monospace">
            Km 414.8 (Mangalagiri)
          </text>
          <text
            x="610"
            y="220"
            fill="#EF4444"
            fontSize="11"
            fontWeight="bold"
            fontFamily="monospace"
          >
            Km 418.2 [BLACKSPOT]
          </text>
          <text x="860" y="100" fill="#64748B" fontSize="10" fontFamily="monospace">
            Km 426.0 (Krishna River Bridge)
          </text>
        </svg>

        {/* Stationary Roadside M1 Solar Mast Markers */}
        {stationaryMasts.map(mast => (
          <div
            key={mast.id}
            title={`Roadside M1 Solar Mast: ${mast.id} | Battery: ${mast.battery}%`}
            style={{
              position: 'absolute',
              left: `${((mast.km - 408) / (426 - 408)) * 82 + 8}%`,
              top: `${360 - (mast.km - 408) * 16}px`,
              transform: 'translate(-50%, -50%)',
              zIndex: 10,
              cursor: 'pointer'
            }}
          >
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                backgroundColor: '#090D16',
                border: '2px solid #10B981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 12px rgba(16, 185, 129, 0.4)'
              }}
            >
              <Radio size={14} color="#10B981" />
            </div>
            <div
              style={{
                fontSize: '9px',
                fontWeight: 700,
                color: '#10B981',
                backgroundColor: 'rgba(9, 13, 22, 0.85)',
                padding: '1px 4px',
                borderRadius: '4px',
                marginTop: '3px',
                whiteSpace: 'nowrap'
              }}
            >
              {mast.id} ({mast.battery}%)
            </div>
          </div>
        ))}

        {/* Interactive Road Hazard Markers */}
        {filteredHazards.map(hazard => {
          const isSelected = selectedHazard && selectedHazard.id === hazard.id;
          const isAccident = hazard.hazard_type === 'accident';
          const isPothole = hazard.hazard_type === 'pothole';
          const km = hazard.chainage_km || 415;
          const leftPct = ((km - 408) / (426 - 408)) * 82 + 8;
          const topPx = 360 - (km - 408) * 16 + (isPothole ? 15 : -15);

          return (
            <div
              key={hazard.id}
              onClick={() => onSelectHazard(hazard)}
              style={{
                position: 'absolute',
                left: `${leftPct}%`,
                top: `${topPx}px`,
                transform: 'translate(-50%, -50%)',
                zIndex: isSelected ? 30 : 20,
                cursor: 'pointer'
              }}
            >
              {/* Pulsing Blackspot Risk Aura */}
              {hazard.priority_score >= 80 && (
                <div
                  style={{
                    position: 'absolute',
                    inset: '-12px',
                    borderRadius: '50%',
                    backgroundColor: isAccident
                      ? 'rgba(239, 68, 68, 0.25)'
                      : 'rgba(245, 158, 11, 0.25)',
                    animation: 'ping-slow 2.5s infinite',
                    pointerEvents: 'none'
                  }}
                />
              )}

              {/* Marker Icon Pin */}
              <div
                style={{
                  padding: '0.45rem',
                  borderRadius: '12px',
                  backgroundColor: isAccident ? '#EF4444' : isPothole ? '#F59E0B' : '#38BDF8',
                  color: '#090D16',
                  fontWeight: 800,
                  boxShadow: isSelected
                    ? '0 0 0 3px #FFFFFF, 0 10px 20px rgba(0,0,0,0.8)'
                    : '0 4px 12px rgba(0,0,0,0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  transition: 'transform 0.2s ease',
                  transform: isSelected ? 'scale(1.2)' : 'scale(1)'
                }}
              >
                {isAccident ? (
                  <AlertOctagon size={18} color="#FFFFFF" />
                ) : (
                  <Flame size={18} color="#090D16" />
                )}
                <span
                  style={{
                    fontSize: '10px',
                    color: isAccident ? '#FFFFFF' : '#090D16',
                    fontWeight: 800
                  }}
                >
                  {hazard.priority_score.toFixed(0)}
                </span>
              </div>

              {/* Tooltip on Hover / Select */}
              {isSelected && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '115%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#0F1420',
                    border: '1px solid #F59E0B',
                    borderRadius: '8px',
                    padding: '0.6rem 0.8rem',
                    whiteSpace: 'nowrap',
                    zIndex: 40,
                    boxShadow: '0 10px 25px rgba(0,0,0,0.7)'
                  }}
                >
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#F8FAFC' }}>
                    {hazard.landmark}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#94A3B8', marginTop: '2px' }}>
                    Type:{' '}
                    <strong style={{ color: '#F59E0B' }}>{hazard.hazard_type.toUpperCase()}</strong>{' '}
                    | Feeds: <strong>{hazard.corroboration_count} Verified</strong>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Tactical Legend Box */}
        <div
          style={{
            position: 'absolute',
            bottom: '1rem',
            right: '1rem',
            backgroundColor: 'rgba(15, 20, 32, 0.92)',
            backdropFilter: 'blur(6px)',
            border: '1px solid #1E293B',
            borderRadius: '10px',
            padding: '0.75rem',
            fontSize: '0.75rem',
            color: '#94A3B8',
            zIndex: 15
          }}
        >
          <div style={{ fontWeight: 700, color: '#E2E8F0', marginBottom: '0.4rem' }}>
            Map Legend
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '0.25rem'
            }}
          >
            <span
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: '#EF4444'
              }}
            ></span>
            <span>Collision Blackspot (Score &gt; 90)</span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '0.25rem'
            }}
          >
            <span
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: '#F59E0B'
              }}
            ></span>
            <span>Severe Pothole (&gt; 5 cm depth)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: '#10B981'
              }}
            ></span>
            <span>Roadside M1 Solar Mast</span>
          </div>
        </div>
      </div>
    </div>
  );
}
