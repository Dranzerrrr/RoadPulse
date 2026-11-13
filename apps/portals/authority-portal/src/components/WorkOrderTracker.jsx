import React from 'react';
import { Clock, CheckCircle, AlertCircle, Wrench, FileText, ChevronRight } from 'lucide-react';

export default function WorkOrderTracker({ workOrders, onResolveOrder }) {
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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h3
            style={{
              fontSize: '1rem',
              fontWeight: 700,
              color: '#F8FAFC',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <Wrench size={18} color="#F59E0B" />
            48-Hour Concessionaire SLA Workorder Dispatch
          </h3>
          <p style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
            Enforced under IRC:SP:84 Pothole Rectification Standards
          </p>
        </div>
        <span
          style={{
            fontSize: '0.75rem',
            padding: '0.2rem 0.6rem',
            borderRadius: '9999px',
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            color: '#F59E0B',
            fontWeight: 700
          }}
        >
          {workOrders.length} Active Workorders
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {workOrders.map(wo => {
          const isBreached = wo.status === 'sla_breached';
          const isRepaired = wo.status === 'repaired';

          return (
            <div
              key={wo.id}
              style={{
                backgroundColor: '#090D16',
                border: '1px solid #1E293B',
                borderRadius: '10px',
                padding: '0.9rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.5rem'
                }}
              >
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#E2E8F0' }}>
                  WO-{wo.id.slice(0, 8).toUpperCase()}
                </span>
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    padding: '0.15rem 0.5rem',
                    borderRadius: '4px',
                    backgroundColor: isRepaired
                      ? 'rgba(16, 185, 129, 0.15)'
                      : isBreached
                        ? 'rgba(239, 68, 68, 0.15)'
                        : 'rgba(245, 158, 11, 0.15)',
                    color: isRepaired ? '#10B981' : isBreached ? '#EF4444' : '#F59E0B'
                  }}
                >
                  {wo.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>

              <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>
                Assigned Unit:{' '}
                <strong style={{ color: '#F8FAFC' }}>
                  {wo.contractor_name || 'L&T Rapid Maintenance Team'}
                </strong>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.4rem 0.6rem',
                  backgroundColor: '#131A2B',
                  borderRadius: '6px',
                  fontSize: '0.75rem'
                }}
              >
                <span
                  style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#CBD5E1' }}
                >
                  <Clock size={13} color="#F59E0B" /> 48h SLA Timer:
                </span>
                <span
                  style={{
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    color: isBreached ? '#EF4444' : '#F59E0B'
                  }}
                >
                  {isRepaired
                    ? 'COMPLETED ON TIME'
                    : isBreached
                      ? 'BREACHED (-₹50k/day)'
                      : '33h 18m REMAINING'}
                </span>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: '0.5rem',
                  marginTop: '0.25rem'
                }}
              >
                {!isRepaired && (
                  <button
                    onClick={() => onResolveOrder(wo.id)}
                    style={{
                      padding: '0.35rem 0.75rem',
                      backgroundColor: '#10B981',
                      color: '#090D16',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <CheckCircle size={14} /> Mark Repaired & Verified
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
