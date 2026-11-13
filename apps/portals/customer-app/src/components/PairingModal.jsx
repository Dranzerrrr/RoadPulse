import React, { useState } from 'react';
import { Camera, QrCode, KeyRound, CheckCircle2, ShieldCheck, X, AlertCircle } from 'lucide-react';

export default function PairingModal({ isOpen, onClose, onPairSuccess, currentCamera }) {
  const [activeTab, setActiveTab] = useState('code'); // 'code' | 'qr'
  const [code, setCode] = useState('901234');
  const [error, setError] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  if (!isOpen) return null;

  const handlePairByCode = e => {
    e.preventDefault();
    const cleanCode = code.trim().replace(/[-\s]/g, '');
    if (cleanCode.length !== 6) {
      setError('Please enter a valid 6-digit hardware pairing code.');
      return;
    }
    setError('');
    onPairSuccess({
      serial: 'DC-PRO-' + cleanCode,
      code: cleanCode,
      model: 'RoadPulse Dashcam Pro-AI',
      firmware: 'v1.4.2',
      status: 'active',
      pairedAt: new Date().toLocaleDateString()
    });
    onClose();
  };

  const handleSimulateQrScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      onPairSuccess({
        serial: 'DC-PRO-882104',
        code: '882104',
        model: 'RoadPulse Dashcam Pro-AI (QR Paired)',
        firmware: 'v1.4.2',
        status: 'active',
        pairedAt: new Date().toLocaleDateString()
      });
      onClose();
    }, 1200);
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
          maxWidth: '480px',
          width: '100%',
          backgroundColor: '#0F1420',
          border: '1px solid #1E293B',
          borderRadius: '16px',
          padding: '1.75rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.25rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div
              style={{
                padding: '0.5rem',
                borderRadius: '10px',
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                color: '#F59E0B'
              }}
            >
              <Camera size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#F8FAFC' }}>
                Pair RoadPulse Dashcam
              </h3>
              <p style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
                Unlocks free local hazard detection & telemetry rewards
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Tabs: 6-digit Code vs QR Code */}
        <div
          style={{ display: 'flex', borderBottom: '1px solid #1E293B', marginBottom: '1.25rem' }}
        >
          <button
            onClick={() => setActiveTab('code')}
            style={{
              flex: 1,
              padding: '0.6rem',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'code' ? '2px solid #F59E0B' : 'none',
              color: activeTab === 'code' ? '#F59E0B' : '#94A3B8',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem'
            }}
          >
            <KeyRound size={16} /> 6-Digit Hardware Code
          </button>
          <button
            onClick={() => setActiveTab('qr')}
            style={{
              flex: 1,
              padding: '0.6rem',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'qr' ? '2px solid #F59E0B' : 'none',
              color: activeTab === 'qr' ? '#F59E0B' : '#94A3B8',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem'
            }}
          >
            <QrCode size={16} /> Scan Camera QR
          </button>
        </div>

        {/* Tab 1: 6-Digit Hardware Code */}
        {activeTab === 'code' && (
          <form
            onSubmit={handlePairByCode}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            <p style={{ fontSize: '0.8rem', color: '#CBD5E1' }}>
              Check your RoadPulse dashcam display or printed sticker on the back of the camera unit
              for the 6-digit code.
            </p>

            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: '#94A3B8',
                  marginBottom: '0.35rem'
                }}
              >
                Hardware Pairing Code (e.g. 901234 or 882104)
              </label>
              <input
                type="text"
                maxLength={6}
                value={code}
                onChange={e => setCode(e.target.value.toUpperCase())}
                placeholder="901234"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: '#090D16',
                  border: '1px solid #1E293B',
                  borderRadius: '8px',
                  color: '#F59E0B',
                  fontSize: '1.25rem',
                  fontFamily: 'monospace',
                  fontWeight: 800,
                  letterSpacing: '0.2em',
                  textAlign: 'center'
                }}
              />
            </div>

            {error && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  color: '#EF4444',
                  fontSize: '0.8rem'
                }}
              >
                <AlertCircle size={14} /> {error}
              </div>
            )}

            <button
              type="submit"
              style={{
                width: '100%',
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
                gap: '0.5rem',
                marginTop: '0.5rem'
              }}
            >
              <ShieldCheck size={18} /> Pair Device & Activate Freemium Tier
            </button>
          </form>
        )}

        {/* Tab 2: Scan QR Code */}
        {activeTab === 'qr' && (
          <div
            style={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem'
            }}
          >
            <p style={{ fontSize: '0.8rem', color: '#CBD5E1' }}>
              Point your camera at the QR code shown in the dashcam settings screen.
            </p>

            <div
              style={{
                width: '180px',
                height: '180px',
                border: '2px dashed #F59E0B',
                borderRadius: '16px',
                backgroundColor: '#090D16',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}
            >
              {isScanning ? (
                <div style={{ color: '#F59E0B', fontSize: '0.85rem', fontWeight: 600 }}>
                  Scanning camera token...
                </div>
              ) : (
                <QrCode size={90} color="#64748B" />
              )}
            </div>

            <button
              onClick={handleSimulateQrScan}
              disabled={isScanning}
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: '#10B981',
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
              <Camera size={18} /> {isScanning ? 'Verifying Hardware...' : 'Simulate QR Code Scan'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
