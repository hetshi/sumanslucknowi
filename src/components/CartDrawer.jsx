import React, { useState } from 'react';
import {
  X,
  ShoppingBag,
  Trash2,
  ArrowRight,
  Truck,
  MessageCircle,
  CheckCircle,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CURRENCIES } from '../data/products';

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  currency,
  onOpenCheckout
}) {
  if (!isOpen) return null;

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');

  const curr = CURRENCIES[currency] || CURRENCIES.INR;
  const FREE_SHIPPING_THRESHOLD = 1999;

  const subtotalINR = items.reduce((acc, item) => acc + (item.product.priceINR * item.quantity), 0);
  
  let discountINR = 0;
  if (appliedCoupon === 'LUCKNOW10') {
    discountINR = Math.round(subtotalINR * 0.10);
  } else if (appliedCoupon === 'ROYALFIRST') {
    discountINR = Math.round(subtotalINR * 0.15);
  }

  const finalTotalINR = Math.max(0, subtotalINR - discountINR);
  const finalTotalCurr = Math.round(finalTotalINR * curr.rate);
  const subtotalCurr = Math.round(subtotalINR * curr.rate);
  const discountCurr = Math.round(discountINR * curr.rate);

  const progressPercent = Math.min(100, (subtotalINR / FREE_SHIPPING_THRESHOLD) * 100);
  const amountNeededINR = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotalINR);
  const amountNeededCurr = Math.round(amountNeededINR * curr.rate);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'LUCKNOW10' || code === 'ROYALFIRST') {
      setAppliedCoupon(code);
      setCouponError('');
      try {
        confetti({ particleCount: 40, spread: 50, origin: { y: 0.85 } });
      } catch (e) {}
    } else {
      setCouponError('Invalid code. Try "LUCKNOW10".');
    }
  };

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return;
    let itemsText = items.map((i, idx) => 
      `${idx + 1}. *${i.product.name}*\n   Size: ${i.size} | Qty: ${i.quantity} | Price: ₹${i.product.priceINR * i.quantity}`
    ).join('\n\n');

    const message = encodeURIComponent(
      `Hello Suman's Lucknowi atelier! 🌸\n\nI would like to order the following handcrafted pieces:\n\n${itemsText}\n\n*Subtotal:* ₹${subtotalINR}\n${appliedCoupon ? `*Coupon:* ${appliedCoupon} (-₹${discountINR})\n` : ''}*Total:* ₹${finalTotalINR}\n\nPlease confirm availability and payment instructions!`
    );

    window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
  };

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
            <ShoppingBag size={18} strokeWidth={1.5} style={{ color: 'var(--c-primary)' }} />
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', letterSpacing: '0.04em', color: 'var(--c-primary)' }}>
              Shopping Bag ({items.reduce((a, b) => a + b.quantity, 0)})
            </h3>
          </div>
          <button onClick={onClose} aria-label="Close bag" style={{ color: 'var(--c-primary)' }}>
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div style={{ padding: '14px 24px', background: '#FFFFFF', borderBottom: '1px solid var(--c-border-light)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.74rem', color: 'var(--c-text-primary)', fontWeight: 500, marginBottom: '6px' }}>
            <Truck size={14} strokeWidth={1.5} style={{ color: 'var(--c-gold)' }} />
            {progressPercent >= 100 ? (
              <span>Complimentary Express Shipping unlocked</span>
            ) : (
              <span>Add <strong>{curr.symbol}{amountNeededCurr}</strong> more for <strong>Free Express Shipping</strong></span>
            )}
          </div>

          <div style={{ width: '100%', height: '3px', background: '#EAE3DC', borderRadius: '1.5px', overflow: 'hidden' }}>
            <div style={{
              width: `${progressPercent}%`,
              height: '100%',
              background: 'var(--c-gold)',
              transition: 'width 0.4s ease'
            }} />
          </div>
        </div>

        {/* Cart Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--c-primary)' }}>
                Your Bag is Empty
              </h4>
              <p style={{ fontSize: '0.84rem', color: 'var(--c-text-muted)', marginTop: '6px', marginBottom: '24px' }}>
                Explore authentic pure modal and breathable mulmul Chikankari.
              </p>
              <button onClick={onClose} className="btn-primary" style={{ fontSize: '0.76rem' }}>
                Explore Collections
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {items.map((item) => {
                const itemPriceCurr = Math.round(item.product.priceINR * curr.rate);
                return (
                  <div
                    key={`${item.product.id}-${item.size}`}
                    style={{
                      display: 'flex',
                      gap: '14px',
                      paddingBottom: '18px',
                      borderBottom: '1px solid var(--c-border-light)'
                    }}
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      style={{
                        width: '70px',
                        height: '92px',
                        objectFit: 'cover',
                        borderRadius: 'var(--radius-xs)',
                        flexShrink: 0
                      }}
                    />

                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <h5 style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: '1rem',
                          fontWeight: 500,
                          color: 'var(--c-primary)',
                          lineHeight: 1.25,
                          maxWidth: '220px'
                        }}>
                          {item.product.name}
                        </h5>
                        <button
                          onClick={() => onRemoveItem(item.product.id, item.size)}
                          style={{ color: 'var(--c-text-subtle)', padding: '2px' }}
                          title="Remove item"
                        >
                          <Trash2 size={14} strokeWidth={1.5} />
                        </button>
                      </div>

                      <div style={{ fontSize: '0.72rem', color: 'var(--c-text-muted)', marginTop: '4px', letterSpacing: '0.02em' }}>
                        Size: <strong style={{ color: 'var(--c-primary)' }}>{item.size}</strong> · {item.product.fabricName}
                      </div>

                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: 'auto',
                        paddingTop: '8px'
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          border: '1px solid var(--c-border)',
                          borderRadius: 'var(--radius-xs)'
                        }}>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.size, item.quantity - 1)}
                            style={{ padding: '2px 8px', fontSize: '0.85rem' }}
                          >
                            -
                          </button>
                          <span style={{ padding: '0 6px', fontSize: '0.78rem', fontWeight: 600 }}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.size, item.quantity + 1)}
                            style={{ padding: '2px 8px', fontSize: '0.85rem' }}
                          >
                            +
                          </button>
                        </div>

                        <span style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--c-primary)' }}>
                          {curr.symbol}{(itemPriceCurr * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Summary */}
        {items.length > 0 && (
          <div style={{
            padding: '24px',
            borderTop: '1px solid var(--c-border)',
            background: '#FAF8F5'
          }}>
            {/* Coupon Box */}
            <div style={{ marginBottom: '16px' }}>
              <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="Coupon (e.g. LUCKNOW10)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-xs)',
                    border: '1px solid var(--c-border)',
                    fontSize: '0.76rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    background: '#FFFFFF'
                  }}
                />
                <button type="submit" className="btn-secondary" style={{ padding: '8px 14px', fontSize: '0.72rem' }}>
                  Apply
                </button>
              </form>

              {appliedCoupon && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '6px', fontSize: '0.74rem', color: '#2D6A4F' }}>
                  <CheckCircle size={12} />
                  <span>Code '{appliedCoupon}' Applied</span>
                </div>
              )}
            </div>

            {/* Calculations */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.82rem', marginBottom: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--c-text-muted)' }}>
                <span>Subtotal</span>
                <span>{curr.symbol}{subtotalCurr.toLocaleString('en-IN')}</span>
              </div>

              {discountINR > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#2D6A4F', fontWeight: 500 }}>
                  <span>Savings</span>
                  <span>-{curr.symbol}{discountCurr.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--c-text-muted)' }}>
                <span>Shipping</span>
                <span>{subtotalINR >= FREE_SHIPPING_THRESHOLD ? 'Complimentary' : '₹150'}</span>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '1rem',
                fontWeight: 600,
                color: 'var(--c-primary)',
                paddingTop: '8px',
                borderTop: '1px solid var(--c-border)'
              }}>
                <span>Total</span>
                <span>{curr.symbol}{finalTotalCurr.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                onClick={() => {
                  onClose();
                  onOpenCheckout({ subtotalINR, discountINR, finalTotalINR, items });
                }}
                className="btn-primary"
                style={{ width: '100%', padding: '14px' }}
              >
                <span>Checkout</span>
                <ArrowRight size={14} />
              </button>

              <button
                onClick={handleWhatsAppCheckout}
                className="btn-whatsapp"
                style={{ width: '100%', padding: '12px' }}
              >
                <MessageCircle size={15} />
                <span>Order on WhatsApp with Suman</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
