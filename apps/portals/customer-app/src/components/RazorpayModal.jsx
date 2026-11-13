import React, { useState } from 'react';
import { CreditCard, CheckCircle2, Shield, X, Smartphone, ArrowRight, Zap } from 'lucide-react';

export default function RazorpayModal({ isOpen, onClose, onPaymentSuccess }) {
  const [method, setMethod] = useState('upi'); // 'upi' | 'card'
  const [upiId, setUpiId] = useState('driver@oksbi');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handlePay = e => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess({
        subId: 'sub_rzp_' + Math.random().toString(36).substring(2, 9),
        paymentId: 'pay_rzp_' + Math.random().toString(36).substring(2, 9),
        amount: 300.0,
        currency: 'INR',
        status: 'active',
        nextBilling: new Date(Date.now() + 30 * 24 * 3600 * 1000).toLocaleDateString()
      });
      onClose();
    }, 1500);
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
                backgroundColor: 'rgba(56, 189, 248, 0.15)',
                color: '#38BDF8'
              }}
            >
              <Zap size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#F8FAFC' }}>
                Razorpay Recurring Checkout
              </h3>
              <p style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
                RoadPulse Dashcam Vision Pro Access
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

        {/* Plan Summary Card */}
        <div
          style={{
            backgroundColor: '#090D16',
            border: '1px solid #1E293B',
            borderRadius: '12px',
            padding: '1rem',
            marginBottom: '1.25rem'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              marginBottom: '0.5rem'
            }}
          >
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#F8FAFC' }}>
              Monthly Dashcam Service Pass
            </span>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#F59E0B' }}>₹300</span>
              <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}> / month</span>
            </div>
          </div>
          <ul
            style={{
              fontSize: '0.75rem',
              color: '#94A3B8',
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.35rem'
            }}
          >
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#CBD5E1' }}>
              <CheckCircle2 size={13} color="#10B981" /> 50 km Full Corridor Advance Hazard
              Lookaheads
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#CBD5E1' }}>
              <CheckCircle2 size={13} color="#10B981" /> 80 km/h Advance Audio Chimes & Voice Alerts
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#CBD5E1' }}>
              <CheckCircle2 size={13} color="#10B981" /> Windshield Mirror HUD Mode for Night
              Driving
            </li>
          </ul>
        </div>

        {/* Payment Methods */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          <button
            type="button"
            onClick={() => setMethod('upi')}
            style={{
              flex: 1,
              padding: '0.6rem',
              borderRadius: '8px',
              border: method === 'upi' ? '1px solid #38BDF8' : '1px solid #1E293B',
              backgroundColor: method === 'upi' ? 'rgba(56, 189, 248, 0.1)' : '#090D16',
              color: method === 'upi' ? '#38BDF8' : '#94A3B8',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem'
            }}
          >
            <Smartphone size={16} /> UPI Autopay
          </button>
          <button
            type="button"
            onClick={() => setMethod('card')}
            style={{
              flex: 1,
              padding: '0.6rem',
              borderRadius: '8px',
              border: method === 'card' ? '1px solid #38BDF8' : '1px solid #1E293B',
              backgroundColor: method === 'card' ? 'rgba(56, 189, 248, 0.1)' : '#090D16',
              color: method === 'card' ? '#38BDF8' : '#94A3B8',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem'
            }}
          >
            <CreditCard size={16} /> Credit / Debit Card
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handlePay}
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          {method === 'upi' ? (
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
                Enter UPI VPA / Handle
              </label>
              <input
                type="text"
                required
                value={upiId}
                onChange={e => setUpiId(e.target.value)}
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
              <span
                style={{
                  fontSize: '0.7rem',
                  color: '#64748B',
                  marginTop: '0.25rem',
                  display: 'block'
                }}
              >
                Supports GPay, PhonePe, Paytm, BHIM with monthly recurring mandate.
              </span>
            </div>
          ) : (
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
                Card Number
              </label>
              <input
                type="text"
                placeholder="4111 •••• •••• 1111"
                defaultValue="4242 4242 4242 4242"
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
          )}

          <button
            type="submit"
            disabled={isProcessing}
            style={{
              width: '100%',
              padding: '0.8rem',
              backgroundColor: '#38BDF8',
              color: '#090D16',
              fontWeight: 800,
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              fontSize: '0.9rem',
              boxShadow: '0 0 20px rgba(56, 189, 248, 0.3)'
            }}
          >
            {isProcessing ? 'Authorizing with Razorpay...' : 'Authorize Recurring ₹300 / Month'}
            <ArrowRight size={18} />
          </button>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              color: '#64748B',
              fontSize: '0.7rem'
            }}
          >
            <Shield size={12} /> 256-bit SSL Encrypted • Cancel Anytime in 1 Click
          </div>
        </form>
      </div>
    </div>
  );
}
