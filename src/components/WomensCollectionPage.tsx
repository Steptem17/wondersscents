import React, { useState, useCallback } from 'react';
import { ChevronRight, ChevronLeft, Check, MessageCircle, Sparkles, Truck, ShieldCheck, Eye, ShoppingCart } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import type { Product } from '../types';
import type { CartItem } from '../hooks/useAppState';
import { fragranceCatalog, type FragranceItem } from '../data/fragranceDatabase';
import { ScrollReveal } from './ScrollReveal';

interface WomensCollectionPageProps {
  products?: Product[];
  onAddToCart?: (product: Product, size?: string, quantity?: number) => boolean | void;
  onSelectProduct?: (product: Product) => void;
  onNavigateHome: () => void;
  onNavigateAllCollections?: () => void;
  cart?: CartItem[];
}

// 🎛️ Reusable Spacious Carousel Section with Alternating Left/Right Layout
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
    const message = `Hello WondersScents! I am looking for a specific women's fragrance in your ${title} collection. Could you check if it is available in your store or warehouse?`;
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
        
        {/* Title & Subtitle Column */}
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
            <p className={`text-base sm:text-lg font-normal leading-relaxed max-w-sm pt-2 ${isDark ? 'text-white/75' : 'text-[#242424]/80'}`}>
              {subtitle}
            </p>
          </ScrollReveal>
        </div>

        {/* Carousel Column Flanked by Left & Right Arrows */}
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
              className={`w-12 h-12 sm:w-13 sm:h-13 flex items-center justify-center rounded-full border shadow-md transition-all duration-200 cursor-pointer active:scale-90 shrink-0 ${
                isDark 
                  ? 'bg-[#222222] border-white/20 hover:border-brand-purple hover:bg-brand-purple text-white' 
                  : 'bg-white border-black/15 hover:border-brand-purple hover:bg-brand-purple hover:text-white text-[#242424]'
              }`}
              title="Previous Item"
            >
              <ChevronLeft className="w-6 h-6 stroke-[2.4]" />
            </button>

            {/* Carousel Viewport */}
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
                        <span className="absolute top-3 left-3 px-3 py-1 text-xs font-bold uppercase tracking-widest bg-brand-purple text-white rounded-xs z-10">
                          {product.brand}
                        </span>
                      </div>

                      {/* Product Details */}
                      <div className="p-5 sm:p-6 space-y-3 flex-1 flex flex-col justify-between">
                        <div className="space-y-1.5">
                          <h3 className={`font-sans text-sm sm:text-base font-bold uppercase tracking-normal leading-snug ${isDark ? 'text-white' : 'text-[#141414]'}`}>
                            {product.name}
                          </h3>
                          <p className={`text-xs sm:text-sm leading-relaxed font-normal line-clamp-2 ${isDark ? 'text-white/65' : 'text-[#242424]/75'}`}>
                            {product.description || notes}
                          </p>
                        </div>

                        {/* Action Buttons: Details + Add */}
                        <div className={`pt-3 flex items-center space-x-2.5 border-t ${isDark ? 'border-white/10' : 'border-black/10'}`}>
                          {/* 1. Details Button */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onSelectProduct) onSelectProduct(product);
                            }}
                            className={`flex-1 py-3.5 px-3 text-xs sm:text-sm font-semibold rounded-xs transition-colors flex items-center justify-center space-x-1.5 cursor-pointer shadow-xs active:scale-95 ${
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
                            className={`flex-1 py-3.5 px-3 text-xs sm:text-sm font-semibold rounded-xs transition-all duration-300 flex items-center justify-center space-x-1.5 cursor-pointer shadow-xs active:scale-95 ${
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

export const WomensCollectionPage: React.FC<WomensCollectionPageProps> = ({ 
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

  // 1. Women's Perfumes (10 curated items)
  const womenPerfumes = sourceProducts.filter(p => {
    const cat = p.category?.toLowerCase() || '';
    const isPerfume = cat.includes('perfume') || cat.includes('parfum') || cat.includes('toilette') || cat.includes('edp') || cat.includes('edt');
    const isWomen = p.tags?.includes('women') || (p as FragranceItem).gender === 'Women';
    return isPerfume && isWomen && !cat.includes('spray') && !cat.includes('mist') && !cat.includes('roll');
  }).slice(0, 10);

  // 2. Women's Body Sprays (10 curated items)
  const womenBodySprays = sourceProducts.filter(p => {
    const cat = p.category?.toLowerCase() || '';
    const name = p.name?.toLowerCase() || '';
    const isSpray = cat.includes('spray') || name.includes('spray') || p.tags?.includes('spray');
    const isWomen = p.tags?.includes('women') || (p as FragranceItem).gender === 'Women';
    return isSpray && isWomen && !cat.includes('mist') && !cat.includes('roll');
  }).slice(0, 10);

  // 3. Women's Body Mists (10 curated items)
  const womenBodyMists = sourceProducts.filter(p => {
    const cat = p.category?.toLowerCase() || '';
    const name = p.name?.toLowerCase() || '';
    const isMist = cat.includes('mist') || name.includes('mist') || p.tags?.includes('mist') || cat.includes('splash') || name.includes('splash') || p.tags?.includes('splash');
    const isWomen = p.tags?.includes('women') || (p as FragranceItem).gender === 'Women';
    return isMist && isWomen;
  }).slice(0, 10);

  // 4. Women's Roll-Ons (10 curated items)
  const womenRollOns = sourceProducts.filter(p => {
    const cat = p.category?.toLowerCase() || '';
    const name = p.name?.toLowerCase() || '';
    const isRollOn = cat.includes('roll') || name.includes('roll') || p.tags?.includes('roll on') || p.tags?.includes('roll-on');
    const isWomen = p.tags?.includes('women') || (p as FragranceItem).gender === 'Women';
    return isRollOn && isWomen;
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
    <div className="w-full bg-white text-[#242424] font-sans min-h-screen selection:bg-brand-purple selection:text-white animate-fadeIn">
      
      {/* ========================================================================= */}
      {/* 1A. DESKTOP EDITORIAL HERO (Pure White Background Like Men's & Home Page)  */}
      {/* ========================================================================= */}
      <section className="hidden lg:block relative w-full bg-white border-b border-black/10 py-16 sm:py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left: Typography */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <ScrollReveal direction="left">
              {/* Breadcrumb */}
              <div className="flex items-center space-x-2 text-xs text-[#242424]/60 font-medium">
                <button onClick={onNavigateAllCollections || onNavigateHome} className="hover:text-brand-purple transition-colors cursor-pointer">All Collections</button>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-[#242424] font-bold">Women's Collection</span>
              </div>

              <div className="space-y-4 pt-4">
                <span className="text-xs sm:text-sm font-bold text-brand-purple tracking-[0.25em] uppercase block">
                  ELEGANT FEMININE ESSENCES
                </span>
                <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-[#141414] leading-[1.08] uppercase">
                  WOMEN'S <br />
                  <span className="italic font-light">COLLECTION</span>
                </h1>
                
                <p className="text-base sm:text-lg md:text-xl font-normal text-[#242424]/80 max-w-lg leading-relaxed">
                  Authentic designer perfumes, long-lasting body mists, and refreshing body sprays curated for feminine elegance.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Visual Showcase (Fast Eager Loaded Image) */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <ScrollReveal direction="right" delay={150} className="w-full max-w-lg">
              <div className="relative w-full h-[460px] sm:h-[520px] md:h-[560px] rounded-2xl overflow-hidden bg-[#141414]">
                <img 
                  src="/images/general/collection_women.jpg" 
                  alt="WondersScents Women's Collection" 
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                />
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 1B. MOBILE EDITORIAL HERO: SLANTING SCENT LINE (Pure White Background)     */}
      {/* ========================================================================= */}
      <section className="lg:hidden relative w-full bg-white overflow-hidden border-b border-black/10">
        
        {/* Top Photographic Canvas */}
        <div className="relative w-full h-[440px] sm:h-[520px] overflow-hidden bg-white">
          <img 
            src="/images/general/collection_women.jpg" 
            alt="WondersScents Femme Collection" 
            className="w-full h-full object-cover object-top sm:object-center filter brightness-[0.96] contrast-[1.03]"
            loading="eager"
          />
          {/* Ambient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/15 pointer-events-none" />
        </div>

        {/* Diagonal Angled Scent Paper Plane (Pure White) */}
        <div className="relative z-10 -mt-20 sm:-mt-28 bg-white pt-24 sm:pt-32 pb-16 px-6 sm:px-10 [clip-path:polygon(0_90px,100%_0%,100%_100%,0%_100%)] sm:[clip-path:polygon(0_120px,100%_0%,100%_100%,0%_100%)] shadow-xs">
          
          <div className="max-w-7xl mx-auto space-y-10">
            
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-xs text-[#242424]/60 font-medium pt-4 sm:pt-6">
              <button onClick={onNavigateAllCollections || onNavigateHome} className="hover:text-brand-purple transition-colors cursor-pointer">All Collections</button>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-[#242424] font-bold">Women's Collection</span>
            </div>

            <div className="space-y-8">
              {/* Brand Typography */}
              <div className="space-y-3 text-left">
                <ScrollReveal direction="left">
                  <h1 className="font-display text-3xl sm:text-5xl font-normal tracking-wide text-[#141414] uppercase leading-[1.1]">
                    WONDERS SCENTS <br />
                    <span className="font-light tracking-widest text-2xl sm:text-3xl text-[#2a2a2a] block mt-1">
                      FEMME
                    </span>
                  </h1>

                  <p className="text-base sm:text-lg text-[#242424]/85 font-normal leading-relaxed max-w-md pt-2">
                    Authentic designer perfumes, long-lasting body mists, and refreshing body sprays curated for feminine elegance.
                  </p>
                </ScrollReveal>
              </div>

              {/* Customer Guarantees */}
              <div className="space-y-0 divide-y divide-black/10 border-t border-b border-black/10 text-left bg-neutral-50/80 rounded-xs font-sans">
                
                {/* Row 1: Long-lasting scents */}
                <ScrollReveal direction="right" delay={50}>
                  <div className="py-5 px-4 flex items-center justify-between group transition-colors">
                    <div className="flex items-start space-x-4">
                      <div className="p-1.5 text-[#8a7243] shrink-0 mt-0.5">
                        <Sparkles className="w-5 h-5 stroke-[1.5]" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-sans text-sm font-bold text-[#141414]">
                          Long-lasting scents
                        </h4>
                        <p className="text-xs text-[#242424]/75 leading-relaxed font-normal">
                          Carefully selected perfumes and mists that stay on your skin and clothes from morning till night.
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>

                {/* Row 2: Original designer brands */}
                <ScrollReveal direction="right" delay={150}>
                  <div className="py-5 px-4 flex items-center justify-between group transition-colors">
                    <div className="flex items-start space-x-4">
                      <div className="p-1.5 text-[#8a7243] shrink-0 mt-0.5">
                        <ShieldCheck className="w-5 h-5 stroke-[1.5]" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-sans text-sm font-bold text-[#141414]">
                          Original designer brands
                        </h4>
                        <p className="text-xs text-[#242424]/75 leading-relaxed font-normal">
                          100% genuine fragrances sourced directly from trusted global brands.
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>

                {/* Row 3: Doorstep delivery */}
                <ScrollReveal direction="right" delay={250}>
                  <div className="py-5 px-4 flex items-center justify-between group transition-colors">
                    <div className="flex items-start space-x-4">
                      <div className="p-1.5 text-[#8a7243] shrink-0 mt-0.5">
                        <Truck className="w-5 h-5 stroke-[1.5]" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-sans text-sm font-bold text-[#141414]">
                          Doorstep delivery
                        </h4>
                        <p className="text-xs text-[#242424]/75 leading-relaxed font-normal">
                          Quick order packaging and reliable delivery straight to your location across Nigeria.
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. SECTION 1: PERFUMES (Title on LEFT, Carousel on RIGHT - Black BG)       */}
      {/* ========================================================================= */}
      <div id="womens-perfumes">
        <ScentCategorySection 
          title="PERFUMES"
          subtitle="Long-lasting feminine designer perfumes with captivating sillage."
          items={womenPerfumes}
          isDark={true}
          reverseLayout={false}
          onAddToCart={onAddToCart}
          onSelectProduct={onSelectProduct}
          cart={cart}
          addedItemMap={addedItemMap}
          onAdd={handleAdd}
        />
      </div>

      {/* ========================================================================= */}
      {/* 3. SECTION 2: BODY MISTS (Title on RIGHT, Carousel on LEFT - White BG)     */}
      {/* ========================================================================= */}
      <ScentCategorySection 
        title="BODY MISTS"
        subtitle="Hydrating, lightweight all-over mists for effortless daily radiance."
        items={womenBodyMists}
        isDark={false}
        reverseLayout={true}
        onAddToCart={onAddToCart}
        onSelectProduct={onSelectProduct}
        cart={cart}
        addedItemMap={addedItemMap}
        onAdd={handleAdd}
      />

      {/* ========================================================================= */}
      {/* 4. SECTION 3: BODY SPRAYS (Title on LEFT, Carousel on RIGHT - Black BG)    */}
      {/* ========================================================================= */}
      <ScentCategorySection 
        title="BODY SPRAYS"
        subtitle="48-hour fresh sweat defense and beautifully scented confidence."
        items={womenBodySprays}
        isDark={true}
        reverseLayout={false}
        onAddToCart={onAddToCart}
        onSelectProduct={onSelectProduct}
        cart={cart}
        addedItemMap={addedItemMap}
        onAdd={handleAdd}
      />

      {/* ========================================================================= */}
      {/* 5. SECTION 4: ROLL-ONS (Title on RIGHT, Carousel on LEFT - White BG)      */}
      {/* ========================================================================= */}
      <ScentCategorySection 
        title="ROLL-ONS"
        subtitle="Pure undiluted perfume oils and gentle skin-brightening roll-ons."
        items={womenRollOns}
        isDark={false}
        reverseLayout={true}
        onAddToCart={onAddToCart}
        onSelectProduct={onSelectProduct}
        cart={cart}
        addedItemMap={addedItemMap}
        onAdd={handleAdd}
      />

      {/* ========================================================================= */}
      {/* 7. SECTION 5: SCENT ROUTINE (White Background Like Home Page)             */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-white text-[#242424] border-b border-black/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          <div className="lg:col-span-3 text-left space-y-3">
            <ScrollReveal direction="left">
              <h2 className="font-display text-3xl sm:text-4xl font-normal tracking-wide text-[#141414] uppercase">
                SCENT ROUTINE
              </h2>
              <p className="text-xs sm:text-sm font-medium text-[#242424]/75 leading-relaxed max-w-xs pt-1">
                A 3-step layering ritual designed to keep you smelling radiant all day long.
              </p>
            </ScrollReveal>
          </div>

          {/* 3 Step Cards */}
          <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            
            {/* Card 1 */}
            <ScrollReveal direction="up" delay={100}>
              <div className="bg-neutral-50 p-6 sm:p-7 rounded-xl border border-black/10 space-y-2.5 shadow-xs h-full">
                <h4 className="font-display text-base sm:text-lg font-bold text-[#141414]">
                  Soft underarm base (Roll-on)
                </h4>
                <p className="text-xs text-[#242424]/75 leading-relaxed font-normal">
                  Apply a brightening, gentle anti-perspirant roll-on immediately after a bath to lock in fresh, odor-free protection.
                </p>
              </div>
            </ScrollReveal>

            {/* Card 2 */}
            <ScrollReveal direction="up" delay={200}>
              <div className="bg-neutral-50 p-6 sm:p-7 rounded-xl border border-black/10 space-y-2.5 shadow-xs h-full">
                <h4 className="font-display text-base sm:text-lg font-bold text-[#141414]">
                  All-over veil (Body mist / Spray)
                </h4>
                <p className="text-xs text-[#242424]/75 leading-relaxed font-normal">
                  Mist generously over shoulders, arms, and clothing. The fine scented droplets infuse fabrics with an inviting halo.
                </p>
              </div>
            </ScrollReveal>

            {/* Card 3 */}
            <ScrollReveal direction="up" delay={300}>
              <div className="bg-neutral-50 p-6 sm:p-7 rounded-xl border border-black/10 space-y-2.5 shadow-xs h-full">
                <h4 className="font-display text-base sm:text-lg font-bold text-[#141414]">
                  Signature projection (Perfume)
                </h4>
                <p className="text-xs text-[#242424]/75 leading-relaxed font-normal">
                  Touch pulse points—behind ears, wrists, and neckline—with concentrated perfume or undiluted oil to create a memorable trail.
                </p>
              </div>
            </ScrollReveal>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. BOTTOM VISUAL MOOD GALLERY                                            */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 px-6 md:px-12 bg-[#101010] text-white border-t border-white/10">
        <div className="max-w-7xl mx-auto space-y-10 text-center">
          
          {/* 4 Feminine Fragrance Concept Images */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="h-48 sm:h-64 rounded-xl overflow-hidden bg-white border border-white/10 flex items-center justify-center p-3">
              <img 
                src="/images/women/baccarat_rouge_540_extrait.png" 
                alt="Maison Francis Kurkdjian Baccarat Rouge 540 Extrait" 
                className="w-full h-full object-contain transition-transform duration-700 hover:scale-108"
              />
            </div>

            <div className="h-48 sm:h-64 rounded-xl overflow-hidden bg-white border border-white/10 flex items-center justify-center p-3">
              <img 
                src="/images/women/lattafa_yara_pink_bottle.png" 
                alt="Lattafa Yara Pink Eau de Parfum" 
                className="w-full h-full object-contain transition-transform duration-700 hover:scale-108"
              />
            </div>

            <div className="h-48 sm:h-64 rounded-xl overflow-hidden bg-white border border-white/10 flex items-center justify-center p-3">
              <img 
                src="/images/women/chanel_coco_mademoiselle_bottle.png" 
                alt="Chanel Coco Mademoiselle Eau de Parfum" 
                className="w-full h-full object-contain transition-transform duration-700 hover:scale-108"
              />
            </div>

            <div className="h-48 sm:h-64 rounded-xl overflow-hidden bg-white border border-white/10 flex items-center justify-center p-3">
              <img 
                src="/images/women/bbw_a_thousand_wishes_mist.png" 
                alt="Bath & Body Works A Thousand Wishes Mist" 
                className="w-full h-full object-contain transition-transform duration-700 hover:scale-108"
              />
            </div>
          </div>

          {/* Authentic Brand Closing Tagline */}
          <div className="pt-4 space-y-1.5 text-xs sm:text-sm font-display tracking-widest text-white/80 uppercase">
            <p className="font-semibold text-white tracking-widest">SMELL NICE, FEEL GOOD, LOOK GOOD.</p>
            <p className="text-[11px] sm:text-xs text-[#b89c65] font-sans font-medium tracking-normal normal-case">
              100% Authentic Designer Fragrances • Fast Nationwide Delivery
            </p>
          </div>

        </div>
      </section>

    </div>
  );
};
