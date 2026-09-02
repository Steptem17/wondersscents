import React, { useState, useEffect, useCallback, useMemo } from 'react';
import type { Product } from '../types';
import { 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Package, 
  Truck, 
  Award, 
  Calendar, 
  User, 
  CheckCircle, 
  Check,
  Sparkles 
} from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import useEmblaCarousel from 'embla-carousel-react';

// Official WhatsApp Brand SVG Logo
const WhatsAppLogo = ({ className = "w-5 h-5 fill-current" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.144 4.18 4.225-1.109zm9.849-5.111c-.305-.153-1.805-.891-2.085-.993-.28-.102-.485-.153-.69.153-.204.306-.791.993-.969 1.196-.178.203-.356.229-.661.076-.305-.153-1.288-.474-2.453-1.513-.907-.808-1.519-1.807-1.697-2.113-.178-.306-.019-.471.133-.623.137-.137.305-.356.458-.534.153-.178.204-.306.305-.509.102-.204.051-.382-.025-.534-.076-.153-.69-1.66-.945-2.275-.248-.598-.501-.517-.69-.526-.178-.008-.382-.01-.585-.01s-.534.076-.814.382c-.28.306-1.069 1.045-1.069 2.551s1.095 2.96 1.247 3.164c.153.204 2.155 3.292 5.221 4.617.729.314 1.299.502 1.743.643.733.233 1.399.2 1.926.121.587-.088 1.805-.738 2.06-1.45.254-.713.254-1.324.178-1.45-.076-.127-.28-.203-.585-.356z"/>
  </svg>
);

interface HomePageProps {
  products: Product[];
  onAddToCart?: (product: Product, size?: string) => void;
  onProductClick: (product: Product) => void;
  onExploreClick: () => void;
  onNavigateToCollection: () => void;
  onNavigateToPage?: (page: string, sectionId?: string) => void;
}

const heroProducts = [
  {
    image: '/images/hero/hero_bbw_a_thousand_wishes.png',
    alt: "Bath & Body Works A Thousand Wishes Fine Fragrance Mist",
    label: "Body Mist",
    scaleClass: "scale-100 sm:scale-105",
  },
  {
    image: '/images/hero/hero_afnan_9pm.png',
    alt: "Afnan 9 PM Extrait / Eau de Parfum",
    label: "Perfume",
    scaleClass: "scale-95 sm:scale-100",
  },
  {
    image: '/images/hero/hero_nivea_men.png',
    alt: "Nivea Men Dry Impact 48H",
    label: "Body Spray",
    scaleClass: "scale-100 sm:scale-105",
  },
  {
    image: '/images/hero/hero_nivea_coolkick.png',
    alt: "Nivea Men Cool Kick Roll-On",
    label: "Roll On",
    scaleClass: "scale-95 sm:scale-100",
  },
];

const wholesaleOilPackages = [
  {
    size: '3ml',
    title: '3ml Undiluted Perfume Oil',
    subtitle: 'Compact 3ml Roll-On Bottle',
    badge: '3ml Package',
    options: [
      {
        id: '3ml-single',
        label: 'Single Unit',
        price: 1200,
        priceFormatted: '₦1,200',
        note: 'Per 1 pc bottle',
      },
      {
        id: '3ml-dozen',
        label: 'Dozen Pack (12 Pcs)',
        price: 12000,
        priceFormatted: '₦12,000',
        note: 'Save ₦2,400 per dozen',
      },
    ],
  },
  {
    size: '6ml',
    title: '6ml Undiluted Perfume Oil',
    subtitle: 'Standard 6ml Roll-On Bottle',
    badge: '6ml Package',
    options: [
      {
        id: '6ml-single',
        label: 'Single Unit',
        price: 2000,
        priceFormatted: '₦2,000',
        note: 'Per 1 pc bottle',
      },
      {
        id: '6ml-dozen',
        label: 'Dozen Pack (12 Pcs)',
        price: 20000,
        priceFormatted: '₦20,000',
        note: 'Save ₦4,000 per dozen',
      },
    ],
  },
  {
    size: '50ml',
    title: '50ml Undiluted Perfume Oil',
    subtitle: 'Large 50ml Luxury Scent Flacon',
    badge: '50ml Luxury Bottle',
    options: [
      {
        id: '50ml-single',
        label: 'Single Unit (50ml Bottle)',
        price: 8000,
        priceFormatted: '₦8,000',
        note: 'Per 1 luxury bottle (Dozen pack not available)',
      },
    ],
  },
];

export const HomePage: React.FC<HomePageProps> = ({
  products,
  onProductClick,
  onExploreClick,
  onNavigateToCollection,
  onNavigateToPage,
}) => {
  // --- AUTOMATED ROTATING HERO SHOWCASE (Changes every 5 seconds smoothly) ---
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  useEffect(() => {
    const heroTimer = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroProducts.length);
    }, 5000);
    return () => clearInterval(heroTimer);
  }, []);

  // --- STATE FOR SELECTABLE WHOLESALE / PERFUME OIL PACKAGES ---
  const [selectedOilOptionId, setSelectedOilOptionId] = useState<string | null>(null);

  const currentSelectedPackage = useMemo(() => {
    if (!selectedOilOptionId) return null;
    for (const pkg of wholesaleOilPackages) {
      const opt = pkg.options.find((o) => o.id === selectedOilOptionId);
      if (opt) {
        return {
          size: pkg.size,
          title: pkg.title,
          label: opt.label,
          priceFormatted: opt.priceFormatted,
          price: opt.price,
        };
      }
    }
    return null;
  }, [selectedOilOptionId]);

  const selectedWhatsAppMessage = useMemo(() => {
    if (currentSelectedPackage) {
      return `Hello WondersScents! I want to order the ${currentSelectedPackage.title} (${currentSelectedPackage.label} - ${currentSelectedPackage.priceFormatted}). Please confirm availability and delivery details.`;
    }
    return `Hello WondersScents! I want to place an order for Undiluted Perfume Oils. Please share your current fragrance scent list and availability.`;
  }, [currentSelectedPackage]);

  const selectedWhatsAppUrl = useMemo(() => {
    return `https://wa.me/2348145620271?text=${encodeURIComponent(selectedWhatsAppMessage)}`;
  }, [selectedWhatsAppMessage]);

  // --- STATE FOR TRAINING WAITLIST FORM ---
  const [trainingName, setTrainingName] = useState('');
  const [trainingPhone, setTrainingPhone] = useState('');
  const [trainingSubmitted, setTrainingSubmitted] = useState(false);

  const handleTrainingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trainingName && trainingPhone) {
      const message = `Hello WondersScents! Please register me on the Perfume Oil Making Training Waitlist. My Name: ${trainingName}, Phone: ${trainingPhone}.`;
      const whatsappUrl = `https://wa.me/2348145620271?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      setTrainingSubmitted(true);
    }
  };

  // --- EMBLA CAROUSEL FOR LATEST DROPS ---
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    skipSnaps: false,
    duration: 22,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // 3 items from Men, 3 items from Women, 3 items from Unisex
  const displayProducts = useMemo(() => {
    const menItems = products.filter(p => p.gender === 'Men' && p.category === 'Perfume').slice(0, 3);
    const womenItems = products.filter(p => p.gender === 'Women' && p.category === 'Perfume').slice(0, 3);
    const unisexItems = products.filter(p => p.gender === 'Unisex' && p.category === 'Perfume').slice(0, 3);

    // Fallbacks if perfumes don't yield 3
    const fallbackMen = menItems.length < 3 ? products.filter(p => p.gender === 'Men').slice(0, 3) : menItems;
    const fallbackWomen = womenItems.length < 3 ? products.filter(p => p.gender === 'Women').slice(0, 3) : womenItems;
    const fallbackUnisex = unisexItems.length < 3 ? products.filter(p => p.gender === 'Unisex').slice(0, 3) : unisexItems;

    return [...fallbackMen, ...fallbackWomen, ...fallbackUnisex];
  }, [products]);

  // --- FEATURED COLLECTION CARDS DATA ---
  const collectionCards = [
    {
      id: 'unisex-collection',
      title: "Unisex Collection",
      subtitle: "Versatile, modern amber accords and rich scents suitable for everyone.",
      image: "/images/general/collection_unisex.jpg",
      category: "Unisex"
    },
    {
      id: 'men-collection',
      title: "Men's Collection",
      subtitle: "Deep woody notes, fresh spices, and rich leather scents designed for daily wear.",
      image: "/images/general/collection_men.jpg",
      category: "Men"
    },
    {
      id: 'women-collection',
      title: "Women's Collection",
      subtitle: "Soft florals, warm vanilla, and sweet fruit notes tailored for an elegant touch.",
      image: "/images/general/collection_women.jpg",
      category: "Women"
    },
    {
      id: 'pure-oils-collection',
      title: "Undiluted Perfume Oils",
      subtitle: "100% uncut, alcohol-free fragrance oils with 48+ hour extreme projection.",
      image: "/images/general/collection_perfume_oil.jpg",
      category: "Oil"
    }
  ];

  return (
    <main>
      {/* ========================================================================= */}
      {/* 1. HERO SECTION                                                          */}
      {/* ========================================================================= */}
      <section className="relative w-full bg-white py-6 sm:py-12 md:py-20 px-4 sm:px-6 md:px-12 overflow-hidden border-b border-brand-charcoal/10 min-h-[auto] lg:min-h-[85vh] flex items-center">
        {/* Slow Background Marquee Watermark */}
        <div className="absolute inset-0 flex items-center overflow-hidden pointer-events-none z-0 opacity-[0.05]">
          <div className="animate-marquee flex whitespace-nowrap text-[26vw] sm:text-[22vw] lg:text-[16vw] font-black uppercase text-brand-charcoal leading-none">
            <span className="mr-20">WONDERS SCENTS</span>
            <span className="mr-20">WONDERS SCENTS</span>
            <span className="mr-20">WONDERS SCENTS</span>
            <span className="mr-20">WONDERS SCENTS</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto z-10 relative w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-8 lg:gap-14 items-center">
            {/* Mobile Headline */}
            <div className="lg:hidden text-center space-y-1">
              <ScrollReveal direction="up">
                <h1 className="font-display text-4xl sm:text-6xl font-medium text-brand-purple uppercase leading-tight tracking-tight">
                  SMELL NICE, FEEL GOOD, LOOK GOOD.
                </h1>
              </ScrollReveal>
            </div>

            {/* Hero Transparent Products Showcase */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end lg:order-2 my-1 lg:my-0">
              <div className="relative w-full max-w-[280px] sm:max-w-[380px] md:max-w-[480px] lg:max-w-[460px] flex flex-col items-center justify-center pt-2 sm:pt-6 pb-1">
                
                {/* Top Right Fragrance Name Tag with Background Pill */}
                <div className="absolute -top-1 right-0 sm:top-0 sm:right-2 z-30 pointer-events-none">
                  {heroProducts.map((item, idx) => (
                    <span
                      key={idx}
                      className={`px-3.5 py-1.5 sm:px-4 sm:py-2 bg-brand-purple-light/90 border border-brand-purple/20 text-brand-purple font-bold text-xs sm:text-sm tracking-widest uppercase rounded-full transition-all duration-700 ${
                        idx === currentHeroIndex
                          ? 'opacity-100 translate-y-0 inline-flex items-center'
                          : 'opacity-0 -translate-y-2 hidden'
                      }`}
                    >
                      {item.label}
                    </span>
                  ))}
                </div>

                {/* Floating Animated Bottle Stage (Anchored at base) */}
                <div className="w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[430px] relative flex items-end justify-center animate-floatProduct z-10">
                  {/* Smooth Crossfading Transparent PNG Images */}
                  {heroProducts.map((item, idx) => {
                    const isActive = idx === currentHeroIndex;
                    return (
                      <div
                        key={idx}
                        className={`absolute inset-x-0 bottom-0 top-0 flex items-end justify-center pb-2 transition-all duration-1000 ease-in-out ${
                          isActive
                            ? 'opacity-100 scale-100 pointer-events-auto'
                            : 'opacity-0 scale-95 pointer-events-none'
                        }`}
                      >
                        <img 
                          src={item.image} 
                          alt={item.alt} 
                          loading="eager"
                          fetchPriority="high"
                          className="max-h-[235px] sm:max-h-[330px] md:max-h-[430px] lg:max-h-[410px] w-auto max-w-full object-contain select-none pointer-events-none"
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Ground Contact Shadow Directly Under The Base Of Every Bottle */}
                <div className="w-32 sm:w-56 md:w-60 h-3.5 sm:h-5 bg-neutral-950/75 rounded-[100%] blur-[5px] sm:blur-[6px] -mt-1 sm:-mt-2 pointer-events-none animate-pulseShadow z-0" />

              </div>
            </div>

            {/* Text Content & CTA Buttons */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-4 sm:space-y-8 lg:order-1 flex flex-col items-center lg:items-start mt-2 sm:mt-0">
              <div className="hidden lg:block space-y-3">
                <ScrollReveal direction="up">
                  <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium text-brand-purple uppercase leading-[1.08] tracking-tight">
                    SMELL NICE, FEEL GOOD, LOOK GOOD.
                  </h1>
                </ScrollReveal>
              </div>

              <ScrollReveal direction="up" delay={150}>
                <p className="text-base sm:text-lg md:text-xl text-brand-charcoal/85 font-normal leading-relaxed max-w-2xl text-center lg:text-left">
                  Curating authentic luxury fragrances, long-lasting designer perfumes, 
                  undiluted perfume oils, and refreshing body sprays to elevate your everyday presence.
                </p>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={300}>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-5 pt-2 w-full sm:w-auto">
                  <button
                    onClick={onExploreClick}
                    className="px-9 py-4 sm:px-10 sm:py-4.5 bg-[#3D3D3D] hover:bg-brand-purple text-white font-bold text-sm tracking-wide transition-all duration-300 flex items-center justify-center space-x-3 group rounded-xs cursor-pointer active:scale-95"
                  >
                    <span>Explore Collection</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>

                  <button
                    onClick={() => {
                      const el = document.getElementById('wholesale');
                      if (el) {
                        el.scrollIntoView({ behavior: 'auto', block: 'start' });
                      } else if (onNavigateToPage) {
                        onNavigateToPage('home', 'wholesale');
                      }
                    }}
                    className="px-9 py-4 sm:px-10 sm:py-4.5 bg-white border-2 border-brand-charcoal/20 hover:border-brand-purple text-brand-charcoal hover:bg-brand-purple hover:text-white font-bold text-sm tracking-wide transition-all duration-300 text-center rounded-xs cursor-pointer active:scale-95"
                  >
                    Wholesale offers
                  </button>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. FEATURED COLLECTIONS                                                  */}
      {/* ========================================================================= */}
      <section className="py-18 md:py-28 px-6 md:px-12 bg-white border-b border-brand-charcoal/10">
        <div className="max-w-7xl mx-auto space-y-12">
          <ScrollReveal direction="up">
            <div className="border-b border-brand-charcoal/10 pb-6 mb-10 text-left space-y-3">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-[#3D3D3D] uppercase leading-tight tracking-tight">
                Featured Collections
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-[#3D3D3D]/80 font-normal leading-relaxed max-w-3xl">
                Explore our signature fragrance tiers. Formulated for long-lasting performance and effortless daily elegance.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={150}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-left">
              {collectionCards.map((card) => (
                <div 
                  key={card.id}
                  className="group relative h-[450px] sm:h-[480px] md:h-[500px] w-full rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.01] bg-[#1a1a1a]"
                  onClick={() => {
                    if (onNavigateToPage) {
                      if (card.id === 'men-collection') onNavigateToPage('men-collection');
                      else if (card.id === 'women-collection') onNavigateToPage('women-collection');
                      else if (card.id === 'unisex-collection') onNavigateToPage('unisex-collection');
                      else if (card.id === 'pure-oils-collection') onNavigateToPage('pure-oils');
                      else onNavigateToPage('all-collections');
                    } else {
                      onNavigateToCollection();
                    }
                  }}
                >
                  <img 
                    src={card.image} 
                    alt={card.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  />

                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/95 transition-opacity duration-300 group-hover:opacity-90" />

                  <div className="absolute top-6 left-6 right-6 z-20">
                    <h3 className="font-sans text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight">
                      {card.title}
                    </h3>
                  </div>

                  <div className="absolute bottom-6 right-6 z-20 transition-all duration-300 group-hover:opacity-0 group-hover:scale-75">
                    <div className="w-12 h-12 bg-white text-[#3D3D3D] rounded-full flex items-center justify-center shadow-md">
                      <ChevronRight className="w-6 h-6 stroke-[2.2]" />
                    </div>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-7 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out flex flex-col justify-end bg-gradient-to-t from-black via-black/95 to-transparent">
                    <div className="space-y-3">
                      <h4 className="text-xl font-bold text-white">
                        {card.title}
                      </h4>
                      <p className="text-sm text-white/85 leading-relaxed font-normal">
                        {card.subtitle}
                      </p>
                      
                      <div className="pt-3">
                        <button className="w-full py-3.5 bg-brand-purple hover:bg-brand-purple-deep text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xs transition-colors flex items-center justify-center space-x-2 cursor-pointer">
                          <span>View Collection</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. SIGNATURE SCENTS COLLECTION                                           */}
      {/* ========================================================================= */}
      <section className="relative w-full bg-white border-b border-brand-charcoal/10 py-18 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side: Seamless Infinite Looping Perfume Video */}
            <div className="flex justify-center order-2 lg:order-1 w-full">
              <ScrollReveal direction="left">
                <div className="relative w-full max-w-lg h-[460px] md:h-[540px] rounded-2xl overflow-hidden bg-black">
                  <video 
                    src="/signature_scents_video.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover pointer-events-none"
                  />
                </div>
              </ScrollReveal>
            </div>

            {/* Right Side: Editorial Typography & Call to Action */}
            <div className="flex flex-col space-y-6 text-left lg:pl-12 order-1 lg:order-2">
              <ScrollReveal direction="right">
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-[#3D3D3D] uppercase leading-tight tracking-tight">
                  Signature Scents <br />
                  <span className="text-brand-purple font-medium">Collection</span>
                </h2>
              </ScrollReveal>
              
              <ScrollReveal direction="right" delay={150}>
                <p className="text-base sm:text-lg md:text-xl text-[#3D3D3D]/80 font-normal leading-relaxed max-w-2xl md:max-w-4xl lg:max-w-lg">
                  Every bottle is filled with high-concentration fragrance oil, blended to stay vibrant throughout your day. Whether you prefer fresh citrus, deep oud, or soft floral notes, our signature oils react with your natural body warmth for a scent that lasts.
                </p>
              </ScrollReveal>
              
              <ScrollReveal direction="right" delay={250}>
                <div className="pt-2">
                  <button 
                    onClick={onExploreClick}
                    className="px-9 py-4 bg-[#3D3D3D] hover:bg-brand-purple text-white text-xs sm:text-sm font-bold tracking-wider uppercase transition-colors inline-flex items-center space-x-2.5 cursor-pointer rounded-xs"
                  >
                    <span>Explore Collection</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. LATEST DROPS (EMBLA INFINITE CAROUSEL - FULL-BLEED LUXURY CARDS)      */}
      {/* ========================================================================= */}
      <section id="latest-drops" className="py-20 md:py-28 px-4 sm:px-6 md:px-12 bg-white border-b border-brand-charcoal/10 font-sans overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-10 relative">
          <ScrollReveal direction="up">
            <div className="flex flex-col lg:flex-row lg:items-baseline lg:justify-between border-b border-brand-charcoal/10 pb-6 gap-2 sm:gap-3 lg:gap-6 text-left">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-[#3D3D3D] uppercase leading-none tracking-tight shrink-0">
                Latest Drops
              </h2>
              <p className="text-base sm:text-lg text-[#3D3D3D]/70 max-w-2xl lg:max-w-3xl text-left lg:text-right">
                Discover our newest arrivals. Carefully selected fragrance oils and body sprays.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <div className="relative px-6 sm:px-10 lg:px-14">
              {/* Left Arrow Button (Comfortable, Larger Size) */}
              <button
                onClick={scrollPrev}
                className="absolute -left-2 sm:-left-4 lg:-left-6 top-[50%] -translate-y-1/2 z-30 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white border-2 border-brand-charcoal/20 flex items-center justify-center text-[#111111] hover:bg-brand-purple hover:text-white hover:border-brand-purple transition-all duration-200 focus:outline-none cursor-pointer shadow-lg hover:scale-105 active:scale-95"
                aria-label="Previous fragrance"
              >
                <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.4] transition-colors" />
              </button>

              {/* Embla Viewport */}
              <div className="overflow-hidden p-2 -m-2" ref={emblaRef}>
                <div className="flex -mx-3 sm:-mx-4">
                  {displayProducts.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => onProductClick(product)}
                      className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333333%] min-w-0 px-3 sm:px-4 py-1"
                    >
                      <div className="group relative h-[450px] sm:h-[480px] md:h-[500px] w-full rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.01] bg-[#141414]">
                        
                        {/* Full-bleed Product Image */}
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                        />

                        {/* Uniform Luxury Dark Gradient Overlay so top part is not stark white */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/95 transition-opacity duration-300 group-hover:opacity-90" />

                        {/* Bottom Content Area */}
                        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 z-20 text-left flex flex-col justify-end bg-gradient-to-t from-black via-black/85 to-transparent transition-all duration-300">
                          {(() => {
                            const catLower = product.category.toLowerCase();
                            const simplifiedCategory = 
                              catLower.includes('mist') ? 'Body Mist' :
                              catLower.includes('spray') ? 'Body Spray' :
                              catLower.includes('oil') ? 'Undiluted Perfume Oil' :
                              catLower.includes('roll') ? 'Roll-On' : 'Perfume';
                            return (
                              <span className="text-xs font-bold tracking-widest text-brand-purple-light uppercase block mb-1">
                                {simplifiedCategory}
                              </span>
                            );
                          })()}
                          
                          <h3 className="font-sans text-lg sm:text-xl font-bold text-white tracking-tight leading-snug line-clamp-2">
                            {product.name}
                          </h3>

                          {/* Hover Reveal Description and Action */}
                          <div className="max-h-0 opacity-0 group-hover:max-h-36 group-hover:opacity-100 transition-all duration-500 overflow-hidden pt-0 group-hover:pt-3 space-y-2.5">
                            <p className="text-sm text-white/85 leading-relaxed font-normal line-clamp-2">
                              {product.description || 'Authentic long-lasting fragrance notes formulated for lasting presence and confidence.'}
                            </p>
                            
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                onProductClick(product);
                              }}
                              className="w-full py-3.5 bg-brand-purple hover:bg-brand-purple-deep text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xs transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                            >
                              <span>View Fragrance</span>
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Arrow Button (Comfortable, Larger Size) */}
              <button
                onClick={scrollNext}
                className="absolute -right-2 sm:-right-4 lg:-right-6 top-[50%] -translate-y-1/2 z-30 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white border-2 border-brand-charcoal/20 flex items-center justify-center text-[#111111] hover:bg-brand-purple hover:text-white hover:border-brand-purple transition-all duration-200 focus:outline-none cursor-pointer shadow-lg hover:scale-105 active:scale-95"
                aria-label="Next fragrance"
              >
                <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.4] transition-colors" />
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. UNDILUTED PERFUME OIL PACKAGES (3ML, 6ML & 50ML SELECTABLE)            */}
      {/* ========================================================================= */}
      <section id="wholesale" className="py-22 px-6 md:px-12 bg-white border-b border-brand-charcoal/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left">
            
            {/* Left Side: Copy & Information */}
            <div className="lg:col-span-6 space-y-7">
              <ScrollReveal direction="left">
                <span className="text-xs sm:text-sm font-bold text-brand-purple tracking-[0.25em] uppercase block">
                  PURE CONCENTRATES & WHOLESALE
                </span>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-[#3D3D3D] uppercase leading-tight tracking-tight pt-2">
                  Undiluted Perfume Oil Packages
                </h2>
              </ScrollReveal>

              <ScrollReveal direction="left" delay={100}>
                <p className="text-base sm:text-lg md:text-xl text-[#3D3D3D]/80 font-normal leading-relaxed">
                  Start your perfume oil business or restock your vanity with our undiluted perfume oil packages. Available in 3ml, 6ml, and 50ml sizes. Uncut pure fragrance oils, high profit margins, and fast nationwide delivery.
                </p>
              </ScrollReveal>

              {/* Feature Highlights */}
              <ScrollReveal direction="left" delay={200}>
                <div className="space-y-5 pt-4 border-t border-brand-charcoal/10">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-brand-purple-light rounded-sm text-brand-purple shrink-0 mt-0.5">
                      <Package className="w-5.5 h-5.5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-[#3D3D3D]">Flexible Scent Orders</h4>
                      <p className="text-sm text-[#3D3D3D]/70 mt-1">Select single bottles or full dozen packs in 3ml and 6ml, plus 50ml luxury flacons.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-brand-purple-light rounded-sm text-brand-purple shrink-0 mt-0.5">
                      <Truck className="w-5.5 h-5.5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-[#3D3D3D]">Nationwide Dispatch</h4>
                      <p className="text-sm text-[#3D3D3D]/70 mt-1">Fast, secure shipping to all states across Nigeria via verified logistics partners.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-brand-purple-light rounded-sm text-brand-purple shrink-0 mt-0.5">
                      <Award className="w-5.5 h-5.5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-[#3D3D3D]">100% Undiluted Concentration</h4>
                      <p className="text-sm text-[#3D3D3D]/70 mt-1">Uncut pure fragrance oil formulation for maximum scent longevity and projection.</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Action Button (Desktop Only Position) */}
              <ScrollReveal direction="left" delay={300}>
                <div className="hidden lg:block pt-4 space-y-2">
                  <a
                    href={selectedWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-3 px-8 py-4 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-sm font-bold tracking-wider uppercase transition-all rounded-xs cursor-pointer shadow-md active:scale-95"
                  >
                    <WhatsAppLogo className="w-5 h-5" />
                    <span>
                      {currentSelectedPackage
                        ? `Order ${currentSelectedPackage.size} (${currentSelectedPackage.priceFormatted}) via WhatsApp`
                        : `Order Perfume Oils via WhatsApp`}
                    </span>
                  </a>
                  {currentSelectedPackage && (
                    <p className="text-xs text-[#3D3D3D]/70 pl-1">
                      Direct order for: <strong>{currentSelectedPackage.title} ({currentSelectedPackage.label})</strong>
                    </p>
                  )}
                </div>
              </ScrollReveal>
            </div>

            {/* Right Side: Interactive Selectable Breakdown Cards */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="flex items-center justify-between pb-1">
                <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-brand-purple">
                  Tap a package below to select:
                </span>
                <span className="text-xs text-[#3D3D3D]/60 font-medium">3ml • 6ml • 50ml</span>
              </div>

              {wholesaleOilPackages.map((pkg, pIdx) => (
                <ScrollReveal key={pkg.size} direction="right" delay={120 * (pIdx + 1)}>
                  <div className="bg-white border border-brand-charcoal/10 p-5 sm:p-6 md:p-7 transition-all duration-300 hover:border-brand-purple/40 rounded-xs">
                    <div className="flex justify-between items-center pb-3 border-b border-brand-charcoal/10 mb-4">
                      <div>
                        <h3 className="font-display text-lg sm:text-xl font-bold text-[#3D3D3D]">
                          {pkg.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#3D3D3D]/65 mt-0.5">
                          {pkg.subtitle}
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-brand-purple-light text-brand-purple text-xs font-bold rounded-xs shrink-0">
                        {pkg.badge}
                      </span>
                    </div>

                    <div className={`grid gap-3 ${pkg.options.length > 1 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
                      {pkg.options.map((opt) => {
                        const isSelected = selectedOilOptionId === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setSelectedOilOptionId((prev) => (prev === opt.id ? null : opt.id))}
                            className={`p-4 text-left transition-all duration-200 rounded-xs cursor-pointer flex flex-col justify-between space-y-2 relative border ${
                              isSelected
                                ? 'bg-brand-purple-light/20 border-brand-purple'
                                : 'bg-neutral-50 border-brand-charcoal/10 hover:border-brand-purple/40 hover:bg-neutral-100/60'
                            }`}
                          >
                            <div className="flex items-center justify-between w-full">
                              <span className={`text-xs font-bold uppercase tracking-wider ${isSelected ? 'text-brand-purple' : 'text-[#3D3D3D]/60'}`}>
                                {opt.label}
                              </span>
                              {isSelected ? (
                                <span className="w-5 h-5 rounded-full bg-brand-purple text-white flex items-center justify-center shrink-0">
                                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                                </span>
                              ) : (
                                <span className="w-5 h-5 rounded-full border border-brand-charcoal/30 inline-block shrink-0"></span>
                              )}
                            </div>

                            <div>
                              <span className={`text-2xl sm:text-3xl font-bold block ${isSelected ? 'text-brand-purple' : 'text-[#3D3D3D]'}`}>
                                {opt.priceFormatted}
                              </span>
                              <span className={`text-xs font-medium block mt-1 ${isSelected ? 'text-brand-purple font-semibold' : 'text-[#3D3D3D]/60'}`}>
                                {opt.note}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </ScrollReveal>
              ))}

              {/* Mobile Action Button Position */}
              <ScrollReveal direction="up" delay={450}>
                <div className="block lg:hidden pt-2">
                  <a
                    href={selectedWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-sm font-bold tracking-wider uppercase transition-colors flex items-center justify-center space-x-3 rounded-xs shadow-md"
                  >
                    <WhatsAppLogo className="w-5 h-5" />
                    <span>
                      {currentSelectedPackage
                        ? `Order ${currentSelectedPackage.size} (${currentSelectedPackage.priceFormatted}) via WhatsApp`
                        : `Order Perfume Oils via WhatsApp`}
                    </span>
                  </a>
                </div>
              </ScrollReveal>

            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. PERFUME OIL MAKING TRAINING WAITLIST                                  */}
      {/* ========================================================================= */}
      <section id="training" className="py-22 px-6 md:px-12 bg-white border-b border-brand-charcoal/10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border border-brand-charcoal/10 p-6 sm:p-10 md:p-14 relative rounded-sm overflow-hidden text-left">
            
            {/* Section Header */}
            <ScrollReveal direction="up">
              <div className="text-center max-w-xl mx-auto mb-10 relative space-y-2">
                <span className="inline-block px-3.5 py-1 bg-brand-purple text-white text-[10px] font-bold tracking-[0.2em] uppercase rounded-xs mb-2">
                  Coming Soon
                </span>
                
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium text-[#3D3D3D] uppercase leading-tight tracking-tight">
                  Perfume Oil Making Training
                </h2>

                <p className="text-base md:text-lg text-[#3D3D3D]/80 leading-relaxed font-normal max-w-lg mx-auto text-center" style={{ textWrap: 'balance' }}>
                  Empowering fragrance entrepreneurs. Learn oil sourcing, blending, bottling, and branding to launch your own business.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-2">
              {/* Training Info */}
              <ScrollReveal direction="left" delay={150}>
                <div className="space-y-4 text-left border-b md:border-b-0 md:border-r border-brand-charcoal/10 pb-6 md:pb-0 md:pr-8">
                  <div className="space-y-3.5">
                    <div className="flex items-center space-x-3">
                      <User className="w-5 h-5 text-brand-purple shrink-0" />
                      <p className="text-sm text-[#3D3D3D] uppercase font-bold">
                        Target Age: <span className="text-brand-purple">18 – 30 Years Old</span>
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-brand-purple shrink-0" />
                      <p className="text-sm text-[#3D3D3D] uppercase font-bold">
                        Start Date: <span className="text-brand-purple">Announcing Soon</span>
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Sparkles className="w-5 h-5 text-brand-purple shrink-0" />
                      <p className="text-sm text-[#3D3D3D] uppercase font-bold">
                        Modules: <span className="text-brand-purple">Sourcing, Blending & Branding</span>
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-[#3D3D3D]/75 leading-relaxed font-normal pt-2">
                    Our mission is to train and empower 1,000 young individuals to achieve financial independence through practical scent craftsmanship.
                  </p>
                </div>
              </ScrollReveal>

              {/* Notification Registration */}
              <ScrollReveal direction="right" delay={250}>
                <div className="text-left">
                  <h3 className="text-sm font-bold tracking-wider text-[#3D3D3D] uppercase mb-3">
                    Join The Training Waitlist
                  </h3>
                  
                  {trainingSubmitted ? (
                    <div className="bg-brand-purple-light/50 border border-brand-purple/20 p-5 flex items-start space-x-3 rounded-xs">
                      <CheckCircle className="w-5 h-5 text-brand-purple shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-bold text-brand-purple uppercase tracking-wider">You are on the VIP waitlist!</p>
                        <p className="text-sm text-[#3D3D3D]/75 mt-1">
                          We will notify you via WhatsApp as soon as registrations open.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleTrainingSubmit} className="space-y-3.5">
                      <div>
                        <label className="text-xs font-bold text-[#3D3D3D]/70 uppercase tracking-wider block mb-1">Full Name</label>
                        <input
                          type="text"
                          required
                          value={trainingName}
                          onChange={(e) => setTrainingName(e.target.value)}
                          placeholder="e.g. John Doe"
                          className="w-full bg-white border border-brand-charcoal/15 px-3.5 py-2.5 text-xs text-[#3D3D3D] focus:outline-none focus:border-brand-purple rounded-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-[#3D3D3D]/60 uppercase tracking-wider block mb-1">WhatsApp Phone Number</label>
                        <input
                          type="tel"
                          required
                          value={trainingPhone}
                          onChange={(e) => setTrainingPhone(e.target.value)}
                          placeholder="e.g. 08145620271"
                          className="w-full bg-white border border-brand-charcoal/15 px-3.5 py-2.5 text-xs text-[#3D3D3D] focus:outline-none focus:border-brand-purple rounded-xs"
                        />
                      </div>
                      
                      <button
                        type="submit"
                        className="w-full py-3 bg-[#3D3D3D] hover:bg-brand-purple text-white text-xs font-semibold tracking-wider transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                      >
                        <WhatsAppLogo />
                        <span>Join Waitlist via WhatsApp</span>
                      </button>
                    </form>
                  )}
                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. SLOGAN BANNER                                                         */}
      {/* ========================================================================= */}
      <section className="bg-[#3D3D3D] text-white py-20 px-6 md:px-12 border-b border-white/10">
        <div className="max-w-7xl mx-auto text-left">
          <div className="max-w-3xl space-y-6">
            <ScrollReveal direction="up">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium text-white uppercase leading-tight tracking-tight">
                Empower Every Presence With Excellence
              </h2>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={120}>
              <p className="text-sm md:text-base text-white/80 font-normal leading-relaxed">
                Discover high-concentration fragrance oils designed for lasting presence. Smelling good is a lifestyle—crafted to stay vibrant on your skin from morning to night.
              </p>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={220}>
              <div className="pt-2">
                <button 
                  onClick={onExploreClick}
                  className="px-8 py-3.5 bg-white text-[#3D3D3D] hover:bg-brand-purple hover:text-white text-xs font-semibold tracking-wider transition-colors cursor-pointer"
                >
                  Shop The Collection
                </button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  );
};
