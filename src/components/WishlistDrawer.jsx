import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { CURRENCIES } from '../data/products';

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlistIds,
  products,
  currency,
  onToggleWishlist,
  onAddToCart,
  onOpenQuickView
}) {
  if (!isOpen) return null;

  const curr = CURRENCIES[currency] || CURRENCIES.INR;
  const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="slide-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={{
          padding: '24px',
          borderBottom: '1px solid var(--c-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#FAF8F5'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Heart size={18} strokeWidth={1.5} fill="var(--c-primary)" color="var(--c-primary)" />
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', letterSpacing: '0.04em', color: 'var(--c-primary)' }}>
              Saved Wishlist ({wishlistedProducts.length})
            </h3>
          </div>
          <button onClick={onClose} aria-label="Close wishlist" style={{ color: 'var(--c-primary)' }}>
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Items List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          {wishlistedProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--c-primary)' }}>
                Your Wishlist is Empty
              </h4>
              <p style={{ fontSize: '0.84rem', color: 'var(--c-text-muted)', marginTop: '6px', marginBottom: '24px' }}>
                Save your favorite handcrafted silhouettes for upcoming festivities.
              </p>
              <button onClick={onClose} className="btn-primary" style={{ fontSize: '0.76rem' }}>
                Explore Collections
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {wishlistedProducts.map((product) => {
                const itemPriceCurr = Math.round(product.priceINR * curr.rate);
                return (
                  <div
                    key={product.id}
                    style={{
                      display: 'flex',
                      gap: '14px',
                      paddingBottom: '18px',
                      borderBottom: '1px solid var(--c-border-light)'
                    }}
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      style={{
                        width: '70px',
                        height: '92px',
                        objectFit: 'cover',
                        borderRadius: 'var(--radius-xs)',
                        flexShrink: 0,
                        cursor: 'pointer'
                      }}
                      onClick={() => {
                        onClose();
                        onOpenQuickView(product);
                      }}
                    />

                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <h5
                          onClick={() => {
                            onClose();
                            onOpenQuickView(product);
                          }}
                          style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: '1rem',
                            fontWeight: 500,
                            color: 'var(--c-primary)',
                            lineHeight: 1.25,
                            cursor: 'pointer'
                          }}
                        >
                          {product.name}
                        </h5>
                        <button
                          onClick={() => onToggleWishlist(product)}
                          style={{ color: 'var(--c-text-subtle)', padding: '2px' }}
                          title="Remove"
                        >
                          <Trash2 size={14} strokeWidth={1.5} />
                        </button>
                      </div>

                      <div style={{ fontSize: '0.72rem', color: 'var(--c-text-muted)', marginTop: '4px' }}>
                        {product.fabricName}
                      </div>

                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: 'auto',
                        paddingTop: '8px'
                      }}>
                        <span style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--c-primary)' }}>
                          {curr.symbol}{itemPriceCurr.toLocaleString('en-IN')}
                        </span>

                        <button
                          onClick={() => {
                            onAddToCart(product, product.sizes[0] || 'M');
                            onToggleWishlist(product);
                          }}
                          className="btn-primary"
                          style={{ padding: '6px 12px', fontSize: '0.7rem' }}
                        >
                          <ShoppingBag size={12} />
                          <span>Move to Bag</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
