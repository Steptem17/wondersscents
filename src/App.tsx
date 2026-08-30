import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { AboutPage } from './components/AboutPage';
import { MensCollectionPage } from './components/MensCollectionPage';
import { WomensCollectionPage } from './components/WomensCollectionPage';
import { UnisexCollectionPage } from './components/UnisexCollectionPage';
import { AllCollectionsPage } from './components/AllCollectionsPage';
import { PurePerfumeOilsPage } from './components/PurePerfumeOilsPage';
import { TrainingPage } from './components/TrainingPage';
import { ContactPage } from './components/ContactPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { fragranceCatalog } from './data/fragranceDatabase';

import { useAppState } from './hooks/useAppState';
import { productService } from './services/productService';
import type { Product } from './types';

// Official WhatsApp Brand SVG Logo
const WhatsAppLogo = () => (
  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.144 4.18 4.225-1.109zm9.849-5.111c-.305-.153-1.805-.891-2.085-.993-.28-.102-.485-.153-.69.153-.204.306-.791.993-.969 1.196-.178.203-.356.229-.661.076-.305-.153-1.288-.474-2.453-1.513-.907-.808-1.519-1.807-1.697-2.113-.178-.306-.019-.471.133-.623.137-.137.305-.356.458-.534.153-.178.204-.306.305-.509.102-.204.051-.382-.025-.534-.076-.153-.69-1.66-.945-2.275-.248-.598-.501-.517-.69-.526-.178-.008-.382-.01-.585-.01s-.534.076-.814.382c-.28.306-1.069 1.045-1.069 2.551s1.095 2.96 1.247 3.164c.153.204 2.155 3.292 5.221 4.617.729.314 1.299.502 1.743.643.733.233 1.399.2 1.926.121.587-.088 1.805-.738 2.06-1.45.254-.713.254-1.324.178-1.45-.076-.28-.203-.585-.356z"/>
  </svg>
);

export type PageType = 'home' | 'about' | 'men-collection' | 'women-collection' | 'unisex-collection' | 'all-collections' | 'pure-oils' | 'perfumes' | 'training' | 'contact' | 'product';

function App() {
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    isCartOpen,
    setIsCartOpen,
    cartCount,
    cartSubtotal
  } = useAppState();

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Page Routing State ('home' | 'about' | 'men-collection' | 'women-collection' | 'all-collections' | 'pure-oils' | 'training')
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [targetSectionId, setTargetSectionId] = useState<string | undefined>(undefined);

  // Scroll Position Memory for Browser Back/Forward navigation
  const scrollPositions = useRef<Record<string, number>>({});
  const isPopNav = useRef(false);

  // Continuously record scroll position of the current page as user scrolls
  useEffect(() => {
    const handleScroll = () => {
      const path = window.location.pathname.toLowerCase();
      scrollPositions.current[path] = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync state from current URL pathname on initial load and popstate (Browser Back/Forward)
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase();
      setTargetSectionId(undefined);
      isPopNav.current = true;

      if (path.startsWith('/product/')) {
        const productId = path.replace('/product/', '');
        const found = fragranceCatalog.find(p => p.id === productId);
        if (found) {
          setSelectedProduct(found);
          setCurrentPage('product');
          window.scrollTo(0, 0);
          return;
        }
      }

      if (path === '/about') {
        setCurrentPage('about');
      } else if (path === '/men-collection') {
        setCurrentPage('men-collection');
      } else if (path === '/women-collection') {
        setCurrentPage('women-collection');
      } else if (path === '/unisex-collection' || path === '/unisex') {
        setCurrentPage('unisex-collection');
      } else if (path === '/all-collections' || path === '/collections') {
        setCurrentPage('all-collections');
      } else if (path === '/pure-oils' || path === '/perfume-oils') {
        setCurrentPage('pure-oils');
      } else if (path === '/training' || path === '/academy') {
        setCurrentPage('training');
      } else if (path === '/contact' || path === '/contact-us') {
        setCurrentPage('contact');
      } else {
        setCurrentPage('home');
      }

      // Restore the exact previous scroll position on that page
      const restoreY = scrollPositions.current[path] ?? 0;
      requestAnimationFrame(() => {
        window.scrollTo({ top: restoreY, behavior: 'instant' as ScrollBehavior });
      });
      setTimeout(() => {
        window.scrollTo({ top: restoreY, behavior: 'instant' as ScrollBehavior });
      }, 30);
      setTimeout(() => {
        window.scrollTo({ top: restoreY, behavior: 'instant' as ScrollBehavior });
      }, 100);
    };

    handlePopState();
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Synchronously ensure window is at top 0 on standard page clicks (unless jumping to section or browser back navigation)
  useLayoutEffect(() => {
    if (isPopNav.current) {
      isPopNav.current = false;
      return;
    }
    if (!targetSectionId) {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [currentPage, targetSectionId]);

  // Load products initially
  useEffect(() => {
    productService.getProducts().then(setProducts);
  }, []);

  // Search open state lifted to App level so Floating WhatsApp button can safely hide
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Dedicated Product Selector that opens full Product Detail Page
  const handleSelectProduct = (product: Product) => {
    // Record current scroll position before leaving
    scrollPositions.current[window.location.pathname.toLowerCase()] = window.scrollY;
    isPopNav.current = false;
    setSelectedProduct(product);
    setCurrentPage('product');
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    if (window.location.pathname !== `/product/${product.id}`) {
      window.history.pushState({}, '', `/product/${product.id}`);
    }
  };

  // Unified Page Navigator with URL update and immediate instant top positioning
  const handleNavigate = (page: PageType, sectionId?: string) => {
    const targetPage = (page === 'perfumes') ? 'all-collections' : page;
    setTargetSectionId(sectionId);

    // Record current scroll position before leaving
    scrollPositions.current[window.location.pathname.toLowerCase()] = window.scrollY;
    isPopNav.current = false;

    // Reset scroll position immediately BEFORE updating page state if no target section
    if (!sectionId) {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }

    setCurrentPage(targetPage);

    // Update browser history URL
    const urlMap: Record<PageType, string> = {
      'home': '/',
      'about': '/about',
      'men-collection': '/men-collection',
      'women-collection': '/women-collection',
      'unisex-collection': '/unisex-collection',
      'all-collections': '/all-collections',
      'pure-oils': '/pure-oils',
      'perfumes': '/all-collections',
      'training': '/training',
      'contact': '/contact',
      'product': selectedProduct ? `/product/${selectedProduct.id}` : '/all-collections'
    };
    const targetUrl = urlMap[targetPage] || '/';
    if (window.location.pathname !== targetUrl) {
      window.history.pushState({}, '', targetUrl);
    }

    // Scroll handling: instant jump to target section if provided
    if (sectionId) {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'auto', block: 'start' });
        }
      }, 50);
    }
  };

  const handleSearch = (query: string) => {
    if (!query) {
      productService.getProducts().then(setProducts);
      return;
    }
    const filtered = products.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) || 
      p.brand.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase())
    );
    setProducts(filtered);
  };

  const handleExploreScroll = () => {
    handleNavigate('all-collections');
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white font-sans text-[#3D3D3D] antialiased">
      {/* 1. Header Navigation Bar (Persistent across all pages) */}
      <Navbar 
        currentPage={currentPage}
        onNavigate={(page) => handleNavigate(page as PageType)}
        cartCount={cartCount} 
        onCartClick={() => setIsCartOpen(true)} 
        onSearch={handleSearch}
        onSelectProduct={handleSelectProduct}
        onAddToCart={addToCart}
        isSearchOpen={isSearchOpen}
        onSearchOpenChange={setIsSearchOpen}
        cart={cart}
      />

      {/* 2. DYNAMIC PAGE ROUTER */}
      {currentPage === 'about' ? (
        <AboutPage 
          onNavigateHome={() => handleNavigate('home', 'latest-drops')} 
          onNavigateAllCollections={() => handleNavigate('all-collections')}
        />
      ) : currentPage === 'men-collection' ? (
        <MensCollectionPage 
          products={products} 
          onAddToCart={addToCart}
          onSelectProduct={handleSelectProduct}
          onNavigateHome={() => handleNavigate('home')} 
          onNavigateAllCollections={() => handleNavigate('all-collections')}
          cart={cart}
        />
      ) : currentPage === 'women-collection' ? (
        <WomensCollectionPage 
          products={products} 
          onAddToCart={addToCart}
          onSelectProduct={handleSelectProduct}
          onNavigateHome={() => handleNavigate('home')} 
          onNavigateAllCollections={() => handleNavigate('all-collections')}
          cart={cart}
        />
      ) : currentPage === 'unisex-collection' ? (
        <UnisexCollectionPage 
          products={products} 
          onAddToCart={addToCart}
          onSelectProduct={handleSelectProduct}
          onNavigateHome={() => handleNavigate('home')} 
          onNavigateAllCollections={() => handleNavigate('all-collections')}
          cart={cart}
        />
      ) : currentPage === 'all-collections' ? (
        <AllCollectionsPage 
          products={products} 
          onAddToCart={addToCart}
          onSelectProduct={handleSelectProduct}
          onNavigateHome={() => handleNavigate('home')} 
          onNavigateCollection={(cat) => {
            if (cat === 'men') handleNavigate('men-collection');
            else if (cat === 'women') handleNavigate('women-collection');
            else if (cat === 'unisex') handleNavigate('unisex-collection');
            else if (cat === 'oil') handleNavigate('pure-oils');
            else handleNavigate('all-collections');
          }}
          cart={cart}
        />
      ) : currentPage === 'pure-oils' ? (
        <PurePerfumeOilsPage 
          products={products} 
          onAddToCart={addToCart}
          onSelectProduct={handleSelectProduct}
          onNavigateHome={() => handleNavigate('home')} 
          onNavigateAllCollections={() => handleNavigate('all-collections')}
          cart={cart}
          initialSectionId={targetSectionId}
        />
      ) : currentPage === 'training' ? (
        <TrainingPage 
          onNavigateHome={() => handleNavigate('home')} 
          onNavigateAllCollections={() => handleNavigate('all-collections')}
        />
      ) : currentPage === 'contact' ? (
        <ContactPage 
          onNavigateHome={() => handleNavigate('home')} 
          onNavigateAllCollections={() => handleNavigate('all-collections')}
        />
      ) : currentPage === 'product' && selectedProduct ? (
        <ProductDetailPage 
          product={selectedProduct}
          onAddToCart={addToCart}
          onSelectProduct={handleSelectProduct}
          onNavigateHome={() => handleNavigate('home')}
          onNavigateAllCollections={() => handleNavigate('all-collections')}
          cart={cart}
        />
      ) : (
        <HomePage 
          products={products}
          onAddToCart={addToCart}
          onProductClick={handleSelectProduct}
          onExploreClick={handleExploreScroll}
          onNavigateToCollection={() => handleNavigate('all-collections')}
          onNavigateToPage={(p, sectionId) => handleNavigate(p as PageType, sectionId)}
        />
      )}

      {/* 3. Footer Block */}
      <Footer onNavigate={(page, sectionId) => handleNavigate(page as PageType, sectionId)} />

      {/* Cart Drawer */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
        subtotal={cartSubtotal}
      />

      {/* 💬 OFFICIAL WHATSAPP BRAND ICON (Bottom Right - Hidden during Search, No Shadow) */}
      {!isSearchOpen && (
        <a
          href="https://wa.me/2348145620271?text=Hello%20WondersScents!%20I%20have%20an%20inquiry."
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-40 p-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full transition-all duration-300 hover:scale-110 flex items-center justify-center group"
          title="Chat on WhatsApp"
        >
          <WhatsAppLogo />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2.5 text-xs font-bold whitespace-nowrap transition-all duration-500 ease-in-out">
            WhatsApp Us
          </span>
        </a>
      )}
    </div>
  );
}

export default App;
