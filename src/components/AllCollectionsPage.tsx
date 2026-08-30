import React, { useState, useMemo } from 'react';
import type { Product } from '../types';
import type { CartItem } from '../hooks/useAppState';
import { fragranceCatalog, type FragranceItem } from '../data/fragranceDatabase';
import { ScrollReveal } from './ScrollReveal';

interface AllCollectionsPageProps {
  products?: Product[];
  onAddToCart?: (product: Product, size?: string, quantity?: number) => boolean | void;
  onSelectProduct?: (product: Product) => void;
  onNavigateHome?: () => void;
  onNavigateCollection?: (category: string) => void;
  cart?: CartItem[];
}

type MainCategoryFilter = 'all' | 'men' | 'women' | 'unisex' | 'oil' | 'mist' | 'spray';

// The 4 Signature Editorial Billboards Data
const editorialBillboards = [
  {
    id: 'men',
    title: "MEN'S COLLECTION",
    subtitle: "Deep woody accords, fresh spices, and rich leather scents designed for distinction.",
    image: "/images/general/collection_men.jpg",
    categoryFilter: 'men' as MainCategoryFilter,
    imagePosition: 'object-top sm:object-center'
  },
  {
    id: 'women',
    title: "WOMEN'S COLLECTION",
    subtitle: "Soft florals, warm vanilla, and sweet fruit notes tailored for radiant elegance.",
    image: "/images/general/collection_women.jpg",
    categoryFilter: 'women' as MainCategoryFilter,
    imagePosition: 'object-top sm:object-center'
  },
  {
    id: 'unisex',
    title: "UNISEX COLLECTION",
    subtitle: "Captivating amber accords and modern molecular notes crafted for everyone.",
    image: "/images/general/collection_unisex.jpg",
    categoryFilter: 'unisex' as MainCategoryFilter,
    imagePosition: 'object-top sm:object-center'
  },
  {
    id: 'oil',
    title: "PURE PERFUME OILS",
    subtitle: "100% uncut, alcohol-free designer fragrance oil concentrates with 48h+ projection.",
    image: "/images/general/collection_perfume_oil.jpg",
    categoryFilter: 'oil' as MainCategoryFilter,
    imagePosition: 'object-center'
  }
];

export const AllCollectionsPage: React.FC<AllCollectionsPageProps> = ({
  products = [],
  onAddToCart: _onAddToCart,
  onSelectProduct,
  onNavigateCollection,
  cart: _cart = []
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MainCategoryFilter>('all');

  // Merge products from props or fallback to rich database
  const catalogList: FragranceItem[] = useMemo(() => {
    if (products.length >= 25) {
      return products as FragranceItem[];
    }
    return fragranceCatalog;
  }, [products]);

  // Dynamic Filtering Logic for Complete Archive
  const filteredProducts = useMemo(() => {
    return catalogList.filter((item) => {
      // Category / Gender / Format Filter
      const cat = item.category?.toLowerCase() || '';
      const name = item.name?.toLowerCase() || '';
      const tags = item.tags || [];
      const gender = (item as FragranceItem).gender;

      if (selectedCategory === 'men') {
        if (gender !== 'Men') return false;
      } else if (selectedCategory === 'women') {
        if (gender !== 'Women') return false;
      } else if (selectedCategory === 'unisex') {
        if (gender !== 'Unisex') return false;
      } else if (selectedCategory === 'oil') {
        const isOil = cat.includes('oil') || tags.includes('oil') || tags.includes('perfume oil') || name.includes('oil');
        if (!isOil) return false;
      } else if (selectedCategory === 'mist') {
        const isMist = cat.includes('mist') || tags.includes('mist') || name.includes('mist');
        if (!isMist) return false;
      } else if (selectedCategory === 'spray') {
        const isSpray = cat.includes('spray') || tags.includes('spray') || name.includes('spray');
        if (!isSpray) return false;
      }

      return true;
    });
  }, [catalogList, selectedCategory]);

  const handleDiscoverCategory = (category: MainCategoryFilter) => {
    if (category === 'men' && onNavigateCollection) {
      onNavigateCollection('men');
      return;
    }
    if (category === 'women' && onNavigateCollection) {
      onNavigateCollection('women');
      return;
    }
    if (category === 'unisex' && onNavigateCollection) {
      onNavigateCollection('unisex');
      return;
    }
    if (category === 'oil' && onNavigateCollection) {
      onNavigateCollection('oil');
      return;
    }
    setSelectedCategory(category);
    const catalogSection = document.getElementById('catalog-grid');
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getProductTag = (item: Product | FragranceItem) => {
    const cat = item.category?.toLowerCase() || '';
    const name = item.name?.toLowerCase() || '';
    const tags = item.tags || [];
    const gender = (item as FragranceItem).gender?.toLowerCase();

    if (cat.includes('oil') || tags.includes('oil') || tags.includes('perfume oil') || name.includes('oil')) {
      return 'PERFUME OIL';
    }
    if (gender === 'men' || tags.includes('men') || name.includes('pour homme') || name.includes('homme')) {
      return 'MEN';
    }
    if (gender === 'women' || tags.includes('women') || name.includes('femme') || name.includes('pour femme') || cat.includes('mist') || tags.includes('mist')) {
      return 'WOMEN';
    }
    if (gender === 'unisex' || tags.includes('unisex')) {
      return 'UNISEX';
    }
    return 'UNISEX';
  };

  return (
    <div className="w-full bg-white text-[#111111] font-sans min-h-screen selection:bg-brand-purple selection:text-white">
      
      {/* ========================================================================= */}
      {/* 1. COMPLETE ARCHIVE BROWSER & LIVE FILTERING (TOP HERO SECTION)           */}
      {/* ========================================================================= */}
      <section id="catalog-grid" className="pt-10 sm:pt-16 pb-16 sm:pb-24 px-4 sm:px-8 md:px-12 bg-white border-b border-black/10 scroll-mt-8">
        <div className="max-w-7xl mx-auto space-y-10">
          
          <ScrollReveal direction="up">
            <div className="text-center space-y-3">
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-normal text-[#111111] uppercase tracking-tight">
                Explore All Fragrances
              </h2>
              <p className="text-xs sm:text-sm text-[#181818]/70 font-normal max-w-xl mx-auto">
                Browse our complete archive of authentic designer perfumes, pure perfume oils, and luxury fragrances.
              </p>
            </div>
          </ScrollReveal>

          {/* Category Filter Pills */}
          <ScrollReveal direction="up" delay={80}>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
              {[
                { label: 'All Fragrances', value: 'all' },
                { label: "Men's Collection", value: 'men' },
                { label: "Women's Collection", value: 'women' },
                { label: 'Unisex Collection', value: 'unisex' },
                { label: 'Pure Perfume Oils', value: 'oil' }
              ].map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value as MainCategoryFilter)}
                  className={`px-4 sm:px-5 py-2 sm:py-2 rounded-full text-xs sm:text-[13px] font-medium transition-all duration-300 cursor-pointer ${
                    selectedCategory === cat.value
                      ? 'bg-[#111111] text-white border border-[#111111]'
                      : 'bg-white text-[#181818]/75 border border-black/15 hover:border-black/40'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Products Responsive Grid with Compact Elegant Proportions */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-5 md:gap-6 pt-4 items-start">
            {filteredProducts.map((product, idx) => {
              const isCoverProduct = 
                product.id === 'ws-oil-touch-02' || 
                product.id === 'ws-oil-wonders-scents-06' ||
                (product.image || '').includes('touch_perfume_oil') ||
                (product.image || '').includes('wonders_scents_perfume_oil') ||
                (product.name || '').toLowerCase().includes('touch perfume oil') ||
                (product.name || '').toLowerCase().includes('wonders scents pure perfume oil');

              return (
                <ScrollReveal key={product.id} direction="up" delay={(idx % 5) * 50}>
                  <div 
                    onClick={() => onSelectProduct && onSelectProduct(product)}
                    className="flex flex-col items-center text-center space-y-3 group cursor-pointer w-full"
                  >
                    {/* Compact Image Card Frame */}
                    <div className={`w-full aspect-square bg-white rounded-2xl overflow-hidden border border-black/10 group-hover:border-brand-purple transition-all duration-300 relative flex items-center justify-center ${isCoverProduct ? 'p-0' : 'p-2.5 sm:p-3.5'} shadow-xs`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className={`w-full h-full ${isCoverProduct ? 'object-cover' : 'object-contain'} object-center transition-all duration-700 ease-in-out ${product.hoverImage ? 'group-hover:opacity-0' : 'group-hover:scale-105'}`}
                      />
                      {product.hoverImage && (
                        <img
                          src={product.hoverImage}
                          alt={`${product.name} with box`}
                          className={`absolute inset-0 w-full h-full ${isCoverProduct ? 'object-cover' : 'object-contain'} object-center ${isCoverProduct ? 'p-0' : 'p-2.5 sm:p-3.5'} opacity-0 transition-all duration-700 ease-in-out group-hover:opacity-100 group-hover:scale-105`}
                        />
                      )}
                      <span className="absolute top-2.5 left-2.5 text-[8px] sm:text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 bg-white/95 border border-black/5 backdrop-blur-xs rounded-full text-black/80 shadow-xs z-10 pointer-events-none">
                        {getProductTag(product)}
                      </span>
                    </div>

                    <div className="space-y-0.5 max-w-full px-1">
                      <h4 className="font-display text-[11px] sm:text-xs md:text-[13px] font-bold text-[#111111] uppercase tracking-wide group-hover:text-brand-purple transition-colors truncate">
                        {product.name}
                      </h4>
                      <p className="text-[10px] sm:text-[11px] text-[#181818]/60 line-clamp-1">
                        {product.category}
                      </p>
                    </div>

                    <div className="pt-0.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onSelectProduct) onSelectProduct(product);
                        }}
                        className="px-5 sm:px-6 py-1 sm:py-1.5 rounded-full border border-black/30 hover:border-brand-purple hover:bg-brand-purple hover:text-white text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-xs active:scale-95 text-center"
                      >
                        Shop
                      </button>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Can't Find What You're Looking For - Bottom Callout */}
          <ScrollReveal direction="up" delay={100}>
            <div className="pt-8 pb-2 text-center">
              <div className="inline-flex flex-wrap items-center justify-center gap-2 px-6 py-3 rounded-full bg-neutral-50 border border-black/10 text-xs text-[#181818]/80 shadow-xs">
                <span>Can't find what you're looking for?</span>
                <a
                  href="https://wa.me/2348145620271?text=Hello%20Wonders%20Scents%2C%20I%20am%20looking%20for%20a%20specific%20fragrance%20not%20listed%20in%20the%20catalogue."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-brand-purple hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Request any custom fragrance on WhatsApp</span>
                  <span className="text-[10px]">↗</span>
                </a>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. SIGNATURE COLLECTIONS HEADING                                          */}
      {/* ========================================================================= */}
      <section className="pt-16 sm:pt-20 pb-10 px-4 sm:px-8 text-center bg-white">
        <div className="max-w-3xl mx-auto space-y-3">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-normal text-[#111111] uppercase tracking-tight">
            The Collections
          </h2>
          <p className="text-xs sm:text-sm text-[#181818]/70 font-normal max-w-lg mx-auto">
            Explore curated fragrance worlds crafted for every presence and occasion.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. 2x2 SIGNATURE EDITORIAL SHOWCASE (MEN + WOMEN / UNISEX + PERFUME OILS)  */}
      {/* ========================================================================= */}
      <section className="w-full bg-white pb-20 sm:pb-28 px-4 sm:px-8 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
          {editorialBillboards.map((billboard, idx) => (
            <ScrollReveal key={billboard.id} direction="up" delay={idx * 100}>
              <div className="flex flex-col items-center text-center space-y-6 group">
                
                {/* Visual Artwork with Taller Editorial Aspect Ratio */}
                <div className="relative w-full aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-100 border border-black/10">
                  <img
                    src={billboard.image}
                    alt={billboard.title}
                    className={`w-full h-full object-cover ${billboard.imagePosition || 'object-center'} transition-transform duration-700 group-hover:scale-105`}
                  />
                </div>

                {/* Editorial Caption & Discover Pill Button */}
                <div className="space-y-3 max-w-md">
                  <h3 className="font-display text-base sm:text-lg font-bold tracking-[0.18em] text-[#111111] uppercase">
                    {billboard.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#181818]/70 leading-relaxed font-normal">
                    {billboard.subtitle}
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => handleDiscoverCategory(billboard.categoryFilter)}
                      className="px-8 py-2.5 rounded-full border border-black/40 hover:border-brand-purple hover:bg-brand-purple hover:text-white text-xs font-semibold uppercase tracking-widest transition-all duration-300 cursor-pointer active:scale-95"
                    >
                      Discover
                    </button>
                  </div>
                </div>

              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

    </div>
  );
};
