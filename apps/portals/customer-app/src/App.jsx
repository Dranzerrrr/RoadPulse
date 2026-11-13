import React, { useState } from 'react';
import TopBar from './components/TopBar';
import CorridorHazardList from './components/CorridorHazardList';
import VehicleHudMode from './components/VehicleHudMode';
import PairingModal from './components/PairingModal';
import RazorpayModal from './components/RazorpayModal';
import {
  Smartphone,
  Monitor,
  Car,
  ShieldAlert,
  Award,
  ArrowUpRight,
  CheckCircle2,
  Zap
} from 'lucide-react';

export default function App() {
  const [isPaid, setIsPaid] = useState(true);
  const [hasCamera, setHasCamera] = useState(true);
  const [cameraDevice, setCameraDevice] = useState({
    serial: 'DC-PRO-901234',
    code: '901234',
    model: 'RoadPulse Dashcam Pro-AI',
    firmware: 'v1.4.2',
    status: 'active'
  });

  const [isHudActive, setIsHudActive] = useState(false);
  const [isPairingOpen, setIsPairingOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [viewMode, setViewMode] = useState('desktop'); // 'desktop' | 'mobile'

  const [hazards] = useState([
    {
      id: 'h201',
      hazard_type: 'pothole',
      severity: 'severe',
      chainage_km: 414.8, // 0.3 km from car at 414.5 -> WITHIN 1.5 KM (Freemium Visible!)
      landmark: 'Mangalagiri Junction Overpass (Left Lane)',
      latitude: 16.43,
      longitude: 80.56,
      depth_cm: 6.8,
      corroboration_count: 2
    },
    {
      id: 'h202',
      hazard_type: 'accident',
      severity: 'critical',
      chainage_km: 418.2, // 3.7 km from car at 414.5 -> BEYOND 1.5 KM (Requires ₹300 Pass)
      landmark: 'Km 418.2 Multi-Vehicle Crash Zone',
      latitude: 16.5062,
      longitude: 80.648,
      depth_cm: null,
      corroboration_count: 3
    },
    {
      id: 'h203',
      hazard_type: 'debris',
      severity: 'moderate',
      chainage_km: 422.0, // 7.5 km from car at 414.5 -> BEYOND 1.5 KM (Requires ₹300 Pass)
      landmark: 'Amaravati Seed Access Road Cargo Spill',
      latitude: 16.513,
      longitude: 80.518,
      depth_cm: null,
      corroboration_count: 2
    }
  ]);

  const handleToggleSubscription = () => {
    setIsPaid(!isPaid);
  };

  const handlePairSuccess = device => {
    setHasCamera(true);
    setCameraDevice(device);
  };

  const handlePaymentSuccess = subDetails => {
    setIsPaid(true);
  };

  // If in HUD mode, render full-screen in-cabin view
  if (isHudActive) {
    return (
      <VehicleHudMode
        onExit={() => setIsHudActive(false)}
        isPaid={isPaid}
        hasCamera={hasCamera}
        upcomingHazard={hazards[0]}
      />
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#05070C',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Top Header */}
      <TopBar
        isPaid={isPaid}
        hasCamera={hasCamera}
        cameraDevice={cameraDevice}
        viewMode={viewMode}
        setViewMode={setViewMode}
        onOpenCheckout={() => setIsCheckoutOpen(true)}
        onOpenPairing={() => setIsPairingOpen(true)}
        onToggleSubscription={handleToggleSubscription}
        onLaunchHud={() => setIsHudActive(true)}
      />

      {/* Main Container */}
      <main
        style={{
          maxWidth: viewMode === 'mobile' ? '440px' : '1100px',
          width: '100%',
          margin: '0 auto',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          flex: 1
        }}
      >
        {/* Tier Status Banner */}
        <div
          style={{
            backgroundColor: isPaid ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
            border: isPaid
              ? '1px solid rgba(16, 185, 129, 0.3)'
              : '1px solid rgba(245, 158, 11, 0.3)',
            borderRadius: '12px',
            padding: '1rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.75rem'
          }}
        >
          <div>
            <div
              style={{
                fontSize: '0.85rem',
                fontWeight: 800,
                color: isPaid ? '#10B981' : '#F59E0B'
              }}
            >
              {isPaid
                ? '★ ROADPULSE VISION PRO SUBSCRIBER (₹300/MO)'
                : hasCamera
                  ? '⚡ CAMERA FREEMIUM TIER ACTIVE'
                  : '⚠ FREE VISITOR MODE'}
            </div>
            <p style={{ fontSize: '0.75rem', color: '#CBD5E1', marginTop: '2px' }}>
              {isPaid
                ? 'Full 50 km Corridor Hazard Warnings & Web Audio In-Cabin Voice Chimes Active.'
                : hasCamera
                  ? 'You own a paired dashcam! Potholes within 1.5 km are free. Upgrade to ₹300/mo for full 50 km lookahead.'
                  : 'Credentials expire when subscription ends. Pair camera hardware or start ₹300/mo pass.'}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {!isPaid && (
              <button
                onClick={() => setIsCheckoutOpen(true)}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#38BDF8',
                  color: '#090D16',
                  fontWeight: 800,
                  fontSize: '0.8rem',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Zap size={15} /> Activate ₹300/mo Pass
              </button>
            )}
          </div>
        </div>

        {/* Hazard Radar Corridor View */}
        <CorridorHazardList
          hazards={hazards}
          isPaid={isPaid}
          hasCamera={hasCamera}
          onOpenCheckout={() => setIsCheckoutOpen(true)}
          onOpenPairing={() => setIsPairingOpen(true)}
        />

        {/* Device & Rewards Information Card */}
        <div
          style={{
            backgroundColor: '#0F1420',
            border: '1px solid #1E293B',
            borderRadius: '16px',
            padding: '1.25rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1rem'
          }}
        >
          {/* Paired Camera Info */}
          <div
            style={{
              backgroundColor: '#090D16',
              border: '1px solid #1E293B',
              borderRadius: '10px',
              padding: '1rem'
            }}
          >
            <div
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#94A3B8',
                marginBottom: '0.4rem'
              }}
            >
              REGISTERED HARDWARE
            </div>
            {hasCamera ? (
              <div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#F8FAFC' }}>
                  {cameraDevice.model}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#10B981', marginTop: '0.2rem' }}>
                  ✓ Paired Code: <strong>{cameraDevice.code}</strong> • Status: Online
                </div>
                <div style={{ fontSize: '0.7rem', color: '#64748B', marginTop: '0.2rem' }}>
                  Optical Edge Inference: 1080p 60fps • 99.4% Edge Bounding
                </div>
              </div>
            ) : (
              <div>
                <div style={{ fontSize: '0.85rem', color: '#EF4444' }}>No Dashcam Registered</div>
                <button
                  onClick={() => setIsPairingOpen(true)}
                  style={{
                    marginTop: '0.4rem',
                    padding: '0.35rem 0.75rem',
                    backgroundColor: '#F59E0B',
                    color: '#090D16',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Pair Dashcam Now
                </button>
              </div>
            )}
          </div>

          {/* Crowdsource Rebate Credits */}
          <div
            style={{
              backgroundColor: '#090D16',
              border: '1px solid #1E293B',
              borderRadius: '10px',
              padding: '1rem'
            }}
          >
            <div
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#94A3B8',
                marginBottom: '0.4rem'
              }}
            >
              CROWDSOURCE DATA REBATE
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#10B981' }}>₹140.00</span>
              <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>earned this month</span>
            </div>
            <p style={{ fontSize: '0.7rem', color: '#64748B', marginTop: '0.25rem' }}>
              Automatically deducted from your next ₹300 monthly subscription bill!
            </p>
          </div>
        </div>
      </main>

      {/* Device Pairing Modal (6-digit code or QR scan) */}
      <PairingModal
        isOpen={isPairingOpen}
        onClose={() => setIsPairingOpen(false)}
        onPairSuccess={handlePairSuccess}
        currentCamera={cameraDevice}
      />

      {/* Razorpay Subscription Modal (₹300/mo) */}
      <RazorpayModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
}
