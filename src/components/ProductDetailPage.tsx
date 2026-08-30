import React, { useState, useEffect, useMemo } from 'react';
import { 
  Check, 
  ShoppingCart, 
  ChevronRight, 
  ChevronLeft,
  ChevronDown, 
  ChevronUp,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import type { Product } from '../types';
import type { CartItem } from '../hooks/useAppState';
import { fragranceCatalog } from '../data/fragranceDatabase';
import { ScrollReveal } from './ScrollReveal';

interface ProductDetailPageProps {
  product: Product;
  onAddToCart?: (product: Product, size?: string, quantity?: number) => boolean | void;
  onSelectProduct?: (product: Product) => void;
  onNavigateHome: () => void;
  onNavigateAllCollections: () => void;
  cart?: CartItem[];
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onAddToCart,
  onSelectProduct,
  onNavigateAllCollections,
  cart = []
}) => {
  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [quantity, setQuantity] = useState(1);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});
  
  // Refund policy accordion state
  const [isRefundOpen, setIsRefundOpen] = useState(false);

  // Responsive paged carousel state (No cut-off items!)
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  // Touch swipe support on mobile
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Scroll to top on product change & reset selected image
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    setQuantity(1);
    setStatusMessage(null);
    setCurrentPageIndex(0);
    setSelectedImage(product.image);
  }, [product]);

  // Gallery images list (Single bottle + Box/Set presentation)
  const galleryImages = useMemo(() => {
    const list: string[] = [];
    if (product.image) list.push(product.image);
    if (product.hoverImage && !list.includes(product.hoverImage)) {
      list.push(product.hoverImage);
    }
    if (product.images && product.images.length > 0) {
      product.images.forEach((img: string) => {
        if (img && !list.includes(img)) list.push(img);
      });
    }
    return list;
  }, [product.image, product.hoverImage, product.images]);

  // Check if main product is already in cart
  const isProductInCart = cart.some(item => item.product.id === product.id);

  // Clean description dynamically removing any accidental duplicate note lines
  const cleanDescription = useMemo(() => {
    if (!product.description) return 'An extraordinary haute-perfumery creation crafted with rich aromatic concentrates that leave a lasting and distinguished sillage.';
    return product.description
      .split('\n')
      .filter(line => {
        const lower = line.trim().toLowerCase();
        return !lower.startsWith('top:') && 
               !lower.startsWith('heart:') && 
               !lower.startsWith('base:') && 
               !lower.startsWith('when to wear:') &&
               !lower.startsWith('middle:');
      })
      .join('\n')
      .trim();
  }, [product.description]);

  // Check if current image is a multi-bottle photo collection that should cover the entire canvas edge-to-edge
  const isFullCoverImage = useMemo(() => {
    const imgStr = (selectedImage || '').toLowerCase();
    const pName = (product.name || '').toLowerCase();
    return imgStr.includes('touch_perfume_oil') || 
           imgStr.includes('wonders_scents_perfume_oil') ||
           imgStr.includes('collection_perfume_oil') ||
           product.id === 'ws-oil-touch-02' ||
           product.id === 'ws-oil-wonders-scents-06' ||
           pName.includes('touch perfume oil') ||
           pName.includes('wonders scents pure perfume oil');
  }, [selectedImage, product.id, product.name]);

  // All other products from the complete catalogue + Dedicated "Can't Find Your Perfume" box at the end
  const allCollectionProducts = useMemo(() => {
    const list = fragranceCatalog.filter(item => item.id !== product.id);
    const customConciergeItem: Product = {
      id: 'custom-concierge-request-box',
      name: "Can't Find Your Perfume?",
      brand: 'Custom Concierge',
      category: 'Perfume Oil',
      price: 0,
      image: '/images/general/collection_perfume_oil.jpg',
      description: 'Request any custom perfume or oil directly from our concierge on WhatsApp.',
      stock: 1,
      availability: 'in-stock',
      sizes: ['Custom'],
      sku: 'WS-CUSTOM-001',
      tags: ['concierge', 'custom']
    };
    return [...list, customConciergeItem];
  }, [product.id]);

  // Dynamically calculate visible items per page based on viewport with safe index re-clamping
  useEffect(() => {
    const handleResize = () => {
      let newItemsPerPage = 6;
      if (window.innerWidth < 640) {
        newItemsPerPage = 2; // Mobile: 2 full cards
      } else if (window.innerWidth < 1024) {
        newItemsPerPage = 4; // Tablet: 4 full cards
      } else {
        newItemsPerPage = 6; // Desktop: 6 full cards
      }
      setItemsPerPage(newItemsPerPage);
      setCurrentPageIndex(prev => {
        const maxPages = Math.max(1, Math.ceil(allCollectionProducts.length / newItemsPerPage));
        return Math.min(prev, maxPages - 1);
      });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [allCollectionProducts.length]);

  const totalPages = Math.max(1, Math.ceil(allCollectionProducts.length / itemsPerPage));

  // Current page products (Safely clamped so it NEVER renders empty on screen resize!)
  const currentVisibleProducts = useMemo(() => {
    const safeIndex = Math.max(0, Math.min(currentPageIndex, totalPages - 1));
    const start = safeIndex * itemsPerPage;
    return allCollectionProducts.slice(start, start + itemsPerPage);
  }, [allCollectionProducts, currentPageIndex, itemsPerPage, totalPages]);

  // Dynamic tag helper for recommendation cards
  const getRecommendationTag = (item: Product): string => {
    const pName = (item.name || '').toLowerCase();
    const pCat = (item.category || '').toLowerCase();
    const pBrand = (item.brand || '').toLowerCase();
    const pTags = (item.tags || []).map(t => t.toLowerCase());

    if (pName.includes('roll') || pTags.includes('roll-on') || pTags.includes('roll on')) {
      return 'ROLL-ON';
    }
    if (pName.includes('mist') || pName.includes('spray') || pCat.includes('mist') || pTags.includes('mist')) {
      return 'BODY MIST';
    }
    if (pCat.includes('oil') || pName.includes('oil') || pBrand.includes('oil') || pTags.includes('oil')) {
      return 'PERFUME OIL';
    }
    if (pTags.includes('women') || pCat.includes('women') || pName.includes('women') || pName.includes('femme') || pName.includes('pour femme') || pName.includes('mademoiselle') || pName.includes('miss')) {
      return 'WOMEN';
    }
    if (pTags.includes('men') || pCat.includes('men') || pName.includes('men') || pName.includes('homme') || pName.includes('pour homme') || pName.includes('sauvage') || pName.includes('aventus') || pName.includes('eros') || pName.includes('bleu')) {
      return 'MEN';
    }
    return 'UNISEX';
  };

  const handleAddToCart = () => {
    if (isProductInCart) {
      setStatusMessage('Already in cart');
      setTimeout(() => setStatusMessage(null), 4000);
      return;
    }

    if (onAddToCart) {
      // Pass the product with the currently selected active image (single bottle or box set)
      const productToAdd: Product = {
        ...product,
        image: selectedImage || product.image
      };
      const result = onAddToCart(productToAdd, product.sizes?.[0] || '100ml', quantity);
      if (result === false) {
        setStatusMessage('Already in cart');
      } else {
        setStatusMessage('Added to cart');
      }
      setTimeout(() => setStatusMessage(null), 4000);
    }
  };

  const handleAddRecommendation = (item: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(item, item.sizes?.[0] || '100ml', 1);
    }
    setAddedItems(prev => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [item.id]: false }));
    }, 3000);
  };

  const handleBuyItNow = () => {
    if (onAddToCart) {
      const productToAdd: Product = {
        ...product,
        image: selectedImage || product.image
      };
      onAddToCart(productToAdd, product.sizes?.[0] || '100ml', quantity);
    }
    // Direct WhatsApp Concierge Instant Checkout
    const text = encodeURIComponent(
      `Hello Wonders Scents! I would like to purchase *${product.name}* (${quantity} item(s)). Please confirm availability and delivery details.`
    );
    window.open(`https://wa.me/2348145620271?text=${text}`, '_blank');
  };

  const handleNextPage = () => {
    setCurrentPageIndex(prev => Math.min(prev + 1, totalPages - 1));
  };

  const handlePrevPage = () => {
    setCurrentPageIndex(prev => Math.max(0, prev - 1));
  };

  const minSwipeDistance = 45;
  const onTouchStartHandler = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMoveHandler = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  const onTouchEndHandler = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) {
      handleNextPage();
    } else if (distance < -minSwipeDistance) {
      handlePrevPage();
    }
  };

  return (
    <div className="w-full bg-white text-[#111111] font-sans min-h-screen selection:bg-brand-purple selection:text-white pb-24">
      
      {/* ========================================================================= */}
      {/* 1. TOP BREADCRUMB: All products > [Product Name] (Desktop/Tablet Only)    */}
      {/* ========================================================================= */}
      <div className="hidden sm:block w-full bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center space-x-2 text-xs text-[#181818]/60 font-normal">
          <button 
            onClick={onNavigateAllCollections}
            className="hover:text-brand-purple hover:underline cursor-pointer transition-colors"
          >
            All products
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-black/30" />
          <span className="text-[#111111] font-medium truncate max-w-xs sm:max-w-md">
            {product.name}
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MAIN 2-COLUMN PRODUCT DETAIL SECTION                                   */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 pt-4 sm:pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* ----------------------------------------------------------------------- */}
          {/* LEFT COLUMN: Full-Cover Hero Photo + Description Below                  */}
          {/* ----------------------------------------------------------------------- */}
          <div className="lg:col-span-6 space-y-8">
            <ScrollReveal direction="left">
              {/* Responsive Image Showcase with Thumbnails (Desktop: Side | Mobile/Tablet: Below) */}
              <div className="flex flex-col md:flex-row gap-4 items-start">
                {/* Thumbnails (Side on md+, Below on mobile) */}
                {galleryImages.length > 1 && (
                  <div className="flex flex-row md:flex-col gap-3 order-2 md:order-1 shrink-0 overflow-x-auto md:overflow-y-auto w-full md:w-auto pb-1 md:pb-0">
                    {galleryImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(img)}
                        className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border transition-all duration-200 cursor-pointer bg-white p-1.5 shrink-0 flex items-center justify-center ${
                          selectedImage === img 
                            ? 'border-brand-purple shadow-xs opacity-100' 
                            : 'border-black/10 hover:border-black/30 opacity-60 hover:opacity-100'
                        }`}
                        aria-label={`View photo ${idx + 1}`}
                      >
                        <img src={img} alt="" className="w-full h-full object-contain" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Main Large Photo Canvas */}
                <div className={`w-full aspect-square max-h-[520px] bg-white rounded-2xl border border-black/10 overflow-hidden relative group order-1 md:order-2 flex items-center justify-center ${isFullCoverImage ? 'p-0' : 'p-6 sm:p-8 md:p-10'} shadow-xs`}>
                  <img
                    src={selectedImage}
                    alt={product.name}
                    className={`w-full h-full ${isFullCoverImage ? 'object-cover' : 'object-contain'} transition-transform duration-500 group-hover:scale-105`}
                  />
                </div>
              </div>

              {/* Description Section */}
              <div className="border-t border-black/10 pt-6 space-y-5">
                <h3 className="font-display text-base sm:text-lg font-bold text-[#111111] uppercase tracking-wider">
                  Description
                </h3>
                
                <div className="text-sm sm:text-base text-[#181818]/85 leading-relaxed font-normal space-y-3 whitespace-pre-line">
                  {cleanDescription}
                </div>

                {/* Fragrance Notes Breakdown if available */}
                {product.fragranceProfile && (
                  <div className="border-t border-black/10 pt-4 space-y-3">
                    <h4 className="text-sm font-bold text-[#111111] uppercase tracking-wider">
                      Fragrance Notes
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
                      {product.fragranceProfile.topNotes && product.fragranceProfile.topNotes.length > 0 && (
                        <div className="p-3.5 bg-neutral-50 rounded-xl border border-black/5">
                          <span className="font-bold text-brand-purple block text-xs uppercase tracking-wider">Top Notes</span>
                          <span className="text-[#181818]/85 text-xs sm:text-sm mt-1 block">{product.fragranceProfile.topNotes.join(', ')}</span>
                        </div>
                      )}
                      {product.fragranceProfile.middleNotes && product.fragranceProfile.middleNotes.length > 0 && (
                        <div className="p-3.5 bg-neutral-50 rounded-xl border border-black/5">
                          <span className="font-bold text-brand-purple block text-xs uppercase tracking-wider">Heart Notes</span>
                          <span className="text-[#181818]/85 text-xs sm:text-sm mt-1 block">{product.fragranceProfile.middleNotes.join(', ')}</span>
                        </div>
                      )}
                      {product.fragranceProfile.baseNotes && product.fragranceProfile.baseNotes.length > 0 && (
                        <div className="p-3.5 bg-neutral-50 rounded-xl border border-black/5">
                          <span className="font-bold text-brand-purple block text-xs uppercase tracking-wider">Base Notes</span>
                          <span className="text-[#181818]/85 text-xs sm:text-sm mt-1 block">{product.fragranceProfile.baseNotes.join(', ')}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* When to Wear Occasions */}
                {(product.whenToWear || product.fragranceProfile?.whenToWear) && (
                  <div className="border-t border-black/10 pt-4 space-y-2">
                    <h4 className="text-sm font-bold text-[#111111] uppercase tracking-wider">
                      When to Wear
                    </h4>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {(product.whenToWear || product.fragranceProfile?.whenToWear || []).map((occasion, idx) => (
                        <span 
                          key={idx}
                          className="px-3 py-1.5 bg-neutral-100 border border-black/10 rounded-full text-xs font-medium text-[#181818]/85"
                        >
                          {occasion}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Refund Policy Accordion */}
                <div className="border-t border-black/10 pt-4">
                  <button
                    onClick={() => setIsRefundOpen(!isRefundOpen)}
                    className="w-full flex items-center justify-between py-2 text-sm font-semibold text-[#111111] hover:text-brand-purple transition-colors cursor-pointer"
                  >
                    <span>Refund Policy</span>
                    {isRefundOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  
                  {isRefundOpen && (
                    <div className="pt-2 text-sm text-[#181818]/80 leading-relaxed space-y-2.5 border-t border-black/5 mt-2">
                      <p>
                        At <strong>Wonders Scents</strong>, our designer perfumes and undiluted perfume oils are 100% genuine, uncut, and long-lasting.
                      </p>
                      <p>
                        In the rare event of transit defect, breakage, or leakage during delivery, notify our customer support (+234 814 562 0271 / +234 905 232 9788) within <strong>48 hours</strong> of delivery with a photo or video for an immediate replacement or full refund.
                      </p>
                      <p className="text-xs text-[#181818]/70">
                        *Note: Certain authentic designer fragrances and pure perfume oils naturally do not come with manufacturer cellophane seals; as long as the product is in its original received condition, our exchange and transit guarantee fully applies.
                      </p>
                    </div>
                  )}
                </div>

              </div>
            </ScrollReveal>
          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* RIGHT COLUMN: Buy Box, Stock, CTAs & Availability                       */}
          {/* ----------------------------------------------------------------------- */}
          <div className="lg:col-span-6 space-y-6">
            <ScrollReveal direction="right" delay={100} className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <h1 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-[#111111] tracking-tight leading-snug">
                  {product.name}
                </h1>
              </div>

              {/* In Stock Badge (No Price Display) */}
              <div className="flex items-center space-x-2 pt-1">
                <span className="text-xs sm:text-sm font-semibold uppercase text-brand-purple px-3 py-1 bg-brand-purple-light rounded-full border border-brand-purple/20">
                  In Stock
                </span>
              </div>

              {/* Action Buttons: Add to Cart & Buy It Now */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={handleAddToCart}
                  className={`w-full py-4 sm:py-4.5 px-6 rounded-xs font-bold text-sm sm:text-base transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer active:scale-95 ${
                    statusMessage
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'bg-[#111111] hover:bg-brand-purple text-white shadow-md'
                  }`}
                >
                  {statusMessage ? (
                    <>
                      <Check className="w-5 h-5 stroke-[2.5]" />
                      <span>{statusMessage}</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleBuyItNow}
                  className="w-full py-4 sm:py-4.5 px-6 rounded-xs font-bold text-sm sm:text-base bg-brand-purple hover:bg-brand-purple-deep text-white shadow-md transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer active:scale-95"
                >
                  <span>Buy It Now</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </ScrollReveal>
          </div>

        </div>

        {/* ======================================================================= */}
        {/* 3. RECOMMENDATIONS & SIMILAR PRODUCTS CAROUSEL                           */}
        {/* ======================================================================= */}
        <div className="mt-20 pt-10 border-t border-black/10 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-[#111111] uppercase tracking-tight">
              You May Also Like
            </h3>
            <button
              onClick={onNavigateAllCollections}
              className="text-xs sm:text-sm font-semibold text-brand-purple hover:text-brand-purple-deep transition-colors cursor-pointer"
            >
              View All Collection →
            </button>
          </div>

          {/* Carousel Track: Left & Right Floating Arrows */}
          <div className="relative group/carousel px-1">
            
            {/* Left Edge Floating Arrow Button */}
            {totalPages > 1 && (
              <button
                onClick={handlePrevPage}
                disabled={currentPageIndex === 0}
                className="flex absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white border-2 border-black/20 shadow-xl hover:bg-brand-purple hover:text-white hover:border-brand-purple transition-all duration-300 cursor-pointer active:scale-90 items-center justify-center hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-black disabled:hover:border-black/20"
                title="Previous"
                aria-label="Previous items"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.4]" />
              </button>
            )}

            {/* Right Edge Floating Arrow Button */}
            {totalPages > 1 && (
              <button
                onClick={handleNextPage}
                disabled={currentPageIndex >= totalPages - 1}
                className="flex absolute -right-3 sm:-right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white border-2 border-black/20 shadow-xl hover:bg-brand-purple hover:text-white hover:border-brand-purple transition-all duration-300 cursor-pointer active:scale-90 items-center justify-center hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-black disabled:hover:border-black/20"
                title="Next"
                aria-label="Next items"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.4]" />
              </button>
            )}

            {/* 100% Responsive Grid with Touch Swipe (2 cards on Mobile, 4 on Tablet, 6 on Desktop) */}
            <div 
              key={currentPageIndex}
              onTouchStart={onTouchStartHandler}
              onTouchMove={onTouchMoveHandler}
              onTouchEnd={onTouchEndHandler}
              className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 animate-fadeIn select-none"
            >
              {currentVisibleProducts.map((item) => {
                // If it's the dedicated custom request box
                if (item.id === 'custom-concierge-request-box') {
                  return (
                    <a
                      key={item.id}
                      href="https://wa.me/2348145620271?text=Hello%20Wonders%20Scents%2C%20I%20am%20looking%20for%20a%20specific%20perfume%20not%20listed%20in%20the%20catalogue."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col justify-between space-y-3.5 group cursor-pointer border border-black/15 hover:border-black/40 hover:shadow-lg p-3 sm:p-4 rounded-2xl transition-all duration-300 ease-out bg-white hover:-translate-y-1 w-full text-center"
                    >
                      {/* Top Graphic / Concierge icon */}
                      <div className="w-full aspect-square bg-neutral-50 rounded-xl border border-black/10 flex flex-col items-center justify-center p-3 text-center relative overflow-hidden group-hover:bg-neutral-100 transition-colors">
                        <span className="absolute top-2 left-2 text-[8px] sm:text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 bg-[#25D366] text-white rounded-full shadow-xs">
                          CUSTOM
                        </span>
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366] mb-1 group-hover:scale-110 transition-transform">
                          <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-[#25D366]" />
                        </div>
                        <span className="text-xs font-medium text-[#111111]/75">
                          Any fragrance
                        </span>
                      </div>

                      {/* Title in small / title letters */}
                      <div className="space-y-0.5 min-h-[36px] flex items-center justify-center text-center">
                        <h4 className="font-display text-xs sm:text-sm font-bold text-[#111111] line-clamp-2 leading-snug group-hover:text-[#25D366] transition-colors">
                          Can't find your perfume?
                        </h4>
                      </div>

                      {/* Quick Request Button */}
                      <div className="w-full py-2.5 text-xs sm:text-sm font-semibold rounded-md transition-all duration-300 flex items-center justify-center space-x-1 shadow-xs bg-[#25D366] hover:bg-[#20ba5a] text-white active:scale-95">
                        <span>Request on WhatsApp</span>
                        <span className="text-xs">↗</span>
                      </div>
                    </a>
                  );
                }

                const isAdded = addedItems[item.id];
                const tag = getRecommendationTag(item);

                return (
                  <div
                    key={item.id}
                    onClick={() => onSelectProduct && onSelectProduct(item)}
                    className="flex flex-col justify-between space-y-3.5 group cursor-pointer border border-black/10 hover:border-brand-purple/50 hover:shadow-lg p-3 sm:p-4 rounded-2xl transition-all duration-300 ease-out bg-white hover:-translate-y-1 w-full"
                  >
                    {/* Photo container with full cover & small category badge */}
                    <div className="w-full aspect-square bg-neutral-100 rounded-xl overflow-hidden relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-108"
                      />
                      <span className="absolute top-2 left-2 text-[8px] sm:text-[9px] font-bold tracking-wider uppercase px-2.5 py-0.5 bg-white/90 backdrop-blur-xs rounded-full text-black/85 shadow-xs z-10 border border-black/5">
                        {tag}
                      </span>
                    </div>

                    {/* Metadata */}
                    <div className="space-y-0.5 min-h-[36px] flex items-center justify-center text-center">
                      <h4 className="font-display text-xs sm:text-sm font-bold text-[#111111] line-clamp-2 leading-snug group-hover:text-brand-purple transition-colors">
                        {item.name}
                      </h4>
                    </div>

                    {/* Quick Add Button */}
                    <button
                      onClick={(e) => handleAddRecommendation(item, e)}
                      className={`w-full py-2.5 text-xs sm:text-sm font-semibold rounded-md transition-all duration-300 cursor-pointer flex items-center justify-center space-x-1.5 shadow-xs active:scale-95 ${
                        isAdded 
                          ? 'bg-emerald-600 text-white' 
                          : 'bg-black hover:bg-neutral-800 text-white'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4 stroke-[2.5]" />
                          <span>Added</span>
                        </>
                      ) : (
                        <span>Add to cart</span>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ProductDetailPage;
