import React, { useState } from 'react';
import { Send, MapPin, Phone, Mail, CheckCircle } from 'lucide-react';
import InstagramIcon from './icons/InstagramIcon';
import { CATEGORIES } from '../data/products';

export default function Footer({ onSelectCategory, onOpenConcierge }) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer style={{ background: 'var(--c-bg-dark)', color: '#EDE4DC', paddingTop: '70px', paddingBottom: '36px' }}>
      <div className="container">
        {/* Newsletter Bar */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          borderRadius: 'var(--radius-xs)',
          padding: '36px',
          marginBottom: '56px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px'
        }}>
          <div>
            <div style={{ fontSize: '0.66rem', color: 'var(--c-gold)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '4px' }}>
              ✦ Atelier Newsletter
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.65rem', color: '#FFFFFF' }}>
              Receive 10% Savings on Your First Heirloom
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.7)', marginTop: '4px', fontWeight: 300 }}>
              Private previews of festive drops, slow-craft stories, and styling masterclasses.
            </p>
          </div>

          <div style={{ minWidth: '280px', flex: '1', maxWidth: '440px' }}>
            {subscribed ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#80E8AC', fontSize: '0.84rem' }}>
                <CheckCircle size={16} />
                <span>Thank you. Use code <strong>LUCKNOW10</strong> at checkout.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="email"
                  required
                  placeholder="Enter email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-xs)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    background: 'rgba(255, 255, 255, 0.06)',
                    color: '#FFFFFF',
                    fontSize: '0.82rem',
                    outline: 'none'
                  }}
                />
                <button type="submit" className="btn-gold" style={{ padding: '12px 20px', fontSize: '0.74rem' }}>
                  <span>Join</span>
                  <Send size={13} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 4 Columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '40px',
          paddingBottom: '48px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          {/* Brand */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#FFFFFF', marginBottom: '12px', letterSpacing: '0.08em' }}>
              SUMAN'S LUCKNOWI
            </h4>
            <p style={{ fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.65)', lineHeight: 1.7, marginBottom: '20px', fontWeight: 300 }}>
              Handcrafted in the historic lanes of Hazratganj, Lucknow. Preserving the 32 authentic GI-tagged stitches while uplifting 450+ female master artisans.
            </p>

            <a
              href="https://www.instagram.com/sumanslucknowi?igsi=NWJjZjJzdHozd2k0"
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: '#EDE4DC',
                fontSize: '0.74rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '6px 14px',
                borderRadius: 'var(--radius-xs)',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)'
              }}
            >
              <InstagramIcon size={14} color="var(--c-gold)" />
              <span>@sumanslucknowi</span>
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h5 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: '#FFFFFF', marginBottom: '16px' }}>
              Collections
            </h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.65)' }}>
              {CATEGORIES.slice(1, 6).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => onSelectCategory(cat.id)}
                    style={{ color: 'inherit', textAlign: 'left', letterSpacing: '0.02em' }}
                    className="hover-gold"
                  >
                    {cat.label}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => onSelectCategory('mens')}
                  style={{ color: 'inherit', textAlign: 'left', letterSpacing: '0.02em' }}
                  className="hover-gold"
                >
                  Men's Chikankari
                </button>
              </li>
            </ul>
          </div>

          {/* Atelier & Service */}
          <div>
            <h5 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: '#FFFFFF', marginBottom: '16px' }}>
              Bespoke & Craft
            </h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.65)' }}>
              <li>
                <button
                  onClick={() => {
                    const el = document.getElementById('heritage-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  style={{ color: 'inherit' }}
                  className="hover-gold"
                >
                  The 32 Stitches Archive
                </button>
              </li>
              <li>
                <button onClick={onOpenConcierge} style={{ color: 'inherit' }} className="hover-gold">
                  Bespoke Sizing & Custom Fits
                </button>
              </li>
              <li>
                <button onClick={onOpenConcierge} style={{ color: 'inherit' }} className="hover-gold">
                  Bridal Trousseau Consultation
                </button>
              </li>
              <li>
                <span style={{ color: 'rgba(255, 255, 255, 0.4)' }}>GI Tagged Provenance</span>
              </li>
              <li>
                <span style={{ color: 'rgba(255, 255, 255, 0.4)' }}>Worldwide Courier Care</span>
              </li>
            </ul>
          </div>

          {/* Boutique Contact */}
          <div>
            <h5 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: '#FFFFFF', marginBottom: '16px' }}>
              Hazratganj Boutique
            </h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.65)', lineHeight: 1.6 }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <MapPin size={15} style={{ color: 'var(--c-gold)', flexShrink: 0, marginTop: '2px' }} />
                <span>Hazratganj Main Market, Lucknow, Uttar Pradesh 226001, India</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Phone size={15} style={{ color: 'var(--c-gold)', flexShrink: 0 }} />
                <span>WhatsApp: +91 98765 43210</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Mail size={15} style={{ color: 'var(--c-gold)', flexShrink: 0 }} />
                <span>concierge@sumanslucknowi.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          paddingTop: '28px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.72rem',
          color: 'rgba(255, 255, 255, 0.4)',
          gap: '16px'
        }}>
          <div>
            © {new Date().getFullYear()} Suman's Lucknowi. Preserving the Royal Art of Awadh.
          </div>

          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>GI Craft Certified</span>
          </div>
        </div>
      </div>

      <style>{`
        .hover-gold:hover {
          color: var(--c-gold) !important;
        }
      `}</style>
    </footer>
  );
}
