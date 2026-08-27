import React, { useState } from 'react';
import { X, CheckCircle, CreditCard, Banknote, Smartphone, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CURRENCIES } from '../data/products';

export default function CheckoutModal({ isOpen, onClose, checkoutData, currency, onOrderComplete }) {
  if (!isOpen || !checkoutData) return null;

  const [step, setStep] = useState('shipping');
  const [formData, setFormData] = useState({
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    phone: '9876543210',
    address: 'Flat 402, Royal Palms Residency',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110001',
    paymentMethod: 'upi'
  });

  const curr = CURRENCIES[currency] || CURRENCIES.INR;
  const finalTotalCurr = Math.round(checkoutData.finalTotalINR * curr.rate);

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    setStep('success');
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {}
    onOrderComplete();
  };

  return (
    <div className="drawer-backdrop" onClick={onClose} style={{ alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '680px',
          background: '#FFFFFF',
          borderRadius: 'var(--radius-xs)',
          border: '1px solid var(--c-border)',
          padding: '36px',
          position: 'relative'
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          style={{ position: 'absolute', top: '20px', right: '20px', color: 'var(--c-primary)' }}
        >
          <X size={20} strokeWidth={1.5} />
        </button>

        {step === 'success' ? (
          <div style={{ textAlign: 'center', padding: '30px 10px' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'var(--c-primary-light)',
              color: 'var(--c-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px'
            }}>
              <CheckCircle size={36} strokeWidth={1.5} />
            </div>

            <div style={{ fontSize: '0.68rem', color: 'var(--c-gold)', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              ✦ Order Received
            </div>

            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--c-primary)', marginTop: '6px', marginBottom: '10px' }}>
              Shukriya for Preserving Awadh Craft
            </h3>

            <p style={{ fontSize: '0.88rem', color: 'var(--c-text-muted)', maxWidth: '480px', margin: '0 auto 24px', lineHeight: 1.6, fontWeight: 300 }}>
              Your order <strong style={{ color: 'var(--c-primary)' }}>#SL-{Math.floor(100000 + Math.random() * 900000)}</strong> has been confirmed by our Hazratganj atelier. A dispatch update has been sent to your phone and email.
            </p>

            <div style={{
              background: '#FAF8F5',
              borderRadius: 'var(--radius-xs)',
              padding: '20px',
              maxWidth: '420px',
              margin: '0 auto 28px',
              border: '1px solid var(--c-border)',
              textAlign: 'left'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '8px' }}>
                <span style={{ color: 'var(--c-text-muted)' }}>Recipient:</span>
                <strong>{formData.name}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '8px' }}>
                <span style={{ color: 'var(--c-text-muted)' }}>Address:</span>
                <span>{formData.city}, {formData.pincode}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem', borderTop: '1px solid var(--c-border)', paddingTop: '8px', marginTop: '8px' }}>
                <span style={{ fontWeight: 600, color: 'var(--c-primary)' }}>Total:</span>
                <strong style={{ color: 'var(--c-primary)', fontSize: '1rem' }}>{curr.symbol}{finalTotalCurr.toLocaleString('en-IN')}</strong>
              </div>
            </div>

            <button onClick={onClose} className="btn-primary" style={{ padding: '14px 36px', fontSize: '0.78rem' }}>
              Return to Boutique
            </button>
          </div>
        ) : (
          <div>
            {/* Steps indicator */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.76rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontWeight: step === 'shipping' ? 600 : 400,
                color: step === 'shipping' ? 'var(--c-primary)' : 'var(--c-text-muted)'
              }}>
                <span>01. Shipping Details</span>
              </div>

              <div style={{ flex: 1, height: '1px', background: 'var(--c-border)' }} />

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.76rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontWeight: step === 'payment' ? 600 : 400,
                color: step === 'payment' ? 'var(--c-primary)' : 'var(--c-text-muted)'
              }}>
                <span>02. Payment</span>
              </div>
            </div>

            {/* Step 1 */}
            {step === 'shipping' && (
              <div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--c-primary)', marginBottom: '20px' }}>
                  Delivery Address
                </h3>

                <form onSubmit={(e) => { e.preventDefault(); setStep('payment'); }} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={{ fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--c-primary)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--c-border)', fontSize: '0.84rem', outline: 'none' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--c-primary)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--c-border)', fontSize: '0.84rem', outline: 'none' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--c-primary)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--c-border)', fontSize: '0.84rem', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--c-primary)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                      Street Address / Apartment
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--c-border)', fontSize: '0.84rem', outline: 'none' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={{ fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--c-primary)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                        City
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--c-border)', fontSize: '0.84rem', outline: 'none' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--c-primary)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                        State
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--c-border)', fontSize: '0.84rem', outline: 'none' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--c-primary)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                        PIN Code
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.pincode}
                        onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--c-border)', fontSize: '0.84rem', outline: 'none' }}
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn-primary" style={{ width: '100%', padding: '14px', marginTop: '12px' }}>
                    Continue to Payment · {curr.symbol}{finalTotalCurr.toLocaleString('en-IN')}
                  </button>
                </form>
              </div>
            )}

            {/* Step 2 */}
            {step === 'payment' && (
              <div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--c-primary)', marginBottom: '20px' }}>
                  Payment Method
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      padding: '16px',
                      borderRadius: 'var(--radius-xs)',
                      border: formData.paymentMethod === 'upi' ? '1.5px solid var(--c-primary)' : '1px solid var(--c-border)',
                      background: formData.paymentMethod === 'upi' ? '#FAF8F5' : '#FFFFFF',
                      cursor: 'pointer'
                    }}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={formData.paymentMethod === 'upi'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'upi' })}
                    />
                    <Smartphone size={18} strokeWidth={1.5} style={{ color: 'var(--c-primary)' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--c-primary)' }}>
                        Instant UPI / QR Code (GPay, PhonePe, Paytm)
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--c-text-muted)' }}>
                        Direct verification & express dispatch
                      </div>
                    </div>
                  </label>

                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      padding: '16px',
                      borderRadius: 'var(--radius-xs)',
                      border: formData.paymentMethod === 'card' ? '1.5px solid var(--c-primary)' : '1px solid var(--c-border)',
                      background: formData.paymentMethod === 'card' ? '#FAF8F5' : '#FFFFFF',
                      cursor: 'pointer'
                    }}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={formData.paymentMethod === 'card'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                    />
                    <CreditCard size={18} strokeWidth={1.5} style={{ color: 'var(--c-primary)' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--c-primary)' }}>
                        Credit / Debit Card (Visa, MasterCard, Amex)
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--c-text-muted)' }}>
                        Domestic and International cards accepted
                      </div>
                    </div>
                  </label>

                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      padding: '16px',
                      borderRadius: 'var(--radius-xs)',
                      border: formData.paymentMethod === 'cod' ? '1.5px solid var(--c-primary)' : '1px solid var(--c-border)',
                      background: formData.paymentMethod === 'cod' ? '#FAF8F5' : '#FFFFFF',
                      cursor: 'pointer'
                    }}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                    />
                    <Banknote size={18} strokeWidth={1.5} style={{ color: 'var(--c-primary)' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--c-primary)' }}>
                        Cash on Delivery (COD)
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--c-text-muted)' }}>
                        Pay cash or UPI at your doorstep upon receipt
                      </div>
                    </div>
                  </label>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={() => setStep('shipping')} className="btn-secondary" style={{ flex: 1, padding: '14px' }}>
                    Back
                  </button>
                  <button onClick={handleSubmitOrder} className="btn-gold" style={{ flex: 2, padding: '14px' }}>
                    <Lock size={14} />
                    <span>Pay {curr.symbol}{finalTotalCurr.toLocaleString('en-IN')} & Place Order</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
