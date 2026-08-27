import React, { useState } from 'react';
import { HeartHandshake, Award, BookOpen } from 'lucide-react';
import { STITCH_TYPES } from '../data/products';

export default function HeritageStory() {
  const [selectedStitch, setSelectedStitch] = useState(0);

  return (
    <section id="heritage-section" style={{ padding: '90px 0', background: '#F5EFE9', borderTop: '1px solid var(--c-border)', borderBottom: '1px solid var(--c-border)' }}>
      <div className="container">
        {/* Section Top Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 60px' }}>
          <div style={{
            fontSize: '0.68rem',
            fontWeight: 600,
            letterSpacing: '0.26em',
            color: 'var(--c-gold)',
            textTransform: 'uppercase',
            marginBottom: '10px'
          }}>
            ✦ The Awadh Legacy · 400 Years of Grace
          </div>

          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.4rem, 4.5vw, 3.4rem)',
            color: 'var(--c-primary)',
            lineHeight: 1.15
          }}>
            The Craft of 32 Stitches
          </h2>

          <p style={{
            fontSize: '0.96rem',
            color: 'var(--c-text-secondary)',
            marginTop: '16px',
            lineHeight: 1.7,
            fontWeight: 300
          }}>
            Originating in the royal Mughal courts of Noor Jahan, authentic Lucknowi Chikankari is an unbroken lineage of female artisanal mastery preserved across generations.
          </p>
        </div>

        {/* 2-Column Split */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '36px',
          alignItems: 'center',
          marginBottom: '64px'
        }}>
          {/* Left Column: Craft Pillars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{
              background: '#FFFFFF',
              borderRadius: 'var(--radius-xs)',
              padding: '32px',
              boxShadow: 'var(--shadow-subtle)',
              border: '1px solid var(--c-border)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: 'var(--radius-xs)',
                  background: 'var(--c-bg-subtle)',
                  color: 'var(--c-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <HeartHandshake size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--c-primary)' }}>
                    Empowering 450+ Women Artisans
                  </h4>
                  <span style={{ fontSize: '0.74rem', color: 'var(--c-text-muted)', letterSpacing: '0.04em' }}>Direct Fair-Trade Ecosystem</span>
                </div>
              </div>
              <p style={{ fontSize: '0.86rem', color: 'var(--c-text-secondary)', lineHeight: 1.65 }}>
                Every Suman's Lucknowi garment is crafted by skilled women artisans across rural Lucknow and Kakori. By operating directly with master clusters, we provide sustainable livelihoods and dignified wages.
              </p>
            </div>

            <div style={{
              background: '#FFFFFF',
              borderRadius: 'var(--radius-xs)',
              padding: '32px',
              boxShadow: 'var(--shadow-subtle)',
              border: '1px solid var(--c-border)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: 'var(--radius-xs)',
                  background: 'var(--c-gold-light)',
                  color: 'var(--c-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Award size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--c-primary)' }}>
                    GI Tagged Geographical Indication
                  </h4>
                  <span style={{ fontSize: '0.74rem', color: 'var(--c-text-muted)', letterSpacing: '0.04em' }}>Certified Authentic Provenance</span>
                </div>
              </div>
              <p style={{ fontSize: '0.86rem', color: 'var(--c-text-secondary)', lineHeight: 1.65 }}>
                Unlike machine-made imitations, authentic Chikankari holds a recognized GI tag. Motifs are hand-blocked with organic neel, hand-stitched for up to 120 hours, and finished in the Gomti river waters.
              </p>
            </div>
          </div>

          {/* Right Column: 32 Stitches Guide */}
          <div style={{
            background: '#FFFFFF',
            borderRadius: 'var(--radius-xs)',
            padding: '36px',
            border: '1px solid var(--c-border)',
            boxShadow: 'var(--shadow-card)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <BookOpen size={16} strokeWidth={1.5} style={{ color: 'var(--c-gold)' }} />
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--c-primary)' }}>
                Heritage Stitches Glossary
              </h3>
            </div>

            <p style={{ fontSize: '0.84rem', color: 'var(--c-text-muted)', marginBottom: '22px', lineHeight: 1.6 }}>
              Explore the delicate embroidery techniques employed by our master craftswomen:
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
              {STITCH_TYPES.map((st, idx) => (
                <button
                  key={st.name}
                  onClick={() => setSelectedStitch(idx)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-xs)',
                    fontSize: '0.76rem',
                    letterSpacing: '0.04em',
                    fontWeight: selectedStitch === idx ? 600 : 400,
                    background: selectedStitch === idx ? 'var(--c-primary)' : '#FAF8F5',
                    color: selectedStitch === idx ? '#FFFFFF' : 'var(--c-text-secondary)',
                    border: '1px solid',
                    borderColor: selectedStitch === idx ? 'var(--c-primary)' : 'var(--c-border)',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  {st.name}
                </button>
              ))}
            </div>

            <div style={{
              background: '#FAF8F5',
              borderRadius: 'var(--radius-xs)',
              padding: '24px',
              border: '1px solid var(--c-border)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--c-primary)' }}>
                  {STITCH_TYPES[selectedStitch].name}
                </h4>
                <span style={{ fontSize: '0.68rem', background: '#FFFFFF', padding: '3px 8px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--c-border)', color: 'var(--c-gold)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Stitch #{selectedStitch + 1}
                </span>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--c-text-secondary)', lineHeight: 1.65 }}>
                {STITCH_TYPES[selectedStitch].description}
              </p>
            </div>
          </div>
        </div>

        {/* 4 Pillars Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          textAlign: 'center'
        }}>
          <div style={{ padding: '24px', background: '#FFFFFF', borderRadius: 'var(--radius-xs)', border: '1px solid var(--c-border)' }}>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', color: 'var(--c-primary)', fontWeight: 400 }}>
              400+
            </div>
            <div style={{ fontSize: '0.74rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--c-text-muted)', marginTop: '4px' }}>
              Years of Royal Legacy
            </div>
          </div>

          <div style={{ padding: '24px', background: '#FFFFFF', borderRadius: 'var(--radius-xs)', border: '1px solid var(--c-border)' }}>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', color: 'var(--c-gold)', fontWeight: 400 }}>
              32
            </div>
            <div style={{ fontSize: '0.74rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--c-text-muted)', marginTop: '4px' }}>
              Traditional Stitch Motifs
            </div>
          </div>

          <div style={{ padding: '24px', background: '#FFFFFF', borderRadius: 'var(--radius-xs)', border: '1px solid var(--c-border)' }}>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', color: 'var(--c-primary)', fontWeight: 400 }}>
              450+
            </div>
            <div style={{ fontSize: '0.74rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--c-text-muted)', marginTop: '4px' }}>
              Artisans Empowered
            </div>
          </div>

          <div style={{ padding: '24px', background: '#FFFFFF', borderRadius: 'var(--radius-xs)', border: '1px solid var(--c-border)' }}>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', color: 'var(--c-primary)', fontWeight: 400 }}>
              100%
            </div>
            <div style={{ fontSize: '0.74rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--c-text-muted)', marginTop: '4px' }}>
              GI Tagged Handloom
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
