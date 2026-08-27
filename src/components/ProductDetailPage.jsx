import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Star,
  Truck,
  Heart,
  ShoppingBag,
  Ruler,
  Clock,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  Share2,
  CheckCircle,
  HelpCircle,
  RotateCcw
} from 'lucide-react';
import { CURRENCIES, PRODUCTS } from '../data/products';
import ProductCard from './ProductCard';

export default function ProductDetailPage({
  product,
  currency,
  onBack,
  onSelectProduct,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onOpenConcierge,
  allProducts
}) {
  const [selectedImgIdx, setSelectedImgIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M');
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [deliveryStatus, setDeliveryStatus] = useState(null);
  const [sizeChartOpen, setSizeChartOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('details'); // 'details', 'craft', 'care'
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedImgIdx(0);
    setSelectedSize(product.sizes[0] || 'M');
    setQuantity(1);
  }, [product]);

  const curr = CURRENCIES[currency] || CURRENCIES.INR;
  const currentPrice = Math.round(product.priceINR * curr.rate);
  const originalPrice = Math.round(product.originalPriceINR * curr.rate);
  const discountPercent = Math.round(((product.originalPriceINR - product.priceINR) / product.originalPriceINR) * 100);

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

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const generateWhatsAppLink = () => {
    const text = encodeURIComponent(
      `Hello Suman's Lucknowi atelier! 🌸\n\nI would like to order this handcrafted piece:\n*${product.name}*\nSize: ${selectedSize}\nPrice: ₹${product.priceINR}\nSKU: ${product.sku}\nLink: https://instagram.com/sumanslucknowi\n\nPlease confirm availability!`
    );
    return `https://wa.me/919876543210?text=${text}`;
  };

  const relatedProducts = allProducts.filter(p => p.id !== product.id && (p.category === product.category || p.fabric === product.fabric)).slice(0, 3);

  return (
    <div style={{ background: '#FAF8F5', minHeight: '100vh', paddingBottom: '80px' }}>
      {/* Breadcrumb Bar */}
      <div style={{ background: '#FFFFFF', borderBottom: '1px solid var(--c-border)', padding: '14px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.74rem', color: 'var(--c-text-muted)', letterSpacing: '0.04em' }}>
            <button onClick={onBack} style={{ color: 'var(--c-primary)', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 500 }}>
              <ArrowLeft size={14} />
              <span>Back to Collections</span>
            </button>
            <ChevronRight size={12} />
            <span style={{ textTransform: 'capitalize' }}>{product.category.replace('-', ' ')}</span>
            <ChevronRight size={12} />
            <span style={{ color: 'var(--c-primary)', fontWeight: 600 }}>{product.name}</span>
          </div>

          <button
            onClick={handleShare}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.72rem',
              color: 'var(--c-text-secondary)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase'
            }}
          >
            <Share2 size={13} />
            <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* Main PDP Grid */}
      <div className="container" style={{ paddingTop: '40px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '48px',
          alignItems: 'flex-start'
        }}>
          {/* Left Column: Multi-Image Showcase */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'sticky', top: '100px' }}>
            {/* Primary Main Image */}
            <div style={{
              width: '100%',
              aspectRatio: '3/4',
              borderRadius: 'var(--radius-xs)',
              overflow: 'hidden',
              background: '#FFFFFF',
              position: 'relative',
              boxShadow: 'var(--shadow-card)',
              border: '1px solid var(--c-border)'
            }}>
              <img
                src={product.images[selectedImgIdx] || product.images[0]}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />

              <div style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px'
              }}>
                {product.badge && <span className="badge-pill badge-bestseller">{product.badge}</span>}
                {discountPercent > 0 && <span className="badge-discount">{discountPercent}% OFF</span>}
              </div>

              <div style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                background: 'rgba(20,13,16,0.75)',
                color: '#FFFFFF',
                padding: '6px 12px',
                borderRadius: 'var(--radius-xs)',
                fontSize: '0.72rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <Clock size={13} />
                <span>{product.artisanHours}</span>
              </div>
            </div>

            {/* Thumbnail Row */}
            {product.images.length > 1 && (
              <div style={{ display: 'flex', gap: '12px', overflowX: 'auto' }}>
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImgIdx(idx)}
                    style={{
                      width: '74px',
                      height: '96px',
                      borderRadius: 'var(--radius-xs)',
                      overflow: 'hidden',
                      border: selectedImgIdx === idx ? '2px solid var(--c-primary)' : '1px solid var(--c-border)',
                      padding: 0,
                      flexShrink: 0,
                      background: '#FFFFFF'
                    }}
                  >
                    <img src={img} alt={`view ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Information & Actions */}
          <div style={{
            background: '#FFFFFF',
            borderRadius: 'var(--radius-xs)',
            padding: '40px',
            border: '1px solid var(--c-border)',
            boxShadow: 'var(--shadow-subtle)'
          }}>
            {/* Header / SKU */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.74rem', fontWeight: 600, color: 'var(--c-gold)', letterSpacing: '0.16em', textTransform: 'uppercase' }}>
                {product.fabricName}
              </span>
              <span style={{ fontSize: '0.72rem', color: 'var(--c-text-subtle)', letterSpacing: '0.06em' }}>
                SKU: {product.sku}
              </span>
            </div>

            {/* Title */}
            <h1 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)',
              color: 'var(--c-primary)',
              lineHeight: 1.15,
              marginBottom: '12px'
            }}>
              {product.name}
            </h1>

            {/* Rating & Stock */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: 'var(--c-text-secondary)' }}>
                <Star size={14} fill="var(--c-gold)" stroke="none" />
                <span style={{ fontWeight: 600 }}>{product.rating}</span>
                <span style={{ color: 'var(--c-text-muted)' }}>({product.reviewsCount} verified reviews)</span>
              </div>
              <span style={{ fontSize: '0.74rem', color: '#2D6A4F', letterSpacing: '0.04em', fontWeight: 500 }}>
                ● In Stock · Hazratganj Atelier
              </span>
            </div>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px', marginBottom: '24px', paddingBottom: '20px', borderBottom: '1px solid var(--c-border-light)' }}>
              <span style={{ fontSize: '1.8rem', fontWeight: 600, color: 'var(--c-primary)' }}>
                {curr.symbol}{currentPrice.toLocaleString('en-IN')}
              </span>
              {originalPrice > currentPrice && (
                <span style={{ fontSize: '1.1rem', color: 'var(--c-text-subtle)', textDecoration: 'line-through' }}>
                  {curr.symbol}{originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              <span style={{ fontSize: '0.74rem', color: 'var(--c-text-muted)', letterSpacing: '0.04em' }}>
                Inclusive of all taxes & complimentary delivery
              </span>
            </div>

            {/* Description */}
            <p style={{ fontSize: '0.92rem', color: 'var(--c-text-secondary)', lineHeight: 1.7, marginBottom: '24px', fontWeight: 300 }}>
              {product.description}
            </p>

            {/* Package Contents */}
            <div style={{
              background: '#FAF8F5',
              padding: '14px 18px',
              borderRadius: 'var(--radius-xs)',
              fontSize: '0.8rem',
              color: 'var(--c-text-primary)',
              marginBottom: '28px',
              border: '1px solid var(--c-border)'
            }}>
              <strong>Set Includes:</strong> {product.includes}
            </div>

            {/* Size Selector */}
            <div style={{ marginBottom: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <label style={{ fontSize: '0.76rem', fontWeight: 600, color: 'var(--c-primary)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
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
                  <span>Size Chart (Inches & CM)</span>
                </button>
              </div>

              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    style={{
                      padding: '10px 20px',
                      borderRadius: 'var(--radius-xs)',
                      fontSize: '0.84rem',
                      letterSpacing: '0.04em',
                      fontWeight: selectedSize === s ? 600 : 400,
                      background: selectedSize === s ? 'var(--c-primary)' : '#FFFFFF',
                      color: selectedSize === s ? '#FFFFFF' : 'var(--c-text-primary)',
                      border: selectedSize === s ? '1.5px solid var(--c-primary)' : '1px solid var(--c-border)',
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* Size Chart Modal */}
              {sizeChartOpen && (
                <div style={{
                  marginTop: '14px',
                  padding: '16px',
                  background: '#FAF8F5',
                  borderRadius: 'var(--radius-xs)',
                  border: '1px solid var(--c-border)',
                  fontSize: '0.76rem'
                }}>
                  <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--c-border)', color: 'var(--c-text-muted)' }}>
                        <th style={{ padding: '6px' }}>Size</th>
                        <th style={{ padding: '6px' }}>Bust</th>
                        <th style={{ padding: '6px' }}>Waist</th>
                        <th style={{ padding: '6px' }}>Kurta Length</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td style={{ padding: '6px' }}>XS (34)</td><td style={{ padding: '6px' }}>36"</td><td style={{ padding: '6px' }}>32"</td><td style={{ padding: '6px' }}>46"</td></tr>
                      <tr><td style={{ padding: '6px' }}>S (36)</td><td style={{ padding: '6px' }}>38"</td><td style={{ padding: '6px' }}>34"</td><td style={{ padding: '6px' }}>46"</td></tr>
                      <tr><td style={{ padding: '6px' }}>M (38)</td><td style={{ padding: '6px' }}>40"</td><td style={{ padding: '6px' }}>36"</td><td style={{ padding: '6px' }}>46"</td></tr>
                      <tr><td style={{ padding: '6px' }}>L (40)</td><td style={{ padding: '6px' }}>42"</td><td style={{ padding: '6px' }}>38"</td><td style={{ padding: '6px' }}>46"</td></tr>
                      <tr><td style={{ padding: '6px' }}>XL (42)</td><td style={{ padding: '6px' }}>44"</td><td style={{ padding: '6px' }}>40"</td><td style={{ padding: '6px' }}>46"</td></tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Quantity & Cart Actions */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid var(--c-border)',
                borderRadius: 'var(--radius-xs)',
                padding: '4px 10px'
              }}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ padding: '4px 10px', fontSize: '1rem' }}>-</button>
                <span style={{ padding: '0 10px', fontSize: '0.9rem', fontWeight: 600 }}>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} style={{ padding: '4px 10px', fontSize: '1rem' }}>+</button>
              </div>

              <button
                onClick={() => onAddToCart(product, selectedSize, quantity)}
                className="btn-primary"
                style={{ flex: 1, padding: '16px', fontSize: '0.84rem' }}
              >
                <ShoppingBag size={16} />
                <span>Add to Bag · {curr.symbol}{(currentPrice * quantity).toLocaleString('en-IN')}</span>
              </button>

              <button
                onClick={() => onToggleWishlist(product)}
                aria-label="Wishlist"
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: 'var(--radius-xs)',
                  border: '1px solid var(--c-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isWishlisted ? 'var(--c-primary)' : 'var(--c-text-primary)'
                }}
              >
                <Heart size={20} strokeWidth={1.5} fill={isWishlisted ? 'var(--c-primary)' : 'none'} />
              </button>
            </div>

            {/* WhatsApp Direct Order Button */}
            <a
              href={generateWhatsAppLink()}
              target="_blank"
              rel="noreferrer"
              className="btn-whatsapp"
              style={{ width: '100%', marginBottom: '24px', textDecoration: 'none', padding: '14px' }}
            >
              <MessageCircle size={17} />
              <span>Direct WhatsApp Inquiry with Suman</span>
            </a>

            {/* Pincode Delivery Estimator */}
            <div style={{
              padding: '18px',
              background: '#FAF8F5',
              borderRadius: 'var(--radius-xs)',
              border: '1px solid var(--c-border)',
              marginBottom: '32px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.74rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--c-primary)', marginBottom: '10px' }}>
                <Truck size={14} strokeWidth={1.5} />
                <span>Delivery Date & COD Check</span>
              </div>
              <form onSubmit={handleCheckPincode} style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit PIN code (e.g. 226001)"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                  style={{
                    flex: 1,
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-xs)',
                    border: '1px solid var(--c-border)',
                    fontSize: '0.84rem',
                    background: '#FFFFFF',
                    outline: 'none'
                  }}
                />
                <button type="submit" className="btn-secondary" style={{ padding: '10px 18px', fontSize: '0.74rem' }}>
                  Verify
                </button>
              </form>

              {deliveryStatus && (
                <div style={{
                  marginTop: '10px',
                  fontSize: '0.76rem',
                  color: deliveryStatus.valid ? '#2D6A4F' : '#B02A37',
                  fontWeight: 500
                }}>
                  {deliveryStatus.message}
                </div>
              )}
            </div>

            {/* Tabbed Specs: Details, Craft & Care */}
            <div style={{ borderTop: '1px solid var(--c-border)' }}>
              <div style={{ display: 'flex', gap: '24px', borderBottom: '1px solid var(--c-border-light)', padding: '14px 0 10px' }}>
                <button
                  onClick={() => setActiveTab('details')}
                  style={{
                    fontSize: '0.76rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    fontWeight: activeTab === 'details' ? 600 : 400,
                    color: activeTab === 'details' ? 'var(--c-primary)' : 'var(--c-text-muted)',
                    borderBottom: activeTab === 'details' ? '2px solid var(--c-gold)' : 'none',
                    paddingBottom: '8px'
                  }}
                >
                  Garment Details
                </button>
                <button
                  onClick={() => setActiveTab('craft')}
                  style={{
                    fontSize: '0.76rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    fontWeight: activeTab === 'craft' ? 600 : 400,
                    color: activeTab === 'craft' ? 'var(--c-primary)' : 'var(--c-text-muted)',
                    borderBottom: activeTab === 'craft' ? '2px solid var(--c-gold)' : 'none',
                    paddingBottom: '8px'
                  }}
                >
                  Craft & Stitches
                </button>
                <button
                  onClick={() => setActiveTab('care')}
                  style={{
                    fontSize: '0.76rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    fontWeight: activeTab === 'care' ? 600 : 400,
                    color: activeTab === 'care' ? 'var(--c-primary)' : 'var(--c-text-muted)',
                    borderBottom: activeTab === 'care' ? '2px solid var(--c-gold)' : 'none',
                    paddingBottom: '8px'
                  }}
                >
                  Wash Care
                </button>
              </div>

              <div style={{ padding: '16px 0 0', fontSize: '0.84rem', color: 'var(--c-text-secondary)', lineHeight: 1.65 }}>
                {activeTab === 'details' && (
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <li><strong>Fabric:</strong> {product.fabricName}</li>
                    <li><strong>Color:</strong> {product.color}</li>
                    <li><strong>Embroidery:</strong> 100% Handcrafted Lucknowi Chikankari</li>
                    <li><strong>Origin:</strong> Hazratganj, Lucknow, Uttar Pradesh</li>
                  </ul>
                )}

                {activeTab === 'craft' && (
                  <div>
                    <div style={{ marginBottom: '8px' }}><strong>Stitches Employed:</strong> {product.stitches.join(', ')}</div>
                    <p style={{ fontWeight: 300 }}>
                      Hand-embroidered by female master artisans with fine needlework across 32 authentic GI-tagged Awadhi stitches.
                    </p>
                  </div>
                )}

                {activeTab === 'care' && (
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <li>✦ {product.careInstructions}</li>
                    <li>✦ Wrap in pure muslin fabric when storing.</li>
                    <li>✦ Avoid spraying perfume directly onto metal mukaish wire work.</li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* You May Also Admire Recommendations */}
        {relatedProducts.length > 0 && (
          <div style={{ marginTop: '80px', paddingTop: '60px', borderTop: '1px solid var(--c-border)' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.24em', color: 'var(--c-gold)', textTransform: 'uppercase', marginBottom: '6px' }}>
                ✦ Complete The Look
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--c-primary)' }}>
                You May Also Admire
              </h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px' }}>
              {relatedProducts.map((rel) => (
                <ProductCard
                  key={rel.id}
                  product={rel}
                  currency={currency}
                  isWishlisted={false}
                  onToggleWishlist={onToggleWishlist}
                  onOpenQuickView={(p) => onSelectProduct(p)}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
