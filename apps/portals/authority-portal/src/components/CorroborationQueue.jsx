import React from 'react';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ShieldCheck,
  Video,
  Clock,
  MapPin,
  Gauge
} from 'lucide-react';

export default function CorroborationQueue({ hazard, onVerify, onReject, onDispatchWorkOrder }) {
  if (!hazard) {
    return (
      <div
        style={{
          backgroundColor: '#0F1420',
          border: '1px solid #1E293B',
          borderRadius: '16px',
          padding: '2rem',
          textAlign: 'center',
          color: '#64748B',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '360px'
        }}
      >
        <Video size={40} style={{ opacity: 0.3, marginBottom: '0.75rem' }} />
        <h4 style={{ color: '#94A3B8', fontWeight: 600 }}>Select a hazard from the GIS map</h4>
        <p style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>
          Inspect dual-feed optical corroboration proof
        </p>
      </div>
    );
  }

  const isAccident = hazard.hazard_type === 'accident';

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
      {/* Hazard Header & Live Confidence */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '1rem'
        }}
      >
        <div>
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
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '0.2rem 0.5rem',
                borderRadius: '4px',
                backgroundColor: isAccident ? 'rgba(239, 68, 68, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                color: isAccident ? '#EF4444' : '#F59E0B'
              }}
            >
              {hazard.hazard_type.toUpperCase()} • SEVERITY: {hazard.severity.toUpperCase()}
            </span>
            <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
              Chainage: Km {hazard.chainage_km}
            </span>
          </div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#F8FAFC' }}>
            {hazard.landmark}
          </h3>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              fontSize: '0.75rem',
              color: '#94A3B8',
              marginTop: '0.25rem'
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <MapPin size={12} /> {hazard.latitude.toFixed(4)}° N, {hazard.longitude.toFixed(4)}° E
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Clock size={12} /> First Optical Trigger: 4 mins ago
            </span>
          </div>
        </div>

        <div
          style={{
            textAlign: 'right',
            backgroundColor: '#090D16',
            padding: '0.6rem 0.9rem',
            borderRadius: '10px',
            border: '1px solid #1E293B'
          }}
        >
          <div style={{ fontSize: '0.7rem', color: '#94A3B8' }}>Consensus Score</div>
          <div
            style={{
              fontSize: '1.25rem',
              fontWeight: 800,
              color: hazard.priority_score >= 80 ? '#EF4444' : '#F59E0B'
            }}
          >
            {hazard.priority_score.toFixed(1)}%
          </div>
          <div style={{ fontSize: '0.65rem', color: '#10B981', fontWeight: 600 }}>
            ✓ {hazard.corroboration_count} Independent Sensors
          </div>
        </div>
      </div>

      {/* Dual Optical Evidence Workbench */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '0.75rem'
        }}
      >
        {/* Feed 1: Roadside Stationary Mast */}
        <div
          style={{
            backgroundColor: '#090D16',
            border: '1px solid #1E293B',
            borderRadius: '10px',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              padding: '0.5rem 0.75rem',
              backgroundColor: '#131A2B',
              borderBottom: '1px solid #1E293B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.75rem'
            }}
          >
            <span
              style={{
                fontWeight: 700,
                color: '#38BDF8',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Video size={13} /> Feed A: Mast M1-4182
            </span>
            <span style={{ color: '#10B981', fontSize: '0.7rem' }}>Stationary 4.5m Mast</span>
          </div>
          <div style={{ position: 'relative', height: '140px', backgroundColor: '#05070D' }}>
            <img
              src={
                hazard.evidence_image_url ||
                'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600'
              }
              alt="Mast Proof"
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '6px',
                left: '6px',
                backgroundColor: 'rgba(9, 13, 22, 0.8)',
                padding: '2px 6px',
                borderRadius: '4px',
                fontSize: '0.65rem',
                color: '#E2E8F0',
                fontFamily: 'monospace'
              }}
            >
              Edge Confidence: 97.4%
            </div>
          </div>
        </div>

        {/* Feed 2: Moving Fleet Dashcam */}
        <div
          style={{
            backgroundColor: '#090D16',
            border: '1px solid #1E293B',
            borderRadius: '10px',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              padding: '0.5rem 0.75rem',
              backgroundColor: '#131A2B',
              borderBottom: '1px solid #1E293B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.75rem'
            }}
          >
            <span
              style={{
                fontWeight: 700,
                color: '#F59E0B',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Video size={13} /> Feed B: Fleet Dashcam #9012
            </span>
            <span style={{ color: '#94A3B8', fontSize: '0.7rem' }}>APSRTC Freight Bus</span>
          </div>
          <div style={{ position: 'relative', height: '140px', backgroundColor: '#05070D' }}>
            <img
              src={
                hazard.evidence_image_url ||
                'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600'
              }
              alt="Dashcam Proof"
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '6px',
                left: '6px',
                backgroundColor: 'rgba(9, 13, 22, 0.8)',
                padding: '2px 6px',
                borderRadius: '4px',
                fontSize: '0.65rem',
                color: '#E2E8F0',
                fontFamily: 'monospace'
              }}
            >
              $\Delta t = 38s$ | $\Delta d = \pm 1.1m$
            </div>
          </div>
        </div>
      </div>

      {/* Official Actions */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
        <button
          onClick={() => onDispatchWorkOrder(hazard)}
          style={{
            flex: 2,
            minWidth: '180px',
            padding: '0.65rem 1rem',
            backgroundColor: '#F59E0B',
            color: '#090D16',
            border: 'none',
            borderRadius: '8px',
            fontSize: '0.85rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}
        >
          <ShieldCheck size={18} /> Confirm & Dispatch 48h SLA Order
        </button>

        <button
          onClick={() => onVerify(hazard.id)}
          style={{
            flex: 1,
            minWidth: '120px',
            padding: '0.65rem',
            backgroundColor: '#090D16',
            color: '#10B981',
            border: '1px solid #10B981',
            borderRadius: '8px',
            fontSize: '0.8rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.4rem'
          }}
        >
          <CheckCircle2 size={16} /> Mark Verified
        </button>

        <button
          onClick={() => onReject(hazard.id)}
          style={{
            padding: '0.65rem 0.9rem',
            backgroundColor: 'transparent',
            color: '#EF4444',
            border: '1px solid #1E293B',
            borderRadius: '8px',
            fontSize: '0.8rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.4rem'
          }}
        >
          <XCircle size={16} /> False Positive
        </button>
      </div>
    </div>
  );
}
