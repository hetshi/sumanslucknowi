import React from 'react';
import { Heart, MessageCircle, ExternalLink } from 'lucide-react';
import InstagramIcon from './icons/InstagramIcon';
import { INSTAGRAM_POSTS } from '../data/stories';

export default function InstagramFeed() {
  return (
    <section style={{ padding: '70px 0', background: '#FAF8F5' }}>
      <div className="container">
        {/* Header */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: '36px',
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
              ✦ #SumansLucknowi
            </div>
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 3.8vw, 2.6rem)',
              color: 'var(--c-primary)',
              lineHeight: 1.15
            }}>
              Follow Our Journey on Instagram
            </h2>
          </div>

          <a
            href="https://www.instagram.com/sumanslucknowi?igsi=NWJjZjJzdHozd2k0"
            target="_blank"
            rel="noreferrer"
            className="btn-secondary"
            style={{
              fontSize: '0.74rem',
              padding: '10px 20px',
              gap: '8px'
            }}
          >
            <InstagramIcon size={14} color="var(--c-primary)" />
            <span>@sumanslucknowi</span>
            <ExternalLink size={12} />
          </a>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px'
        }}>
          {INSTAGRAM_POSTS.map((post) => (
            <a
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noreferrer"
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-xs)',
                overflow: 'hidden',
                aspectRatio: '1/1',
                background: '#181214',
                display: 'block'
              }}
              className="insta-card"
            >
              <img
                src={post.img}
                alt={post.caption}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                className="insta-img"
              />

              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(28, 22, 24, 0.75)',
                opacity: 0,
                transition: 'opacity 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                padding: '16px',
                textAlign: 'center'
              }}
              className="insta-overlay"
              >
                <div style={{ display: 'flex', gap: '14px', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem' }}>
                    <Heart size={14} fill="#fff" />
                    <span>{post.likes}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem' }}>
                    <MessageCircle size={14} fill="#fff" />
                    <span>{post.comments}</span>
                  </div>
                </div>
                <span style={{ fontSize: '0.68rem', color: 'var(--c-gold)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  View on Instagram ↗
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        .insta-card:hover .insta-overlay {
          opacity: 1 !important;
        }
        .insta-card:hover .insta-img {
          transform: scale(1.06);
        }
      `}</style>
    </section>
  );
}
