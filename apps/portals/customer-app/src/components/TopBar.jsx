import React from 'react';
import {
  Shield,
  Camera,
  Zap,
  Gauge,
  Smartphone,
  Monitor,
  Car,
  RefreshCw,
  KeyRound
} from 'lucide-react';

export default function TopBar({
  isPaid,
  hasCamera,
  cameraDevice,
  viewMode,
  setViewMode,
  onOpenCheckout,
  onOpenPairing,
  onToggleSubscription,
  onLaunchHud
}) {
  return (
    <header
      style={{
        backgroundColor: '#0B0F19',
        borderBottom: '1px solid #1E293B',
        padding: '0.85rem 1.5rem',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem'
      }}
    >
      {/* Brand & Status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div
            style={{
              padding: '0.5rem',
              borderRadius: '10px',
              backgroundColor: '#38BDF8',
              color: '#090D16',
              fontWeight: 900
            }}
          >
            <Car size={20} />
          </div>
          <div>
            <div
              style={{
                fontSize: '1.05rem',
                fontWeight: 800,
                color: '#F8FAFC',
                letterSpacing: '-0.02em'
              }}
            >
              RoadPulse Driver App
            </div>
            <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
              Cross-Platform Highway Assistant & HUD
            </div>
          </div>
        </div>

        {/* Subscription & Camera Status Badges */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 800,
              padding: '0.25rem 0.65rem',
              borderRadius: '6px',
              backgroundColor: isPaid ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
              color: isPaid ? '#10B981' : '#EF4444',
              border: isPaid
                ? '1px solid rgba(16, 185, 129, 0.3)'
                : '1px solid rgba(239, 68, 68, 0.3)'
            }}
          >
            {isPaid ? '✓ ₹300/MO ACTIVE' : 'EXPIRED / UNPAID'}
          </span>

          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              padding: '0.25rem 0.65rem',
              borderRadius: '6px',
              backgroundColor: hasCamera ? 'rgba(245, 158, 11, 0.15)' : '#090D16',
              color: hasCamera ? '#F59E0B' : '#64748B',
              border: '1px solid #1E293B'
            }}
          >
            {hasCamera ? `📷 CAMERA: ${cameraDevice?.code || 'PAIRED'}` : '📷 NO CAMERA'}
          </span>
        </div>
      </div>

      {/* Actions: View switcher, Testing toggle, Launch HUD */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.6rem' }}>
        {/* Toggle Subscription State for instant demo */}
        <button
          onClick={onToggleSubscription}
          title="Simulate Subscription Expiration / Renewal"
          style={{
            padding: '0.4rem 0.75rem',
            backgroundColor: '#090D16',
            border: '1px solid #1E293B',
            borderRadius: '8px',
            fontSize: '0.75rem',
            color: '#CBD5E1',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem'
          }}
        >
          <RefreshCw size={13} />
          {isPaid ? 'Simulate Expiration' : 'Simulate Payment (₹300)'}
        </button>

        {/* Pair Camera Button */}
        <button
          onClick={onOpenPairing}
          style={{
            padding: '0.4rem 0.75rem',
            backgroundColor: '#090D16',
            border: '1px solid #1E293B',
            borderRadius: '8px',
            fontSize: '0.75rem',
            color: '#F59E0B',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem'
          }}
        >
          <Camera size={14} />
          {hasCamera ? 'Device Settings' : 'Pair Camera (6-Digit/QR)'}
        </button>

        {/* Launch Vehicle In-Cabin HUD */}
        <button
          onClick={onLaunchHud}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#F59E0B',
            color: '#090D16',
            border: 'none',
            borderRadius: '8px',
            fontSize: '0.8rem',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            boxShadow: '0 0 15px rgba(245, 158, 11, 0.3)'
          }}
        >
          <Gauge size={16} /> Launch Vehicle Night HUD
        </button>
      </div>
    </header>
  );
}
