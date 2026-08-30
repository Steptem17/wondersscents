import React, { useState } from 'react';
import { X, Plus, Minus, Check } from 'lucide-react';
import type { Product } from '../types';
import type { CartItem } from '../hooks/useAppState';

interface ProductDetailsModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart?: (product: Product, size?: string, quantity?: number) => boolean | void;
  onViewFullDetails?: (product: Product) => void;
  cart?: CartItem[];
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({ 
  product, 
  onClose,
  onAddToCart,
  onViewFullDetails,
  cart = []
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Check if product already exists in cart
  const isProductInCart = cart.some(item => item.product.id === product.id);

  const handleAddToCart = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (isProductInCart) {
      setStatusMessage('Already in cart');
      setTimeout(() => setStatusMessage(null), 4000);
      return;
    }

    if (onAddToCart) {
      const result = onAddToCart(product, product.sizes?.[0] || '100ml', quantity);
      if (result === false) {
        setStatusMessage('Already in cart');
      } else {
        setStatusMessage('Added to cart');
      }
      setTimeout(() => setStatusMessage(null), 4000);
    }
  };

  const handleBuyItNow = () => {
    if (onAddToCart) {
      onAddToCart(product, product.sizes?.[0] || '100ml', quantity);
    }
    const text = encodeURIComponent(
      `Hello Wonders Scents! I would like to purchase *${product.name}* (${quantity} item(s)). Please confirm availability and delivery details.`
    );
    window.open(`https://wa.me/2348145620271?text=${text}`, '_blank');
  };

  const handleViewFull = () => {
    onClose();
    if (onViewFullDetails) {
      onViewFullDetails(product);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/60 backdrop-blur-xs select-none animate-fadeIn overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative bg-white w-full max-w-lg md:max-w-3xl border border-black/15 overflow-hidden rounded-xl sm:rounded-2xl shadow-2xl flex flex-col md:flex-row transition-all duration-300 text-left my-auto max-h-[92vh] md:max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top-Right Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-3.5 right-3.5 p-2 bg-white/90 backdrop-blur-sm text-black/70 hover:text-black hover:bg-neutral-100 rounded-full transition-all duration-200 z-30 cursor-pointer shadow-xs border border-black/10"
          title="Close (Esc)"
          aria-label="Close modal"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
        </button>

        {/* LEFT COLUMN: 100% Full-Cover Product Image */}
        <div className="w-full md:w-1/2 h-64 sm:h-72 md:h-auto min-h-[240px] sm:min-h-[280px] md:min-h-[420px] relative overflow-hidden bg-neutral-100 border-b md:border-b-0 md:border-r border-black/10 shrink-0">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* RIGHT COLUMN: Product Metadata, Price, Quantity & Action Buttons */}
        <div className="w-full md:w-1/2 p-5 sm:p-7 md:p-8 flex flex-col justify-between space-y-5 bg-white overflow-y-auto">
          <div className="space-y-4">
            
            {/* Title & Brand */}
            <div className="space-y-1.5 pr-8">
              <h2 className="font-display text-base sm:text-lg md:text-xl font-bold text-[#111111] leading-snug tracking-tight">
                {product.name}
              </h2>
              <div className="text-[11px] sm:text-xs font-semibold text-[#181818]/60 uppercase tracking-wider">
                {product.brand || 'Wonders Scents'}
              </div>
            </div>

            {/* Social Share Icons Row */}
            <div className="flex items-center space-x-2 pt-0.5">
              <span className="w-6 h-6 rounded-full bg-neutral-100 text-[#181818]/70 flex items-center justify-center text-[10px] font-bold">
                f
              </span>
              <span className="w-6 h-6 rounded-full bg-neutral-100 text-[#181818]/70 flex items-center justify-center text-[10px] font-bold">
                P
              </span>
              <span className="w-6 h-6 rounded-full bg-neutral-100 text-[#181818]/70 flex items-center justify-center text-[10px] font-bold">
                𝕏
              </span>
              <span className="w-6 h-6 rounded-full bg-neutral-100 text-[#181818]/70 flex items-center justify-center text-[10px] font-bold">
                ✉
              </span>
            </div>

            {/* Price Line */}
            <div className="flex items-baseline space-x-3 pt-2 border-t border-black/10">
              <span className="text-xs sm:text-sm font-medium text-[#181818]/70">
                Price:
              </span>
              <span className="text-lg sm:text-xl font-bold text-[#111111]">
                ₦{product.price > 0 ? product.price.toLocaleString() : '12,000'}.00
              </span>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4 pt-1">
              <span className="text-xs sm:text-sm font-medium text-[#181818]/70">
                Quantity:
              </span>
              <div className="inline-flex items-center border border-black/20 rounded-xs bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-[#181818] hover:bg-neutral-100 transition-colors cursor-pointer"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="px-4 py-1 text-xs font-bold text-[#111111] min-w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 text-[#181818] hover:bg-neutral-100 transition-colors cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Description & Fragrance Notes */}
            <div className="pt-2 border-t border-black/10 space-y-2.5">
              <p className="text-xs text-[#181818]/80 leading-relaxed whitespace-pre-line font-normal">
                {product.description?.split('\n').filter(l => {
                  const s = l.trim().toLowerCase();
                  return !s.startsWith('top:') && !s.startsWith('heart:') && !s.startsWith('base:') && !s.startsWith('when to wear:') && !s.startsWith('middle:');
                }).join('\n').trim()}
              </p>

              {(product.whenToWear || product.fragranceProfile?.whenToWear) && (
                <div className="pt-1 flex flex-wrap gap-1">
                  {(product.whenToWear || product.fragranceProfile?.whenToWear || []).map((occasion, idx) => (
                    <span 
                      key={idx}
                      className="px-2 py-0.5 bg-neutral-100 border border-black/10 rounded-full text-[10px] font-medium text-[#181818]/80"
                    >
                      {occasion}
                    </span>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* SIDE-BY-SIDE ACTION BUTTONS (Add to Cart + Buy It Now) */}
          <div className="space-y-3 pt-2">
            <div className="grid grid-cols-2 gap-3">
              {/* 1. Add to Cart (Solid Black) */}
              <button
                onClick={handleAddToCart}
                className={`w-full py-3 px-3 text-xs font-semibold rounded-xs transition-all duration-300 flex items-center justify-center space-x-1.5 cursor-pointer shadow-xs active:scale-95 ${
                  statusMessage
                    ? 'bg-emerald-600 text-white'
                    : 'bg-black hover:bg-neutral-800 text-white'
                }`}
              >
                {statusMessage ? (
                  <>
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span className="truncate">{statusMessage}</span>
                  </>
                ) : (
                  <span>Add to cart</span>
                )}
              </button>

              {/* 2. Buy It Now (Solid Dark Red / Burgundy #8B0000) */}
              <button
                onClick={handleBuyItNow}
                className="w-full py-3 px-3 text-xs font-semibold rounded-xs bg-[#8B0000] hover:bg-[#730000] text-white transition-all duration-300 flex items-center justify-center cursor-pointer shadow-xs active:scale-95"
              >
                Buy it now
              </button>
            </div>

            {/* View Full Product Details Link without underline */}
            {onViewFullDetails && (
              <div className="text-center pt-1">
                <button
                  onClick={handleViewFull}
                  className="text-[11px] sm:text-xs font-medium text-[#181818]/65 hover:text-brand-purple transition-colors cursor-pointer"
                >
                  View full product details →
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
