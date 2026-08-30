import React, { useState, useRef, useEffect } from 'react';
import { Search, ShoppingCart, Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { SearchModal } from './SearchModal';
import type { Product } from '../types';
import type { PageType } from '../App';
import type { CartItem } from '../hooks/useAppState';

interface NavbarProps {
  currentPage: PageType;
  onNavigate: (page: PageType, categoryFilter?: string) => void;
  cartCount: number;
  onCartClick: () => void;
  onSearch: (query: string) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart?: (product: Product, size?: string, quantity?: number) => void;
  isSearchOpen?: boolean;
  onSearchOpenChange?: (open: boolean) => void;
  cart?: CartItem[];
}

// Official TikTok SVG Icon
const TikTokSVG = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.96-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.82.56-1.31 1.56-1.27 2.55.02.87.42 1.71 1.1 2.24.8.63 1.89.81 2.86.49 1.05-.33 1.88-1.25 2.05-2.33.05-.5.03-1.01.03-1.51V.02z"/>
  </svg>
);

// Official Instagram SVG Icon
const InstagramSVG = () => (
  <svg className="w-4 h-4 fill-none stroke-current stroke-[2]" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export const Navbar: React.FC<NavbarProps> = ({ 
  currentPage,
  onNavigate,
  cartCount, 
  onCartClick,
  onSelectProduct,
  onAddToCart,
  isSearchOpen: controlledSearchOpen,
  onSearchOpenChange,
  cart = []
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPerfumeDropdownOpen, setIsPerfumeDropdownOpen] = useState(false);
  const [isMobilePerfumeOpen, setIsMobilePerfumeOpen] = useState(false);
  const [uncontrolledSearchOpen, setUncontrolledSearchOpen] = useState(false);
  
  const isSearchOpen = controlledSearchOpen !== undefined ? controlledSearchOpen : uncontrolledSearchOpen;
  const setIsSearchOpen = (open: boolean) => {
    if (onSearchOpenChange) onSearchOpenChange(open);
    else setUncontrolledSearchOpen(open);
  };

  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 🔄 Auto-close mobile menu when browser window is enlarged to desktop (>= 1024px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
        setIsMobilePerfumeOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 🔒 Lock html & body scrolling completely when Mobile Menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobilePerfumeOpen(false);
  };

  const handleMouseEnterPerfume = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setIsPerfumeDropdownOpen(true);
  };

  const handleMouseLeavePerfume = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsPerfumeDropdownOpen(false);
    }, 200);
  };

  // Toggle desktop dropdown when clicked directly
  const handlePerfumeHeaderClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPerfumeDropdownOpen(prev => !prev);
  };

  const handlePerfumeCategoryClick = (categoryQuery?: string) => {
    setIsPerfumeDropdownOpen(false);
    handleCloseMobileMenu();
    if (categoryQuery === 'Men') {
      onNavigate('men-collection');
    } else if (categoryQuery === 'Women') {
      onNavigate('women-collection');
    } else if (categoryQuery === 'Unisex') {
      onNavigate('unisex-collection');
    } else if (categoryQuery === 'Oil') {
      onNavigate('pure-oils');
    } else if (categoryQuery === 'All') {
      onNavigate('all-collections');
    } else {
      onNavigate('all-collections');
    }
  };

  const isPerfumesActive = currentPage === 'men-collection' || currentPage === 'women-collection' || currentPage === 'unisex-collection' || currentPage === 'all-collections' || currentPage === 'pure-oils';

  return (
    <header className="sticky top-0 w-full bg-white border-b border-brand-charcoal/10 relative z-30 font-sans">
      
      {/* Main Header Navbar */}
      <div className="py-4 md:py-6 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* LEFT: Logo */}
          <div className="flex items-center shrink-0">
            <button onClick={() => onNavigate('home')} className="flex items-center text-left focus:outline-none cursor-pointer">
              <img 
                src="/images/general/logo.png" 
                alt="WondersScents Logo" 
                className="h-20 sm:h-22 md:h-24 lg:h-28 w-auto object-contain transition-transform duration-300 hover:scale-102" 
              />
            </button>
          </div>

          {/* CENTER: Desktop Navigation Links */}
          <div className="hidden lg:flex items-center justify-center space-x-10 xl:space-x-14 text-base font-semibold">
            <button 
              onClick={() => onNavigate('home')} 
              className={`py-1 transition-colors hover:text-brand-purple cursor-pointer ${currentPage === 'home' ? 'text-brand-purple' : 'text-[#3D3D3D]'}`}
            >
              Home
            </button>

            <button 
              onClick={() => onNavigate('about')} 
              className={`py-1 transition-colors hover:text-brand-purple cursor-pointer ${currentPage === 'about' ? 'text-brand-purple' : 'text-[#3D3D3D]'}`}
            >
              About
            </button>
            
            {/* PERFUMES HOVER & CLICK DROPDOWN */}
            <div 
              className="relative py-3 cursor-pointer group"
              onMouseEnter={handleMouseEnterPerfume}
              onMouseLeave={handleMouseLeavePerfume}
            >
              <div 
                onClick={handlePerfumeHeaderClick}
                className={`flex items-center space-x-1 transition-colors hover:text-brand-purple ${isPerfumesActive ? 'text-brand-purple' : 'text-[#3D3D3D]'}`}
              >
                <span>Perfumes</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isPerfumeDropdownOpen ? 'rotate-180 text-brand-purple' : ''}`} />
              </div>

              {/* Desktop Dropdown Menu Box */}
              {isPerfumeDropdownOpen && (
                <div className="absolute top-full left-0 mt-0 w-60 bg-white border border-brand-charcoal/15 rounded-xs py-3 text-left z-50 animate-fadeIn">
                  <div className="absolute -top-1.5 left-6 w-3 h-3 bg-white border-t border-l border-brand-charcoal/15 rotate-45"></div>

                  <div className="space-y-1 relative z-10 font-normal">
                    {/* 🌟 All Collection (First Item) */}
                    <div 
                      onClick={() => handlePerfumeCategoryClick('All')}
                      className="px-5 py-2.5 text-sm text-[#3D3D3D] hover:text-brand-purple cursor-pointer flex items-center justify-between transition-colors font-medium border-b border-brand-charcoal/5"
                    >
                      <span>All Collections</span>
                      <ChevronRight className="w-3.5 h-3.5 text-brand-charcoal/40" />
                    </div>

                    <div 
                      onClick={() => handlePerfumeCategoryClick('Men')}
                      className={`px-5 py-2.5 text-sm cursor-pointer flex items-center justify-between transition-colors hover:text-brand-purple ${
                        currentPage === 'men-collection' ? 'text-brand-purple font-semibold' : 'text-[#3D3D3D]'
                      }`}
                    >
                      <span>Men's Collection</span>
                      <ChevronRight className="w-3.5 h-3.5 text-brand-charcoal/40" />
                    </div>

                    <div 
                      onClick={() => handlePerfumeCategoryClick('Women')}
                      className={`px-5 py-2.5 text-sm cursor-pointer flex items-center justify-between transition-colors hover:text-brand-purple ${
                        currentPage === 'women-collection' ? 'text-brand-purple font-semibold' : 'text-[#3D3D3D]'
                      }`}
                    >
                      <span>Women's Collection</span>
                      <ChevronRight className="w-3.5 h-3.5 text-brand-charcoal/40" />
                    </div>

                    <div 
                      onClick={() => handlePerfumeCategoryClick('Unisex')}
                      className={`px-5 py-2.5 text-sm cursor-pointer flex items-center justify-between transition-colors hover:text-brand-purple ${
                        currentPage === 'unisex-collection' ? 'text-brand-purple font-semibold' : 'text-[#3D3D3D]'
                      }`}
                    >
                      <span>Unisex Collection</span>
                      <ChevronRight className="w-3.5 h-3.5 text-brand-charcoal/40" />
                    </div>

                    <div 
                      onClick={() => handlePerfumeCategoryClick('Oil')}
                      className={`px-5 py-2.5 text-sm cursor-pointer flex items-center justify-between transition-colors hover:text-brand-purple ${
                        currentPage === 'pure-oils' ? 'text-brand-purple font-semibold' : 'text-[#3D3D3D]'
                      }`}
                    >
                      <span>Undiluted Perfume Oils</span>
                      <ChevronRight className="w-3.5 h-3.5 text-brand-charcoal/40" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button 
              onClick={() => onNavigate('training')} 
              className={`py-1 transition-colors hover:text-brand-purple cursor-pointer ${currentPage === 'training' ? 'text-brand-purple font-semibold' : 'text-[#3D3D3D]'}`}
            >
              Training
            </button>
          </div>

          {/* TABLET ONLY: Centered Long Search Bar (Middle between Logo & Utility Icons) */}
          <div className="hidden sm:flex lg:hidden flex-1 max-w-sm md:max-w-md mx-6 justify-center">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-full bg-transparent hover:bg-neutral-50/70 border border-black/15 hover:border-brand-purple/50 text-[#181818]/60 hover:text-brand-purple transition-all duration-200 cursor-pointer text-xs focus:outline-none group"
              title="Search fragrances"
            >
              <Search className="w-4 h-4 text-[#181818]/50 group-hover:text-brand-purple transition-colors shrink-0" />
              <span className="truncate font-normal text-left text-xs">Search perfumes, oils, fragrances...</span>
            </button>
          </div>

          {/* RIGHT: Utility Icons */}
          <div className="flex items-center space-x-3 sm:space-x-5 md:space-x-6 text-[#3D3D3D]">
            {/* Desktop Long Search Bar (Transparent with clean border) */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="hidden lg:flex items-center space-x-3 px-4 py-2 rounded-full bg-transparent hover:bg-neutral-50/70 border border-black/15 hover:border-brand-purple/50 text-[#181818]/60 hover:text-brand-purple transition-all duration-200 cursor-pointer text-xs w-60 xl:w-72 2xl:w-80 focus:outline-none group"
              title="Search fragrances"
            >
              <Search className="w-4 h-4 text-[#181818]/50 group-hover:text-brand-purple transition-colors shrink-0" />
              <span className="truncate font-normal text-left text-xs">Search perfumes, oils, fragrances...</span>
            </button>

            {/* Mobile Search Icon Button */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="sm:hidden p-1.5 hover:text-brand-purple hover:bg-brand-purple-light/50 transition-colors focus:outline-none rounded-full cursor-pointer"
              title="Search"
            >
              <Search className="w-5.5 h-5.5 stroke-[1.8]" />
            </button>

            {/* Shopping Cart Icon */}
            <button 
              onClick={onCartClick}
              className="relative p-1.5 hover:text-brand-purple hover:bg-brand-purple-light/50 transition-colors focus:outline-none rounded-full cursor-pointer"
              title="Cart"
            >
              <ShoppingCart className="w-5.5 h-5.5 stroke-[1.8]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-brand-purple text-[8px] font-extrabold text-white">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-1.5 hover:text-brand-purple transition-colors lg:hidden focus:outline-none cursor-pointer"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

        </div>
      </div>

      {/* 📱 FULL-SCREEN MOBILE DRAWER NAVIGATION (Hidden on Desktop 'lg:hidden') */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-white text-[#3D3D3D] no-scrollbar overflow-hidden animate-fadeIn flex flex-col justify-between text-left">
          
          <div>
            {/* Header Row */}
            <div className="p-4 sm:p-5 border-b border-brand-charcoal/10 flex items-center justify-between bg-white sticky top-0 z-10">
              <img 
                src="/images/general/logo.png" 
                alt="WondersScents" 
                className="h-12 sm:h-14 w-auto object-contain cursor-pointer"
                onClick={() => {
                  handleCloseMobileMenu();
                  onNavigate('home');
                }}
              />

              <div className="flex items-center space-x-6 sm:space-x-8">
                <button 
                  onClick={() => {
                    handleCloseMobileMenu();
                    onCartClick();
                  }}
                  className="relative p-1.5 text-[#3D3D3D] hover:text-brand-purple hover:bg-brand-purple-light/50 transition-colors rounded-full focus:outline-none cursor-pointer"
                  title="Cart"
                >
                  <ShoppingCart className="w-5.5 h-5.5 stroke-[1.8]" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-purple text-[8px] font-bold text-white">
                      {cartCount}
                    </span>
                  )}
                </button>

                <button 
                  onClick={handleCloseMobileMenu}
                  className="p-1.5 border border-brand-charcoal/10 text-[#3D3D3D] hover:bg-brand-purple hover:text-white hover:border-brand-purple transition-all duration-200 rounded-full focus:outline-none cursor-pointer"
                  title="Close Menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="px-6 py-4 space-y-1">
              <button 
                onClick={() => {
                  handleCloseMobileMenu();
                  onNavigate('home');
                }}
                className={`flex items-center justify-between w-full py-4 text-lg font-bold transition-colors border-b border-brand-charcoal/5 cursor-pointer ${
                  currentPage === 'home' ? 'text-brand-purple' : 'text-[#111111] hover:text-brand-purple'
                }`}
              >
                <span>Home</span>
                <ChevronRight className="w-5 h-5 text-brand-charcoal/40" />
              </button>

              <button 
                onClick={() => {
                  handleCloseMobileMenu();
                  onNavigate('about');
                }}
                className={`flex items-center justify-between w-full py-4 text-lg font-bold transition-colors border-b border-brand-charcoal/5 cursor-pointer ${
                  currentPage === 'about' ? 'text-brand-purple' : 'text-[#111111] hover:text-brand-purple'
                }`}
              >
                <span>About</span>
                <ChevronRight className="w-5 h-5 text-brand-charcoal/40" />
              </button>

              {/* PERFUMES ACCORDION IN MOBILE DRAWER */}
              <div className="border-b border-brand-charcoal/5">
                <button
                  onClick={() => setIsMobilePerfumeOpen(prev => !prev)}
                  className={`flex items-center justify-between w-full py-4 text-lg font-bold transition-colors cursor-pointer ${
                    isPerfumesActive ? 'text-brand-purple' : 'text-[#111111] hover:text-brand-purple'
                  }`}
                >
                  <span>Perfumes</span>
                  <ChevronRight className={`w-5 h-5 transition-transform duration-200 ${isMobilePerfumeOpen ? 'rotate-90 text-brand-purple' : 'text-brand-charcoal/40'}`} />
                </button>

                {isMobilePerfumeOpen && (
                  <div className="pl-4 py-2 space-y-3 bg-neutral-50/80 border-l-2 border-brand-purple my-2">
                    {/* 🌟 All Collection (First Item in Mobile) */}
                    <div 
                      onClick={() => handlePerfumeCategoryClick('All')}
                      className="py-2 text-sm font-semibold text-[#111111] hover:text-brand-purple cursor-pointer flex items-center justify-between pr-4 border-b border-brand-charcoal/5"
                    >
                      <span>All Collections</span>
                      <ChevronRight className="w-4 h-4 text-brand-charcoal/40" />
                    </div>

                    <div 
                      onClick={() => handlePerfumeCategoryClick('Men')}
                      className={`py-2 text-sm cursor-pointer flex items-center justify-between pr-4 transition-colors hover:text-brand-purple ${
                        currentPage === 'men-collection' ? 'text-brand-purple font-semibold' : 'text-[#111111]'
                      }`}
                    >
                      <span>Men's Collection</span>
                      <ChevronRight className="w-4 h-4 text-brand-charcoal/40" />
                    </div>

                    <div 
                      onClick={() => handlePerfumeCategoryClick('Women')}
                      className={`py-2 text-sm cursor-pointer flex items-center justify-between pr-4 transition-colors hover:text-brand-purple ${
                        currentPage === 'women-collection' ? 'text-brand-purple font-semibold' : 'text-[#111111]'
                      }`}
                    >
                      <span>Women's Collection</span>
                      <ChevronRight className="w-4 h-4 text-brand-charcoal/40" />
                    </div>

                    <div 
                      onClick={() => handlePerfumeCategoryClick('Unisex')}
                      className={`py-2 text-sm cursor-pointer flex items-center justify-between pr-4 transition-colors hover:text-brand-purple ${
                        currentPage === 'unisex-collection' ? 'text-brand-purple font-semibold' : 'text-[#111111]'
                      }`}
                    >
                      <span>Unisex Collection</span>
                      <ChevronRight className="w-4 h-4 text-brand-charcoal/40" />
                    </div>

                    <div 
                      onClick={() => handlePerfumeCategoryClick('Oil')}
                      className={`py-2 text-sm cursor-pointer flex items-center justify-between pr-4 transition-colors hover:text-brand-purple ${
                        currentPage === 'pure-oils' ? 'text-brand-purple font-semibold' : 'text-[#111111]'
                      }`}
                    >
                      <span>Undiluted Perfume Oils</span>
                      <ChevronRight className="w-4 h-4 text-brand-charcoal/40" />
                    </div>
                  </div>
                )}
              </div>

              <button 
                onClick={() => {
                  handleCloseMobileMenu();
                  onNavigate('training');
                }}
                className={`flex items-center justify-between w-full py-4 text-lg font-bold transition-colors cursor-pointer hover:text-brand-purple ${
                  currentPage === 'training' ? 'text-brand-purple' : 'text-[#111111]'
                }`}
              >
                <span>Training</span>
                <ChevronRight className="w-4 h-4 text-brand-charcoal/30" />
              </button>
            </div>

            {/* FOLLOW US Section (Targeted Hover strictly on icon + text) */}
            <div className="px-6 py-6 border-t border-brand-charcoal/10 space-y-4">
              <h5 className="text-xs font-bold tracking-widest text-[#3D3D3D]/50 uppercase">
                FOLLOW US
              </h5>

              <div className="space-y-3.5 text-xs text-[#3D3D3D] font-medium flex flex-col items-start">
                <a 
                  href="https://www.instagram.com/wondersscents001?igsh=MTJhcGhpNGtuNXFlbw==" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-fit inline-flex items-center space-x-3 group cursor-pointer"
                >
                  <div className="p-2 bg-neutral-100 group-hover:bg-brand-purple group-hover:text-white rounded-full transition-colors">
                    <InstagramSVG />
                  </div>
                  <span className="group-hover:text-brand-purple transition-colors">Instagram</span>
                </a>

                <a 
                  href="https://www.tiktok.com/@wondersscents001?_r=1&_t=ZS-98sbTaw5E4g" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-fit inline-flex items-center space-x-3 group cursor-pointer"
                >
                  <div className="p-2 bg-neutral-100 group-hover:bg-brand-purple group-hover:text-white rounded-full transition-colors">
                    <TikTokSVG />
                  </div>
                  <span className="group-hover:text-brand-purple transition-colors">TikTok</span>
                </a>
              </div>
            </div>

          </div>

          <div className="p-6 border-t border-brand-charcoal/10 text-center text-xs text-[#3D3D3D]/40 font-medium">
            © {new Date().getFullYear()} WondersScents. All rights reserved.
          </div>

        </div>
      )}

      {/* 🔍 LIVE FULL-SCREEN SEARCH MODAL */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={onSelectProduct}
        onAddToCart={onAddToCart}
        cart={cart}
      />
    </header>
  );
};
