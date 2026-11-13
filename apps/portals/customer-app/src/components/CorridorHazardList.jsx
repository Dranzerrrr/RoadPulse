import React from 'react';
import {
  AlertTriangle,
  Lock,
  Unlock,
  MapPin,
  Volume2,
  ShieldCheck,
  Flame,
  ArrowRight,
  Zap
} from 'lucide-react';

export default function CorridorHazardList({
  hazards,
  isPaid,
  hasCamera,
  onOpenCheckout,
  onOpenPairing
}) {
  return (
    <div
      style={{
        backgroundColor: '#0F1420',
        border: '1px solid #1E293B',
        borderRadius: '16px',
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem'
        }}
      >
        <div>
          <h3
            style={{
              fontSize: '1.05rem',
              fontWeight: 700,
              color: '#F8FAFC',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <MapPin size={18} color="#F59E0B" />
            Highway Route Hazard Radar — NH-16 (Vijayawada ➔ Guntur)
          </h3>
          <p style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
            {isPaid
              ? '✓ Full 50 km Corridor Lookahead Unlocked (Paid Active)'
              : hasCamera
                ? '⚡ Camera Freemium Tier: Local hazards within 1.5 km visible'
                : '🔒 No Camera Paired: Advance alerts locked'}
          </p>
        </div>

        <div>
          {!isPaid && (
            <button
              onClick={onOpenCheckout}
              style={{
                padding: '0.45rem 0.9rem',
                backgroundColor: '#38BDF8',
                color: '#090D16',
                border: 'none',
                borderRadius: '8px',
                fontSize: '0.75rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                boxShadow: '0 0 15px rgba(56, 189, 248, 0.3)'
              }}
            >
              <Zap size={14} /> Upgrade to ₹300/mo Pro Pass
            </button>
          )}
        </div>
      </div>

      {/* Hazard Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {hazards.map(hazard => {
          // Distance calculation from current vehicle position
          // Let's say vehicle is at Km 414.5
          const distanceKm = Math.abs((hazard.chainage_km || 415) - 414.5);
          const isWithinFreeRadius = distanceKm <= 1.5;
          const isAccessible = isPaid || (hasCamera && isWithinFreeRadius);

          return (
            <div
              key={hazard.id}
              style={{
                backgroundColor: isAccessible ? '#090D16' : 'rgba(9, 13, 22, 0.6)',
                border: isAccessible ? '1px solid #1E293B' : '1px dashed #334155',
                borderRadius: '12px',
                padding: '1rem',
                position: 'relative',
                overflow: 'hidden',
                transition: 'border-color 0.2s ease'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '1rem'
                }}
              >
                <div style={{ flex: 1, filter: isAccessible ? 'none' : 'blur(2.5px)' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '0.35rem'
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        padding: '0.15rem 0.5rem',
                        borderRadius: '4px',
                        backgroundColor:
                          hazard.hazard_type === 'accident'
                            ? 'rgba(239, 68, 68, 0.2)'
                            : 'rgba(245, 158, 11, 0.2)',
                        color: hazard.hazard_type === 'accident' ? '#EF4444' : '#F59E0B'
                      }}
                    >
                      {hazard.hazard_type.toUpperCase()}
                    </span>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: '#38BDF8',
                        fontFamily: 'monospace'
                      }}
                    >
                      IN {distanceKm.toFixed(1)} KM
                    </span>
                    {isAccessible && (
                      <span
                        style={{
                          fontSize: '0.7rem',
                          color: '#10B981',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '2px'
                        }}
                      >
                        <Unlock size={11} /> Accessible
                      </span>
                    )}
                  </div>

                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#F8FAFC' }}>
                    {hazard.landmark}
                  </h4>

                  <div
                    style={{
                      fontSize: '0.75rem',
                      color: '#94A3B8',
                      marginTop: '0.25rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem'
                    }}
                  >
                    <span>
                      Severity: <strong style={{ color: '#E2E8F0' }}>{hazard.severity}</strong>
                    </span>
                    {hazard.depth_cm && (
                      <span>
                        Depth: <strong style={{ color: '#F59E0B' }}>{hazard.depth_cm} cm</strong>
                      </span>
                    )}
                    <span>
                      Feeds: <strong>{hazard.corroboration_count} Verified</strong>
                    </span>
                  </div>
                </div>

                {/* Right Column: Audio Alert Indicator or Lock Overlay */}
                <div>
                  {isAccessible ? (
                    <div
                      style={{
                        backgroundColor: '#131A2B',
                        border: '1px solid #1E293B',
                        borderRadius: '8px',
                        padding: '0.5rem 0.75rem',
                        textAlign: 'center'
                      }}
                    >
                      <Volume2 size={16} color="#10B981" style={{ margin: '0 auto 2px' }} />
                      <div style={{ fontSize: '0.65rem', color: '#10B981', fontWeight: 700 }}>
                        {isPaid ? 'Audio HUD Ready' : 'Visual Radar Only'}
                      </div>
                    </div>
                  ) : (
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: 'rgba(9, 13, 22, 0.85)',
                        backdropFilter: 'blur(3px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '1rem',
                        zIndex: 10
                      }}
                    >
                      <div style={{ textAlign: 'center', maxWidth: '340px' }}>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.4rem',
                            color: '#F59E0B',
                            fontWeight: 700,
                            fontSize: '0.8rem'
                          }}
                        >
                          <Lock size={15} />
                          {hasCamera
                            ? 'Locked: Beyond 1.5 km Free Limit'
                            : 'Locked: Dashcam Not Paired'}
                        </div>
                        <p style={{ fontSize: '0.7rem', color: '#94A3B8', marginTop: '0.2rem' }}>
                          {hasCamera
                            ? 'Free camera tier covers up to 1.5 km. Upgrade to ₹300/mo for 50 km advance corridor lookaheads.'
                            : 'Pair your RoadPulse camera or subscribe for ₹300/mo to view upcoming corridor hazards.'}
                        </p>
                        <button
                          onClick={hasCamera ? onOpenCheckout : onOpenPairing}
                          style={{
                            marginTop: '0.4rem',
                            padding: '0.35rem 0.75rem',
                            backgroundColor: hasCamera ? '#38BDF8' : '#F59E0B',
                            color: '#090D16',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '0.75rem',
                            fontWeight: 800,
                            cursor: 'pointer'
                          }}
                        >
                          {hasCamera ? 'Unlock for ₹300/mo' : 'Pair Dashcam (Free)'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
