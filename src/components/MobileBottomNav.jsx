import React from 'react';
import { Home, Sparkles, Heart, ShoppingBag, MessageCircle } from 'lucide-react';

export default function MobileBottomNav({
  activeCategory,
  onSelectCategory,
  wishlistCount,
  onOpenWishlist,
  cartCount,
  onOpenCart,
  onOpenConcierge
}) {
  return (
    <nav className="mobile-bottom-nav">
      <button
        onClick={() => {
          onSelectCategory('all');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2px',
          color: activeCategory === 'all' ? 'var(--c-primary)' : 'var(--c-text-muted)'
        }}
      >
        <Home size={20} />
        <span style={{ fontSize: '0.68rem', fontWeight: 600 }}>Home</span>
      </button>

      <button
        onClick={() => {
          const el = document.getElementById('catalog-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2px',
          color: 'var(--c-text-muted)'
        }}
      >
        <Sparkles size={20} style={{ color: 'var(--c-gold)' }} />
        <span style={{ fontSize: '0.68rem', fontWeight: 600 }}>Shop</span>
      </button>

      <button
        onClick={onOpenWishlist}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2px',
          position: 'relative',
          color: 'var(--c-text-muted)'
        }}
      >
        <Heart size={20} />
        <span style={{ fontSize: '0.68rem', fontWeight: 600 }}>Wishlist</span>
        {wishlistCount > 0 && (
          <span style={{
            position: 'absolute',
            top: '-4px',
            right: '8px',
            background: '#E1306C',
            color: '#fff',
            fontSize: '0.6rem',
            fontWeight: 700,
            borderRadius: '50%',
            width: '15px',
            height: '15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {wishlistCount}
          </span>
        )}
      </button>

      <button
        onClick={onOpenCart}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2px',
          position: 'relative',
          color: 'var(--c-primary)'
        }}
      >
        <ShoppingBag size={20} />
        <span style={{ fontSize: '0.68rem', fontWeight: 700 }}>Bag</span>
        {cartCount > 0 && (
          <span style={{
            position: 'absolute',
            top: '-4px',
            right: '2px',
            background: 'var(--c-primary)',
            color: '#fff',
            fontSize: '0.6rem',
            fontWeight: 700,
            borderRadius: '50%',
            width: '15px',
            height: '15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {cartCount}
          </span>
        )}
      </button>

      <button
        onClick={onOpenConcierge}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2px',
          color: '#25D366'
        }}
      >
        <MessageCircle size={20} />
        <span style={{ fontSize: '0.68rem', fontWeight: 600 }}>WhatsApp</span>
      </button>
    </nav>
  );
}
