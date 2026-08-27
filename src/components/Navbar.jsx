import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import InstagramIcon from './icons/InstagramIcon';
import { CATEGORIES, CURRENCIES } from '../data/products';

export default function Navbar({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenConcierge,
  activeCategory,
  onSelectCategory,
  currency,
  onSelectCurrency,
  searchQuery,
  onSearchChange,
  allProducts,
  onSelectProduct
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const searchResults = searchQuery.trim()
    ? allProducts.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.fabricName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.stitches.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 4)
    : [];

  return (
    <>
      <header className={`header-glass ${isScrolled ? 'header-shadow' : ''}`}>
        <div className="container">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: isScrolled ? '6px 0' : '18px 0',
            transition: 'padding 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
          }}>
            {/* Left: Mobile Menu & Brand Seal */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', minWidth: '180px' }}>
              <button
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open navigation menu"
                style={{ display: 'flex', alignItems: 'center', color: 'var(--c-primary)' }}
                className="mobile-menu-btn"
              >
                <Menu size={22} strokeWidth={1.5} />
              </button>

              <button
                onClick={() => onSelectCategory('all')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer'
                }}
                className="desktop-only"
                title="Suman's Lucknowi"
                aria-label="Suman's Lucknowi Home"
              >
                <img
                  src="/images/brand_logo.png"
                  alt="Suman's Lucknowi Seal"
                  style={{
                    width: isScrolled ? '42px' : '68px',
                    height: isScrolled ? '42px' : '68px',
                    borderRadius: '50%',
                    objectFit: 'contain',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
                    border: '1.5px solid rgba(197, 160, 89, 0.4)',
                    background: '#FFFFFF',
                    transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'scale(1.06)';
                    e.currentTarget.style.boxShadow = '0 6px 18px rgba(197, 160, 89, 0.35)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.08)';
                  }}
                />
              </button>
            </div>

            {/* Center: Luxury Logo */}
            <div
              style={{ textAlign: 'center', cursor: 'pointer', userSelect: 'none' }}
              onClick={() => onSelectCategory('all')}
            >
              <div style={{
                fontSize: '0.58rem',
                letterSpacing: '0.28em',
                fontWeight: 600,
                textTransform: 'uppercase',
                color: 'var(--c-gold)',
                marginBottom: isScrolled ? '0px' : '3px',
                maxHeight: isScrolled ? '0px' : '20px',
                opacity: isScrolled ? 0 : 1,
                overflow: 'hidden',
                transition: 'all 0.3s ease'
              }}>
                HAZRATGANJ · LUCKNOW
              </div>
              <h1 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: isScrolled ? '1.35rem' : 'clamp(1.6rem, 3vw, 2.1rem)',
                fontWeight: 400,
                letterSpacing: '0.12em',
                color: 'var(--c-primary)',
                lineHeight: 1,
                transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
              }}>
                SUMAN'S LUCKNOWI
              </h1>
              <div style={{
                fontSize: '0.6rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--c-text-muted)',
                marginTop: isScrolled ? '0px' : '4px',
                maxHeight: isScrolled ? '0px' : '20px',
                opacity: isScrolled ? 0 : 1,
                overflow: 'hidden',
                fontWeight: 400,
                transition: 'all 0.3s ease'
              }}>
                Authentic Handcrafted Chikankari
              </div>
            </div>

            {/* Right: Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: '180px', justifyContent: 'flex-end' }}>
              {/* Currency Selector */}
              <div style={{ position: 'relative' }} className="desktop-only">
                <select
                  value={currency}
                  onChange={(e) => onSelectCurrency(e.target.value)}
                  aria-label="Select Currency"
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid var(--c-border)',
                    borderRadius: 'var(--radius-xs)',
                    padding: isScrolled ? '4px 8px' : '6px 10px',
                    fontSize: '0.72rem',
                    fontWeight: 500,
                    letterSpacing: '0.06em',
                    color: 'var(--c-primary)',
                    cursor: 'pointer',
                    outline: 'none',
                    transition: 'padding 0.3s ease'
                  }}
                >
                  {Object.keys(CURRENCIES).map((c) => (
                    <option key={c} value={c}>
                      {c} ({CURRENCIES[c].symbol})
                    </option>
                  ))}
                </select>
              </div>

              {/* Search Toggle */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Search"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '6px',
                  color: 'var(--c-primary)'
                }}
              >
                <Search size={18} strokeWidth={1.5} />
              </button>

              {/* Wishlist Button */}
              <button
                onClick={onOpenWishlist}
                aria-label="Wishlist"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '6px',
                  position: 'relative',
                  color: 'var(--c-primary)'
                }}
              >
                <Heart size={18} strokeWidth={1.5} fill="none" />
                {wishlistCount > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '-1px',
                    right: '-1px',
                    background: 'var(--c-primary)',
                    color: '#FFFFFF',
                    fontSize: '0.58rem',
                    fontWeight: 600,
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Bag Button */}
              <button
                onClick={onOpenCart}
                aria-label="Shopping Bag"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '7px',
                  background: 'var(--c-primary)',
                  color: '#FFFFFF',
                  padding: isScrolled ? '6px 12px' : '8px 16px',
                  borderRadius: 'var(--radius-xs)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  transition: 'all var(--transition-fast)'
                }}
              >
                <ShoppingBag size={14} strokeWidth={1.5} />
                <span className="desktop-only">Bag</span>
                <span style={{
                  background: 'rgba(255,255,255,0.22)',
                  fontSize: '0.64rem',
                  padding: '1px 5px',
                  borderRadius: '8px',
                  fontWeight: 600
                }}>
                  {cartCount}
                </span>
              </button>
            </div>
          </div>

          {/* Category Navigation Bar (Desktop) */}
          <nav
            className="desktop-only nav-category-scroll"
            style={{
              borderTop: '1px solid var(--c-border-light)',
              padding: isScrolled ? '6px 16px' : '10px 16px',
              overflowX: 'auto',
              scrollbarWidth: 'none',
              width: '100%',
              boxSizing: 'border-box',
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: isScrolled ? 'clamp(12px, 1.6vw, 20px)' : 'clamp(14px, 2vw, 26px)',
              minWidth: 'max-content',
              margin: '0 auto',
              padding: '0 8px'
            }}>
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => onSelectCategory(cat.id)}
                    style={{
                      fontSize: isScrolled ? '0.73rem' : '0.76rem',
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? 'var(--c-primary)' : 'var(--c-text-secondary)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                      position: 'relative',
                      padding: '4px 2px',
                      transition: 'color var(--transition-fast)'
                    }}
                    onMouseOver={(e) => {
                      if (!isActive) e.currentTarget.style.color = 'var(--c-primary)';
                    }}
                    onMouseOut={(e) => {
                      if (!isActive) e.currentTarget.style.color = 'var(--c-text-secondary)';
                    }}
                  >
                    {cat.label}
                    {isActive && (
                      <span style={{
                        position: 'absolute',
                        bottom: '-1px',
                        left: '0',
                        right: '0',
                        height: '2px',
                        background: 'linear-gradient(90deg, var(--c-primary), var(--c-gold))',
                        borderRadius: '2px'
                      }} />
                    )}
                  </button>
                );
              })}

              <button
                onClick={onOpenConcierge}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  color: 'var(--c-gold-hover)',
                  padding: isScrolled ? '3px 10px' : '5px 12px',
                  borderRadius: 'var(--radius-xs)',
                  background: 'var(--c-gold-light)',
                  border: '1px solid var(--c-gold-border)',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <Sparkles size={11} />
                <span>Bespoke Sizing</span>
              </button>
            </div>
          </nav>
        </div>

        {/* Minimal Search Drawer */}
        {searchOpen && (
          <div style={{
            background: '#FFFFFF',
            borderTop: '1px solid var(--c-border)',
            borderBottom: '1px solid var(--c-border)',
            padding: '20px 0',
            boxShadow: 'var(--shadow-dropdown)'
          }}>
            <div className="container">
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', position: 'relative' }}>
                <Search size={18} strokeWidth={1.5} style={{ color: 'var(--c-text-muted)' }} />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search collections by fabric, stitch type, silhouette..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  style={{
                    width: '100%',
                    border: 'none',
                    outline: 'none',
                    fontSize: '0.98rem',
                    color: 'var(--c-primary)',
                    fontFamily: 'var(--font-sans)',
                    letterSpacing: '0.02em'
                  }}
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange('')}
                    style={{ color: 'var(--c-text-muted)', padding: '4px' }}
                  >
                    <X size={16} />
                  </button>
                )}
                <button
                  onClick={() => setSearchOpen(false)}
                  style={{
                    fontSize: '0.76rem',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--c-primary)',
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-xs)',
                    background: 'var(--c-bg-subtle)'
                  }}
                >
                  Close
                </button>
              </div>

              {/* Instant Search Results */}
              {searchQuery.trim() && (
                <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--c-border-light)' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.12em', color: 'var(--c-text-muted)', textTransform: 'uppercase', marginBottom: '12px' }}>
                    Matching Heirlooms ({searchResults.length})
                  </div>
                  {searchResults.length > 0 ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
                      {searchResults.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => {
                            onSelectProduct(item);
                            setSearchOpen(false);
                          }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '14px',
                            padding: '10px',
                            borderRadius: 'var(--radius-xs)',
                            border: '1px solid var(--c-border)',
                            cursor: 'pointer',
                            background: '#FAF8F5',
                            transition: 'all var(--transition-fast)'
                          }}
                        >
                          <img
                            src={item.images[0]}
                            alt={item.name}
                            style={{ width: '52px', height: '66px', objectFit: 'cover', borderRadius: 'var(--radius-xs)' }}
                          />
                          <div style={{ overflow: 'hidden' }}>
                            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '0.98rem', color: 'var(--c-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {item.name}
                            </div>
                            <div style={{ fontSize: '0.72rem', color: 'var(--c-text-muted)', letterSpacing: '0.04em' }}>
                              {item.fabricName}
                            </div>
                            <div style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--c-primary)', marginTop: '2px' }}>
                              ₹{item.priceINR.toLocaleString('en-IN')}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ fontSize: '0.86rem', color: 'var(--c-text-muted)', padding: '10px 0' }}>
                      No matching handcrafted pieces found for "{searchQuery}".
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="drawer-backdrop" onClick={() => setMobileMenuOpen(false)}>
          <div
            className="slide-drawer"
            style={{ left: 0, right: 'auto' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{
              padding: '24px',
              borderBottom: '1px solid var(--c-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#FAF8F5'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <img
                  src="/images/brand_logo.png"
                  alt="Suman's Lucknowi"
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    objectFit: 'contain',
                    border: '1.5px solid rgba(197, 160, 89, 0.35)',
                    background: '#FFFFFF'
                  }}
                />
                <div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', letterSpacing: '0.08em', color: 'var(--c-primary)', lineHeight: 1.2 }}>
                    SUMAN'S LUCKNOWI
                  </h3>
                  <span style={{ fontSize: '0.68rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--c-text-muted)' }}>
                    Hazratganj, Lucknow
                  </span>
                </div>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--c-primary)' }}>
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>

            <div style={{ padding: '16px 24px', background: '#FFFFFF', borderBottom: '1px solid var(--c-border)' }}>
              <label style={{ fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--c-text-muted)', display: 'block', marginBottom: '6px' }}>
                Currency:
              </label>
              <select
                value={currency}
                onChange={(e) => onSelectCurrency(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-xs)',
                  border: '1px solid var(--c-border)',
                  background: '#FAF8F5',
                  fontSize: '0.84rem'
                }}
              >
                {Object.keys(CURRENCIES).map((c) => (
                  <option key={c} value={c}>
                    {c} ({CURRENCIES[c].symbol})
                  </option>
                ))}
              </select>
            </div>

            <div style={{ padding: '20px 24px', flex: 1, overflowY: 'auto' }}>
              <div style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.16em', color: 'var(--c-text-subtle)', textTransform: 'uppercase', marginBottom: '16px' }}>
                Collections
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {CATEGORIES.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        onSelectCategory(cat.id);
                        setMobileMenuOpen(false);
                      }}
                      style={{
                        textAlign: 'left',
                        padding: '12px 14px',
                        borderRadius: 'var(--radius-xs)',
                        background: isActive ? 'var(--c-bg-subtle)' : 'transparent',
                        color: isActive ? 'var(--c-primary)' : 'var(--c-text-secondary)',
                        fontWeight: isActive ? 600 : 400,
                        fontSize: '0.88rem',
                        letterSpacing: '0.04em',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <span>{cat.label}</span>
                      <ArrowRight size={14} style={{ opacity: isActive ? 1 : 0.3 }} />
                    </button>
                  );
                })}
              </div>

              <div style={{ marginTop: '32px', paddingTop: '20px', borderTop: '1px solid var(--c-border)' }}>
                <button
                  onClick={() => {
                    onOpenConcierge();
                    setMobileMenuOpen(false);
                  }}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: 'var(--radius-xs)',
                    background: 'var(--c-gold-light)',
                    border: '1px solid var(--c-gold-border)',
                    color: 'var(--c-gold-hover)',
                    fontWeight: 500,
                    fontSize: '0.8rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    marginBottom: '12px'
                  }}
                >
                  <Sparkles size={14} />
                  <span>Bespoke & Bridal Sizing</span>
                </button>

                <a
                  href="https://www.instagram.com/sumanslucknowi?igsi=NWJjZjJzdHozd2k0"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '12px',
                    borderRadius: 'var(--radius-xs)',
                    background: '#FFFFFF',
                    border: '1px solid var(--c-border)',
                    color: 'var(--c-text-secondary)',
                    fontSize: '0.8rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase'
                  }}
                >
                  <InstagramIcon size={14} color="var(--c-primary)" />
                  <span>@sumanslucknowi</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .nav-category-scroll::-webkit-scrollbar {
          display: none;
        }
        @media (max-width: 900px) {
          .desktop-only {
            display: none !important;
          }
        }
        @media (min-width: 901px) {
          .mobile-menu-btn {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
