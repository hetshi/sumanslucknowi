import React, { useState } from 'react';
import { X, Upload, Image as ImageIcon, Check, RefreshCw, Sparkles, ExternalLink } from 'lucide-react';
import InstagramIcon from './icons/InstagramIcon';

export default function ImageManagerModal({ isOpen, onClose, customImages, onUpdateImage, onResetImages }) {
  if (!isOpen) return null;

  const [activeKey, setActiveKey] = useState('modal_kurta');
  const [urlInput, setUrlInput] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const SLOTS = [
    { key: 'hero_banner', name: 'Hero Campaign Banner', defaultSrc: '/images/hero_banner.jpg', desc: 'Main lookbook banner on homepage' },
    { key: 'modal_kurta', name: 'Noor-e-Awadh Modal Kurta', defaultSrc: '/images/modal_kurta.jpg', desc: 'Pure Modal Silk Kurta Set & Story Reel' },
    { key: 'georgette_anarkali', name: 'Gulmohar Georgette Anarkali', defaultSrc: '/images/georgette_anarkali.jpg', desc: 'Sage Green 24-Kali Flared Anarkali' },
    { key: 'mulmul_white', name: 'Nazakat Mulmul Kurta', defaultSrc: '/images/mulmul_white.jpg', desc: 'White-on-White Breathable Mulmul Cotton' },
    { key: 'chanderi_saree', name: 'Shehnai Chanderi Saree', defaultSrc: '/images/chanderi_saree.jpg', desc: 'Burgundy Chanderi Silk Saree with Mukaish' },
    { key: 'peplum_kurti', name: 'Zeenat Peplum Kurti', defaultSrc: '/images/peplum_kurti.jpg', desc: 'Lavender Contemporary Short Kurti' },
    { key: 'mens_kurta', name: 'Nawab Men’s Kurta', defaultSrc: '/images/mens_kurta.jpg', desc: 'Royal Ivory Handcrafted Men’s Kurta' }
  ];

  const currentSlot = SLOTS.find(s => s.key === activeKey) || SLOTS[0];
  const currentImageSrc = customImages[activeKey] || currentSlot.defaultSrc;

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdateImage(activeKey, reader.result);
        setSuccessMsg(`Photo for ${currentSlot.name} updated from file!`);
        setTimeout(() => setSuccessMsg(''), 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    if (urlInput.trim()) {
      onUpdateImage(activeKey, urlInput.trim());
      setUrlInput('');
      setSuccessMsg(`Photo for ${currentSlot.name} updated from URL!`);
      setTimeout(() => setSuccessMsg(''), 3000);
    }
  };

  return (
    <div className="drawer-backdrop" onClick={onClose} style={{ alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '840px',
          background: '#FFFFFF',
          borderRadius: 'var(--radius-xs)',
          border: '1px solid var(--c-border)',
          padding: '32px',
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

        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.24em', color: 'var(--c-gold)', textTransform: 'uppercase', marginBottom: '6px' }}>
            ✦ Instagram Photo Manager
          </div>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: 'var(--c-primary)' }}>
            Upload Brand Photos from @sumanslucknowi
          </h3>
          <p style={{ fontSize: '0.86rem', color: 'var(--c-text-muted)', marginTop: '4px', lineHeight: 1.6 }}>
            Select any section below to upload saved photos from your Instagram feed or paste direct image links.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '24px', minHeight: '360px' }}>
          {/* Left: Slot Selector */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', borderRight: '1px solid var(--c-border-light)', paddingRight: '16px' }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--c-text-subtle)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>
              Select Placement:
            </span>
            {SLOTS.map((slot) => {
              const isSelected = activeKey === slot.key;
              const hasCustom = !!customImages[slot.key];
              return (
                <button
                  key={slot.key}
                  onClick={() => {
                    setActiveKey(slot.key);
                    setUrlInput('');
                  }}
                  style={{
                    textAlign: 'left',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-xs)',
                    background: isSelected ? 'var(--c-primary)' : '#FAF8F5',
                    color: isSelected ? '#FFFFFF' : 'var(--c-text-primary)',
                    border: '1px solid',
                    borderColor: isSelected ? 'var(--c-primary)' : 'var(--c-border)',
                    fontSize: '0.8rem',
                    fontWeight: isSelected ? 600 : 400,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{slot.name}</span>
                  {hasCustom && (
                    <span style={{ fontSize: '0.62rem', background: isSelected ? 'rgba(255,255,255,0.2)' : 'var(--c-gold-light)', color: isSelected ? '#fff' : 'var(--c-gold-hover)', padding: '2px 5px', borderRadius: '3px' }}>
                      Custom
                    </span>
                  )}
                </button>
              );
            })}

            <div style={{ marginTop: 'auto', paddingTop: '16px' }}>
              <button
                onClick={onResetImages}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.72rem',
                  color: 'var(--c-text-muted)',
                  padding: '6px 0'
                }}
              >
                <RefreshCw size={12} />
                <span>Reset All to Default</span>
              </button>
            </div>
          </div>

          {/* Right: Preview & Upload Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              {/* Preview Thumbnail */}
              <div style={{
                width: '140px',
                height: '180px',
                borderRadius: 'var(--radius-xs)',
                overflow: 'hidden',
                border: '1px solid var(--c-border)',
                background: '#FAF8F5',
                flexShrink: 0
              }}>
                <img
                  src={currentImageSrc}
                  alt={currentSlot.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Slot Details */}
              <div style={{ flex: 1 }}>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--c-primary)', marginBottom: '4px' }}>
                  {currentSlot.name}
                </h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--c-text-muted)', marginBottom: '16px' }}>
                  {currentSlot.desc}
                </p>

                {/* Direct File Upload Button */}
                <label className="btn-primary" style={{ padding: '10px 18px', fontSize: '0.74rem', cursor: 'pointer', display: 'inline-flex', marginBottom: '12px' }}>
                  <Upload size={14} />
                  <span>Choose Photo from Device</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                  />
                </label>

                <div style={{ fontSize: '0.74rem', color: 'var(--c-text-subtle)' }}>
                  Supports JPG, PNG, WebP saved from @sumanslucknowi
                </div>
              </div>
            </div>

            {/* URL Paste Option */}
            <div style={{
              background: '#FAF8F5',
              padding: '16px',
              borderRadius: 'var(--radius-xs)',
              border: '1px solid var(--c-border)'
            }}>
              <label style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--c-primary)', display: 'block', marginBottom: '6px' }}>
                Or Paste Image Link:
              </label>
              <form onSubmit={handleUrlSubmit} style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="url"
                  placeholder="https://... (Direct image URL)"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-xs)',
                    border: '1px solid var(--c-border)',
                    fontSize: '0.8rem',
                    background: '#FFFFFF',
                    outline: 'none'
                  }}
                />
                <button type="submit" className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.72rem' }}>
                  Apply
                </button>
              </form>
            </div>

            {successMsg && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#2D6A4F', fontWeight: 500 }}>
                <Check size={16} />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Instagram Profile Quick Link */}
            <div style={{
              marginTop: 'auto',
              paddingTop: '12px',
              borderTop: '1px solid var(--c-border-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <a
                href="https://www.instagram.com/sumanslucknowi?igsi=NWJjZjJzdHozd2k0"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.76rem',
                  color: 'var(--c-gold)',
                  fontWeight: 500
                }}
              >
                <InstagramIcon size={14} color="var(--c-gold)" />
                <span>Open @sumanslucknowi on Instagram to save photos</span>
                <ExternalLink size={12} />
              </a>

              <button onClick={onClose} className="btn-primary" style={{ padding: '8px 20px', fontSize: '0.74rem' }}>
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
