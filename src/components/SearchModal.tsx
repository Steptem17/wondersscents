import React, { useState, useEffect, useMemo } from 'react';
import { Search, X, ShoppingCart, Check, MessageCircle, Sparkles } from 'lucide-react';
import { searchEngine } from '../services/searchEngine';
import type { FragranceItem } from '../data/fragranceDatabase';
import type { Product } from '../types';
import type { CartItem } from '../hooks/useAppState';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart?: (product: Product, size?: string, quantity?: number) => boolean | void;
  cart?: CartItem[];
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onAddToCart,
  cart = []
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [itemStatusMap, setItemStatusMap] = useState<Record<string, string>>({});

  const handleClose = () => {
    setSearchQuery('');
    setItemStatusMap({});
    onClose();
  };

  // 🔒 Lock scrolling when search modal is open & reset query on close
  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      setSearchQuery('');
      setItemStatusMap({});
    }
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleClose]);

  // Live instant letter-by-letter matching strictly on Name, Brand, Gender, or Category
  const matchingResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return searchEngine.search(searchQuery);
  }, [searchQuery]);

  const handleAddToCart = (e: React.MouseEvent, item: FragranceItem) => {
    e.stopPropagation();

    // Check if item already exists in cart globally
    const isAlreadyInCart = cart.some(cartItem => cartItem.product.id === item.id);

    if (isAlreadyInCart) {
      // Strictly already in cart: do NOT add or increment cart!
      setItemStatusMap(prev => ({ ...prev, [item.id]: 'Already in cart' }));
      setTimeout(() => {
        setItemStatusMap(prev => {
          const next = { ...prev };
          delete next[item.id];
          return next;
        });
      }, 5000);
      return;
    }

    if (onAddToCart) {
      const result = onAddToCart(item, item.sizes[0] || 'Standard', 1);
      if (result === false) {
        setItemStatusMap(prev => ({ ...prev, [item.id]: 'Already in cart' }));
      } else {
        setItemStatusMap(prev => ({ ...prev, [item.id]: 'Added to cart' }));
      }
      setTimeout(() => {
        setItemStatusMap(prev => {
          const next = { ...prev };
          delete next[item.id];
          return next;
        });
      }, 5000);
    }
  };

  const handleWhatsAppCustomInquiry = () => {
    const queryTerm = searchQuery.trim() || 'a specific fragrance';
    const message = `Hello WondersScents! I am looking for "${queryTerm}" (Perfume / Body Spray / Body Mist / Perfume Oil / Roll-On). Please let me know if it is available in stock and how I can place my order.`;
    const url = `https://wa.me/2348145620271?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleViewProduct = (item: FragranceItem) => {
    handleClose();
    onSelectProduct(item);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white text-[#3D3D3D] p-4 sm:p-8 md:p-12 flex flex-col items-center justify-start pt-16 sm:pt-20 md:pt-24 overflow-y-auto animate-fadeIn font-sans selection:bg-brand-purple-light selection:text-brand-purple">
      
      {/* Top Close Button */}
      <button 
        onClick={handleClose}
        className="absolute top-5 right-5 sm:top-8 sm:right-8 p-2 border border-brand-charcoal/15 text-[#3D3D3D] hover:bg-brand-purple hover:text-white hover:border-brand-purple rounded-full transition-all duration-200 focus:outline-none cursor-pointer z-30"
        title="Close Search (Esc)"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Main Container */}
      <div className="max-w-6xl w-full flex flex-col items-center space-y-8 pb-12">
        
        {/* Minimalist Search Bar */}
        <div className="max-w-2xl w-full relative">
          <div className="relative flex items-center border-b border-[#3D3D3D]/25 pb-3">
            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#3D3D3D]/50 shrink-0 mr-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search perfume, body spray, body mist, roll-on, brand..."
              autoFocus
              className="w-full bg-transparent text-base sm:text-lg md:text-xl font-normal text-[#3D3D3D] placeholder-[#3D3D3D]/45 placeholder:text-sm sm:placeholder:text-base md:placeholder:text-lg focus:outline-none"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="hidden sm:inline-flex p-1.5 text-brand-charcoal/40 hover:text-brand-charcoal transition-colors ml-2 cursor-pointer"
                title="Clear input"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Live Matching Results Grid */}
        {searchQuery.trim() !== '' && (
          <div className="w-full space-y-8">
            
            {/* Header info */}
            <div className="flex items-center justify-between text-left">
              <span className="text-xs font-medium text-[#3D3D3D]/75">
                Matching fragrances ({matchingResults.length})
              </span>
            </div>

            {/* Results Grid - Clean Luxury Cards */}
            {matchingResults.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {matchingResults.map((item) => {
                  const statusText = itemStatusMap[item.id];

                  // Simplified Category Name (First letter capital, rest small)
                  const catLower = item.category.toLowerCase();
                  const simplifiedCategory = 
                    catLower.includes('mist') ? 'Body mist' :
                    catLower.includes('spray') ? 'Body spray' :
                    catLower.includes('oil') ? 'Undiluted perfume oil' :
                    catLower.includes('roll') ? 'Roll-on' : 'Perfume';

                  // Dynamic Badge color (Men: Charcoal, Women: Dusty Rose, Unisex: Purple)
                  const genderBadge = 
                    item.gender === 'Men' 
                      ? 'bg-slate-900 text-white' 
                      : item.gender === 'Women' 
                      ? 'bg-[#b05d76] text-white' 
                      : 'bg-brand-purple text-white';

                  return (
                    <div
                      key={item.id}
                      onClick={() => handleViewProduct(item)}
                      className="group relative h-[380px] sm:h-[420px] w-full rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.01] border border-brand-charcoal/10 flex flex-col justify-between cursor-pointer"
                    >
                      {/* Full-bleed Product Image */}
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                      />

                      {/* Luxury Dark Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/15 transition-opacity duration-300" />

                      {/* Top Badges (First letter capital, rest small) */}
                      <div className="relative z-20 p-5 sm:p-6 flex items-center justify-between gap-2">
                        {item.category !== 'Perfume Oil' && !catLower.includes('oil') && (
                          <span className={`text-xs font-medium px-3 py-1 rounded-full ${genderBadge}`}>
                            {item.gender}
                          </span>
                        )}

                        <span className={`text-xs font-medium px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 ${
                          item.category === 'Perfume Oil' || catLower.includes('oil') ? 'ml-auto' : ''
                        }`}>
                          {simplifiedCategory}
                        </span>
                      </div>

                      {/* Bottom Details - Name and Action Buttons */}
                      <div className="relative z-20 p-5 sm:p-6 text-left space-y-3.5">
                        <h3 className="font-sans text-lg sm:text-xl font-bold text-white tracking-tight leading-snug line-clamp-2">
                          {item.name}
                        </h3>

                        {/* Action Buttons: View Details & Add to Cart */}
                        <div className="pt-1 grid grid-cols-2 gap-2.5">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewProduct(item);
                            }}
                            className="py-2.5 px-3 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-semibold rounded-xs transition-colors border border-white/30 text-center cursor-pointer"
                          >
                            View details
                          </button>

                          <button
                            onClick={(e) => handleAddToCart(e, item)}
                            className={`py-2.5 px-3 text-xs font-semibold rounded-xs transition-all duration-300 flex items-center justify-center space-x-1.5 cursor-pointer ${
                              statusText
                                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                                : 'bg-brand-purple hover:bg-brand-purple-deep text-white'
                            }`}
                          >
                            {statusText ? (
                              <>
                                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                                <span>{statusText}</span>
                              </>
                            ) : (
                              <>
                                <ShoppingCart className="w-3.5 h-3.5" />
                                <span>Add to cart</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}

            {/* 🌟 ON-DEMAND SOURCING CARD */}
            <div className="p-6 sm:p-8 bg-neutral-50 border border-brand-charcoal/15 rounded-2xl text-left space-y-4 max-w-2xl mx-auto">
              <div className="flex items-start space-x-3.5">
                <Sparkles className="w-6 h-6 text-brand-purple shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-[#3D3D3D]">
                    Can't find your desired fragrance?
                  </h4>
                  <p className="text-xs sm:text-sm text-[#3D3D3D]/70 leading-relaxed font-normal">
                    We supply 100% authentic perfumes, body sprays, body mists, roll-ons, and pure perfume oils on demand. Message us directly on WhatsApp to check stock and place your order.
                  </p>
                </div>
              </div>

              <button
                onClick={handleWhatsAppCustomInquiry}
                className="w-full py-3.5 px-5 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-colors flex items-center justify-center space-x-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Inquire & Order on WhatsApp</span>
              </button>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
