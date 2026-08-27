import React, { useState, useMemo } from 'react';
import { Filter, ArrowUpDown, RefreshCw } from 'lucide-react';
import ProductCard from './ProductCard';
import { CATEGORIES, FABRICS } from '../data/products';

export default function ProductGrid({
  products,
  currency,
  activeCategory,
  onSelectCategory,
  wishlistIds,
  onToggleWishlist,
  onOpenQuickView,
  onAddToCart
}) {
  const [selectedFabric, setSelectedFabric] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [priceMax, setPriceMax] = useState(15000);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
      const matchesFabric = selectedFabric === 'all' || p.fabric === selectedFabric;
      const matchesPrice = p.priceINR <= priceMax;
      return matchesCategory && matchesFabric && matchesPrice;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceINR - b.priceINR;
      if (sortBy === 'price-desc') return b.priceINR - a.priceINR;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return 0;
    });
  }, [products, activeCategory, selectedFabric, priceMax, sortBy]);

  const activeCategoryObj = CATEGORIES.find((c) => c.id === activeCategory) || CATEGORIES[0];

  const resetFilters = () => {
    setSelectedFabric('all');
    setPriceMax(15000);
    setSortBy('featured');
  };

  return (
    <section id="catalog-section" style={{ padding: '80px 0', background: 'var(--c-bg)' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            fontSize: '0.68rem',
            fontWeight: 600,
            letterSpacing: '0.24em',
            color: 'var(--c-gold)',
            textTransform: 'uppercase',
            marginBottom: '8px'
          }}>
            ✦ Atelier Catalog
          </div>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.2rem, 4.2vw, 3.2rem)',
            color: 'var(--c-primary)',
            lineHeight: 1.15
          }}>
            {activeCategoryObj.label}
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--c-text-muted)', marginTop: '8px', letterSpacing: '0.02em' }}>
            Displaying {filteredProducts.length} authentic hand-embroidered heirlooms
          </p>
        </div>

        {/* Category Pill Tabs */}
        <div style={{
          display: 'flex',
          gap: '10px',
          overflowX: 'auto',
          paddingBottom: '20px',
          marginBottom: '28px',
          justifyContent: 'center',
          scrollbarWidth: 'none'
        }}>
          {CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                style={{
                  padding: '8px 18px',
                  borderRadius: 'var(--radius-xs)',
                  fontSize: '0.74rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontWeight: isSelected ? 600 : 400,
                  whiteSpace: 'nowrap',
                  background: isSelected ? 'var(--c-primary)' : '#FFFFFF',
                  color: isSelected ? '#FFFFFF' : 'var(--c-text-secondary)',
                  border: isSelected ? '1px solid var(--c-primary)' : '1px solid var(--c-border)',
                  boxShadow: isSelected ? 'var(--shadow-subtle)' : 'none',
                  transition: 'all var(--transition-fast)'
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Filter Controls Bar */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 24px',
          background: '#FFFFFF',
          borderRadius: 'var(--radius-xs)',
          border: '1px solid var(--c-border)',
          marginBottom: '36px',
          gap: '16px'
        }}>
          {/* Left: Fabric Filters */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.74rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--c-text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Filter size={13} strokeWidth={1.5} />
              <span>Fabric:</span>
            </span>

            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setSelectedFabric('all')}
                style={{
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-xs)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.04em',
                  fontWeight: selectedFabric === 'all' ? 600 : 400,
                  background: selectedFabric === 'all' ? 'var(--c-primary-light)' : 'transparent',
                  color: selectedFabric === 'all' ? 'var(--c-primary)' : 'var(--c-text-secondary)',
                  border: '1px solid',
                  borderColor: selectedFabric === 'all' ? 'var(--c-primary)' : 'var(--c-border-light)'
                }}
              >
                All Fabrics
              </button>
              {FABRICS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setSelectedFabric(f.id)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-xs)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.04em',
                    fontWeight: selectedFabric === f.id ? 600 : 400,
                    background: selectedFabric === f.id ? 'var(--c-primary-light)' : 'transparent',
                    color: selectedFabric === f.id ? 'var(--c-primary)' : 'var(--c-text-secondary)',
                    border: '1px solid',
                    borderColor: selectedFabric === f.id ? 'var(--c-primary)' : 'var(--c-border-light)'
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Sort By & Reset */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ArrowUpDown size={13} strokeWidth={1.5} style={{ color: 'var(--c-text-muted)' }} />
              <span style={{ fontSize: '0.74rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--c-text-muted)', fontWeight: 600 }}>Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: '6px 10px',
                  borderRadius: 'var(--radius-xs)',
                  border: '1px solid var(--c-border)',
                  background: '#FFFFFF',
                  fontSize: '0.74rem',
                  fontWeight: 500,
                  color: 'var(--c-primary)',
                  cursor: 'pointer',
                  outline: 'none'
                }}
              >
                <option value="featured">Featured Curations</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Customer Rating</option>
                <option value="newest">Newest Drops</option>
              </select>
            </div>

            {(selectedFabric !== 'all' || sortBy !== 'featured' || activeCategory !== 'all') && (
              <button
                onClick={() => {
                  resetFilters();
                  onSelectCategory('all');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.72rem',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: 'var(--c-text-muted)',
                  fontWeight: 500
                }}
                title="Reset filters"
              >
                <RefreshCw size={11} />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Product Grid Layout */}
        {filteredProducts.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            columnGap: '28px',
            rowGap: '44px'
          }}>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                currency={currency}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
                onOpenQuickView={onOpenQuickView}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '70px 20px',
            background: '#FFFFFF',
            borderRadius: 'var(--radius-xs)',
            border: '1px dashed var(--c-border)'
          }}>
            <p style={{ fontSize: '1.2rem', color: 'var(--c-primary)', fontFamily: 'var(--font-serif)', marginBottom: '8px' }}>
              No pieces match your selected filter criteria
            </p>
            <p style={{ fontSize: '0.86rem', color: 'var(--c-text-muted)', marginBottom: '24px' }}>
              Broaden your fabric or category selection to view more handcrafted designs.
            </p>
            <button
              onClick={resetFilters}
              className="btn-primary"
              style={{ fontSize: '0.76rem' }}
            >
              Reset Filters & View All
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
