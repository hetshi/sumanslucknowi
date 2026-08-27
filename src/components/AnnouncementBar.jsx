import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MESSAGES = [
  'Complimentary Express Shipping Across India on Orders Above ₹1,999',
  'Authentic Handcrafted Awadhi Chikankari — 32 Heritage Stitches From Lucknow',
  'GI Tagged Slow Fashion — Empowering 450+ Master Women Artisans',
  'Use Code "LUCKNOW10" for 10% Savings on Your First Order'
];

export default function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="announcement-bar" style={{ userSelect: 'none' }}>
      <button
        onClick={() => setCurrentIndex((prev) => (prev - 1 + MESSAGES.length) % MESSAGES.length)}
        aria-label="Previous announcement"
        style={{ color: '#D4C7BD', display: 'flex', alignItems: 'center', opacity: 0.6, padding: '2px 8px' }}
      >
        <ChevronLeft size={13} />
      </button>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        minHeight: '18px',
        letterSpacing: '0.12em',
        fontSize: '0.72rem',
        fontWeight: 500
      }}>
        <span>{MESSAGES[currentIndex]}</span>
      </div>

      <button
        onClick={() => setCurrentIndex((prev) => (prev + 1) % MESSAGES.length)}
        aria-label="Next announcement"
        style={{ color: '#D4C7BD', display: 'flex', alignItems: 'center', opacity: 0.6, padding: '2px 8px' }}
      >
        <ChevronRight size={13} />
      </button>
    </div>
  );
}
