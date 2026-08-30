import React, { useLayoutEffect } from 'react';
import { 
  ChevronRight, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  Droplets, 
  ArrowRight,
  MessageCircle
} from 'lucide-react';
import type { Product } from '../types';
import type { CartItem } from '../hooks/useAppState';
import { ScrollReveal } from './ScrollReveal';

interface PurePerfumeOilsPageProps {
  products?: Product[];
  onAddToCart?: (product: Product, size?: string, quantity?: number) => boolean | void;
  onSelectProduct?: (product: Product) => void;
  onNavigateHome: () => void;
  onNavigateAllCollections?: () => void;
  cart?: CartItem[];
  initialSectionId?: string;
}

// Official WhatsApp Brand SVG Logo
const WhatsAppLogo = ({ className = "w-5 h-5 fill-current" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.144 4.18 4.225-1.109zm9.849-5.111c-.305-.153-1.805-.891-2.085-.993-.28-.102-.485-.153-.69.153-.204.306-.791.993-.969 1.196-.178.203-.356.229-.661.076-.305-.153-1.288-.474-2.453-1.513-.907-.808-1.519-1.807-1.697-2.113-.178-.306-.019-.471.133-.623.137-.137.305-.356.458-.534.153-.178.204-.306.305-.509.102-.204.051-.382-.025-.534-.076-.153-.69-1.66-.945-2.275-.248-.598-.501-.517-.69-.526-.178-.008-.382-.01-.585-.01s-.534.076-.814.382c-.28.306-1.069 1.045-1.069 2.551s1.095 2.96 1.247 3.164c.153.204 2.155 3.292 5.221 4.617.729.314 1.299.502 1.743.643.733.233 1.399.2 1.926.121.587-.088 1.805-.738 2.06-1.45.254-.713.254-1.324.178-1.45-.076-.28-.203-.585-.356z"/>
  </svg>
);

// High-definition curated Pure Perfume Oil Edits (01 to 06) with Title Case Brands
const topOilEdits = [
  {
    num: "01",
    brand: "Byredo",
    name: "Byredo Blanche",
    shortProfile: "Clean, fresh & soft. A timeless white musk that feels like crisp fresh laundry.",
    profile: "A pure, clean, and genderless fragrance that captures the scent of fresh laundry, the softness of skin, and the intimacy of human touch. Inspired by the beauty of contrasts, this floral scent blends crisp aldehydes and elegant rose with tender florals, grounded by creamy sandalwood and warm musks. It's a simple yet striking fragrance that evokes the crisp comfort of clean white linen.",
    image: "/images/oils/byredo_blanche_oil.png",
    imageClass: "object-contain p-2",
    id: "ws-oil-blanche-01",
    fragranceProfile: {
      topNotes: ["Aldehyde", "Rose Centifolia", "White Rose", "Pink Pepper"],
      middleNotes: ["Peony", "Violet", "Neroli"],
      baseNotes: ["Musks", "Sandalwood", "Blonde Woods"],
      family: "Fresh Clean Crisp Floral Aldehyde",
      whenToWear: ["Daytime", "Work", "Spring/Summer", "Casual Outings", "Everyday Use"]
    }
  },
  {
    num: "02",
    brand: "Touch",
    name: "Touch Perfume Oil",
    shortProfile: "Small but mighty. A smooth, warm blend of light musk, vanilla, and sandalwood.",
    profile: "A compact, concentrated perfume oil that offers an intense and long-lasting fragrance experience. This undiluted oil delivers a warm and sensual scent that lingers for hours, making it a popular and affordable choice for daily wear in Nigeria. Described as \"small but mighty,\" it provides a smooth blend of light musk, vanilla, and sandalwood for an intimate personal aroma.",
    image: "/images/oils/touch_perfume_oil.png",
    imageClass: "object-cover",
    id: "ws-oil-touch-02",
    fragranceProfile: {
      topNotes: ["Warm Musk"],
      middleNotes: ["Vanilla"],
      baseNotes: ["Sandalwood"],
      family: "Warm Sensual Musk Vanilla Sandalwood",
      whenToWear: ["Daytime", "Work", "Casual Outings", "Everyday Use"]
    }
  }
];

const gridOilEdits = [
  {
    num: "03",
    brand: "Al-Rehab",
    name: "Al-Rehab Choco Musk Concentrated Perfume Oil",
    shortProfile: "Sweet, cozy gourmand with milk chocolate, vanilla, and warm white musk.",
    profile: "A bestselling unisex perfume oil known for its sweet, gourmand scent reminiscent of milk chocolate, vanilla, and white musk. This alcohol-free roll-on oil is highly concentrated and long-lasting, making it a popular and affordable choice for those who enjoy cozy, dessert-like fragrances. It can be used on its own or layered with other scents to create a warm, indulgent base.",
    image: "/images/oils/al_rehab_choco_musk_oil.png",
    imageClass: "object-contain p-2",
    id: "ws-oil-choco-musk-03",
    fragranceProfile: {
      topNotes: ["Warm Spicy", "Amber"],
      middleNotes: ["Sweet", "Powdery", "Vanilla"],
      baseNotes: ["Chocolate", "Musky", "Cocoa"],
      family: "Sweet Gourmand Chocolate Vanilla Musk",
      whenToWear: ["Daytime", "Casual Outings", "Layering", "Everyday Use"]
    }
  },
  {
    num: "04",
    brand: "Nature's Garden",
    name: "Pheromones Fragrance Oil",
    shortProfile: "Alluring, sexy, and masculine aroma with bergamot, woody violet, and oakmoss.",
    profile: "An original, concentrated fragrance oil manufactured by Nature's Garden, known as a top-selling \"classic hot man fragrance\" that is masculine, sexy, and irresistible. This highly concentrated oil is described as a captivating, sophisticated aroma that exudes confidence and allure. It is versatile and can be used in various products such as perfumes, soaps, lotions, and candles.",
    image: "/images/oils/pheromones_fragrance_oil.png",
    imageClass: "object-contain p-2",
    id: "ws-oil-pheromones-04",
    fragranceProfile: {
      topNotes: ["Bergamot", "Grapefruit"],
      middleNotes: ["White Floral", "Woody Violet"],
      baseNotes: ["Oakmoss", "Sandalwood"],
      family: "Captivating Alluring Citrus Woody Floral",
      whenToWear: ["Daytime", "Work", "Casual Outings", "Everyday Use"]
    }
  },
  {
    num: "05",
    brand: "Prada",
    name: "Prada Infusion d'Iris",
    shortProfile: "Powdery, clean & classy iris with a fresh soapy touch and understated luxury.",
    profile: "Powdery, clean & classy. Iris with a fresh soapy touch. Understated luxury at its best.",
    image: "/images/oils/prada_infusion_diris_oil.png",
    imageClass: "object-contain p-2",
    id: "ws-oil-iris-05",
    fragranceProfile: {
      topNotes: ["Italian Mandarin", "Neroli", "Orange Blossom"],
      middleNotes: ["Iris Pallida", "Galbanum", "Mastic"],
      baseNotes: ["Incense", "Benzoin", "Cedarwood", "Vetiver"],
      family: "Powdery Clean Elegant Iris Woody",
      whenToWear: ["Daytime", "Office", "Elegant Outings", "Everyday Use"]
    }
  },
  {
    num: "06",
    brand: "Wonders Scents",
    name: "Wonders Scents Pure Perfume Oil",
    shortProfile: "100% uncut, alcohol-free designer oils curated for extreme 48+ hour projection.",
    profile: "100% uncut, alcohol-free signature perfume oil roll-ons specially curated in an array of bestselling designer fragrances (including Mousuf, J'adore, Pink Sugar, and Rich Woods). Formulated with high-grade fragrance oil concentrates that react with your natural body warmth to provide 48+ hours of intense, long-lasting scent projection on skin and clothing.",
    image: "/images/oils/wonders_scents_perfume_oil.png",
    imageClass: "object-cover",
    id: "ws-oil-wonders-scents-06",
    fragranceProfile: {
      topNotes: ["Fresh Citrus", "Bergamot", "Pink Berries", "Sparkling Florals"],
      middleNotes: ["Sweet Gourmand", "Rose", "Jasmine", "Warm Spices"],
      baseNotes: ["Rich Amber", "Pure Oud", "White Musk", "Creamy Sandalwood"],
      family: "Multi-Fragrance Designer Assortment (Floral, Amber, Woody & Gourmand)",
      whenToWear: ["All-Day Wear", "Work", "Layering", "Casual Outings", "Pocket Essential"]
    }
  }
];

export const PurePerfumeOilsPage: React.FC<PurePerfumeOilsPageProps> = ({
  onSelectProduct,
  onNavigateHome,
  onNavigateAllCollections,
  cart: _cart = [],
  initialSectionId
}) => {
  useLayoutEffect(() => {
    const targetSection = initialSectionId || (window.location.hash ? window.location.hash.replace('#', '') : null);
    if (targetSection) {
      const scrollToSection = () => {
        const el = document.getElementById(targetSection);
        if (el) {
          el.scrollIntoView({ behavior: 'auto', block: 'start' });
        }
      };
      
      scrollToSection();
      const t1 = setTimeout(scrollToSection, 30);
      const t2 = setTimeout(scrollToSection, 100);
      const t3 = setTimeout(scrollToSection, 250);
      const t4 = setTimeout(scrollToSection, 500);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
      };
    } else {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [initialSectionId]);

  const handleConciergeInquiry = (customMsg?: string) => {
    const defaultMsg = "Hello WondersScents! I am looking for a specific Pure Perfume Oil in 3ml or 6ml that isn't listed here. Could you check if you have it in stock in your warehouse?";
    const message = customMsg || defaultMsg;
    const whatsappUrl = `https://wa.me/2348145620271?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="w-full bg-white text-[#181818] font-sans min-h-screen selection:bg-brand-purple selection:text-white">
      
      <section className="relative w-full bg-white pt-6 sm:pt-8 pb-4 sm:pb-6 px-4 sm:px-8 md:px-12 lg:px-16 border-b border-black/10">
        <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
          
          <ScrollReveal direction="up" className="flex items-center text-xs text-[#181818]/60 font-medium">
            <div className="flex items-center space-x-2">
              <button 
                onClick={onNavigateAllCollections || onNavigateHome} 
                className="hover:text-brand-purple transition-colors cursor-pointer"
              >
                All Collections
              </button>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-[#181818] font-bold">Pure Perfume Oils</span>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch pt-2">
            
            <div className="lg:col-span-5 xl:col-span-5 flex flex-col">
              <ScrollReveal direction="left" className="h-full flex flex-col">
                
                <div className="relative w-full h-[480px] sm:h-[540px] lg:h-full min-h-[480px] rounded-3xl overflow-hidden border border-black/10 flex flex-col justify-between p-8 sm:p-10 shadow-none">
                  
                  {/* Full-bleed Image */}
                  <img
                    src="/images/general/collection_perfume_oil.jpg"
                    alt="WondersScents Pure Perfume Oils"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                  {/* Soft Bottom Shadow for Direct Text Legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                  {/* Top Badges Directly on Image */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md text-[11px] font-bold tracking-widest uppercase text-[#c89e58] border border-[#c89e58]/40 shadow-xs">
                      100% PURE OILS
                    </span>
                    <span className="text-xs font-mono text-[#c89e58] tracking-wider font-semibold">3ML & 6ML</span>
                  </div>

                  {/* Bottom Text Directly on Image (No inner box) */}
                  <div className="relative z-10 space-y-4 text-left">
                    <div className="space-y-1">
                      <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#c89e58]">
                        Undiluted Concentrates
                      </p>
                      <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium uppercase tracking-tight text-white leading-none">
                        PURE PERFUME <br />
                        <span className="italic font-light text-[#c89e58]">OILS</span>
                      </h2>
                    </div>

                    <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-normal max-w-sm">
                      Uncut, long-lasting designer fragrance oils blended for all-day freshness and rich scent projection on clothes and skin.
                    </p>

                    <div className="pt-2 flex flex-wrap gap-2">
                      <div className="px-3 py-1.5 bg-black/40 backdrop-blur-sm rounded-full text-[11px] font-medium text-[#c89e58] flex items-center space-x-1.5 border border-[#c89e58]/35">
                        <Droplets className="w-3.5 h-3.5 text-[#c89e58]" />
                        <span>No Alcohol</span>
                      </div>
                      <div className="px-3 py-1.5 bg-black/40 backdrop-blur-sm rounded-full text-[11px] font-medium text-[#c89e58] flex items-center space-x-1.5 border border-[#c89e58]/35">
                        <Sparkles className="w-3.5 h-3.5 text-[#c89e58]" />
                        <span>Long Lasting</span>
                      </div>
                    </div>

                    <div className="pt-1 text-xs">
                      <span className="font-mono text-xs text-[#c89e58]/80 tracking-wider font-medium">@WondersScents</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-7 xl:col-span-7 text-left flex flex-col justify-between h-full space-y-6 sm:space-y-8">
              
              {topOilEdits.map((item, idx) => {
                return (
                  <ScrollReveal key={item.id} direction="up" className="flex-1 flex flex-col justify-center">
                    <div 
                      onClick={() => {
                        if (onSelectProduct) {
                          onSelectProduct({
                            id: item.id,
                            name: item.name,
                            brand: item.brand,
                            category: 'Perfume Oil',
                            price: 0,
                            sizes: ['3ML', '6ML'],
                            stock: 50,
                            availability: 'in-stock',
                            image: item.image,
                            description: item.profile,
                            fragranceProfile: item.fragranceProfile,
                            sku: `WS-OIL-${item.num}`,
                            tags: ['pure oil', 'perfume oil', 'concentrate', 'oil']
                          });
                        }
                      }}
                      className={`py-6 sm:py-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-6 sm:gap-8 group cursor-pointer ${
                        idx === 0 ? 'border-b border-black/15 pb-8 sm:pb-10' : 'pt-2 sm:pt-4'
                      }`}
                    >
                      
                      <div className="flex-1 space-y-2.5 w-full pr-0 sm:pr-4 my-auto">
                        <div>
                          <span className="font-serif text-4xl sm:text-5xl font-light text-[#9e7d4d] leading-none block">
                            {item.num}
                          </span>
                        </div>
                        <div className="text-xs sm:text-sm font-medium tracking-wider text-[#9e7d4d]">
                          {item.brand}
                        </div>
                        <h3 className="font-display text-sm sm:text-base md:text-lg font-semibold text-[#111111] tracking-normal group-hover:text-[#9e7d4d] transition-colors leading-snug">
                          {item.name}
                        </h3>
                        <p className="text-xs sm:text-[13px] text-[#181818]/75 leading-relaxed font-normal max-w-sm line-clamp-2">
                          {item.shortProfile || item.profile}
                        </p>
                        <div className="pt-1.5 flex items-center justify-between gap-4">
                          <div className="text-xs sm:text-sm font-medium text-[#9e7d4d] group-hover:text-[#111111] flex items-center space-x-1.5 transition-colors">
                            <span>View scent</span>
                            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
                          </div>
                        </div>
                      </div>

                      <div className="w-full sm:w-48 md:w-52 lg:w-56 h-48 sm:h-52 md:h-56 shrink-0 rounded-2xl overflow-hidden bg-white border border-black/10 relative shadow-xs flex items-center justify-center transition-all duration-300 my-auto">
                        <img
                          src={item.image}
                          alt={item.name}
                          className={`w-full h-full ${item.imageClass || 'object-contain'} transition-transform duration-700 group-hover:scale-105`}
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full bg-white pt-6 sm:pt-8 pb-16 sm:pb-20 px-4 sm:px-8 md:px-12 lg:px-16 border-b border-black/10">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start divide-y lg:divide-y-0 divide-black/15">
            {gridOilEdits.map((item, idx) => {
              return (
                <ScrollReveal key={item.id} direction="up" delay={idx * 60}>
                  <div 
                    onClick={() => {
                      if (onSelectProduct) {
                        onSelectProduct({
                          id: item.id,
                          name: item.name,
                          brand: item.brand,
                          category: 'Perfume Oil',
                          price: 0,
                          sizes: ['3ML', '6ML'],
                          stock: 50,
                          availability: 'in-stock',
                          image: item.image,
                          description: item.profile,
                          fragranceProfile: item.fragranceProfile,
                          sku: `WS-OIL-${item.num}`,
                          tags: ['pure oil', 'perfume oil', 'concentrate', 'oil']
                        });
                      }
                    }}
                    className="py-6 sm:py-8 first:pt-0 lg:py-6 flex flex-col-reverse sm:flex-row items-center justify-between gap-6 sm:gap-8 group cursor-pointer border-b border-black/15 pb-8 sm:pb-10"
                  >
                    <div className="flex-1 space-y-2.5 w-full pr-0 sm:pr-4 my-auto">
                      <div>
                        <span className="font-serif text-4xl sm:text-5xl font-light text-[#9e7d4d] leading-none block">
                          {item.num}
                        </span>
                      </div>
                      <div className="text-xs sm:text-sm font-medium tracking-wider text-[#9e7d4d]">
                        {item.brand}
                      </div>
                      <h3 className="font-display text-sm sm:text-base md:text-lg font-semibold text-[#111111] tracking-normal group-hover:text-[#9e7d4d] transition-colors leading-snug">
                        {item.name}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-[#181818]/75 leading-relaxed font-normal max-w-sm line-clamp-2">
                        {item.shortProfile || item.profile}
                      </p>
                      <div className="pt-1.5 flex items-center justify-between gap-3">
                        <div className="text-xs sm:text-sm font-medium text-[#9e7d4d] group-hover:text-[#111111] flex items-center space-x-1 transition-colors">
                          <span>View scent</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
                        </div>
                      </div>
                    </div>

                    <div className="w-full sm:w-48 md:w-52 lg:w-56 h-48 sm:h-52 md:h-56 shrink-0 rounded-2xl overflow-hidden bg-white border border-black/10 relative shadow-xs flex items-center justify-center transition-all duration-300 my-auto">
                      <img
                        src={item.image}
                        alt={item.name}
                        className={`w-full h-full ${item.imageClass || 'object-contain'} transition-transform duration-700 group-hover:scale-105`}
                        loading="lazy"
                      />
                    </div>

                  </div>
                </ScrollReveal>
              );
            })}

          </div>

          {/* ===================================================================== */}
          {/* 🌟 LUXURY CONCIERGE BANNER: CAN'T FIND YOUR PERFUME OIL? (NO SHADOWS) */}
          {/* ===================================================================== */}
          <ScrollReveal direction="up">
            <div className="mt-8 p-8 sm:p-12 bg-neutral-50 rounded-3xl border border-black/10 flex flex-col md:flex-row items-center justify-between gap-8 text-left shadow-none">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center space-x-2 text-xs font-bold tracking-[0.2em] text-[#9e7d4d] uppercase">
                  <Sparkles className="w-4 h-4" />
                  <span>Custom Fragrance Concierge</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-normal text-[#111111] uppercase leading-tight">
                  Can't Find Your Perfume Oil?
                </h3>
                <p className="text-sm sm:text-base text-[#181818]/70 leading-relaxed font-normal">
                  We have over 500+ unlisted pure designer fragrance oils in stock in 3ml and 6ml flacons. Chat with our concierge to request any custom designer scent.
                </p>
              </div>

              <div className="shrink-0 w-full md:w-auto">
                <button
                  onClick={() => handleConciergeInquiry("Hello WondersScents! I am looking for a specific Pure Perfume Oil in 3ml or 6ml that isn't listed on your website. Could you check if you have it in stock?")}
                  className="w-full md:w-auto px-8 py-4 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs uppercase tracking-wider rounded-full transition-all duration-300 flex items-center justify-center space-x-2.5 cursor-pointer shadow-none active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Request Any Scent on WhatsApp</span>
                </button>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. WHOLESALE & RESELLER SECTION (NO SHADOWS)                              */}
      {/* ========================================================================= */}
      <section id="wholesale" className="py-16 sm:py-24 px-4 sm:px-8 md:px-12 bg-neutral-50 border-b border-black/10 scroll-mt-20">
        <div className="max-w-7xl mx-auto space-y-12 text-left">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <ScrollReveal direction="left">
                <span className="text-xs font-bold tracking-[0.25em] text-brand-purple uppercase block">
                  WHOLESALE & BULK ORDERS
                </span>
                <h2 className="font-display text-3xl sm:text-5xl font-normal text-[#111111] uppercase leading-tight">
                  Wholesale Pure Perfume Oil Packages
                </h2>
                <p className="text-sm sm:text-base text-[#181818]/75 font-normal leading-relaxed max-w-xl">
                  Start or scale your fragrance oil business with our wholesale packages. Available in 3ml and 6ml dozen packs at discounted rates with fast dispatch across Nigeria.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                  <div className="p-5 bg-white rounded-2xl border border-black/10 space-y-2 shadow-none">
                    <ShieldCheck className="w-6 h-6 text-brand-purple" />
                    <h4 className="text-xs sm:text-sm font-bold text-[#111111] uppercase">100% Undiluted</h4>
                    <p className="text-xs text-[#181818]/60 leading-relaxed">Pure uncut oil with exceptional profit margins.</p>
                  </div>

                  <div className="p-5 bg-white rounded-2xl border border-black/10 space-y-2 shadow-none">
                    <Droplets className="w-6 h-6 text-brand-purple" />
                    <h4 className="text-xs sm:text-sm font-bold text-[#111111] uppercase">Dozen Packs</h4>
                    <p className="text-xs text-[#181818]/60 leading-relaxed">Mix & match your favorite designer scents.</p>
                  </div>

                  <div className="p-5 bg-white rounded-2xl border border-black/10 space-y-2 shadow-none">
                    <Truck className="w-6 h-6 text-brand-purple" />
                    <h4 className="text-xs sm:text-sm font-bold text-[#111111] uppercase">Nationwide</h4>
                    <p className="text-xs text-[#181818]/60 leading-relaxed">Fast dispatch to all 36 states in Nigeria.</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-center items-start lg:items-end">
              <ScrollReveal direction="right" className="w-full max-w-md">
                <div className="p-8 sm:p-10 bg-white rounded-3xl border border-black/10 space-y-6 w-full shadow-none">
                  <div className="space-y-2 text-left">
                    <h3 className="font-display text-2xl font-bold text-[#111111] uppercase">Order Wholesale Packages</h3>
                    <p className="text-xs sm:text-sm text-[#181818]/70 leading-relaxed">Chat directly with our representative on WhatsApp for custom dozen pack pricing and fast dispatch.</p>
                  </div>

                  <a
                    href="https://wa.me/2348145620271?text=Hello%20WondersScents!%20I%20want%20to%20place%20an%20order%20for%20Wholesale%20Pure%20Perfume%20Oils."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 px-6 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs uppercase tracking-wider rounded-full transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-none active:scale-95"
                  >
                    <WhatsAppLogo className="w-5 h-5" />
                    <span>Order Wholesale on WhatsApp</span>
                  </a>
                </div>
              </ScrollReveal>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
