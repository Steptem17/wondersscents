import { useState, useEffect } from 'react';
import type { Product, ChatMessage } from '../types';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
}

export function useAppState() {
  // Navigation
  const [currentPage, setCurrentPage] = useState<'home'>('home');

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  // Cart state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // AI Assistant state
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [aiMessages, setAiMessages] = useState<ChatMessage[]>([]);

  // Initialize AI assistant with a greeting
  useEffect(() => {
    if (aiMessages.length === 0) {
      setAiMessages([
        {
          id: 'welcome',
          sender: 'assistant',
          content: 'Hello! I am the WondersScents AI Fragrance Assistant. I can help you discover products, check notes, and explore wholesale options.\n\nTry asking me: "Show me woodsy perfumes" or "What does Riggs smell like?"',
          timestamp: new Date()
        }
      ]);
    }
  }, [aiMessages]);

  // Check if a product is in cart
  const isItemInCart = (productId: string) => {
    return cart.some(item => item.product.id === productId);
  };

  // Cart operations (STRICTLY PREVENTS DUPLICATE ADDS OR INCREMENTING FROM STOREFRONT)
  const addToCart = (product: Product, size?: string, quantity: number = 1): boolean => {
    const selectedSize = size || product.sizes?.[0] || 'Standard';
    const qtyToAdd = Math.max(1, quantity || 1);

    // If item is already in cart, STRICTLY REFUSE to add or increment
    const alreadyExists = cart.some(item => item.product.id === product.id);
    if (alreadyExists) {
      return false;
    }

    setCart(prev => {
      const existsInPrev = prev.some(item => item.product.id === product.id);
      if (existsInPrev) {
        return prev;
      }
      return [...prev, { product, quantity: qtyToAdd, selectedSize }];
    });

    return true;
  };

  const removeFromCart = (productId: string, size: string) => {
    setCart(prev => prev.filter(item => !(item.product.id === productId && item.selectedSize === size)));
  };

  const updateQuantity = (productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }
    setCart(prev => prev.map(item => 
      item.product.id === productId && item.selectedSize === size
        ? { ...item, quantity }
        : item
    ));
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const cartSubtotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);

  return {
    currentPage,
    setCurrentPage,
    searchQuery,
    setSearchQuery,
    searchResults,
    setSearchResults,
    isSearching,
    setIsSearching,
    showSearchDropdown,
    setShowSearchDropdown,
    cart,
    addToCart,
    isItemInCart,
    removeFromCart,
    updateQuantity,
    isCartOpen,
    setIsCartOpen,
    cartCount,
    cartSubtotal,
    isAiOpen,
    setIsAiOpen,
    aiMessages,
    setAiMessages
  };
}
