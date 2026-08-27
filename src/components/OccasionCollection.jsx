import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const OCCASIONS = [
  {
    id: 'festive',
    title: 'Festive & Sangeet',
    tag: 'Anarkalis & Regal Sets',
    categoryTarget: 'kurta-sets',
    image: '/images/georgette_anarkali.jpg'
  },
  {
    id: 'daily',
    title: 'Everyday Breathable',
    tag: 'Pure Mulmul Kurtas',
    categoryTarget: 'kurtas',
    image: '/images/mulmul_white.jpg'
  },
  {
    id: 'fusion',
    title: 'Contemporary Fusion',
    tag: 'Short Peplum Kurtis',
    categoryTarget: 'short-kurtis',
    image: '/images/peplum_kurti.jpg'
  },
  {
    id: 'mens',
    title: 'Men’s Awadh Heritage',
    tag: 'Handcrafted Kurtas',
    categoryTarget: 'mens',
    image: '/images/mens_kurta.jpg'
  }
];

export default function OccasionCollection({ onSelectCategory }) {
  return (
    <section style={{ padding: '70px 0', background: '#FFFFFF', borderBottom: '1px solid var(--c-border)' }}>
      <div className="container">
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: '40px',
          gap: '20px'
        }}>
          <div>
            <div style={{
              fontSize: '0.68rem',
              fontWeight: 600,
              letterSpacing: '0.24em',
              color: 'var(--c-gold)',
              textTransform: 'uppercase',
              marginBottom: '6px'
            }}>
              ✦ Curated Edits
            </div>
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 3.8vw, 2.6rem)',
              color: 'var(--c-primary)',
              lineHeight: 1.15
            }}>
              Shop by Occasion
            </h2>
          </div>

          <p style={{ maxWidth: '440px', fontSize: '0.88rem', color: 'var(--c-text-muted)', lineHeight: 1.6 }}>
            From grand celebratory soirees to mindful daily dressing, explore silhouettes handcrafted for every moment.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '24px'
        }}>
          {OCCASIONS.map((occ) => (
            <div
              key={occ.id}
              onClick={() => onSelectCategory(occ.categoryTarget)}
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-xs)',
                overflow: 'hidden',
                cursor: 'pointer',
                aspectRatio: '3/4',
                background: '#181214',
                boxShadow: 'var(--shadow-subtle)'
              }}
              className="occasion-card"
            >
              <img
                src={occ.image}
                alt={occ.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                className="occasion-img"
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(20,13,16,0.85) 0%, rgba(20,13,16,0.1) 60%)'
              }} />

              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '24px',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between'
              }}>
                <div>
                  <span style={{ fontSize: '0.68rem', color: 'var(--c-gold)', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                    {occ.tag}
                  </span>
                  <h3 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.35rem',
                    color: '#FFFFFF',
                    marginTop: '4px'
                  }}>
                    {occ.title}
                  </h3>
                </div>

                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(8px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF'
                }}>
                  <ArrowUpRight size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .occasion-card:hover .occasion-img {
          transform: scale(1.06);
        }
      `}</style>
    </section>
  );
}
