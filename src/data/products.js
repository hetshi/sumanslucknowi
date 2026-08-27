// Product dataset for Suman's Lucknowi
// Authentic Lucknow Chikankari apparel with hand embroidery details

export const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'kurtas', label: 'Kurtas' },
  { id: 'kurta-sets', label: 'Kurta Sets' },
  { id: 'sarees', label: 'Sarees' },
  { id: 'short-kurtis', label: 'Short Kurtis' },
  { id: 'luxe-modal', label: 'Modal Silk' },
  { id: 'dupattas-bottoms', label: 'Dupattas & Bottoms' },
  { id: 'mens', label: 'Men' },
  { id: 'festive-edit', label: 'Festive & Bridal' }
];

export const FABRICS = [
  { id: 'modal', label: 'Pure Modal Silk', description: 'Silky smooth, ultra-drapey, featherlight' },
  { id: 'georgette', label: 'Airy Georgette', description: 'Flowy, sheer elegance with matching inner' },
  { id: 'mulmul', label: 'Pure Mulmul Cotton', description: '100% breathable summer soft cotton' },
  { id: 'chanderi', label: 'Royal Chanderi', description: 'Subtle metallic sheen for celebratory occasions' },
  { id: 'organza', label: 'Luxe Organza', description: 'Crisp, structured modern festive drape' }
];

export const STITCH_TYPES = [
  { name: 'Bakhiya', description: 'Shadow work done from the wrong side of the cloth creating an embossed outline' },
  { name: 'Phanda', description: 'Small millet-shaped knots forming flowers and leaves' },
  { name: 'Keel Kangan', description: 'Fine stitching resembling precious bangles and creepers' },
  { name: 'Murri', description: 'Rice grain shaped embossed French knots requiring utmost precision' },
  { name: 'Ghaspatti', description: 'V-shaped delicate grass foliage pattern' },
  { name: 'Mukaish / Badla', description: 'Metallic silver/gold wire dots embedded by hand for shimmer' },
  { name: 'Jaali Work', description: 'Trellis work made by teasing warp and weft yarns without cutting cloth' }
];

export const PRODUCTS = [
  {
    id: 'sl-001',
    name: 'Noor-e-Awadh Modal Chikankari Kurta Set',
    slug: 'noor-e-awadh-modal-kurta-set',
    category: 'kurta-sets',
    fabric: 'modal',
    fabricName: 'Pure Modal Silk',
    color: 'Blush Pink',
    colorHex: '#EBB4B8',
    colorVariants: [
      { name: 'Blush Pink', hex: '#EBB4B8', img: '/images/modal_kurta.jpg' },
      { name: 'Sage Mint', hex: '#A8C3B1', img: '/images/georgette_anarkali.jpg' },
      { name: 'Ivory Milk', hex: '#FAF8F3', img: '/images/mulmul_white.jpg' }
    ],
    priceINR: 4299,
    originalPriceINR: 5999,
    rating: 4.9,
    reviewsCount: 142,
    badge: 'Bestseller',
    featured: true,
    isNew: true,
    images: [
      '/images/modal_kurta.jpg',
      '/images/hero_banner.jpg',
      '/images/georgette_anarkali.jpg'
    ],
    stitches: ['Bakhiya', 'Phanda', 'Keel Kangan', 'Mukaish Work'],
    artisanHours: '48 Hours of Handcrafting',
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    description: 'Immerse in the timeless opulence of Lucknow with our signature Noor-e-Awadh Kurta Set. Meticulously handcrafted on buttery-soft Pure Modal Silk, this 3-piece set features intricate floral jaal with glistening silver Mukaish embellishments. Comes complete with a matching straight palazzo and a sheer scalloped dupatta.',
    includes: '1 Kurta, 1 Matching Modal Palazzo, 1 Organza Border Dupatta',
    careInstructions: 'Dry Clean Only. Iron inside out on low heat.',
    stock: 12,
    sku: 'SL-MOD-01-PNK'
  },
  {
    id: 'sl-002',
    name: 'Gulmohar Handcrafted Georgette Anarkali Set',
    slug: 'gulmohar-georgette-anarkali-set',
    category: 'kurta-sets',
    fabric: 'georgette',
    fabricName: 'Viscose Georgette',
    color: 'Sage Mist',
    colorHex: '#9BBBA8',
    colorVariants: [
      { name: 'Sage Mist', hex: '#9BBBA8', img: '/images/georgette_anarkali.jpg' },
      { name: 'Blush Pink', hex: '#EBB4B8', img: '/images/modal_kurta.jpg' }
    ],
    priceINR: 5899,
    originalPriceINR: 7999,
    rating: 5.0,
    reviewsCount: 98,
    badge: 'Festive Edition',
    featured: true,
    isNew: false,
    images: [
      '/images/georgette_anarkali.jpg',
      '/images/modal_kurta.jpg'
    ],
    stitches: ['Ghaspatti', 'Murri', 'Jaali Work', 'Dill Ki Patti'],
    artisanHours: '72 Hours of Handcrafting',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    description: 'A regal silhouette for celebratory evenings. Hand-embroidered with micro-murri and jaali work across 24 kalis, delivering unparalleled flair and movement. Lined with dyed mulmul for breathable comfort in any season.',
    includes: '1 Flared Anarkali Kurta, 1 Santoon Inner Slip, 1 Churidar Pant, 1 Chiffon Dupatta',
    careInstructions: 'Dry clean recommended.',
    stock: 7,
    sku: 'SL-GEO-02-SGE'
  },
  {
    id: 'sl-003',
    name: 'Nazakat Mulmul Cotton Straight Kurta',
    slug: 'nazakat-mulmul-cotton-straight-kurta',
    category: 'kurtas',
    fabric: 'mulmul',
    fabricName: '100% Breathable Mulmul',
    color: 'Ivory White',
    colorHex: '#FBF8F3',
    colorVariants: [
      { name: 'Ivory White', hex: '#FBF8F3', img: '/images/mulmul_white.jpg' }
    ],
    priceINR: 2499,
    originalPriceINR: 3499,
    rating: 4.8,
    reviewsCount: 310,
    badge: 'Heritage Classic',
    featured: true,
    isNew: false,
    images: [
      '/images/mulmul_white.jpg',
      '/images/modal_kurta.jpg'
    ],
    stitches: ['Bakhiya', 'Keel Kangan', 'Phanda'],
    artisanHours: '32 Hours of Handcrafting',
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    description: 'The quintessential everyday Lucknowi kurta. Woven from 100 count fine mulmul cotton that gets softer with every wash. Intricate tone-on-tone hand embroidery along the neckline, sleeves, and side slits.',
    includes: '1 Handcrafted Mulmul Kurta',
    careInstructions: 'Gentle hand wash in cold water with mild detergent.',
    stock: 25,
    sku: 'SL-MUL-03-IVR'
  },
  {
    id: 'sl-004',
    name: 'Shehnai Chanderi Silk Chikankari Saree with Mukaish',
    slug: 'shehnai-chanderi-chikankari-saree',
    category: 'sarees',
    fabric: 'chanderi',
    fabricName: 'Chanderi Zari Silk',
    color: 'Royal Burgundy',
    colorHex: '#581825',
    colorVariants: [
      { name: 'Royal Burgundy', hex: '#581825', img: '/images/chanderi_saree.jpg' }
    ],
    priceINR: 8999,
    originalPriceINR: 12500,
    rating: 5.0,
    reviewsCount: 64,
    badge: 'Limited Heirloom',
    featured: true,
    isNew: true,
    images: [
      '/images/chanderi_saree.jpg',
      '/images/modal_kurta.jpg'
    ],
    stitches: ['Ghaspatti', 'Phanda', 'Keel Kangan', 'All-over Mukaish Dāna'],
    artisanHours: '120 Hours of Handcrafting',
    sizes: ['Free Size (5.5m + 0.8m Blouse Piece)'],
    description: 'An heirloom piece to cherish across generations. Hand-embroidered on shimmering Chanderi silk with woven zari border, studded with hand-hammered real silver mukaish dots that catch the festive lights effortlessly.',
    includes: '1 Saree (5.5m) + 1 Unstitched Hand-Embroidered Blouse Piece (0.8m)',
    careInstructions: 'Dry Clean Only. Wrap in pure muslin cloth.',
    stock: 5,
    sku: 'SL-SAR-04-BUR'
  },
  {
    id: 'sl-005',
    name: 'Zeenat Short Peplum Chikankari Kurti',
    slug: 'zeenat-short-peplum-chikankari-kurti',
    category: 'short-kurtis',
    fabric: 'modal',
    fabricName: 'Pure Modal Cotton',
    color: 'Lavender Haze',
    colorHex: '#B8A9C9',
    colorVariants: [
      { name: 'Lavender Haze', hex: '#B8A9C9', img: '/images/peplum_kurti.jpg' }
    ],
    priceINR: 1999,
    originalPriceINR: 2799,
    rating: 4.7,
    reviewsCount: 189,
    badge: 'Trending on Reels',
    featured: true,
    isNew: true,
    images: [
      '/images/peplum_kurti.jpg',
      '/images/modal_kurta.jpg'
    ],
    stitches: ['Bakhiya', 'Phanda', 'Murri'],
    artisanHours: '24 Hours of Handcrafting',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Youthful and effortlessly chic. Pair this flared peplum short kurti with high-waisted denim or palazzos for brunch, college, or casual office Fridays. Features gathering at the waist and delicate floral motifs.',
    includes: '1 Short Kurti',
    careInstructions: 'Hand wash with mild liquid soap.',
    stock: 18,
    sku: 'SL-SHT-05-LAV'
  },
  {
    id: 'sl-006',
    name: 'Nawab Hand-Embroidered Men’s Chikankari Kurta',
    slug: 'nawab-mens-chikankari-kurta',
    category: 'mens',
    fabric: 'mulmul',
    fabricName: 'Pure Cotton Linen Blend',
    color: 'Royal Ivory',
    colorHex: '#FDFBF7',
    colorVariants: [
      { name: 'Royal Ivory', hex: '#FDFBF7', img: '/images/mens_kurta.jpg' }
    ],
    priceINR: 3299,
    originalPriceINR: 4499,
    rating: 4.9,
    reviewsCount: 88,
    badge: 'Gentleman’s Heritage',
    featured: true,
    isNew: false,
    images: [
      '/images/mens_kurta.jpg',
      '/images/modal_kurta.jpg'
    ],
    stitches: ['Bakhiya', 'Keel Kangan', 'Chana Patti'],
    artisanHours: '36 Hours of Handcrafting',
    sizes: ['38 (S)', '40 (M)', '42 (L)', '44 (XL)', '46 (XXL)'],
    description: 'Exude Nawabi charm with our classic Men’s Chikankari Kurta. Crafted with intricate hand embroidery across the placket, collar, and back yolk. Perfectly tailored for wedding festivities, poojas, and family celebrations.',
    includes: '1 Men’s Hand-Embroidered Kurta',
    careInstructions: 'Dry clean or gentle hand wash.',
    stock: 14,
    sku: 'SL-MEN-06-IVR'
  },
  {
    id: 'sl-007',
    name: 'Afreen Pure Organza Chikankari Dupatta with Scalloped Borders',
    slug: 'afreen-organza-chikankari-dupatta',
    category: 'dupattas-bottoms',
    fabric: 'organza',
    fabricName: 'Luxe Sheer Organza',
    color: 'Champagne Gold',
    colorHex: '#E6D7B9',
    colorVariants: [
      { name: 'Champagne Gold', hex: '#E6D7B9', img: '/images/hero_banner.jpg' }
    ],
    priceINR: 2899,
    originalPriceINR: 3899,
    rating: 4.9,
    reviewsCount: 73,
    badge: 'Statement Drape',
    featured: false,
    isNew: true,
    images: [
      '/images/hero_banner.jpg',
      '/images/modal_kurta.jpg'
    ],
    stitches: ['Jaali', 'Phanda', 'Cutwork Scallop'],
    artisanHours: '40 Hours of Handcrafting',
    sizes: ['Length: 2.5 meters, Width: 38 inches'],
    description: 'Elevate any solid suit or lehenga instantly with this masterpiece organza dupatta. Features hand-cut scalloped edges with dense floral vine chikankari embroidery and light mukaish highlights.',
    includes: '1 Handcrafted Organza Dupatta (2.5m)',
    careInstructions: 'Dry clean only.',
    stock: 9,
    sku: 'SL-DUP-07-GLD'
  },
  {
    id: 'sl-008',
    name: 'Meenakari Hand-Dyed Modal Silk Kurta Set',
    slug: 'meenakari-hand-dyed-modal-set',
    category: 'luxe-modal',
    fabric: 'modal',
    fabricName: 'Pure Modal Silk',
    color: 'Sage Mist',
    colorHex: '#9BBBA8',
    colorVariants: [
      { name: 'Sage Mist', hex: '#9BBBA8', img: '/images/georgette_anarkali.jpg' },
      { name: 'Blush Pink', hex: '#EBB4B8', img: '/images/modal_kurta.jpg' }
    ],
    priceINR: 4799,
    originalPriceINR: 6499,
    rating: 5.0,
    reviewsCount: 112,
    badge: 'Limited Edition',
    featured: true,
    isNew: true,
    images: [
      '/images/georgette_anarkali.jpg',
      '/images/modal_kurta.jpg'
    ],
    stitches: ['Bakhiya', 'Keel Kangan', 'Phanda', 'Pearl Highlights'],
    artisanHours: '54 Hours of Handcrafting',
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
    description: 'A masterpiece blending traditional Awadhi Chikankari with artisanal ombre dip-dyeing. Hand-embellished with tiny faux seed pearls and fine shadow work. Fluid, cool to the skin, and unmistakably luxurious.',
    includes: '1 Modal Kurta, 1 Wide-Leg Modal Palazzo, 1 Chiffon Dupatta',
    careInstructions: 'Dry clean only.',
    stock: 8,
    sku: 'SL-MOD-08-TEL'
  }
];

export const CURRENCIES = {
  INR: { symbol: '₹', rate: 1, label: 'INR' },
  USD: { symbol: '$', rate: 0.012, label: 'USD' },
  GBP: { symbol: '£', rate: 0.0095, label: 'GBP' },
  AED: { symbol: 'AED ', rate: 0.044, label: 'AED' },
  CAD: { symbol: 'CA$', rate: 0.016, label: 'CAD' }
};
