import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, Star } from 'lucide-react';
import { CURRENCIES } from '../data/products';

export default function ProductCard({
  product,
  currency,
  isWishlisted,
  onToggleWishlist,
  onOpenQuickView,
  onAddToCart
}) {
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const curr = CURRENCIES[currency] || CURRENCIES.INR;
  const currentPrice = Math.round(product.priceINR * curr.rate);
  const originalPrice = Math.round(product.originalPriceINR * curr.rate);
  const discountPercent = Math.round(((product.originalPriceINR - product.priceINR) / product.originalPriceINR) * 100);

  const currentImage = product.colorVariants && product.colorVariants[selectedColorIdx]
    ? product.colorVariants[selectedColorIdx].img
    : product.images[0];

  return (
    <div
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div
        className="product-card-img-container"
        onClick={() => onOpenQuickView(product)}
        style={{ cursor: 'pointer' }}
      >
        <img
          src={currentImage}
          alt={product.name}
          className="product-card-img"
        />

        {/* Badges Overlay */}
        <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', flexDirection: 'column', gap: '6px', zIndex: 5 }}>
          {product.badge && (
            <span className="badge-pill badge-bestseller">
              {product.badge}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="badge-discount">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            zIndex: 10,
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            color: isWishlisted ? 'var(--c-primary)' : 'var(--c-primary)',
            transition: 'all var(--transition-fast)'
          }}
        >
          <Heart size={16} strokeWidth={1.5} fill={isWishlisted ? 'var(--c-primary)' : 'none'} />
        </button>

        {/* Quick View Button on Hover */}
        <div style={{
          position: 'absolute',
          bottom: '12px',
          left: '12px',
          right: '12px',
          zIndex: 10,
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? 'translateY(0)' : 'translateY(8px)',
          transition: 'all var(--transition-fast)'
        }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenQuickView(product);
            }}
            className="btn-primary"
            style={{
              width: '100%',
              padding: '10px 0',
              fontSize: '0.72rem',
              letterSpacing: '0.12em',
              background: 'rgba(28, 22, 24, 0.95)',
              backdropFilter: 'blur(8px)',
              border: 'none'
            }}
          >
            <Eye size={13} strokeWidth={1.5} />
            <span>View Heirloom</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div style={{ padding: '16px 4px 8px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Fabric & Rating */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--c-text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 500 }}>
            {product.fabricName}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.72rem', color: 'var(--c-text-secondary)' }}>
            <Star size={11} fill="var(--c-gold)" stroke="none" />
            <span style={{ fontWeight: 600 }}>{product.rating}</span>
            <span style={{ color: 'var(--c-text-subtle)', fontSize: '0.68rem' }}>({product.reviewsCount})</span>
          </div>
        </div>

        {/* Product Title */}
        <h4
          onClick={() => onOpenQuickView(product)}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.08rem',
            fontWeight: 500,
            color: 'var(--c-primary)',
            lineHeight: 1.3,
            cursor: 'pointer',
            marginBottom: '8px',
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {product.name}
        </h4>

        {/* Stitches Detail */}
        <div style={{
          fontSize: '0.72rem',
          color: 'var(--c-text-muted)',
          marginBottom: '10px',
          letterSpacing: '0.02em'
        }}>
          Stitches: {product.stitches.slice(0, 2).join(' · ')}
        </div>

        {/* Color Swatches */}
        {product.colorVariants && product.colorVariants.length > 1 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
            {product.colorVariants.map((col, idx) => (
              <button
                key={col.name}
                onClick={() => setSelectedColorIdx(idx)}
                aria-label={`Select ${col.name}`}
                title={col.name}
                style={{
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  backgroundColor: col.hex,
                  border: selectedColorIdx === idx ? '1px solid var(--c-primary)' : '1px solid #D5C8BE',
                  outline: selectedColorIdx === idx ? '2px solid #FFFFFF' : 'none',
                  outlineOffset: '-2px',
                  padding: 0
                }}
              />
            ))}
          </div>
        )}

        {/* Price & Action */}
        <div style={{
          marginTop: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '6px'
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{
              fontSize: '1rem',
              fontWeight: 600,
              color: 'var(--c-primary)',
              letterSpacing: '-0.01em'
            }}>
              {curr.symbol}{currentPrice.toLocaleString('en-IN')}
            </span>
            {originalPrice > currentPrice && (
              <span style={{
                fontSize: '0.8rem',
                color: 'var(--c-text-subtle)',
                textDecoration: 'line-through'
              }}>
                {curr.symbol}{originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <button
            onClick={() => onAddToCart(product, product.sizes[0] || 'M')}
            aria-label="Add to Bag"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.72rem',
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--c-primary)',
              borderBottom: '1px solid var(--c-border-dark)',
              paddingBottom: '2px',
              transition: 'all var(--transition-fast)'
            }}
          >
            <span>Add</span>
            <ShoppingBag size={12} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
