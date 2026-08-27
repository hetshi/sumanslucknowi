import React from 'react';
import { Star, ShieldCheck, CheckCircle } from 'lucide-react';
import { REVIEWS, TRUST_BADGES } from '../data/reviews';

export default function CustomerReviews() {
  return (
    <section style={{ padding: '80px 0', background: '#FFFFFF', borderBottom: '1px solid var(--c-border)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 48px' }}>
          <div style={{
            fontSize: '0.68rem',
            fontWeight: 600,
            letterSpacing: '0.24em',
            color: 'var(--c-gold)',
            textTransform: 'uppercase',
            marginBottom: '8px'
          }}>
            ✦ Patron Reflections
          </div>

          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.2rem, 4vw, 3rem)',
            color: 'var(--c-primary)'
          }}>
            Loved by Connoisseurs Worldwide
          </h2>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '12px' }}>
            <div style={{ display: 'flex', gap: '2px', color: 'var(--c-gold)' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} fill="var(--c-gold)" stroke="none" />
              ))}
            </div>
            <span style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--c-primary)', letterSpacing: '0.04em' }}>
              4.9 / 5.0 Rating Across 10,000+ Patrons
            </span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginBottom: '64px'
        }}>
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              style={{
                background: '#FAF8F5',
                borderRadius: 'var(--radius-xs)',
                padding: '28px',
                border: '1px solid var(--c-border)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <div style={{ display: 'flex', gap: '2px' }}>
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={12} fill="var(--c-gold)" stroke="none" />
                  ))}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.68rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--c-text-muted)', fontWeight: 500 }}>
                  <CheckCircle size={11} strokeWidth={1.5} />
                  <span>Verified Buyer</span>
                </div>
              </div>

              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--c-primary)', marginBottom: '10px', lineHeight: 1.35 }}>
                "{rev.title}"
              </h4>

              <p style={{ fontSize: '0.84rem', color: 'var(--c-text-secondary)', lineHeight: 1.65, marginBottom: '20px', flex: 1, fontWeight: 300 }}>
                {rev.content}
              </p>

              <div style={{
                fontSize: '0.72rem',
                color: 'var(--c-primary)',
                background: '#FFFFFF',
                border: '1px solid var(--c-border)',
                padding: '5px 10px',
                borderRadius: 'var(--radius-xs)',
                marginBottom: '16px',
                fontWeight: 500,
                letterSpacing: '0.02em'
              }}>
                ✦ {rev.product}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--c-border-light)', paddingTop: '14px' }}>
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--c-primary)', letterSpacing: '0.02em' }}>
                    {rev.author}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--c-text-muted)' }}>
                    {rev.city}
                  </div>
                </div>
                <span style={{ fontSize: '0.7rem', color: 'var(--c-text-subtle)' }}>
                  {rev.date}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div style={{
          background: '#FAF8F5',
          borderRadius: 'var(--radius-xs)',
          padding: '36px 24px',
          border: '1px solid var(--c-border)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '24px',
          textAlign: 'center'
        }}>
          {TRUST_BADGES.map((b, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: 'var(--radius-xs)',
                background: '#FFFFFF',
                border: '1px solid var(--c-border)',
                color: 'var(--c-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '10px'
              }}>
                <ShieldCheck size={18} strokeWidth={1.5} />
              </div>
              <h5 style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: 'var(--c-primary)', marginBottom: '2px' }}>
                {b.title}
              </h5>
              <span style={{ fontSize: '0.72rem', color: 'var(--c-text-muted)', letterSpacing: '0.02em' }}>
                {b.subtitle}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
