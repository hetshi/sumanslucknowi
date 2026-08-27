import React from 'react';
import { CheckCircle2, ShoppingBag, Heart, X } from 'lucide-react';

export default function Toast({ toast, onClose, onOpenCart }) {
  if (!toast) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '30px',
      right: '24px',
      zIndex: 120,
      background: 'rgba(74, 21, 37, 0.96)',
      backdropFilter: 'blur(8px)',
      color: '#FFFFFF',
      borderRadius: '8px',
      padding: '14px 20px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      maxWidth: '380px',
      animation: 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      border: '1px solid rgba(255,255,255,0.15)'
    }}>
      {toast.type === 'cart' ? (
        <ShoppingBag size={20} style={{ color: '#F4D06F', flexShrink: 0 }} />
      ) : (
        <Heart size={20} style={{ color: '#E1306C', flexShrink: 0 }} fill={toast.type === 'wishlist' ? '#E1306C' : 'none'} />
      )}

      <div style={{ flex: 1, fontSize: '0.84rem' }}>
        <div style={{ fontWeight: 600 }}>{toast.title}</div>
        <div style={{ fontSize: '0.75rem', opacity: 0.85 }}>{toast.message}</div>
      </div>

      {toast.type === 'cart' && (
        <button
          onClick={() => {
            onClose();
            onOpenCart();
          }}
          style={{
            background: 'var(--c-gold)',
            color: '#fff',
            fontSize: '0.74rem',
            fontWeight: 700,
            padding: '6px 10px',
            borderRadius: '4px'
          }}
        >
          View
        </button>
      )}

      <button onClick={onClose} style={{ color: 'rgba(255,255,255,0.7)', padding: '2px' }}>
        <X size={16} />
      </button>
    </div>
  );
}
