import type { Product, ExternalFragranceMetadata } from '../types';

// Real WondersScents Products & Luxury Designer Perfumes Catalog
export const wondersScentsProducts: Product[] = [
  {
    id: 'armaf-cdn-man',
    name: 'Armaf Club De Nuit Intense Man EDT 105ml',
    brand: 'ARMAF',
    category: 'Eau de Toilette',
    price: 72000,
    sizes: ['105ml'],
    stock: 25,
    availability: 'in-stock',
    image: '/armaf_cdn_man.jpg',
    description: 'A captivating provocative woody spicy masculine fragrance that opens with fresh fruity notes of lemon, apple and blackcurrant leading to an opulent floral heart of rose and jasmine spiced with birch. The base features vanilla, musk, ambergris and patchouli.',
    sku: 'ARMAF-CDN-INT-MAN-105',
    tags: ['men', 'woody', 'spicy', 'armaf', 'eau de toilette', 'popular']
  },
  {
    id: 'afnan-9pm',
    name: 'AFNAN 9 Pm For Men EDP 100ML',
    brand: 'AFNAN',
    category: 'Eau de Parfum',
    price: 59000,
    sizes: ['100ml'],
    stock: 18,
    availability: 'in-stock',
    image: '/afnan_9pm.jpg',
    description: 'Afnan 9 PM is a versatile gourmand fragrance for men featuring top notes of apple, cinnamon, wild lavender and bergamot. The heart blends orange blossom and lily-of-the-valley, resting on a warm base of vanilla, tonka bean, amber and patchouli.',
    sku: 'AFNAN-9PM-EDP-100',
    tags: ['men', 'gourmand', 'vanilla', 'afnan', 'eau de parfum', 'evening']
  },
  {
    id: 'franck-olivier-oud-touch',
    name: 'FRANCK OLIVIER Oud Touch EDP 100ml',
    brand: 'FRANCK OLIVIER',
    category: 'Eau de Parfum',
    price: 47000,
    sizes: ['100ml'],
    stock: 20,
    availability: 'in-stock',
    image: '/franck_olivier_oud.jpg',
    description: 'Oud Touch by Franck Olivier is a Woody Aromatic fragrance for men. Top notes are Raspberry, Orange and Caramel; middle notes are Rose, Violet, Patchouli, Jasmine and Olibanum; base notes are Amber, Musk and Vanilla.',
    sku: 'FO-OUD-TOUCH-100',
    tags: ['men', 'oud', 'woody', 'amber', 'franck olivier', 'eau de parfum']
  },
  {
    id: 'armaf-cdn-woman',
    name: 'Armaf Club De Nuit Women EDP 105ml',
    brand: 'ARMAF',
    category: 'Eau de Parfum',
    price: 69000,
    sizes: ['105ml'],
    stock: 15,
    availability: 'in-stock',
    image: '/armaf_cdn_woman.jpg',
    description: 'Club De Nuit Women by Armaf is a Floral Fruity fragrance for women. Top notes are Orange, Bergamot, Grapefruit and Peach; middle notes are Rose, Jasmine, Geranium and Litchi; base notes are Patchouli, Vanilla, Musk and Vetiver.',
    sku: 'ARMAF-CDN-WOM-105',
    tags: ['women', 'floral', 'fruity', 'armaf', 'eau de parfum']
  },
  {
    id: 'victorias-secret-lush-cherry',
    name: 'Victoria’s Secret – Lush Cherry Cream (Body Mist)',
    brand: 'VICTORIA’S SECRET',
    category: 'Body Mist',
    price: 18500,
    sizes: ['250ml'],
    stock: 40,
    availability: 'in-stock',
    image: '/victorias_secret.jpg',
    description: 'Rich, luscious black cherry paired with sweet whipped cream and almond blossom for an irresistible everyday mist.',
    sku: 'VS-LUSH-CHERRY-250',
    tags: ['women', 'body mist', 'fruity', 'sweet', 'cherry', 'victorias secret']
  },
  {
    id: 'dior-sauvage-edp',
    name: 'Sauvage Dior EDP Spray 100ml',
    brand: 'DIOR',
    category: 'Eau de Parfum',
    price: 145000,
    sizes: ['100ml'],
    stock: 12,
    availability: 'in-stock',
    image: '/dior_sauvage.jpg',
    description: 'An intensely fresh composition, dictated by a name that has the ring of a manifesto. Raw and noble all at once, enriched with spicy Calabrian bergamot and smoky vanilla accord.',
    sku: 'DIOR-SAUV-EDP-100',
    tags: ['men', 'luxury', 'dior', 'eau de parfum', 'fresh', 'spicy']
  },
  {
    id: 'ws-nivea-men-cool-kick',
    name: 'Nivea Men Cool Kick Body Spray 150ml',
    brand: 'NIVEA',
    category: 'Body Spray',
    price: 4500,
    sizes: ['150ml'],
    stock: 60,
    availability: 'in-stock',
    image: '/nivea_men.jpg',
    description: 'Instant cooling kick with long-lasting scent protection. Engineered to keep you dry and confident in tropical climates.',
    sku: 'NIVEA-COOL-KICK-150',
    tags: ['men', 'body spray', 'cooling', 'nivea', 'hygiene']
  },
  {
    id: 'ws-riggs-icon',
    name: 'Riggs (Icon) Body Spray 150ml',
    brand: 'RIGGS',
    category: 'Body Spray',
    price: 3500,
    sizes: ['150ml'],
    stock: 50,
    availability: 'in-stock',
    image: '/riggs_icon.jpg',
    description: 'A premium, long-lasting body spray designed to offer reliable fragrance protection throughout the day. Perfect for active individuals who need solid odor protection.',
    sku: 'WS-BS-RIGGS-ICON',
    tags: ['men', 'long lasting', 'body spray', 'woody', 'fresh']
  },
  {
    id: 'ws-wholesale-perfume-oil-3ml',
    name: 'Premium Pure Perfume Oil (3ml Roll-On)',
    brand: 'WONDERS SCENTS',
    category: 'Perfume Oil',
    price: 1200,
    wholesalePrices: {
      single: 1200,
      dozen: 12000
    },
    sizes: ['3ml'],
    stock: 1000,
    availability: 'in-stock',
    image: '/perfume_oil.jpg',
    description: 'High-quality, undiluted, long-lasting 3ml perfume oils. Engineered without alcohol for 48+ hour longevity.',
    sku: 'WS-PO-3ML',
    tags: ['perfume oil', 'wholesale', 'undiluted', 'long lasting', '3ml', 'wonders scents']
  },
  {
    id: 'ws-wholesale-perfume-oil-6ml',
    name: 'Premium Pure Perfume Oil (6ml Roll-On)',
    brand: 'WONDERS SCENTS',
    category: 'Perfume Oil',
    price: 2000,
    wholesalePrices: {
      single: 2000,
      dozen: 20000
    },
    sizes: ['6ml'],
    stock: 800,
    availability: 'in-stock',
    image: '/perfume_oil.jpg',
    description: 'High-quality, undiluted, long-lasting 6ml roll-on perfume oils. Perfect for luxury scent lovers and wholesale buyers starting fragrance brands.',
    sku: 'WS-PO-6ML',
    tags: ['perfume oil', 'wholesale', 'undiluted', 'long lasting', '6ml', 'wonders scents']
  }
];

// Mock External Fragrance Database
export const externalFragrancesDb: ExternalFragranceMetadata[] = [
  {
    id: 'ext-bleu-de-chanel',
    name: 'Bleu de Chanel',
    brand: 'Chanel',
    perfumer: 'Jacques Polge',
    releaseYear: 2010,
    description: 'An aromatic-woody fragrance for men, combining fresh citrus notes with deep woody accords of cedar and sandalwood.',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800',
    gender: 'Men',
    family: 'Woody',
    topNotes: ['Grapefruit', 'Lemon', 'Mint', 'Pink Pepper'],
    middleNotes: ['Ginger', 'Nutmeg', 'Jasmine', 'Iso E Super'],
    baseNotes: ['Incense', 'Vetiver', 'Cedar', 'Sandalwood', 'Patchouli', 'Labdanum', 'White Musk'],
    mainAccords: ['Citrus', 'Woody', 'Warm Spicy', 'Aromatic']
  }
];
