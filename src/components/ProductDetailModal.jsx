import React, { useState } from 'react';
import {
  X,
  Star,
  Truck,
  Heart,
  ShoppingBag,
  Ruler,
  Clock,
  MessageCircle
} from 'lucide-react';
import { CURRENCIES } from '../data/products';

export default function ProductDetailModal({
  product,
  currency,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onOpenConcierge
}) {
  if (!product) return null;

  const [selectedImgIdx, setSelectedImgIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M');
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [deliveryStatus, setDeliveryStatus] = useState(null);
  const [sizeChartOpen, setSizeChartOpen] = useState(false);

  const curr = CURRENCIES[currency] || CURRENCIES.INR;
  const currentPrice = Math.round(product.priceINR * curr.rate);
  const originalPrice = Math.round(product.originalPriceINR * curr.rate);

  const handleCheckPincode = (e) => {
    e.preventDefault();
    if (!pincode || pincode.length < 6) {
      setDeliveryStatus({ valid: false, message: 'Please enter a valid 6-digit PIN code.' });
      return;
    }
    setDeliveryStatus({
      valid: true,
      message: `Delivery available to ${pincode}! Expected in 3-4 business days via Express Courier. Complimentary Shipping applied.`
    });
  };

  const generateWhatsAppLink = () => {
    const text = encodeURIComponent(
      `Hello Suman's Lucknowi atelier! 🌸\n\nI would like to inquire about this handcrafted piece:\n*${product.name}*\nSize: ${selectedSize}\nPrice: ₹${product.priceINR}\nSKU: ${product.sku}\nLink: https://instagram.com/sumanslucknowi\n\nPlease confirm availability!`
    );
    return `https://wa.me/919876543210?text=${text}`;
  };

  return (
    <div className="drawer-backdrop" onClick={onClose} style={{ alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '960px',
          position: 'relative',
          padding: 0,
          background: '#FFFFFF',
          borderRadius: 'var(--radius-xs)',
          border: '1px solid var(--c-border)'
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close modal"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            zIndex: 20,
            background: '#FFFFFF',
            padding: '8px',
            borderRadius: '50%',
            color: 'var(--c-primary)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}
        >
          <X size={18} strokeWidth={1.5} />
        </button>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))'
        }}>
          {/* Left Column: Image Gallery */}
          <div style={{ padding: '32px', background: '#FAF8F5', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{
              width: '100%',
              aspectRatio: '3/4',
              borderRadius: 'var(--radius-xs)',
              overflow: 'hidden',
              background: '#FFFFFF',
              position: 'relative'
            }}>
              <img
                src={product.images[selectedImgIdx] || product.images[0]}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                bottom: '12px',
                left: '12px',
                background: 'rgba(20,13,16,0.75)',
                color: '#FFFFFF',
                padding: '4px 10px',
                borderRadius: 'var(--radius-xs)',
                fontSize: '0.68rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <Clock size={11} />
                <span>{product.artisanHours}</span>
              </div>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div style={{ display: 'flex', gap: '10px', overflowX: 'auto' }}>
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImgIdx(idx)}
                    style={{
                      width: '60px',
                      height: '76px',
                      borderRadius: 'var(--radius-xs)',
                      overflow: 'hidden',
                      border: selectedImgIdx === idx ? '1.5px solid var(--c-primary)' : '1px solid var(--c-border)',
                      padding: 0,
                      flexShrink: 0
                    }}
                  >
                    <img src={img} alt="thumb" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}

            {/* Stitches Spec */}
            <div style={{
              background: '#FFFFFF',
              borderRadius: 'var(--radius-xs)',
              padding: '16px',
              border: '1px solid var(--c-border)'
            }}>
              <div style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--c-gold)', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: '8px' }}>
                ✦ Traditional Awadhi Stitches:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {product.stitches.map((st) => (
                  <span
                    key={st}
                    style={{
                      fontSize: '0.72rem',
                      background: 'var(--c-bg-subtle)',
                      color: 'var(--c-primary)',
                      padding: '3px 8px',
                      borderRadius: 'var(--radius-xs)',
                      fontWeight: 500
                    }}
                  >
                    {st}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Info & Purchase */}
          <div style={{ padding: '36px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--c-gold)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                {product.fabricName}
              </span>
              <span style={{ fontSize: '0.7rem', color: 'var(--c-text-subtle)', letterSpacing: '0.06em' }}>
                SKU: {product.sku}
              </span>
            </div>

            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.75rem',
              color: 'var(--c-primary)',
              lineHeight: 1.2,
              marginBottom: '10px'
            }}>
              {product.name}
            </h2>

            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--c-text-secondary)' }}>
                <Star size={12} fill="var(--c-gold)" stroke="none" />
                <span style={{ fontWeight: 600 }}>{product.rating}</span>
                <span style={{ color: 'var(--c-text-muted)' }}>({product.reviewsCount} verified reviews)</span>
              </div>
              <span style={{ fontSize: '0.72rem', color: '#2D6A4F', letterSpacing: '0.04em', fontWeight: 500 }}>
                ● Ready to Dispatch
              </span>
            </div>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '16px' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--c-primary)' }}>
                {curr.symbol}{currentPrice.toLocaleString('en-IN')}
              </span>
              {originalPrice > currentPrice && (
                <span style={{ fontSize: '0.98rem', color: 'var(--c-text-subtle)', textDecoration: 'line-through' }}>
                  {curr.symbol}{originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              <span style={{ fontSize: '0.7rem', color: 'var(--c-text-muted)', letterSpacing: '0.04em' }}>
                Inclusive of all taxes & free delivery
              </span>
            </div>

            {/* Description */}
            <p style={{ fontSize: '0.86rem', color: 'var(--c-text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
              {product.description}
            </p>

            {/* Package Contents */}
            <div style={{
              background: '#FAF8F5',
              padding: '10px 14px',
              borderRadius: 'var(--radius-xs)',
              fontSize: '0.76rem',
              color: 'var(--c-text-primary)',
              marginBottom: '20px',
              border: '1px solid var(--c-border)'
            }}>
              <strong>Set Includes:</strong> {product.includes}
            </div>

            {/* Size Selector */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label style={{ fontSize: '0.74rem', fontWeight: 600, color: 'var(--c-primary)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Select Size:
                </label>
                <button
                  onClick={() => setSizeChartOpen(!sizeChartOpen)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.74rem',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: 'var(--c-gold)',
                    fontWeight: 500
                  }}
                >
                  <Ruler size={13} />
                  <span>Size Chart</span>
                </button>
              </div>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: 'var(--radius-xs)',
                      fontSize: '0.8rem',
                      letterSpacing: '0.04em',
                      fontWeight: selectedSize === s ? 600 : 400,
                      background: selectedSize === s ? 'var(--c-primary)' : '#FFFFFF',
                      color: selectedSize === s ? '#FFFFFF' : 'var(--c-text-primary)',
                      border: selectedSize === s ? '1px solid var(--c-primary)' : '1px solid var(--c-border)',
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* Size Chart */}
              {sizeChartOpen && (
                <div style={{
                  marginTop: '12px',
                  padding: '14px',
                  background: '#FAF8F5',
                  borderRadius: 'var(--radius-xs)',
                  border: '1px solid var(--c-border)',
                  fontSize: '0.74rem'
                }}>
                  <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--c-border)', color: 'var(--c-text-muted)' }}>
                        <th style={{ padding: '4px' }}>Size</th>
                        <th style={{ padding: '4px' }}>Bust</th>
                        <th style={{ padding: '4px' }}>Waist</th>
                        <th style={{ padding: '4px' }}>Length</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td style={{ padding: '4px' }}>XS (34)</td><td style={{ padding: '4px' }}>36"</td><td style={{ padding: '4px' }}>32"</td><td style={{ padding: '4px' }}>46"</td></tr>
                      <tr><td style={{ padding: '4px' }}>S (36)</td><td style={{ padding: '4px' }}>38"</td><td style={{ padding: '4px' }}>34"</td><td style={{ padding: '4px' }}>46"</td></tr>
                      <tr><td style={{ padding: '4px' }}>M (38)</td><td style={{ padding: '4px' }}>40"</td><td style={{ padding: '4px' }}>36"</td><td style={{ padding: '46"' }}>46"</td></tr>
                      <tr><td style={{ padding: '4px' }}>L (40)</td><td style={{ padding: '4px' }}>42"</td><td style={{ padding: '4px' }}>38"</td><td style={{ padding: '4px' }}>46"</td></tr>
                      <tr><td style={{ padding: '4px' }}>XL (42)</td><td style={{ padding: '4px' }}>44"</td><td style={{ padding: '4px' }}>40"</td><td style={{ padding: '4px' }}>46"</td></tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Add to Bag & Actions */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '14px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid var(--c-border)',
                borderRadius: 'var(--radius-xs)',
                padding: '4px 8px'
              }}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ padding: '2px 8px', fontSize: '0.9rem' }}>-</button>
                <span style={{ padding: '0 8px', fontSize: '0.85rem', fontWeight: 600 }}>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} style={{ padding: '2px 8px', fontSize: '0.9rem' }}>+</button>
              </div>

              <button
                onClick={() => {
                  onAddToCart(product, selectedSize, quantity);
                  onClose();
                }}
                className="btn-primary"
                style={{ flex: 1, padding: '14px' }}
              >
                <ShoppingBag size={15} />
                <span>Add to Bag · {curr.symbol}{(currentPrice * quantity).toLocaleString('en-IN')}</span>
              </button>

              <button
                onClick={() => onToggleWishlist(product)}
                aria-label="Wishlist"
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: 'var(--radius-xs)',
                  border: '1px solid var(--c-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isWishlisted ? 'var(--c-primary)' : 'var(--c-text-primary)'
                }}
              >
                <Heart size={18} strokeWidth={1.5} fill={isWishlisted ? 'var(--c-primary)' : 'none'} />
              </button>
            </div>

            {/* WhatsApp Concierge Action */}
            <a
              href={generateWhatsAppLink()}
              target="_blank"
              rel="noreferrer"
              className="btn-whatsapp"
              style={{ width: '100%', marginBottom: '18px', textDecoration: 'none' }}
            >
              <MessageCircle size={15} />
              <span>Direct WhatsApp Inquiry with Suman</span>
            </a>

            {/* PIN Code Checker */}
            <div style={{
              padding: '14px',
              background: '#FAF8F5',
              borderRadius: 'var(--radius-xs)',
              border: '1px solid var(--c-border)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--c-primary)', marginBottom: '8px' }}>
                <Truck size={13} strokeWidth={1.5} />
                <span>Estimated Delivery</span>
              </div>
              <form onSubmit={handleCheckPincode} style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit PIN code"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-xs)',
                    border: '1px solid var(--c-border)',
                    fontSize: '0.8rem',
                    background: '#FFFFFF'
                  }}
                />
                <button type="submit" className="btn-secondary" style={{ padding: '8px 14px', fontSize: '0.72rem' }}>
                  Verify
                </button>
              </form>

              {deliveryStatus && (
                <div style={{
                  marginTop: '8px',
                  fontSize: '0.72rem',
                  color: deliveryStatus.valid ? '#2D6A4F' : '#B02A37',
                  fontWeight: 500
                }}>
                  {deliveryStatus.message}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
