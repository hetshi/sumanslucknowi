import React, { useState, useEffect, useMemo } from 'react';
import AnnouncementBar from './components/AnnouncementBar';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import ReelStories from './components/ReelStories';
import FabricCollection from './components/FabricCollection';
import OccasionCollection from './components/OccasionCollection';
import ProductGrid from './components/ProductGrid';
import ProductDetailPage from './components/ProductDetailPage';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import HeritageStory from './components/HeritageStory';
import CustomerReviews from './components/CustomerReviews';
import InstagramFeed from './components/InstagramFeed';
import ConciergeModal from './components/ConciergeModal';
import CheckoutModal from './components/CheckoutModal';
import ImageManagerModal from './components/ImageManagerModal';
import MobileBottomNav from './components/MobileBottomNav';
import Footer from './components/Footer';
import Toast from './components/Toast';

import { PRODUCTS } from './data/products';
import { Camera } from 'lucide-react';

export default function App() {
  // Navigation & Page State
  const [activeCategory, setActiveCategory] = useState('all');
  const [currency, setCurrency] = useState('INR');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Custom Images Manager (persisted in localStorage)
  const [customImages, setCustomImages] = useState(() => {
    try {
      const saved = localStorage.getItem('sl_custom_images');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const handleUpdateImage = (key, dataUrl) => {
    setCustomImages((prev) => {
      const updated = { ...prev, [key]: dataUrl };
      try {
        localStorage.setItem('sl_custom_images', JSON.stringify(updated));
      } catch (e) { }
      return updated;
    });
  };

  const handleResetImages = () => {
    setCustomImages({});
    try {
      localStorage.removeItem('sl_custom_images');
    } catch (e) { }
  };

  // Map custom images to products
  const productsWithCustomImages = useMemo(() => {
    return PRODUCTS.map((p) => {
      let customImg = null;
      if (p.id === 'sl-001' && customImages['modal_kurta']) customImg = customImages['modal_kurta'];
      if (p.id === 'sl-002' && customImages['georgette_anarkali']) customImg = customImages['georgette_anarkali'];
      if (p.id === 'sl-003' && customImages['mulmul_white']) customImg = customImages['mulmul_white'];
      if (p.id === 'sl-004' && customImages['chanderi_saree']) customImg = customImages['chanderi_saree'];
      if (p.id === 'sl-005' && customImages['peplum_kurti']) customImg = customImages['peplum_kurti'];
      if (p.id === 'sl-006' && customImages['mens_kurta']) customImg = customImages['mens_kurta'];

      if (customImg) {
        return {
          ...p,
          images: [customImg, ...p.images.slice(1)]
        };
      }
      return p;
    });
  }, [customImages]);

  // Cart & Wishlist State
  const [cartItems, setCartItems] = useState([
    {
      product: productsWithCustomImages[0],
      size: 'M',
      quantity: 1
    }
  ]);
  const [wishlistIds, setWishlistIds] = useState(['sl-002', 'sl-004']);

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const [isImageManagerOpen, setIsImageManagerOpen] = useState(false);
  const [checkoutData, setCheckoutData] = useState(null);
  const [toast, setToast] = useState(null);

  // Sync selectedProduct on history / popstate
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const prodId = params.get('product');
      if (prodId) {
        const prod = productsWithCustomImages.find(p => p.id === prodId);
        if (prod) setSelectedProduct(prod);
      } else {
        setSelectedProduct(null);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [productsWithCustomImages]);

  // Auto-dismiss toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Navigation to Product Page
  const handleNavigateToProduct = (product) => {
    setSelectedProduct(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const url = new URL(window.location);
    url.searchParams.set('product', product.id);
    window.history.pushState({}, '', url);
  };

  const handleBackToHome = () => {
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const url = new URL(window.location);
    url.searchParams.delete('product');
    window.history.pushState({}, '', url);
  };

  // Add to cart
  const handleAddToCart = (product, size = 'M', quantity = 1) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex((item) => item.product.id === product.id && item.size === size);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      }
      return [...prev, { product, size, quantity }];
    });

    setToast({
      type: 'cart',
      title: 'Added to Bag',
      message: `${product.name} (Size ${size}) added to your shopping bag.`
    });
  };

  // Update Cart Quantity
  const handleUpdateQuantity = (productId, size, newQty) => {
    if (newQty <= 0) {
      handleRemoveFromCart(productId, size);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.size === size
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  // Remove from cart
  const handleRemoveFromCart = (productId, size) => {
    setCartItems((prev) => prev.filter((item) => !(item.product.id === productId && item.size === size)));
  };

  // Wishlist toggle
  const handleToggleWishlist = (product) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(product.id);
      if (exists) {
        setToast({
          type: 'wishlist-remove',
          title: 'Removed from Wishlist',
          message: `${product.name} removed from your saved items.`
        });
        return prev.filter((id) => id !== product.id);
      } else {
        setToast({
          type: 'wishlist',
          title: 'Saved to Wishlist',
          message: `${product.name} added to your wishlist.`
        });
        return [...prev, product.id];
      }
    });
  };

  const handleSelectProductById = (productId) => {
    const prod = productsWithCustomImages.find((p) => p.id === productId);
    if (prod) {
      handleNavigateToProduct(prod);
    }
  };

  const handleScrollToCraft = () => {
    if (selectedProduct) setSelectedProduct(null);
    setTimeout(() => {
      const el = document.getElementById('heritage-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSelectCategoryAndScroll = (catId) => {
    if (selectedProduct) setSelectedProduct(null);
    setActiveCategory(catId);
    setTimeout(() => {
      const el = document.getElementById('catalog-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSelectFabricAndFilter = (fabricId) => {
    if (selectedProduct) setSelectedProduct(null);
    setActiveCategory('all');
    setTimeout(() => {
      const el = document.getElementById('catalog-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* 1. Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Header / Navigation */}
      <Navbar
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenConcierge={() => setIsConciergeOpen(true)}
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategoryAndScroll}
        currency={currency}
        onSelectCurrency={setCurrency}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        allProducts={productsWithCustomImages}
        onSelectProduct={handleNavigateToProduct}
      />

      {/* Main Page View: Either Dedicated Product Page or Full Lookbook Storefront */}
      {selectedProduct ? (
        <ProductDetailPage
          product={selectedProduct}
          currency={currency}
          onBack={handleBackToHome}
          onSelectProduct={handleNavigateToProduct}
          isWishlisted={wishlistIds.includes(selectedProduct.id)}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={handleAddToCart}
          onOpenConcierge={() => setIsConciergeOpen(true)}
          allProducts={productsWithCustomImages}
        />
      ) : (
        <main style={{ flex: 1 }}>
          {/* 3. Hero Banner */}
          <HeroBanner
            onSelectCategory={handleSelectCategoryAndScroll}
            onScrollToCraft={handleScrollToCraft}
          />

          {/* 4. Stories / Visual Journal */}
          <ReelStories onSelectProductById={handleSelectProductById} />

          {/* 5. Fabric Collection */}
          <FabricCollection onSelectFabric={handleSelectFabricAndFilter} />

          {/* 6. Occasions Collection */}
          <OccasionCollection onSelectCategory={handleSelectCategoryAndScroll} />

          {/* 7. Product Catalog */}
          <ProductGrid
            products={productsWithCustomImages}
            currency={currency}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onOpenQuickView={handleNavigateToProduct}
            onAddToCart={handleAddToCart}
          />

          {/* 8. Awadh Heritage Story */}
          <HeritageStory />

          {/* 9. Reviews */}
          <CustomerReviews />

          {/* 10. Instagram Feed */}
          <InstagramFeed />
        </main>
      )}

      {/* Floating Instagram Photo Uploader Trigger */}
      <button
        onClick={() => setIsImageManagerOpen(true)}
        style={{
          position: 'fixed',
          bottom: '24px',
          left: '24px',
          zIndex: 40,
          background: 'rgba(28, 22, 24, 0.94)',
          backdropFilter: 'blur(8px)',
          color: '#FFFFFF',
          border: '1px solid rgba(255,255,255,0.2)',
          padding: '10px 16px',
          borderRadius: 'var(--radius-xs)',
          fontSize: '0.74rem',
          fontWeight: 500,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
          transition: 'all var(--transition-fast)'
        }}
        title="Upload photos from Instagram"
      >
        <Camera size={14} style={{ color: 'var(--c-gold)' }} />
        <span>Manage / Upload Brand Photos</span>
      </button>

      {/* 11. Footer */}
      <Footer
        onSelectCategory={handleSelectCategoryAndScroll}
        onOpenConcierge={() => setIsConciergeOpen(true)}
      />

      {/* 12. Mobile Bottom Navigation */}
      <MobileBottomNav
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategoryAndScroll}
        wishlistCount={wishlistIds.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenConcierge={() => setIsConciergeOpen(true)}
      />

      {/* Drawers & Modals */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        currency={currency}
        onOpenCheckout={(data) => setCheckoutData(data)}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlistIds}
        products={productsWithCustomImages}
        currency={currency}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onOpenQuickView={handleNavigateToProduct}
      />

      <ConciergeModal
        isOpen={isConciergeOpen}
        onClose={() => setIsConciergeOpen(false)}
      />

      <ImageManagerModal
        isOpen={isImageManagerOpen}
        onClose={() => setIsImageManagerOpen(false)}
        customImages={customImages}
        onUpdateImage={handleUpdateImage}
        onResetImages={handleResetImages}
      />

      <CheckoutModal
        isOpen={!!checkoutData}
        onClose={() => setCheckoutData(null)}
        checkoutData={checkoutData}
        currency={currency}
        onOrderComplete={() => {
          setCartItems([]);
        }}
      />

      {/* Toast Notification */}
      <Toast
        toast={toast}
        onClose={() => setToast(null)}
        onOpenCart={() => setIsCartOpen(true)}
      />
    </div>
  );
}
