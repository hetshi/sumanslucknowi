import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const HERO_SLIDES = [
  {
    id: 1,
    tag: 'THE FESTIVE EDITION',
    title: 'The Regal Art of Awadh',
    subtitle: 'Hand-embroidered Chikankari on Pure Modal Silk and Viscose Georgette. Adorned with delicate Mukaish and traditional Bakhiya shadow work.',
    image: '/images/hero_banner.jpg',
    categoryTarget: 'kurta-sets',
    btnPrimaryText: 'Explore Kurta Sets',
    btnSecondaryText: 'The Modal Silk Edit'
  },
  {
    id: 2,
    tag: 'HERITAGE SLOW FASHION',
    title: 'Pure Mulmul Cotton',
    subtitle: 'Woven with 100-count featherlight cotton, hand-embroidered by 450+ master women artisans of rural Lucknow.',
    image: '/images/mulmul_white.jpg',
    categoryTarget: 'kurtas',
    btnPrimaryText: 'Shop Mulmul Kurtas',
    btnSecondaryText: 'Short Kurtis'
  },
  {
    id: 3,
    tag: 'HEIRLOOM DRAPES',
    title: 'Real Mukaish & Chanderi',
    subtitle: 'Celebratory Chanderi silks and organza dupattas hand-hammered with authentic silver badla wire.',
    image: '/images/chanderi_saree.jpg',
    categoryTarget: 'sarees',
    btnPrimaryText: 'Shop Sarees',
    btnSecondaryText: 'Dupattas & Bottoms'
  }
];

export default function HeroBanner({ onSelectCategory, onScrollToCraft }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section style={{ position: 'relative', width: '100%', overflow: 'hidden', backgroundColor: 'var(--c-bg-dark)' }}>
      <div style={{
        position: 'relative',
        minHeight: '560px',
        maxHeight: '720px',
        display: 'flex',
        alignItems: 'center'
      }}>
        {HERO_SLIDES.map((s, index) => (
          <div
            key={s.id}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: index === currentSlide ? 1 : 0,
              transition: 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
              zIndex: 1
            }}
          >
            <img
              src={s.image}
              alt={s.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 20%'
              }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(90deg, rgba(22,8,10,0.88) 0%, rgba(22,8,10,0.58) 45%, rgba(22,8,10,0.2) 100%)'
            }} />
          </div>
        ))}

        {/* Content Box */}
        <div className="container" style={{ position: 'relative', zIndex: 10, padding: '80px 24px' }}>
          <div style={{ maxWidth: '620px', color: '#FFFFFF' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.68rem',
              fontWeight: 600,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: 'var(--c-gold)',
              marginBottom: '18px'
            }}>
              <span>✦</span>
              <span>{slide.tag}</span>
            </div>

            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
              fontWeight: 400,
              color: '#FFFFFF',
              lineHeight: 1.1,
              marginBottom: '18px',
              letterSpacing: '-0.02em'
            }}>
              {slide.title}
            </h2>

            <p style={{
              fontSize: 'clamp(0.92rem, 1.8vw, 1.05rem)',
              lineHeight: 1.65,
              color: 'rgba(255, 255, 255, 0.85)',
              marginBottom: '36px',
              fontWeight: 300,
              letterSpacing: '0.01em'
            }}>
              {slide.subtitle}
            </p>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              <button
                onClick={() => onSelectCategory(slide.categoryTarget)}
                className="btn-gold"
                style={{ fontSize: '0.78rem', padding: '14px 32px' }}
              >
                <span>{slide.btnPrimaryText}</span>
                <ArrowRight size={15} />
              </button>

              <button
                onClick={onScrollToCraft}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  padding: '14px 28px',
                  borderRadius: 'var(--radius-xs)',
                  fontSize: '0.78rem',
                  fontWeight: 500,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <span>The 32 Stitches</span>
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Controls */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
          aria-label="Previous Slide"
          style={{
            position: 'absolute',
            left: '24px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 15,
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(8px)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(255,255,255,0.15)'
          }}
          className="desktop-only"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
          aria-label="Next Slide"
          style={{
            position: 'absolute',
            right: '24px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 15,
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(8px)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(255,255,255,0.15)'
          }}
          className="desktop-only"
        >
          <ChevronRight size={20} />
        </button>

        {/* Slide Indicators */}
        <div style={{
          position: 'absolute',
          bottom: '28px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 15,
          display: 'flex',
          gap: '10px'
        }}>
          {HERO_SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              style={{
                width: index === currentSlide ? '32px' : '8px',
                height: '2px',
                background: index === currentSlide ? 'var(--c-gold)' : 'rgba(255, 255, 255, 0.3)',
                transition: 'all 0.4s ease'
              }}
            />
          ))}
        </div>
      </div>

      {/* Trust Sub-Header */}
      <div style={{
        background: '#FAF8F5',
        borderBottom: '1px solid var(--c-border)',
        padding: '16px 0'
      }}>
        <div className="container" style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '20px'
        }}>
          <div style={{ fontSize: '0.74rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--c-text-secondary)', fontWeight: 500 }}>
            <span style={{ color: 'var(--c-gold)', marginRight: '6px' }}>✦</span>
            <strong>100% Handcrafted</strong> · Direct from Master Artisans
          </div>
          <div style={{ fontSize: '0.74rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--c-text-secondary)', fontWeight: 500 }}>
            <span style={{ color: 'var(--c-gold)', marginRight: '6px' }}>✦</span>
            <strong>GI Tagged Heritage</strong> · Hazratganj, Lucknow
          </div>
          <div style={{ fontSize: '0.74rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--c-text-secondary)', fontWeight: 500 }}>
            <span style={{ color: 'var(--c-gold)', marginRight: '6px' }}>✦</span>
            <strong>Worldwide Express Delivery</strong> · USA, UK, UAE & More
          </div>
        </div>
      </div>
    </section>
  );
}
