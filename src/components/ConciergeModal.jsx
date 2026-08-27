import React, { useState } from 'react';
import { X, Sparkles, MessageCircle, CheckCircle } from 'lucide-react';

export default function ConciergeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [inquiryType, setInquiryType] = useState('custom-sizing');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Hello Suman's Lucknowi Concierge! 🌸\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Inquiry:* ${inquiryType}\n*Notes:* ${notes || 'N/A'}\n\nPlease guide me with custom measurements and design recommendations!`
    );
    window.open(`https://wa.me/919876543210?text=${text}`, '_blank');
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
    }, 2500);
  };

  return (
    <div className="drawer-backdrop" onClick={onClose} style={{ alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '520px',
          padding: '36px',
          background: '#FFFFFF',
          borderRadius: 'var(--radius-xs)',
          border: '1px solid var(--c-border)',
          position: 'relative'
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            color: 'var(--c-primary)',
            padding: '4px'
          }}
        >
          <X size={18} strokeWidth={1.5} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            fontSize: '0.66rem',
            fontWeight: 600,
            letterSpacing: '0.24em',
            color: 'var(--c-gold)',
            textTransform: 'uppercase',
            marginBottom: '8px'
          }}>
            ✦ Atelier Concierge
          </div>

          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.65rem', color: 'var(--c-primary)' }}>
            Bespoke Sizing & Bridal Consultation
          </h3>

          <p style={{ fontSize: '0.84rem', color: 'var(--c-text-muted)', marginTop: '8px', lineHeight: 1.6, fontWeight: 300 }}>
            Seeking a plus-size fit, bridal trousseau consultation, or color dyeing? Our master artisans in Lucknow will hand-tailor your piece.
          </p>
        </div>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '30px 0' }}>
            <CheckCircle size={40} color="#2D6A4F" style={{ margin: '0 auto 12px' }} />
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--c-primary)' }}>
              Connecting to Atelier WhatsApp...
            </h4>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--c-primary)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                Full Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Radhika Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-xs)',
                  border: '1px solid var(--c-border)',
                  fontSize: '0.86rem',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--c-primary)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                WhatsApp Contact
              </label>
              <input
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-xs)',
                  border: '1px solid var(--c-border)',
                  fontSize: '0.86rem',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--c-primary)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                Inquiry Type
              </label>
              <select
                value={inquiryType}
                onChange={(e) => setInquiryType(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-xs)',
                  border: '1px solid var(--c-border)',
                  fontSize: '0.86rem',
                  background: '#fff',
                  outline: 'none'
                }}
              >
                <option value="custom-sizing">Custom Sizing (Bust / Length Tailoring)</option>
                <option value="bridal-trousseau">Bridal & Wedding Trousseau Consultation</option>
                <option value="color-dyeing">Custom Fabric Dyeing / Shade Matching</option>
                <option value="bulk-gifting">Bulk Orders / Celebratory Gifting</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--c-primary)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                Measurements / Notes (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="Mention specific measurements, event date, or styling preferences..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-xs)',
                  border: '1px solid var(--c-border)',
                  fontSize: '0.86rem',
                  outline: 'none'
                }}
              />
            </div>

            <button type="submit" className="btn-whatsapp" style={{ width: '100%', padding: '14px', marginTop: '6px' }}>
              <MessageCircle size={16} />
              <span>Connect on WhatsApp with @sumanslucknowi</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
