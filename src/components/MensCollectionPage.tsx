import React, { useState, useCallback } from 'react';
import { ChevronRight, ChevronLeft, ShoppingCart, Check, Eye, MessageCircle } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import type { Product } from '../types';
import type { CartItem } from '../hooks/useAppState';
import { fragranceCatalog, type FragranceItem } from '../data/fragranceDatabase';
import { ScrollReveal } from './ScrollReveal';

interface MensCollectionPageProps {
  products?: Product[];
  onAddToCart?: (product: Product, size?: string, quantity?: number) => boolean | void;
  onSelectProduct?: (product: Product) => void;
  onNavigateHome: () => void;
  onNavigateAllCollections?: () => void;
  cart?: CartItem[];
}

// 🎛️ Reusable Spacious Carousel Section with Alternating Left/Right Layout & Scroll Animation
const ScentCategorySection: React.FC<{
  title: string;
  subtitle: string;
  items: Product[];
  isDark?: boolean;
  reverseLayout?: boolean;
  onAddToCart?: (product: Product, size?: string, quantity?: number) => boolean | void;
  onSelectProduct?: (product: Product) => void;
  cart: CartItem[];
  addedItemMap: Record<string, string>;
  onAdd: (e: React.MouseEvent, product: Product) => void;
}> = ({
  title,
  subtitle,
  items,
  isDark = true,
  reverseLayout = false,
  onSelectProduct,
  addedItemMap,
  onAdd
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
    skipSnaps: false,
    duration: 30,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const handleConciergeInquiry = () => {
    const message = `Hello WondersScents! I am looking for a specific men's fragrance in your ${title} collection. Could you check if it is available in your store or warehouse?`;
    const whatsappUrl = `https://wa.me/2348145620271?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section 
      className={`py-16 md:py-24 px-4 sm:px-8 md:px-12 border-b ${
        isDark ? 'bg-[#181818] text-white border-white/10' : 'bg-white text-[#242424] border-black/10'
      }`}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Title & Subtitle Column with Scroll Animation */}
        <div 
          className={`space-y-3 text-left ${
            reverseLayout 
              ? 'lg:col-span-4 lg:order-2' 
              : 'lg:col-span-4 lg:order-1'
          }`}
        >
          <ScrollReveal direction={reverseLayout ? 'right' : 'left'}>
            <h2 className={`font-display text-3xl sm:text-4xl md:text-5xl font-normal tracking-wide uppercase ${isDark ? 'text-white' : 'text-[#141414]'}`}>
              {title}
            </h2>
            <p className={`text-xs sm:text-sm font-medium leading-relaxed max-w-sm pt-2 ${isDark ? 'text-white/70' : 'text-[#242424]/75'}`}>
              {subtitle}
            </p>
          </ScrollReveal>
        </div>

        {/* Carousel Column Flanked by Left & Right Arrows with Scroll Animation */}
        <div 
          className={`flex items-center gap-2 sm:gap-4 ${
            reverseLayout 
              ? 'lg:col-span-8 lg:order-1' 
              : 'lg:col-span-8 lg:order-2'
          }`}
        >
          <ScrollReveal direction={reverseLayout ? 'left' : 'right'} delay={100} className="w-full flex items-center gap-2 sm:gap-4">
            
            {/* Left Arrow Button */}
            <button
              onClick={scrollPrev}
              className={`p-3 rounded-full border shadow-md transition-all duration-200 cursor-pointer active:scale-90 shrink-0 ${
                isDark 
                  ? 'bg-[#222222] border-white/20 hover:border-brand-purple hover:bg-brand-purple text-white' 
                  : 'bg-white border-black/15 hover:border-brand-purple hover:bg-brand-purple hover:text-white text-[#242424]'
              }`}
              title="Previous Item"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Carousel Viewport (100% Width Responsive without cutoffs) */}
            <div className="w-full overflow-hidden px-1" ref={emblaRef}>
              <div className="flex gap-4 sm:gap-6">
                
                {/* Product Cards */}
                {items.map((product) => {
                  const statusText = addedItemMap[product.id];
                  const notes = product.fragranceProfile 
                    ? [product.fragranceProfile.topNotes[0], product.fragranceProfile.middleNotes[0], product.fragranceProfile.baseNotes[0]].filter(Boolean).join(', ')
                    : product.description?.slice(0, 80) + '...';

                  return (
                    <div 
                      key={product.id}
                      onClick={() => onSelectProduct && onSelectProduct(product)}
                      className={`flex-[0_0_100%] sm:flex-[0_0_calc(50%-12px)] min-w-0 border rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-[#b89c65] text-left group select-none cursor-pointer ${
                        isDark 
                          ? 'bg-[#222222] border-white/10 text-white' 
                          : 'bg-neutral-50/70 border-black/10 text-[#242424] shadow-xs'
                      }`}
                    >
                      {/* Large Product Image Box */}
                      <div className="relative w-full aspect-[4/5] sm:h-76 overflow-hidden bg-white">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className={`w-full h-full object-contain p-2 transition-all duration-700 ease-in-out ${product.hoverImage ? 'group-hover:opacity-0' : 'group-hover:scale-105'}`}
                        />
                        {product.hoverImage && (
                          <img 
                            src={product.hoverImage} 
                            alt={`${product.name} with box`} 
                            className="absolute inset-0 w-full h-full object-contain p-2 opacity-0 transition-all duration-700 ease-in-out group-hover:opacity-100 group-hover:scale-105"
                          />
                        )}
                        <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest bg-brand-purple text-white rounded-xs z-10">
                          {product.brand}
                        </span>
                      </div>

                      {/* Product Details */}
                      <div className="p-5 sm:p-6 space-y-3 flex-1 flex flex-col justify-between">
                        <div className="space-y-1.5">
                          <h3 className={`font-sans text-xs sm:text-sm font-bold uppercase tracking-normal leading-snug ${isDark ? 'text-white' : 'text-[#141414]'}`}>
                            {product.name}
                          </h3>
                          <p className={`text-xs leading-relaxed font-normal line-clamp-2 ${isDark ? 'text-white/60' : 'text-[#242424]/70'}`}>
                            {product.description || notes}
                          </p>
                        </div>

                        {/* Action Buttons: Details + Add */}
                        <div className={`pt-3 flex items-center space-x-2 border-t ${isDark ? 'border-white/10' : 'border-black/10'}`}>
                          {/* 1. Details Button */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onSelectProduct) onSelectProduct(product);
                            }}
                            className={`flex-1 py-3 px-3 text-xs font-semibold rounded-xs transition-colors flex items-center justify-center space-x-1.5 cursor-pointer shadow-xs active:scale-95 ${
                              isDark 
                                ? 'bg-white/10 hover:bg-white/20 text-white border border-white/15' 
                                : 'bg-neutral-100 hover:bg-neutral-200 text-[#242424] border border-black/10'
                            }`}
                          >
                            <Eye className="w-4 h-4" />
                            <span>Details</span>
                          </button>

                          {/* 2. Add Button */}
                          <button
                            onClick={(e) => onAdd(e, product)}
                            className={`flex-1 py-3 px-3 text-xs font-semibold rounded-xs transition-all duration-300 flex items-center justify-center space-x-1.5 cursor-pointer shadow-xs active:scale-95 ${
                              statusText
                                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                                : isDark
                                  ? 'bg-brand-purple hover:bg-brand-purple-deep text-white'
                                  : 'bg-black hover:bg-neutral-800 text-white'
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

                {/* 🌟 FINAL END CARD: CONCIERGE / CAN'T FIND SCENT */}
                <div 
                  className={`flex-[0_0_100%] sm:flex-[0_0_calc(50%-12px)] min-w-0 border rounded-2xl p-6 sm:p-8 flex flex-col justify-between items-center text-center transition-all duration-300 select-none ${
                    isDark 
                      ? 'bg-gradient-to-b from-[#242424] to-[#1c1c1c] border-brand-purple/40 text-white' 
                      : 'bg-gradient-to-b from-white to-neutral-50 border-brand-purple/30 text-[#242424] shadow-md'
                  }`}
                >
                  <div className="space-y-4 my-auto">
                    <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <MessageCircle className="w-7 h-7" />
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className={`font-display text-lg sm:text-xl font-bold uppercase tracking-wide ${isDark ? 'text-white' : 'text-[#141414]'}`}>
                        Looking for a Specific Scent?
                      </h3>
                      <p className={`text-xs leading-relaxed max-w-xs mx-auto ${isDark ? 'text-white/70' : 'text-[#242424]/75'}`}>
                        Can't find your preferred {title.toLowerCase()}? We have thousands of rare and unlisted designer fragrances in our warehouse.
                      </p>
                    </div>
                  </div>

                  <div className="w-full pt-6">
                    <button
                      onClick={handleConciergeInquiry}
                      className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-colors flex items-center justify-center space-x-2 cursor-pointer shadow-md active:scale-98"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      <span>Ask on WhatsApp</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Arrow Button */}
            <button
              onClick={scrollNext}
              className={`p-3 rounded-full border shadow-md transition-all duration-200 cursor-pointer active:scale-90 shrink-0 ${
                isDark 
                  ? 'bg-[#222222] border-white/20 hover:border-brand-purple hover:bg-brand-purple text-white' 
                  : 'bg-white border-black/15 hover:border-brand-purple hover:bg-brand-purple hover:text-white text-[#242424]'
              }`}
              title="Next Item"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

          </ScrollReveal>
        </div>

      </div>
    </section>
  );
};

export const MensCollectionPage: React.FC<MensCollectionPageProps> = ({ 
  products = [], 
  onAddToCart,
  onSelectProduct,
  onNavigateHome,
  onNavigateAllCollections,
  cart = []
}) => {
  const [addedItemMap, setAddedItemMap] = useState<Record<string, string>>({});

  // Source catalog
  const sourceProducts = products.length >= 20 ? products : fragranceCatalog;

  // 1. Men's Perfumes (10 curated items)
  const menPerfumes = sourceProducts.filter(p => {
    const cat = p.category?.toLowerCase() || '';
    const isPerfume = cat.includes('perfume') || cat.includes('parfum') || cat.includes('toilette') || cat.includes('edp') || cat.includes('edt');
    const isMen = p.tags?.includes('men') || (p as FragranceItem).gender === 'Men';
    return isPerfume && isMen && !cat.includes('spray') && !cat.includes('mist') && !cat.includes('roll');
  }).slice(0, 10);

  // 2. Men's Body Sprays (12 curated items)
  const menBodySprays = sourceProducts.filter(p => {
    const cat = p.category?.toLowerCase() || '';
    const name = p.name?.toLowerCase() || '';
    const isSpray = cat.includes('spray') || name.includes('spray') || p.tags?.includes('spray');
    const isMen = p.tags?.includes('men') || (p as FragranceItem).gender === 'Men';
    return isSpray && isMen && !cat.includes('mist') && !cat.includes('roll');
  }).slice(0, 12);

  // 3. Men's Roll-Ons (10 curated items)
  const menRollOns = sourceProducts.filter(p => {
    const cat = p.category?.toLowerCase() || '';
    const name = p.name?.toLowerCase() || '';
    const isRollOn = cat.includes('roll') || name.includes('roll') || p.tags?.includes('roll on') || p.tags?.includes('roll-on');
    const isMen = p.tags?.includes('men') || name.includes('men') || p.id.includes('men') || p.id.includes('rollon');
    return isRollOn && isMen;
  }).slice(0, 10);

  const handleAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    const isAlreadyInCart = cart.some(item => item.product.id === product.id);

    if (isAlreadyInCart) {
      setAddedItemMap(prev => ({ ...prev, [product.id]: 'Already in cart' }));
      setTimeout(() => {
        setAddedItemMap(prev => {
          const next = { ...prev };
          delete next[product.id];
          return next;
        });
      }, 5000);
      return;
    }

    if (onAddToCart) {
      const result = onAddToCart(product, product.sizes?.[0] || 'Standard', 1);
      if (result === false) {
        setAddedItemMap(prev => ({ ...prev, [product.id]: 'Already in cart' }));
      } else {
        setAddedItemMap(prev => ({ ...prev, [product.id]: 'Added to cart' }));
      }
      setTimeout(() => {
        setAddedItemMap(prev => {
          const next = { ...prev };
          delete next[product.id];
          return next;
        });
      }, 5000);
    }
  };

  return (
    <div className="w-full bg-white text-[#242424] font-sans min-h-screen selection:bg-brand-purple selection:text-white">
      
      {/* ========================================================================= */}
      {/* 1. TOP EDITORIAL HERO BANNER (Crisp White Background)                     */}
      {/* ========================================================================= */}
      <section className="relative w-full bg-white border-b border-black/10 py-16 sm:py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left: Typography */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <ScrollReveal direction="left">
              {/* Breadcrumb */}
              <div className="flex items-center space-x-2 text-xs text-[#242424]/60 font-medium">
                <button onClick={onNavigateAllCollections || onNavigateHome} className="hover:text-brand-purple transition-colors cursor-pointer">All Collections</button>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-[#242424] font-bold">Men's Collection</span>
              </div>

              <div className="space-y-4 pt-4">
                <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-[#141414] leading-[1.08] uppercase">
                  MEN'S <br />
                  <span className="italic font-light">COLLECTION</span>
                </h1>
                
                <p className="text-xs sm:text-sm font-medium text-[#242424]/80 max-w-md leading-relaxed">
                  Authentic masculine fragrances, crafted with intention and distinction.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Visual Showcase (Fast Eager Loaded Image) */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <ScrollReveal direction="right" delay={150} className="w-full max-w-lg">
              <div className="relative w-full h-[460px] sm:h-[520px] md:h-[560px] rounded-2xl overflow-hidden bg-[#141414]">
                <img 
                  src="/images/general/collection_men.jpg" 
                  alt="WondersScents Men's Collection" 
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                />
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. SECTION 1: PERFUMES (Title on LEFT, Carousel on RIGHT - Black BG)       */}
      {/* ========================================================================= */}
      <ScentCategorySection 
        title="PERFUMES"
        subtitle="Signature Eau de Parfums and Extraits designed for lasting commanding presence."
        items={menPerfumes}
        isDark={true}
        reverseLayout={false}
        onAddToCart={onAddToCart}
        onSelectProduct={onSelectProduct}
        cart={cart}
        addedItemMap={addedItemMap}
        onAdd={handleAdd}
      />

      {/* ========================================================================= */}
      {/* 3. SECTION 2: BODY SPRAYS (Title on RIGHT, Carousel on LEFT - White BG)    */}
      {/* ========================================================================= */}
      <ScentCategorySection 
        title="BODY SPRAYS"
        subtitle="All-day sweat defense and refreshing scent protection."
        items={menBodySprays}
        isDark={false}
        reverseLayout={true}
        onAddToCart={onAddToCart}
        onSelectProduct={onSelectProduct}
        cart={cart}
        addedItemMap={addedItemMap}
        onAdd={handleAdd}
      />

      {/* ========================================================================= */}
      {/* 4. SECTION 3: ROLL-ONS (Title on LEFT, Carousel on RIGHT - Black BG)       */}
      {/* ========================================================================= */}
      <ScentCategorySection 
        title="ROLL-ONS"
        subtitle="48-hour anti-perspirants and pure undiluted scented roll-ons."
        items={menRollOns}
        isDark={true}
        reverseLayout={false}
        onAddToCart={onAddToCart}
        onSelectProduct={onSelectProduct}
        cart={cart}
        addedItemMap={addedItemMap}
        onAdd={handleAdd}
      />

      {/* ========================================================================= */}
      {/* 5. SECTION 4: SCENT ROUTINE (White Background Like Home Page)             */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-white text-[#242424] border-b border-black/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          <div className="lg:col-span-3 text-left space-y-3">
            <ScrollReveal direction="left">
              <h2 className="font-display text-3xl sm:text-4xl font-normal tracking-wide text-[#141414] uppercase">
                SCENT ROUTINE
              </h2>
              <p className="text-xs sm:text-sm text-[#242424]/70 leading-relaxed font-normal">
                How to layer and maintain commanding sillage from morning to night.
              </p>
            </ScrollReveal>
          </div>

          {/* 3 Step Cards tailored to the Men's Routine */}
          <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            
            {/* Card 1 */}
            <ScrollReveal direction="up" delay={100}>
              <div className="bg-neutral-50 p-6 sm:p-7 rounded-xl border border-black/10 space-y-2.5 shadow-xs h-full">
                <h4 className="font-display text-base sm:text-lg font-bold text-[#141414]">
                  Fresh base (Roll-on)
                </h4>
                <p className="text-xs text-[#242424]/75 leading-relaxed font-normal">
                  Apply your anti-perspirant roll-on immediately after a shower. It creates a clean, sweat-free underarm base that keeps you odor-free in all weather.
                </p>
              </div>
            </ScrollReveal>

            {/* Card 2 */}
            <ScrollReveal direction="up" delay={200}>
              <div className="bg-neutral-50 p-6 sm:p-7 rounded-xl border border-black/10 space-y-2.5 shadow-xs h-full">
                <h4 className="font-display text-base sm:text-lg font-bold text-[#141414]">
                  Mid-body freshness (Body spray)
                </h4>
                <p className="text-xs text-[#242424]/75 leading-relaxed font-normal">
                  Spray body spray across your chest and torso. It provides an invigorating burst of freshness that moves with you through work and workouts.
                </p>
              </div>
            </ScrollReveal>

            {/* Card 3 */}
            <ScrollReveal direction="up" delay={300}>
              <div className="bg-neutral-50 p-6 sm:p-7 rounded-xl border border-black/10 space-y-2.5 shadow-xs h-full">
                <h4 className="font-display text-base sm:text-lg font-bold text-[#141414]">
                  Signature sillage (Perfume)
                </h4>
                <p className="text-xs text-[#242424]/75 leading-relaxed font-normal">
                  Finish with 3 to 4 sprays of your designer perfume on warm pulse points—neck, wrists, and collarbone—to leave a commanding trail everywhere you walk.
                </p>
              </div>
            </ScrollReveal>

          </div>

        </div>
      </section>

    </div>
  );
};
