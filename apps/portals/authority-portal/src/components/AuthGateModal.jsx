import React, { useState } from 'react';
import { Shield, Key, Building2, UserCheck, AlertTriangle } from 'lucide-react';

export default function AuthGateModal({ currentUser, onLogin, isOpen, onClose }) {
  const [selectedAgency, setSelectedAgency] = useState('nhai');
  const [badgeId, setBadgeId] = useState('NHAI-PD-9481');
  const [email, setEmail] = useState('officer.vja@nhai.gov.in');

  if (!isOpen) return null;

  const agencies = [
    {
      id: 'nhai',
      name: 'National Highways Authority of India (NHAI)',
      role: 'authority_admin',
      corridor: 'NH-16 Vijayawada PIU'
    },
    {
      id: 'concessionaire',
      name: 'L&T IDPL Tollways Operations',
      role: 'authority_officer',
      corridor: 'NH-16 Concession Stretch Km 405-442'
    },
    {
      id: 'police',
      name: 'AP Highway Traffic Police Command',
      role: 'authority_officer',
      corridor: 'Zone-3 Highway Patrol'
    },
    {
      id: 'ems',
      name: '108 GVK EMRI Emergency Dispatch Hub',
      role: 'authority_viewer',
      corridor: 'Golden Hour Medical Corridor'
    }
  ];

  const handleSubmit = e => {
    e.preventDefault();
    const agencyObj = agencies.find(a => a.id === selectedAgency);
    onLogin({
      name: email.split('@')[0].replace('.', ' ').toUpperCase(),
      email,
      badgeId,
      agency: agencyObj.name,
      role: agencyObj.role,
      corridor: agencyObj.corridor
    });
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(5, 7, 12, 0.85)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
    >
      <div
        style={{
          maxWidth: '520px',
          width: '100%',
          backgroundColor: '#0F1420',
          border: '1px solid #1E293B',
          borderRadius: '16px',
          padding: '2rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
        }}
      >
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}
        >
          <div
            style={{
              padding: '0.6rem',
              borderRadius: '10px',
              backgroundColor: 'rgba(245, 158, 11, 0.1)',
              color: '#F59E0B'
            }}
          >
            <Shield size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#F8FAFC' }}>
              Government Authority Sign-In
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#94A3B8' }}>
              Restricted to Ministry, NHAI, Concessionaires & EMS
            </p>
          </div>
        </div>

        <div
          style={{
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.25)',
            borderRadius: '8px',
            padding: '0.75rem',
            display: 'flex',
            gap: '0.6rem',
            marginBottom: '1.5rem',
            fontSize: '0.8rem',
            color: '#FCA5A5'
          }}
        >
          <AlertTriangle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
          <span>
            Access strictly logged under Section 43 of Information Technology Act. Unauthorized
            entry is punishable under law.
          </span>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}
        >
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: '#CBD5E1',
                marginBottom: '0.4rem'
              }}
            >
              Select Authority Agency
            </label>
            <select
              value={selectedAgency}
              onChange={e => setSelectedAgency(e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem 0.8rem',
                backgroundColor: '#090D16',
                border: '1px solid #1E293B',
                borderRadius: '8px',
                color: '#F8FAFC',
                fontSize: '0.875rem'
              }}
            >
              {agencies.map(a => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: '#CBD5E1',
                marginBottom: '0.4rem'
              }}
            >
              Official Gov Email / SSO Identity
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem 0.8rem',
                backgroundColor: '#090D16',
                border: '1px solid #1E293B',
                borderRadius: '8px',
                color: '#F8FAFC',
                fontSize: '0.875rem'
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: '#CBD5E1',
                marginBottom: '0.4rem'
              }}
            >
              Officer Badge ID / Service Number
            </label>
            <input
              type="text"
              required
              value={badgeId}
              onChange={e => setBadgeId(e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem 0.8rem',
                backgroundColor: '#090D16',
                border: '1px solid #1E293B',
                borderRadius: '8px',
                color: '#F8FAFC',
                fontSize: '0.875rem',
                fontFamily: 'monospace'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button
              type="submit"
              style={{
                flex: 1,
                padding: '0.75rem',
                backgroundColor: '#F59E0B',
                color: '#090D16',
                fontWeight: 700,
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
            >
              <UserCheck size={18} /> Authenticate Official Session
            </button>
            {currentUser && (
              <button
                type="button"
                onClick={onClose}
                style={{
                  padding: '0.75rem 1.25rem',
                  backgroundColor: 'transparent',
                  color: '#94A3B8',
                  borderRadius: '8px',
                  border: '1px solid #1E293B',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
