import React, { useState } from 'react';
import {
  Shield,
  Building2,
  User,
  RefreshCw,
  Radio,
  AlertOctagon,
  Wrench,
  Siren,
  LogOut
} from 'lucide-react';
import AuthGateModal from './components/AuthGateModal';
import GisBlackspotMap from './components/GisBlackspotMap';
import CorroborationQueue from './components/CorroborationQueue';
import WorkOrderTracker from './components/WorkOrderTracker';
import EmergencyCadRelay from './components/EmergencyCadRelay';

export default function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: 'RAJESH KUMAR, PD',
    email: 'officer.vja@nhai.gov.in',
    badgeId: 'NHAI-PD-9481',
    agency: 'National Highways Authority of India (NHAI)',
    role: 'authority_admin',
    corridor: 'NH-16 Vijayawada PIU (Km 405 to Km 442)'
  });

  const [hazards, setHazards] = useState([
    {
      id: 'h1111111-1111-1111-1111-111111111111',
      hazard_type: 'accident',
      severity: 'critical',
      highway_code: 'NH-16',
      chainage_km: 418.2,
      landmark: 'Km 418.2 Vijayawada-Guntur Express Link',
      latitude: 16.5062,
      longitude: 80.648,
      corroboration_count: 3,
      verified: true,
      priority_score: 96.5,
      status: 'verified',
      depth_cm: null,
      evidence_image_url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600'
    },
    {
      id: 'h2222222-2222-2222-2222-222222222222',
      hazard_type: 'pothole',
      severity: 'severe',
      highway_code: 'NH-16',
      chainage_km: 414.8,
      landmark: 'Mangalagiri Junction Overpass (Left Lane)',
      latitude: 16.43,
      longitude: 80.56,
      corroboration_count: 2,
      verified: true,
      priority_score: 84.0,
      status: 'dispatched',
      depth_cm: 6.8,
      evidence_image_url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600'
    },
    {
      id: 'h3333333-3333-3333-3333-333333333333',
      hazard_type: 'debris',
      severity: 'moderate',
      highway_code: 'NH-16',
      chainage_km: 422.0,
      landmark: 'Amaravati Seed Access Road Underpass',
      latitude: 16.513,
      longitude: 80.518,
      corroboration_count: 2,
      verified: false,
      priority_score: 58.0,
      status: 'detected',
      depth_cm: null,
      evidence_image_url: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600'
    }
  ]);

  const [selectedHazard, setSelectedHazard] = useState(hazards[0]);

  const [workOrders, setWorkOrders] = useState([
    {
      id: 'w1111111-1111-1111-1111-111111111111',
      hazard_id: 'h2222222-2222-2222-2222-222222222222',
      assigned_org_id: '22222222-2222-2222-2222-222222222222',
      contractor_name: 'L&T Rapid Maintenance Team Unit 4',
      status: 'in_progress',
      sla_deadline: '2026-11-14T18:00:00Z',
      notes: 'Cold-mix patch dispatched under IRC:SP:84.'
    }
  ]);

  const handleVerify = id => {
    setHazards(prev =>
      prev.map(h => (h.id === id ? { ...h, verified: true, status: 'verified' } : h))
    );
  };

  const handleReject = id => {
    setHazards(prev => prev.map(h => (h.id === id ? { ...h, status: 'false_positive' } : h)));
    if (selectedHazard && selectedHazard.id === id) {
      setSelectedHazard(null);
    }
  };

  const handleDispatchWorkOrder = hazard => {
    const newWo = {
      id: 'wo-' + Math.random().toString(36).substring(2, 9),
      hazard_id: hazard.id,
      assigned_org_id: '22222222-2222-2222-2222-222222222222',
      contractor_name: 'L&T Rapid Highway Emergency Repair Team',
      status: 'assigned',
      sla_deadline: new Date(Date.now() + 48 * 3600 * 1000).toISOString(),
      notes: `Immediate 48h repair order issued by ${currentUser.name} (${currentUser.badgeId})`
    };
    setWorkOrders(prev => [newWo, ...prev]);
    setHazards(prev => prev.map(h => (h.id === hazard.id ? { ...h, status: 'dispatched' } : h)));
  };

  const handleResolveOrder = woId => {
    setWorkOrders(prev => prev.map(wo => (wo.id === woId ? { ...wo, status: 'repaired' } : wo)));
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#080B11',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Top Government Authority Bar */}
      <header
        style={{
          padding: '0.85rem 1.5rem',
          backgroundColor: '#0B0F19',
          borderBottom: '1px solid #1E293B',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div
              style={{
                padding: '0.5rem',
                borderRadius: '10px',
                backgroundColor: '#F59E0B',
                color: '#090D16',
                fontWeight: 900
              }}
            >
              <Shield size={20} />
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
                RoadPulse Authority Portal
              </div>
              <div
                style={{
                  fontSize: '0.75rem',
                  color: '#94A3B8',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                <Building2 size={12} /> {currentUser.agency}
              </div>
            </div>
          </div>
        </div>

        {/* Corridor Jurisdiction & Officer Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div
            style={{
              display: 'none',
              mdDisplay: 'block',
              backgroundColor: '#090D16',
              border: '1px solid #1E293B',
              padding: '0.35rem 0.8rem',
              borderRadius: '8px',
              fontSize: '0.75rem',
              color: '#CBD5E1'
            }}
          >
            Jurisdiction: <strong style={{ color: '#F59E0B' }}>{currentUser.corridor}</strong>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              backgroundColor: '#131A2B',
              padding: '0.35rem 0.75rem',
              borderRadius: '10px',
              border: '1px solid #1E293B'
            }}
          >
            <User size={16} color="#F59E0B" />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#F8FAFC' }}>
                {currentUser.name}
              </div>
              <div style={{ fontSize: '0.65rem', color: '#94A3B8', fontFamily: 'monospace' }}>
                Badge: {currentUser.badgeId}
              </div>
            </div>
            <button
              onClick={() => setIsAuthOpen(true)}
              title="Switch Official Agency / Officer"
              style={{
                marginLeft: '0.5rem',
                background: 'none',
                border: 'none',
                color: '#94A3B8',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <RefreshCw size={14} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Command Dashboard */}
      <main
        style={{
          flex: 1,
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem'
        }}
      >
        {/* Critical Collision Golden Hour Banner */}
        <EmergencyCadRelay incident={hazards.find(h => h.hazard_type === 'accident')} />

        {/* 2-Column Split: GIS Tactical Map vs Corroboration & SLA Tracker */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
            gap: '1.25rem',
            flex: 1
          }}
        >
          {/* Column 1: Tactical GIS Blackspot Map */}
          <div style={{ minHeight: '520px' }}>
            <GisBlackspotMap
              hazards={hazards}
              selectedHazard={selectedHazard}
              onSelectHazard={setSelectedHazard}
            />
          </div>

          {/* Column 2: Corroboration Workbench & 48h Workorder SLA */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <CorroborationQueue
              hazard={selectedHazard}
              onVerify={handleVerify}
              onReject={handleReject}
              onDispatchWorkOrder={handleDispatchWorkOrder}
            />

            <WorkOrderTracker workOrders={workOrders} onResolveOrder={handleResolveOrder} />
          </div>
        </div>
      </main>

      {/* Government SSO Auth Gate Modal */}
      <AuthGateModal
        isOpen={isAuthOpen}
        currentUser={currentUser}
        onLogin={setCurrentUser}
        onClose={() => setIsAuthOpen(false)}
      />
    </div>
  );
}
