import React, { useState, useEffect } from 'react';
import { Play, X, ShoppingBag, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import InstagramIcon from './icons/InstagramIcon';
import { STORIES } from '../data/stories';

export default function ReelStories({ onSelectProductById }) {
  const [activeStoryIndex, setActiveStoryIndex] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (activeStoryIndex === null) {
      setProgress(0);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (activeStoryIndex < STORIES.length - 1) {
            setActiveStoryIndex(activeStoryIndex + 1);
            return 0;
          } else {
            setActiveStoryIndex(null);
            return 0;
          }
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [activeStoryIndex]);

  const activeStory = activeStoryIndex !== null ? STORIES[activeStoryIndex] : null;

  return (
    <section style={{ padding: '40px 0 24px', background: '#FFFFFF', borderBottom: '1px solid var(--c-border)' }}>
      <div className="container">
        {/* Header Title */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: '24px'
        }}>
          <div>
            <div style={{
              fontSize: '0.68rem',
              fontWeight: 600,
              letterSpacing: '0.2em',
              color: 'var(--c-gold)',
              textTransform: 'uppercase',
              marginBottom: '4px'
            }}>
              ✦ Visual Journal
            </div>
            <h3 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.45rem',
              color: 'var(--c-primary)',
              letterSpacing: '-0.01em'
            }}>
              Stories From Our Lucknow Ateliers
            </h3>
          </div>

          <a
            href="https://www.instagram.com/sumanslucknowi?igsi=NWJjZjJzdHozd2k0"
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.74rem',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--c-text-secondary)',
              borderBottom: '1px solid var(--c-border)',
              paddingBottom: '2px'
            }}
          >
            <InstagramIcon size={14} color="var(--c-primary)" />
            <span>Follow @sumanslucknowi</span>
            <ExternalLink size={11} />
          </a>
        </div>

        {/* Story Circle Carousel */}
        <div style={{
          display: 'flex',
          gap: '24px',
          overflowX: 'auto',
          paddingBottom: '12px',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}>
          {STORIES.map((story, index) => (
            <div
              key={story.id}
              onClick={() => {
                setActiveStoryIndex(index);
                setProgress(0);
              }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                flexShrink: 0,
                width: '92px',
                textAlign: 'center'
              }}
            >
              {/* Ring Thumbnail */}
              <div className="story-ring">
                <div style={{
                  width: '76px',
                  height: '76px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  background: '#FDFBF8',
                  padding: '2px',
                  position: 'relative'
                }}>
                  <img
                    src={story.thumbnail}
                    alt={story.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '50%'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    background: 'rgba(28, 22, 24, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Play size={14} color="#FFFFFF" fill="#FFFFFF" style={{ opacity: 0.9 }} />
                  </div>
                </div>
              </div>

              {/* Title & Tag */}
              <span style={{
                fontSize: '0.76rem',
                fontWeight: 500,
                color: 'var(--c-text-primary)',
                marginTop: '10px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: '100%',
                letterSpacing: '0.02em'
              }}>
                {story.title}
              </span>
              <span style={{
                fontSize: '0.66rem',
                color: 'var(--c-text-muted)',
                letterSpacing: '0.04em',
                lineHeight: 1.2
              }}>
                {story.tag}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Story Viewer Modal */}
      {activeStory && (
        <div
          className="drawer-backdrop"
          style={{ justifyContent: 'center', alignItems: 'center' }}
          onClick={() => setActiveStoryIndex(null)}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '420px',
              height: '82vh',
              maxHeight: '740px',
              background: '#000000',
              borderRadius: 'var(--radius-sm)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 24px 60px rgba(0,0,0,0.5)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Story Progress Bars */}
            <div style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              right: '12px',
              zIndex: 30,
              display: 'flex',
              gap: '4px'
            }}>
              {STORIES.map((_, i) => {
                let fill = '0%';
                if (i < activeStoryIndex) fill = '100%';
                if (i === activeStoryIndex) fill = `${progress}%`;
                return (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: '2px',
                      background: 'rgba(255,255,255,0.3)',
                      borderRadius: '1px',
                      overflow: 'hidden'
                    }}
                  >
                    <div style={{
                      width: fill,
                      height: '100%',
                      background: '#FFFFFF',
                      transition: 'width 0.1s linear'
                    }} />
                  </div>
                );
              })}
            </div>

            {/* Story Top Bar */}
            <div style={{
              position: 'absolute',
              top: '24px',
              left: '14px',
              right: '14px',
              zIndex: 30,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              color: '#FFFFFF'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img
                  src={activeStory.thumbnail}
                  alt={activeStory.title}
                  style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid var(--c-gold)' }}
                />
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.04em' }}>sumanslucknowi</div>
                  <div style={{ fontSize: '0.68rem', opacity: 0.8, letterSpacing: '0.04em' }}>Hazratganj, Lucknow</div>
                </div>
              </div>

              <button
                onClick={() => setActiveStoryIndex(null)}
                style={{
                  color: '#FFFFFF',
                  background: 'rgba(0,0,0,0.3)',
                  padding: '6px',
                  borderRadius: '50%'
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Story Media */}
            <div style={{ flex: 1, position: 'relative', width: '100%', height: '100%' }}>
              <img
                src={activeStory.thumbnail}
                alt={activeStory.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.3) 100%)'
              }} />
            </div>

            {/* Bottom Caption & Product CTA */}
            <div style={{
              position: 'absolute',
              bottom: '16px',
              left: '16px',
              right: '16px',
              zIndex: 30
            }}>
              <p style={{
                color: '#FFFFFF',
                fontSize: '0.84rem',
                marginBottom: '14px',
                lineHeight: 1.5,
                fontWeight: 300
              }}>
                {activeStory.caption}
              </p>

              {/* Shop Tag Pill */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.98)',
                borderRadius: 'var(--radius-xs)',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 8px 24px rgba(0,0,0,0.3)'
              }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '0.96rem', color: 'var(--c-primary)', fontWeight: 600 }}>
                    {activeStory.productName}
                  </div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--c-text-primary)' }}>
                    {activeStory.productPrice}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setActiveStoryIndex(null);
                    onSelectProductById(activeStory.productId);
                  }}
                  className="btn-primary"
                  style={{ padding: '8px 14px', fontSize: '0.72rem' }}
                >
                  <ShoppingBag size={13} />
                  <span>View Details</span>
                </button>
              </div>
            </div>

            {/* Nav Arrows */}
            <button
              onClick={() => {
                if (activeStoryIndex > 0) {
                  setActiveStoryIndex(activeStoryIndex - 1);
                  setProgress(0);
                }
              }}
              style={{
                position: 'absolute',
                left: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'rgba(255,255,255,0.7)',
                background: 'rgba(0,0,0,0.25)',
                padding: '8px',
                borderRadius: '50%',
                zIndex: 30
              }}
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={() => {
                if (activeStoryIndex < STORIES.length - 1) {
                  setActiveStoryIndex(activeStoryIndex + 1);
                  setProgress(0);
                } else {
                  setActiveStoryIndex(null);
                }
              }}
              style={{
                position: 'absolute',
                right: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'rgba(255,255,255,0.7)',
                background: 'rgba(0,0,0,0.25)',
                padding: '8px',
                borderRadius: '50%',
                zIndex: 30
              }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
