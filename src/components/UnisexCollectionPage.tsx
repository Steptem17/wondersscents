import React, { useState, useCallback } from 'react';
import { 
  ChevronRight, 
  ChevronLeft,
  ShoppingCart, 
  Check, 
  Eye, 
  MessageCircle
} from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import type { Product } from '../types';
import type { CartItem } from '../hooks/useAppState';
import { ScrollReveal } from './ScrollReveal';

interface UnisexCollectionPageProps {
  products?: Product[];
  onAddToCart?: (product: Product, size?: string, quantity?: number) => boolean | void;
  onSelectProduct?: (product: Product) => void;
  onNavigateHome: () => void;
  onNavigateAllCollections?: () => void;
  cart?: CartItem[];
}

interface UnisexFragrance {
  id: string;
  name: string;
  brand: string;
  category: 'Perfume' | 'Eau de Parfum' | 'Eau de Toilette' | 'Perfume Oil' | 'Body Spray' | 'Roll-On' | 'Fragrance Oil' | 'Perfume Sets' | 'Gift Sets' | 'Wholesale Perfume Oil' | 'Other';
  tabCategory: 'perfumes' | 'spray' | 'rollon';
  price: number;
  image: string;
  hoverImage?: string;
  description: string;
  sizes: string[];
  fragranceProfile?: {
    topNotes: string[];
    middleNotes: string[];
    baseNotes: string[];
    family: string;
    whenToWear: string[];
  };
  whenToWear?: string[];
}

// Curated Unisex Catalog
const unisexCatalog: UnisexFragrance[] = [
  // ==========================================
  // 1. UNISEX PERFUMES (10 items)
  // ==========================================
  {
    id: 'modern-musk-collectors-edition',
    name: "Modern Musk The Collector's Edition",
    brand: 'Maison Alhambra',
    category: 'Perfume',
    tabCategory: 'perfumes',
    price: 0,
    sizes: ['100ml'],
    image: '/images/unisex/modern_musk_collectors_edition_bottle.png',
    hoverImage: '/images/unisex/modern_musk_collectors_edition_box.png',
    description: "A sophisticated and airy Eau de Parfum designed for men and women, blending fresh citrus, sweet gourmand notes, delicate florals, and warm earthy musk . The fragrance opens with a refreshing burst of fruit, transitions into a floral heart, and settles into a warm, musky, and slightly earthy base .",
    fragranceProfile: {
      topNotes: ['Grapefruit', 'Mandarin Orange', 'Toffee', 'Peach'],
      middleNotes: ['Damask Rose', 'Violet'],
      baseNotes: ['Musk', 'Oakmoss', 'Patchouli'],
      family: 'Fresh Citrus Gourmand Floral Musk Oakmoss',
      whenToWear: ['Daytime', 'Work', 'Casual Outings', 'Everyday Use', 'Spring & Summer', 'Fall & Winter']
    },
    whenToWear: ['Daytime', 'Work', 'Casual Outings', 'Everyday Use', 'Spring & Summer', 'Fall & Winter']
  },
  {
    id: 'swiss-arabian-shaghaf-oud',
    name: 'Swiss Arabian Shaghaf Oud EDP',
    brand: 'Swiss Arabian',
    category: 'Perfume',
    tabCategory: 'perfumes',
    price: 0,
    sizes: ['75ml'],
    image: '/images/unisex/swiss_arabian_shaghaf_oud_bottle.png',
    hoverImage: '/images/unisex/swiss_arabian_shaghaf_oud_box.png',
    description: 'A luxurious, long-lasting unisex fragrance blending rich Middle Eastern oud with modern sophistication. Popular in Nigeria for its exceptional longevity and projection.',
    fragranceProfile: {
      topNotes: ['Saffron', 'Vanilla'],
      middleNotes: ['Oud', 'Rose', 'Agarwood'],
      baseNotes: ['Amber', 'Musk', 'Patchouli'],
      family: 'Luxurious Middle Eastern Oud Amber Rose',
      whenToWear: ['Evening', 'Special Occasions', 'Formal Events', 'Everyday Use']
    },
    whenToWear: ['Evening', 'Special Occasions', 'Formal Events', 'Everyday Use']
  },
  {
    id: 'swiss-arabian-casablanca',
    name: 'Swiss Arabian Casablanca',
    brand: 'Swiss Arabian',
    category: 'Perfume',
    tabCategory: 'perfumes',
    price: 0,
    sizes: ['100ml'],
    image: '/images/unisex/swiss_arabian_casablanca_bottle.png',
    hoverImage: '/images/unisex/swiss_arabian_casablanca_box.png',
    description: 'A sweet, addictive unisex fragrance with fruity and warm notes. Known as one of the best sweet unisex fragrances, ideal for daily wear and dates.',
    fragranceProfile: {
      topNotes: ['Apple', 'Grapes'],
      middleNotes: ['Musk', 'Amber'],
      baseNotes: ['Patchouli', 'Balsamic Sweetness'],
      family: 'Sweet Addictive Fruity Amber Balsamic',
      whenToWear: ['Daytime', 'Date Nights', 'Everyday Use']
    },
    whenToWear: ['Daytime', 'Date Nights', 'Everyday Use']
  },
  {
    id: 'essential-parfums-bois-imperial',
    name: 'Essential Parfums Bois Imperial',
    brand: 'Essential Parfums',
    category: 'Perfume',
    tabCategory: 'perfumes',
    price: 0,
    sizes: ['100ml'],
    image: '/images/unisex/bois_imperial_bottle.png',
    hoverImage: '/images/unisex/bois_imperial_box.png',
    description: 'A unisex woody-mineral fragrance dominating sales with its combination of vetiver, patchouli, and ambroxan. A favorite for those seeking a sophisticated, character-driven scent.',
    fragranceProfile: {
      topNotes: ['Bergamot', 'Pink Pepper'],
      middleNotes: ['Patchouli', 'Vetiver'],
      baseNotes: ['Ambroxan', 'Cedarwood'],
      family: 'Woody Mineral Vetiver Ambroxan',
      whenToWear: ['Daytime', 'Work', 'Everyday Use']
    },
    whenToWear: ['Daytime', 'Work', 'Everyday Use']
  },
  {
    id: 'tom-ford-noir-de-noir',
    name: 'Tom Ford Noir de Noir',
    brand: 'Tom Ford',
    category: 'Perfume',
    tabCategory: 'perfumes',
    price: 0,
    sizes: ['100ml'],
    image: '/images/unisex/tom_ford_noir_de_noir_bottle.png',
    hoverImage: '/images/unisex/tom_ford_noir_de_noir_box.png',
    description: 'A compellingly dark portrait of feminine-masculine duality, where rich florals collide with earthy truffle, vanilla, patchouli, and oud wood. The essence of yin and yang in a bottle.',
    fragranceProfile: {
      topNotes: ['Saffron', 'Black Truffle'],
      middleNotes: ['Rose', 'Jasmine', 'Patchouli'],
      baseNotes: ['Vanilla', 'Oud Wood', 'Amber'],
      family: 'Dark Floral Earthy Truffle Oud Rose',
      whenToWear: ['Evening', 'Dates', 'Special Occasions']
    },
    whenToWear: ['Evening', 'Dates', 'Special Occasions']
  },
  {
    id: 'tom-ford-vanille-fatale',
    name: 'Tom Ford Vanille Fatale',
    brand: 'Tom Ford',
    category: 'Perfume',
    tabCategory: 'perfumes',
    price: 0,
    sizes: ['100ml'],
    image: '/images/unisex/tom_ford_vanille_fatale_bottle.png',
    hoverImage: '/images/unisex/tom_ford_vanille_fatale_box.png',
    description: 'A beguiling unisex fragrance created to tempt the senses of both men and women alike. A warm, seductive gourmand scent with rich spice and coffee notes.',
    fragranceProfile: {
      topNotes: ['Saffron', 'Coriander'],
      middleNotes: ['Roasted Coffee', 'Narcissus', 'Frangipani'],
      baseNotes: ['Vanilla', 'Woods', 'Musk'],
      family: 'Warm Seductive Gourmand Vanilla Coffee',
      whenToWear: ['Evening', 'Cool Weather', 'Dates', 'Everyday Use']
    },
    whenToWear: ['Evening', 'Cool Weather', 'Dates', 'Everyday Use']
  },
  {
    id: 'tom-ford-tobacco-oud',
    name: 'Tom Ford Tobacco Oud',
    brand: 'Tom Ford',
    category: 'Perfume',
    tabCategory: 'perfumes',
    price: 0,
    sizes: ['100ml'],
    image: '/images/unisex/tom_ford_tobacco_oud_bottle.png',
    hoverImage: '/images/unisex/tom_ford_tobacco_oud_box.png',
    description: 'A regal, rich, and addictive unisex fragrance. It intertwines mesmerizing oud wood resin with smoking aromatic tobacco for a powerful, sophisticated scent experience.',
    fragranceProfile: {
      topNotes: ['Whiskey', 'Ginger'],
      middleNotes: ['Oud Wood', 'Tobacco', 'Incense'],
      baseNotes: ['Amber', 'Vanilla', 'Cedar'],
      family: 'Regal Smoky Tobacco Oud Resin',
      whenToWear: ['Evening', 'Formal Events', 'Special Occasions']
    },
    whenToWear: ['Evening', 'Formal Events', 'Special Occasions']
  },
  {
    id: 'lattafa-shaheen-gold',
    name: 'Lattafa Shaheen Gold Perfume',
    brand: 'Lattafa',
    category: 'Perfume',
    tabCategory: 'perfumes',
    price: 0,
    sizes: ['100ml'],
    image: '/images/unisex/lattafa_shaheen_gold_bottle.png',
    hoverImage: '/images/unisex/lattafa_shaheen_gold_box.png',
    description: 'A bold, luxurious, and long-lasting unisex fragrance crafted with warm, woody, spicy, and oriental notes. One of the most demanded fragrances in Nigeria, known for its powerful performance.',
    fragranceProfile: {
      topNotes: ['Bergamot', 'Fruity Notes'],
      middleNotes: ['Cardamom', 'Soft Florals', 'Spices'],
      baseNotes: ['Amber', 'Sandalwood', 'Musk', 'Vanilla'],
      family: 'Bold Luxurious Warm Oriental Spicy Woody',
      whenToWear: ['Daytime', 'Evening', 'Work', 'Events', 'Everyday Use']
    },
    whenToWear: ['Daytime', 'Evening', 'Work', 'Events', 'Everyday Use']
  },
  {
    id: 'byredo-bal-dafrique-perfume',
    name: 'Byredo Bal d\'Afrique',
    brand: 'Byredo',
    category: 'Perfume',
    tabCategory: 'perfumes',
    price: 0,
    sizes: ['100ml'],
    image: '/images/unisex/byredo_bal_dafrique_bottle.png',
    hoverImage: '/images/unisex/byredo_bal_dafrique_box.png',
    description: 'A luxury unisex fragrance that pays tribute to African music and dance with a vibrant and warm scent. Known for its bright, sophisticated, and long-lasting profile.',
    fragranceProfile: {
      topNotes: ['Bergamot', 'Lemon', 'Neroli', 'Marigold'],
      middleNotes: ['Jasmine', 'Violet'],
      baseNotes: ['Vetiver', 'Amber', 'Moroccan Cedarwood', 'Musk'],
      family: 'Vibrant Warm Citrus Floral Vetiver Cedar',
      whenToWear: ['Daytime', 'Special Occasions', 'Layering']
    },
    whenToWear: ['Daytime', 'Special Occasions', 'Layering']
  },
  {
    id: 'afnan-9pm-night-out',
    name: 'Afnan 9 PM Night Out Extrait de Parfum',
    brand: 'Afnan',
    category: 'Perfume',
    tabCategory: 'perfumes',
    price: 0,
    sizes: ['100ml'],
    image: '/images/unisex/afnan_9pm_night_out_bottle.png',
    hoverImage: '/images/unisex/afnan_9pm_night_out_box.png',
    description: 'A bold new unisex Extrait de Parfum crafted for nights that leave a lasting impression. It opens with a vibrant, julep-like blend of fruits, aromatics, and cognac, before evolving into a smooth, modern heart of suede, toffee, and cardamom. Created by master perfumer Quentin Roussel, this statement fragrance features an impressive 6–12 hour longevity, offering a powerful, magnetic signature that speaks without words.',
    fragranceProfile: {
      topNotes: ['Dragon Fruit', 'Bergamot', 'Cognac', 'Lavender', 'Apple'],
      middleNotes: ['Cardamom', 'Mahonial', 'Suede', 'Toffee', 'Cedar'],
      baseNotes: ['Tonka Bean', 'Akigalawood', 'Ambrofix', 'Patchouli'],
      family: 'Magnetic Warm Gourmand Suede Cognac Amber',
      whenToWear: ['Evening wear', 'Nightlife', 'Special occasions', 'Dates', 'Club nights']
    },
    whenToWear: ['Evening wear', 'Nightlife', 'Special occasions', 'Dates', 'Club nights']
  },

  // ==========================================
  // 2. UNISEX BODY SPRAYS
  // ==========================================
  {
    id: 'riggs-london-perfumed-deodorant-spray',
    name: 'Riggs London West Perfumed Deodorant Body Spray',
    brand: 'Riggs London',
    category: 'Body Spray',
    tabCategory: 'spray',
    price: 0,
    sizes: ['250ml'],
    image: '/images/unisex/riggs_london_west_spray.png',
    description: 'A well-known unisex body spray offering a very wide variety of scents in large 250ml bottles. Positioned as a perfumed deodorant for everyday freshness with options ranging from fresh and airy to warm and gourmand.',
    fragranceProfile: {
      topNotes: ['Fresh', 'Citrus', 'Aquatic (Varies by variant)'],
      middleNotes: ['Floral', 'Spicy', 'Woody (Varies by variant)'],
      baseNotes: ['Musk', 'Oud', 'Amber', 'Vanilla (Varies by variant)'],
      family: 'Versatile Perfumed Deodorant Fresh Woody',
      whenToWear: ['Daytime', 'Work', 'School', 'Casual Outings', 'Everyday Use']
    },
    whenToWear: ['Daytime', 'Work', 'School', 'Casual Outings', 'Everyday Use']
  },
  {
    id: 'fogg-victor-fragrance-spray',
    name: 'Fogg Victor Fragrance Body Spray',
    brand: 'Fogg',
    category: 'Body Spray',
    tabCategory: 'spray',
    price: 0,
    sizes: ['150ml'],
    image: '/images/unisex/fogg_victor_spray.png',
    description: 'A unisex body spray marketed as a sophisticated, evocative fragrance. Its deodorant formula is designed to prevent body odor and provide long-lasting freshness with 100% perfume liquid and no gas.',
    fragranceProfile: {
      topNotes: ['Fresh Floral', 'Citrus'],
      middleNotes: ['Floral Bouquet'],
      baseNotes: ['Clean Musk', 'Light Woods'],
      family: 'Sophisticated Fresh Floral Clean Musk',
      whenToWear: ['Daytime', 'Work', 'Gym', 'Casual Outings', 'Everyday Use']
    },
    whenToWear: ['Daytime', 'Work', 'Gym', 'Casual Outings', 'Everyday Use']
  },
  {
    id: 'byredo-bal-dafrique-mist',
    name: 'Byredo Bal d\'Afrique Body Mist',
    brand: 'Byredo',
    category: 'Body Spray',
    tabCategory: 'spray',
    price: 0,
    sizes: ['100ml'],
    image: '/images/unisex/byredo_bal_dafrique_mist.png',
    description: 'A luxury unisex body mist that is a lighter, more subtle version of the brand\'s best-selling EDP. It pays tribute to African music and dance with a blend of vibrant and warm notes.',
    fragranceProfile: {
      topNotes: ['Bergamot', 'Lemon', 'African Marigold', 'Blackcurrant'],
      middleNotes: ['Violet', 'Jasmine', 'Lily of the Valley'],
      baseNotes: ['Black Amber', 'Musk', 'Tonka Bean', 'Vetiver'],
      family: 'Vibrant Warm Citrus Floral Vetiver Amber',
      whenToWear: ['Daytime', 'Evening', 'Special Occasions', 'Layering']
    },
    whenToWear: ['Daytime', 'Evening', 'Special Occasions', 'Layering']
  },
  {
    id: 'antonio-banderas-blue-seduction-spray',
    name: 'Antonio Banderas Blue Seduction Body Spray',
    brand: 'Antonio Banderas',
    category: 'Body Spray',
    tabCategory: 'spray',
    price: 0,
    sizes: ['150ml'],
    image: '/images/unisex/antonio_banderas_blue_seduction_spray.png',
    description: 'A fresh and aquatic unisex body spray inspired by the Mediterranean. It offers a clean, invigorating scent that is both masculine and feminine enough for anyone to wear.',
    fragranceProfile: {
      topNotes: ['Bergamot', 'Lemon', 'Mandarin', 'Aquatic Notes'],
      middleNotes: ['Lavender', 'Jasmine', 'Coriander'],
      baseNotes: ['Amber', 'Musk', 'Woods'],
      family: 'Fresh Mediterranean Aquatic Citrus',
      whenToWear: ['Daytime', 'Gym', 'Hot Weather', 'Casual Outings']
    },
    whenToWear: ['Daytime', 'Gym', 'Hot Weather', 'Casual Outings']
  },
  {
    id: 'nautica-voyage-body-spray',
    name: 'Nautica Voyage Body Spray',
    brand: 'Nautica',
    category: 'Body Spray',
    tabCategory: 'spray',
    price: 0,
    sizes: ['170g'],
    image: '/images/unisex/nautica_voyage_body_spray.png',
    description: 'A fresh, aquatic, and woody unisex body spray that captures the spirit of the sea. It is widely popular for its clean, masculine-leaning but universally appealing scent.',
    fragranceProfile: {
      topNotes: ['Green Leaves', 'Apple', 'Water Lotus'],
      middleNotes: ['Mimosa', 'Marine Notes'],
      baseNotes: ['Musk', 'Oakmoss', 'Woods'],
      family: 'Crisp Marine Aquatic Green Lotus',
      whenToWear: ['Daytime', 'Gym', 'Outdoor Activities', 'Hot Weather']
    },
    whenToWear: ['Daytime', 'Gym', 'Outdoor Activities', 'Hot Weather']
  },
  {
    id: 'davidoff-cool-water-body-spray',
    name: 'Davidoff Cool Water Body Spray',
    brand: 'Davidoff',
    category: 'Body Spray',
    tabCategory: 'spray',
    price: 0,
    sizes: ['150ml'],
    image: '/images/unisex/davidoff_cool_water_spray.png',
    description: 'A classic, fresh, and aquatic unisex body spray with a clean, oceanic scent. It is one of the most recognized and widely available fragrance sprays globally.',
    fragranceProfile: {
      topNotes: ['Sea Water', 'Mint', 'Green Notes', 'Lavender'],
      middleNotes: ['Jasmine', 'Sandalwood', 'Rosemary'],
      baseNotes: ['Musk', 'Oakmoss', 'Cedarwood'],
      family: 'Classic Oceanic Aquatic Aromatic Mint',
      whenToWear: ['Daytime', 'Gym', 'Outdoor Activities', 'Everyday Use']
    },
    whenToWear: ['Daytime', 'Gym', 'Outdoor Activities', 'Everyday Use']
  },
  {
    id: 'axe-cherry-spritz-spray',
    name: 'Axe Cherry Spritz Premium Body Spray',
    brand: 'Axe',
    category: 'Body Spray',
    tabCategory: 'spray',
    price: 0,
    sizes: ['113g'],
    image: '/images/unisex/axe_cherry_spritz_spray.png',
    description: 'A premium body spray from the Axe Fine Fragrance Collection, marketed for men but widely considered unisex due to its sweet, creamy cherry-amber scent profile . Crafted by world-renowned perfumers with an indulgent blend of red apple and amber, this spray offers 72 hours of odor protection with aluminum-free, vegan formula . It features patented targeted spray technology for a focused, long-lasting scent .',
    fragranceProfile: {
      topNotes: ['Cherry', 'Red Apple', 'Eucalyptus'],
      middleNotes: ['Jasmine', 'Coconut', 'Praline'],
      baseNotes: ['Amber', 'White Moss'],
      family: 'Sweet Creamy Cherry Amber Praline',
      whenToWear: ['Daytime', 'Casual Outings', 'Everyday Use', 'Evening Events']
    },
    whenToWear: ['Daytime', 'Casual Outings', 'Everyday Use', 'Evening Events']
  },

  // ==========================================
  // 3. UNISEX ROLL-ONS
  // ==========================================
  {
    id: 'nivea-protect-care-rollon-fresh',
    name: 'NIVEA Protect & Care Roll-On',
    brand: 'Nivea',
    category: 'Roll-On',
    tabCategory: 'rollon',
    price: 0,
    sizes: ['50ml'],
    image: '/images/unisex/nivea_protect_care_rollon.png',
    description: 'A unisex roll-on that provides reliable 48-hour protection with a gentle, clean scent suitable for all genders. Its caring formula is kind to skin while effectively controlling sweat and odor.',
    fragranceProfile: {
      topNotes: ['Fresh, Clean Accord'],
      middleNotes: ['Light Floral, Soft Notes'],
      baseNotes: ['Gentle, Powdery Finish'],
      family: 'Gentle Caring Clean Powdery Floral',
      whenToWear: ['Daytime', 'Work', 'School', 'Everyday Use']
    },
    whenToWear: ['Daytime', 'Work', 'School', 'Everyday Use']
  },
  {
    id: 'nivea-bw-invisible-active-rollon',
    name: 'NIVEA Black & White Invisible White Blossom Roll-On',
    brand: 'Nivea',
    category: 'Roll-On',
    tabCategory: 'rollon',
    price: 0,
    sizes: ['50ml'],
    image: '/images/unisex/nivea_black_white_white_blossom_rollon.png',
    description: 'A unisex antiperspirant roll-on that provides 48-hour protection without leaving white marks on clothes. Its invisible formula is suitable for both men and women.',
    fragranceProfile: {
      topNotes: ['Fresh Clean Scent'],
      middleNotes: ['Subtle Floral Notes'],
      baseNotes: ['Clean Musk, Powdery Notes'],
      family: 'Clean Invisible Musk Powdery',
      whenToWear: ['Daytime', 'Work', 'Special Occasions', 'Everyday Use']
    },
    whenToWear: ['Daytime', 'Work', 'Special Occasions', 'Everyday Use']
  },
  {
    id: 'nivea-whitening-smooth-skin-rollon',
    name: 'NIVEA Whitening Smooth Skin Roll-On',
    brand: 'Nivea',
    category: 'Roll-On',
    tabCategory: 'rollon',
    price: 0,
    sizes: ['50ml'],
    image: '/images/unisex/nivea_whitening_smooth_skin_rollon.png',
    description: 'A unisex roll-on that provides 48-hour protection while helping to even out underarm skin tone. Its gentle formula is suitable for both men and women.',
    fragranceProfile: {
      topNotes: ['Fresh, Clean Scent'],
      middleNotes: ['Light, Soft Notes'],
      baseNotes: ['Gentle, Smoothing Finish'],
      family: 'Gentle Smoothing Clean Soft',
      whenToWear: ['Daytime', 'Everyday Use']
    },
    whenToWear: ['Daytime', 'Everyday Use']
  },
  {
    id: 'biotherm-deo-pure-rollon',
    name: 'Biotherm Deo Pure Roll-On',
    brand: 'Biotherm',
    category: 'Roll-On',
    tabCategory: 'rollon',
    price: 0,
    sizes: ['75ml'],
    image: '/images/unisex/biotherm_deo_pure_rollon.png',
    description: 'A highly-rated, unscented and alcohol-free unisex roll-on that provides up to 48 hours of sweat protection. Its pleasant, smooth texture makes it a reliable essential for anyone.',
    fragranceProfile: {
      topNotes: ['Unscented'],
      middleNotes: ['Unscented'],
      baseNotes: ['Unscented'],
      family: 'Unscented Pure Mineral Sensitive',
      whenToWear: ['Daytime', 'Work', 'Gym', 'Everyday Use']
    },
    whenToWear: ['Daytime', 'Work', 'Gym', 'Everyday Use']
  },
  {
    id: 'kiehls-body-fuel-rollon',
    name: 'Kiehl\'s Body Fuel Antiperspirant & Deodorant Roll-On',
    brand: 'Kiehl\'s',
    category: 'Roll-On',
    tabCategory: 'rollon',
    price: 0,
    sizes: ['75ml'],
    image: '/images/unisex/kiehls_body_fuel_rollon.png',
    description: 'A refreshing, unisex-scented roll-on that functions as both a deodorant and antiperspirant with up to 48 hours of protection. Its fresh minty scent is appealing to all genders.',
    fragranceProfile: {
      topNotes: ['Fresh Mint'],
      middleNotes: ['Mint, Fresh Notes'],
      baseNotes: ['Clean Musk'],
      family: 'Refreshing Minty Clean Musk',
      whenToWear: ['Daytime', 'Work', 'Everyday Use']
    },
    whenToWear: ['Daytime', 'Work', 'Everyday Use']
  },
  {
    id: 'body-shop-blue-musk-zest-rollon',
    name: 'The Body Shop Blue Musk Zest Anti-perspirant Deodorant',
    brand: 'The Body Shop',
    category: 'Roll-On',
    tabCategory: 'rollon',
    price: 0,
    sizes: ['50ml'],
    image: '/images/unisex/the_body_shop_blue_musk_zest_rollon.png',
    description: 'A genderless, lightweight unisex roll-on with a zesty, citrusy fragrance that provides all-day freshness. Its non-sticky and quick-drying formula keeps you feeling clean and dry.',
    fragranceProfile: {
      topNotes: ['Juicy Grapefruit'],
      middleNotes: ['Green Lemongrass, Bright Geranium'],
      baseNotes: ['Cruelty-free Musk'],
      family: 'Zesty Citrus Lemongrass Clean Musk',
      whenToWear: ['Daytime', 'Post-Shower', 'Post-Gym', 'Everyday Use']
    },
    whenToWear: ['Daytime', 'Post-Shower', 'Post-Gym', 'Everyday Use']
  },
  {
    id: 'lea-dermo-sensitive-rollon',
    name: 'Lea Dermo Sensitive Deo Roll-On',
    brand: 'Lea',
    category: 'Roll-On',
    tabCategory: 'rollon',
    price: 0,
    sizes: ['50ml'],
    image: '/images/unisex/lea_dermo_sensitive_rollon.png',
    description: 'A unisex antiperspirant roll-on that helps control underarm perspiration for up to 24 hours. Its formula with aloe vera, vitamin E, and glycerin is ideal for sensitive skin.',
    fragranceProfile: {
      topNotes: ['Clean Fresh'],
      middleNotes: ['Aloe Vera, Vitamin E'],
      baseNotes: ['Gentle Calming Musk'],
      family: 'Dermo-Sensitive Aloe Glycerin Soft Fresh',
      whenToWear: ['Daytime', 'Travel', 'Sensitive Skin Days', 'Everyday Use']
    },
    whenToWear: ['Daytime', 'Travel', 'Sensitive Skin Days', 'Everyday Use']
  }
];

export const UnisexCollectionPage: React.FC<UnisexCollectionPageProps> = ({
  onAddToCart,
  onSelectProduct,
  onNavigateHome,
  onNavigateAllCollections,
}) => {
  const [activeTab, setActiveTab] = useState<'perfumes' | 'spray' | 'rollon'>('perfumes');
  const [addedItemMap, setAddedItemMap] = useState<Record<string, string>>({});

  // 1-by-1 smooth responsive Embla Carousel
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
    skipSnaps: false,
    duration: 25,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const handleTabChange = (tab: 'perfumes' | 'spray' | 'rollon') => {
    setActiveTab(tab);
    if (emblaApi) emblaApi.scrollTo(0);
  };

  const handleAdd = (e: React.MouseEvent, item: UnisexFragrance) => {
    e.stopPropagation();
    if (onAddToCart) {
      const prodObj: Product = {
        id: item.id,
        name: item.name,
        brand: item.brand,
        category: item.category,
        price: item.price,
        sizes: item.sizes,
        stock: 50,
        availability: 'in-stock',
        image: item.image,
        hoverImage: item.hoverImage,
        images: [item.image, ...(item.hoverImage ? [item.hoverImage] : [])],
        description: item.description,
        fragranceProfile: item.fragranceProfile,
        whenToWear: item.whenToWear,
        sku: `WS-UNISEX-${item.id.toUpperCase()}`,
        tags: ['unisex', 'niche', 'luxury', item.brand.toLowerCase(), item.category.toLowerCase()]
      };

      const res = onAddToCart(prodObj, item.sizes[0] || '100ml', 1);
      if (res === false) {
        setAddedItemMap(prev => ({ ...prev, [item.id]: 'In Cart' }));
      } else {
        setAddedItemMap(prev => ({ ...prev, [item.id]: 'Added' }));
      }

      setTimeout(() => {
        setAddedItemMap(prev => {
          const next = { ...prev };
          delete next[item.id];
          return next;
        });
      }, 4000);
    }
  };

  const handleCardClick = (item: UnisexFragrance) => {
    if (onSelectProduct) {
      onSelectProduct({
        id: item.id,
        name: item.name,
        brand: item.brand,
        category: item.category,
        price: item.price,
        sizes: item.sizes,
        stock: 50,
        availability: 'in-stock',
        image: item.image,
        hoverImage: item.hoverImage,
        images: [item.image, ...(item.hoverImage ? [item.hoverImage] : [])],
        description: item.description,
        fragranceProfile: item.fragranceProfile,
        whenToWear: item.whenToWear,
        sku: `WS-UNISEX-${item.id.toUpperCase()}`,
        tags: ['unisex', 'niche', 'luxury', item.brand.toLowerCase(), item.category.toLowerCase()]
      });
    }
  };

  const handleConciergeInquiry = () => {
    const categoryLabel = activeTab === 'perfumes' ? 'Unisex Perfume' : activeTab === 'spray' ? 'Unisex Body Spray' : 'Unisex Roll-On';
    const message = `Hello WondersScents! I am looking for a specific ${categoryLabel} in your Unisex Collection. Could you check if it is available in your store or warehouse?`;
    const whatsappUrl = `https://wa.me/2348145620271?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const filteredProducts = unisexCatalog.filter(item => item.tabCategory === activeTab);

  return (
    <div className="w-full bg-white text-[#181818] font-sans min-h-screen selection:bg-brand-purple selection:text-white pb-16">
      
      {/* ========================================================================= */}
      {/* 1. TOP EDITORIAL HERO BANNER (Crisp White Background - Matching Men's Page) */}
      {/* ========================================================================= */}
      <section className="relative w-full bg-white border-b border-black/10 py-12 sm:py-20 md:py-24 px-4 sm:px-8 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Left: Typography */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6 text-left">
            <ScrollReveal direction="left">
              {/* Breadcrumb */}
              <div className="flex items-center space-x-2 text-xs text-[#242424]/60 font-medium">
                <button onClick={onNavigateAllCollections || onNavigateHome} className="hover:text-brand-purple transition-colors cursor-pointer">All Collections</button>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-[#242424] font-bold">Unisex Collection</span>
              </div>

              <div className="space-y-4 pt-2 sm:pt-4">
                <span className="text-xs sm:text-sm font-bold text-brand-purple tracking-[0.25em] uppercase block">
                  UNIVERSAL LUXURY AROMAS
                </span>
                <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-[#141414] leading-[1.08] uppercase">
                  UNISEX <br />
                  <span className="italic font-light">COLLECTION</span>
                </h1>
                
                <p className="text-base sm:text-lg md:text-xl font-normal text-[#242424]/80 max-w-lg leading-relaxed">
                  Universal luxury fragrances, rich amber accords, and undiluted perfume oils crafted for everyone.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Visual Showcase (Large, Uncut Image, No Borders, No Shadows) */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <ScrollReveal direction="right" delay={150} className="w-full max-w-lg">
              <div className="relative w-full h-[360px] sm:h-[480px] md:h-[540px] rounded-2xl overflow-hidden bg-[#141414]">
                <img 
                  src="/images/general/collection_unisex.jpg" 
                  alt="WondersScents Unisex Collection" 
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. FEATURED PRODUCTS SECTION WITH CATEGORY TABS & 1-BY-1 CAROUSEL         */}
      {/* ========================================================================= */}
      <section id="featured-unisex-grid" className="py-12 sm:py-16 md:py-20 px-3 sm:px-6 md:px-10 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto space-y-8 sm:space-y-10">
          
          {/* Centered Heading & Tabs */}
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs sm:text-sm font-bold text-brand-purple tracking-[0.25em] uppercase block">
              CURATED SELECTIONS
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-[#111111] uppercase tracking-tight">
              Featured Products
            </h2>

            {/* Category Filter Tabs */}
            <div className="pt-3 sm:pt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-8 md:gap-10 text-xs sm:text-sm font-bold tracking-wider uppercase">
              <button
                onClick={() => handleTabChange('perfumes')}
                className={`pb-1 transition-all duration-200 cursor-pointer ${
                  activeTab === 'perfumes'
                    ? 'text-brand-purple border-b-2 border-brand-purple font-bold'
                    : 'text-[#181818]/60 hover:text-[#111111]'
                }`}
              >
                Perfumes
              </button>

              <button
                onClick={() => handleTabChange('spray')}
                className={`pb-1 transition-all duration-200 cursor-pointer ${
                  activeTab === 'spray'
                    ? 'text-brand-purple border-b-2 border-brand-purple font-bold'
                    : 'text-[#181818]/60 hover:text-[#111111]'
                }`}
              >
                Body Spray
              </button>

              <button
                onClick={() => handleTabChange('rollon')}
                className={`pb-1 transition-all duration-200 cursor-pointer ${
                  activeTab === 'rollon'
                    ? 'text-brand-purple border-b-2 border-brand-purple font-bold'
                    : 'text-[#181818]/60 hover:text-[#111111]'
                }`}
              >
                Roll-On
              </button>
            </div>
          </div>
          {/* ======================================================================= */}
          {/* 3. 1-BY-1 RESPONSIVE SLIDER FLANKED BY PREV & NEXT ARROWS                */}
          {/* ======================================================================= */}
          <div className="flex items-center gap-2 sm:gap-4 md:gap-6 w-full">
            
            {/* Left Arrow (Beside Carousel) */}
            <button
              onClick={scrollPrev}
              className="w-12 h-12 sm:w-13 sm:h-13 flex items-center justify-center rounded-full bg-white border-2 border-black/15 hover:border-brand-purple hover:bg-brand-purple hover:text-white text-[#181818] transition-all duration-200 shrink-0 cursor-pointer shadow-md active:scale-90"
              title="Previous Item"
              aria-label="Previous Item"
            >
              <ChevronLeft className="w-6 h-6 stroke-[2.4]" />
            </button>

            {/* Carousel Viewport (1-by-1 Scroll, Responsive across all devices) */}
            <div className="w-full overflow-hidden p-1.5" ref={emblaRef}>
              <div className="flex gap-4 sm:gap-6">
                {filteredProducts.map((item) => {
                  const statusText = addedItemMap[item.id];

                  return (
                    <div
                      key={item.id}
                      onClick={() => handleCardClick(item)}
                      className="flex-[0_0_100%] sm:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.3333%-16px)] xl:flex-[0_0_calc(25%-18px)] min-w-0 group bg-white rounded-2xl border border-black/10 hover:border-brand-purple/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between p-4 sm:p-5 cursor-pointer relative text-center select-none"
                    >
                      {/* Product Photo Covering Space */}
                      <div className="w-full aspect-[4/5] bg-white rounded-xl overflow-hidden relative mb-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className={`w-full h-full object-contain transition-all duration-500 ${
                            item.hoverImage ? 'group-hover:opacity-0' : 'group-hover:scale-105'
                          }`}
                          loading="lazy"
                        />
                        {item.hoverImage && (
                          <img
                            src={item.hoverImage}
                            alt={`${item.name} packaging`}
                            className="absolute inset-0 w-full h-full object-contain opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="space-y-3 flex-1 flex flex-col justify-between">
                        <div className="space-y-1">
                          {/* Brand */}
                          <span className="text-xs font-semibold tracking-wide text-brand-purple">
                            {item.brand}
                          </span>
                          
                          <h3 className="font-display text-sm sm:text-base font-bold text-[#111111] uppercase tracking-wide line-clamp-2 leading-snug group-hover:text-brand-purple transition-colors">
                            {item.name}
                          </h3>
                        </div>

                        {/* Action Buttons: Details + Add */}
                        <div className="pt-3 grid grid-cols-2 gap-2 border-t border-black/10">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCardClick(item);
                            }}
                            className="py-2.5 sm:py-3 px-2 rounded-xs border border-black/20 hover:border-brand-purple hover:text-brand-purple text-xs sm:text-sm font-semibold text-[#181818] transition-colors flex items-center justify-center space-x-1 cursor-pointer bg-white hover:bg-neutral-50"
                          >
                            <Eye className="w-4 h-4 text-[#181818]/70" />
                            <span>Details</span>
                          </button>

                          <button
                            onClick={(e) => handleAdd(e, item)}
                            className={`py-2.5 sm:py-3 px-2 rounded-xs text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center justify-center space-x-1 cursor-pointer shadow-xs active:scale-95 ${
                              statusText
                                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                                : 'bg-black hover:bg-brand-purple text-white'
                            }`}
                          >
                            {statusText ? (
                              <>
                                <Check className="w-4 h-4 stroke-[2.5]" />
                                <span>In Cart</span>
                              </>
                            ) : (
                              <>
                                <ShoppingCart className="w-4 h-4" />
                                <span>Add</span>
                              </>
                            )}
                          </button>
                        </div>

                      </div>

                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Arrow (Beside Carousel) */}
            <button
              onClick={scrollNext}
              className="w-12 h-12 sm:w-13 sm:h-13 flex items-center justify-center rounded-full bg-white border-2 border-black/15 hover:border-brand-purple hover:bg-brand-purple hover:text-white text-[#181818] transition-all duration-200 shrink-0 cursor-pointer shadow-md active:scale-90"
              title="Next Item"
              aria-label="Next Item"
            >
              <ChevronRight className="w-6 h-6 stroke-[2.4]" />
            </button>
          </div>

          {/* 🌟 4. CONCIERGE / CAN'T FIND UNISEX SCENT INQUIRY BANNER (CLEAN PURE WHITE) */}
          <div className="pt-6 sm:pt-8">
            <div className="max-w-3xl mx-auto bg-white border border-black/10 rounded-2xl p-6 sm:p-8 text-center space-y-4 shadow-xs">
              <div className="w-12 h-12 mx-auto rounded-full bg-neutral-100 border border-black/10 flex items-center justify-center text-[#111111]">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-display text-base sm:text-lg font-normal text-[#111111] uppercase tracking-wide">
                  Can't Find Your Preferred Unisex Scent?
                </h3>
                <p className="text-xs sm:text-sm text-[#181818]/70 max-w-md mx-auto leading-relaxed">
                  Looking for a rare unisex perfume, body spray, or roll-on? We have thousands of unlisted designer fragrances available directly from our warehouse.
                </p>
              </div>
              <div className="pt-2">
                <button
                  onClick={handleConciergeInquiry}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-[#111111] hover:bg-brand-purple text-white font-bold text-xs uppercase tracking-wider rounded-xs transition-colors shadow-md active:scale-95 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Ask on WhatsApp</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
