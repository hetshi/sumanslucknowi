import React from 'react';
import { ArrowRight } from 'lucide-react';

const FABRIC_CARDS = [
  {
    id: 'modal',
    name: 'Pure Modal Silk',
    tagline: 'Featherlight & Fluid Drape',
    desc: 'Woven with ultra-fine modal fibers for an exquisite liquid drape and cooling touch.',
    image: '/images/modal_kurta.jpg',
    count: '14 Designs'
  },
  {
    id: 'mulmul',
    name: '100% Mulmul Cotton',
    tagline: 'Breathable Summer Heritage',
    desc: 'Fine 100-count cotton that grows softer with every delicate hand wash.',
    image: '/images/mulmul_white.jpg',
    count: '22 Designs'
  },
  {
    id: 'georgette',
    name: 'Viscose Georgette',
    tagline: 'Flared Festive Elegance',
    desc: 'Weightless sheer grace embellished with dense jaali and shadow embroidery.',
    image: '/images/georgette_anarkali.jpg',
    count: '18 Designs'
  },
  {
    id: 'chanderi',
    name: 'Royal Chanderi',
    tagline: 'Zari Border & Mukaish Highlights',
    desc: 'Handloom celebratory silk adorned with hand-hammered real silver badla dots.',
    image: '/images/chanderi_saree.jpg',
    count: '9 Designs'
  }
];

export default function FabricCollection({ onSelectFabric }) {
  return (
    <section style={{ padding: '80px 0', background: 'var(--c-bg)', borderBottom: '1px solid var(--c-border)' }}>
      <div className="container">
        {/* Section Heading */}
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 48px' }}>
          <div style={{
            fontSize: '0.68rem',
            fontWeight: 600,
            letterSpacing: '0.24em',
            color: 'var(--c-gold)',
            textTransform: 'uppercase',
            marginBottom: '8px'
          }}>
            ✦ Signature Textures
          </div>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2rem, 3.8vw, 2.8rem)',
            color: 'var(--c-primary)',
            lineHeight: 1.15
          }}>
            Curated by Fabric
          </h2>
          <p style={{
            fontSize: '0.9rem',
            color: 'var(--c-text-muted)',
            marginTop: '10px',
            lineHeight: 1.6
          }}>
            Every stitch requires a tailored textile foundation. Explore our quintessential Awadhi weaves.
          </p>
        </div>

        {/* Fabric Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {FABRIC_CARDS.map((fabric) => (
            <div
              key={fabric.id}
              onClick={() => onSelectFabric(fabric.id)}
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-xs)',
                overflow: 'hidden',
                cursor: 'pointer',
                height: '420px',
                background: '#181214',
                boxShadow: 'var(--shadow-card)'
              }}
              className="fabric-card"
            >
              <img
                src={fabric.image}
                alt={fabric.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                className="fabric-img"
              />

              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(20,13,16,0.92) 0%, rgba(20,13,16,0.3) 55%, rgba(0,0,0,0.05) 100%)'
              }} />

              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '28px',
                color: '#FFFFFF'
              }}>
                <span style={{
                  fontSize: '0.68rem',
                  fontWeight: 600,
                  color: 'var(--c-gold)',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '6px'
                }}>
                  {fabric.tagline}
                </span>

                <h3 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.65rem',
                  color: '#FFFFFF',
                  marginBottom: '8px'
                }}>
                  {fabric.name}
                </h3>

                <p style={{
                  fontSize: '0.82rem',
                  color: 'rgba(255,255,255,0.8)',
                  lineHeight: 1.5,
                  marginBottom: '20px',
                  fontWeight: 300
                }}>
                  {fabric.desc}
                </p>

                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.74rem',
                  fontWeight: 500,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#FFFFFF',
                  borderBottom: '1px solid rgba(255,255,255,0.4)',
                  paddingBottom: '3px'
                }}>
                  <span>Discover {fabric.name} ({fabric.count})</span>
                  <ArrowRight size={13} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .fabric-card:hover .fabric-img {
          transform: scale(1.06);
        }
      `}</style>
    </section>
  );
}
