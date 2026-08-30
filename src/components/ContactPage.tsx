import React from 'react';
import { 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  Package, 
  Layers, 
  HelpCircle, 
  ChevronRight 
} from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface ContactPageProps {
  onNavigateHome?: () => void;
  onNavigateAllCollections?: () => void;
}

// Official WhatsApp Brand SVG Logo
const WhatsAppLogo = ({ className = "w-5 h-5 fill-current" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.144 4.18 4.225-1.109zm9.849-5.111c-.305-.153-1.805-.891-2.085-.993-.28-.102-.485-.153-.69.153-.204.306-.791.993-.969 1.196-.178.203-.356.229-.661.076-.305-.153-1.288-.474-2.453-1.513-.907-.808-1.519-1.807-1.697-2.113-.178-.306-.019-.471.133-.623.137-.137.305-.356.458-.534.153-.178.204-.306.305-.509.102-.204.051-.382-.025-.534-.076-.153-.69-1.66-.945-2.275-.248-.598-.501-.517-.69-.526-.178-.008-.382-.01-.585-.01s-.534.076-.814.382c-.28.306-1.069 1.045-1.069 2.551s1.095 2.96 1.247 3.164c.153.204 2.155 3.292 5.221 4.617.729.314 1.299.502 1.743.643.733.233 1.399.2 1.926.121.587-.088 1.805-.738 2.06-1.45.254-.713.254-1.324.178-1.45-.076-.28-.203-.585-.356z"/>
  </svg>
);

export const ContactPage: React.FC<ContactPageProps> = () => {
  const openWhatsApp = (customMessage?: string) => {
    const defaultMsg = "Hello WondersScents! I have an inquiry regarding your fragrances.";
    const message = customMessage || defaultMsg;
    const whatsappUrl = `https://wa.me/2348145620271?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="w-full bg-white text-[#181818] font-sans min-h-screen selection:bg-brand-purple selection:text-white flex flex-col justify-between">
      
      {/* ========================================================================= */}
      {/* 1. HERO HEADER WITH BACKGROUND SCROLLING MARQUEE                          */}
      {/* ========================================================================= */}
      <section className="relative w-full bg-white py-16 sm:py-24 md:py-32 px-4 sm:px-8 md:px-12 lg:px-16 border-b border-black/10 overflow-hidden flex items-center justify-center">
        
        {/* Background Scrolling Marquee */}
        <div className="absolute inset-0 flex items-center overflow-hidden pointer-events-none z-0 opacity-[0.03]">
          <div className="animate-marquee flex whitespace-nowrap text-[20vw] font-black uppercase text-brand-charcoal leading-none">
            <span className="mr-24">WONDERS SCENTS</span>
            <span className="mr-24">WONDERS SCENTS</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 relative z-10">
          
          <ScrollReveal direction="up">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-neutral-100 border border-black/10 text-[#111111] text-xs font-semibold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-brand-purple" />
              <span>Customer Concierge</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={80}>
            <div className="space-y-3">
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium text-[#111111] uppercase tracking-tight leading-[1.1]">
                We’re Here To <br className="hidden sm:block" />
                <span>Assist You</span>
              </h1>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={140}>
            <p className="text-sm sm:text-base md:text-lg text-[#181818]/75 font-normal leading-relaxed max-w-2xl mx-auto">
              Have questions about our designer fragrances, pure perfume oils, or an existing order? Chat directly with our customer concierge on WhatsApp for prompt assistance.
            </p>
          </ScrollReveal>

          {/* Primary Instant WhatsApp Button */}
          <ScrollReveal direction="up" delay={200}>
            <div className="pt-2 flex justify-center">
              <button
                onClick={() => openWhatsApp("Hello WondersScents! I would like to speak with customer support.")}
                className="w-64 h-13 py-3.5 px-6 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs uppercase tracking-wider rounded-full transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer shadow-none active:scale-95"
              >
                <WhatsAppLogo className="w-5 h-5" />
                <span>Chat on WhatsApp</span>
              </button>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. QUICK TOPIC SHORTCUTS (1-CLICK DIRECT HELP)                            */}
      {/* ========================================================================= */}
      <section className="py-14 sm:py-20 px-4 sm:px-8 md:px-12 lg:px-16 bg-neutral-50/60 border-b border-black/10">
        <div className="max-w-7xl mx-auto space-y-10">
          
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs font-bold tracking-[0.25em] text-brand-purple uppercase block">
              QUICK INQUIRIES
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-normal text-[#111111] uppercase">
              How Can We Help You Today?
            </h2>
            <p className="text-xs sm:text-sm text-[#181818]/70 leading-relaxed font-normal">
              Select your topic below to start a pre-filled direct conversation with our concierge.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Option 1: Track Order */}
            <ScrollReveal direction="up" delay={60}>
              <div 
                onClick={() => openWhatsApp("Hello WondersScents! I would like to track the delivery status of my order.")}
                className="p-6 sm:p-8 bg-white rounded-2xl border border-black/10 hover:border-brand-purple transition-all duration-300 group cursor-pointer text-left h-full flex flex-col justify-between space-y-6"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-brand-purple group-hover:bg-brand-purple group-hover:text-white transition-colors">
                    <Package className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-sm sm:text-base font-medium text-[#111111] uppercase tracking-wide">
                    Track My Order
                  </h3>
                  <p className="text-xs text-[#181818]/70 leading-relaxed">
                    Check the dispatch and delivery status of your package across Nigeria.
                  </p>
                </div>
                <div className="text-xs font-medium text-brand-purple flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                  <span>Inquire now</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </ScrollReveal>

            {/* Option 2: Wholesale Packages */}
            <ScrollReveal direction="up" delay={120}>
              <div 
                onClick={() => openWhatsApp("Hello WondersScents! I want to inquire about your Wholesale Pure Perfume Oil packages.")}
                className="p-6 sm:p-8 bg-white rounded-2xl border border-black/10 hover:border-brand-purple transition-all duration-300 group cursor-pointer text-left h-full flex flex-col justify-between space-y-6"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-brand-purple group-hover:bg-brand-purple group-hover:text-white transition-colors">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-sm sm:text-base font-medium text-[#111111] uppercase tracking-wide">
                    Wholesale Packages
                  </h3>
                  <p className="text-xs text-[#181818]/70 leading-relaxed">
                    Pricing, dozen packs, and bulk ordering for resellers and fragrance businesses.
                  </p>
                </div>
                <div className="text-xs font-medium text-brand-purple flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                  <span>Get pricing</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </ScrollReveal>

            {/* Option 3: Custom Scent Request (All Fragrances, Oils, Mists & Perfumes) */}
            <ScrollReveal direction="up" delay={180}>
              <div 
                onClick={() => openWhatsApp("Hello WondersScents! I am looking for a specific unlisted perfume, fragrance oil, body mist, or scent.")}
                className="p-6 sm:p-8 bg-white rounded-2xl border border-black/10 hover:border-brand-purple transition-all duration-300 group cursor-pointer text-left h-full flex flex-col justify-between space-y-6"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-brand-purple group-hover:bg-brand-purple group-hover:text-white transition-colors">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-sm sm:text-base font-medium text-[#111111] uppercase tracking-wide">
                    Custom Scent Request
                  </h3>
                  <p className="text-xs text-[#181818]/70 leading-relaxed">
                    Request any unlisted designer perfume, fragrance oil, body mist, or scent from our 500+ warehouse catalog.
                  </p>
                </div>
                <div className="text-xs font-medium text-brand-purple flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                  <span>Request scent</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </ScrollReveal>

            {/* Option 4: General Support */}
            <ScrollReveal direction="up" delay={240}>
              <div 
                onClick={() => openWhatsApp("Hello WondersScents! I have a general question about your brand and services.")}
                className="p-6 sm:p-8 bg-white rounded-2xl border border-black/10 hover:border-brand-purple transition-all duration-300 group cursor-pointer text-left h-full flex flex-col justify-between space-y-6"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-brand-purple group-hover:bg-brand-purple group-hover:text-white transition-colors">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-sm sm:text-base font-medium text-[#111111] uppercase tracking-wide">
                    General Inquiries
                  </h3>
                  <p className="text-xs text-[#181818]/70 leading-relaxed">
                    Assistance with bottle sizes, product recommendations, and inquiries.
                  </p>
                </div>
                <div className="text-xs font-medium text-brand-purple flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                  <span>Chat with us</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </ScrollReveal>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. ACTIVE SUPPORT, STUDIO LOCATION & CAC VERIFICATION                     */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 md:px-12 lg:px-16 bg-white border-b border-black/10">
        <div className="max-w-6xl mx-auto space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch text-left">
            
            {/* Card 1: Studio Location & Direct Calls */}
            <ScrollReveal direction="up" delay={40}>
              <div className="p-7 sm:p-8 bg-neutral-50 rounded-3xl border border-black/10 space-y-4 h-full flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-black/10 flex items-center justify-center text-brand-purple">
                    <Package className="w-5 h-5" />
                  </div>
                  <h4 className="font-display text-base sm:text-lg font-medium text-[#111111] uppercase tracking-wide">
                    Studio & Dispatch
                  </h4>
                  <div className="space-y-2 text-xs text-[#181818]/80 leading-relaxed">
                    <p className="font-medium text-[#111111]">
                      11 Peace Hostel, Alabata Road, Abeokuta, Ogun State, Nigeria.
                    </p>
                    <p className="text-[11px] text-brand-purple font-semibold">
                      (Fast Daily Dispatch Nationwide Across Nigeria)
                    </p>
                    <div className="pt-2 border-t border-black/5 space-y-1 text-xs">
                      <p>
                        <span className="font-semibold text-[#111111]">Primary Line:</span>{' '}
                        <a href="https://wa.me/2348145620271" className="text-brand-purple underline decoration-black/20">+234 814 562 0271</a>
                      </p>
                      <p>
                        <span className="font-semibold text-[#111111]">Alternate Line:</span>{' '}
                        <a href="tel:09052329788" className="text-brand-purple underline decoration-black/20">+234 905 232 9788</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Card 2: Operating Hours */}
            <ScrollReveal direction="up" delay={80}>
              <div className="p-7 sm:p-8 bg-neutral-50 rounded-3xl border border-black/10 space-y-4 h-full flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-black/10 flex items-center justify-center text-brand-purple">
                    <Clock className="w-5 h-5" />
                  </div>
                  <h4 className="font-display text-base sm:text-lg font-medium text-[#111111] uppercase tracking-wide">
                    Support Hours
                  </h4>
                  <div className="space-y-2.5 pt-1 text-xs text-[#181818]/75 leading-relaxed">
                    <p className="flex items-center justify-between">
                      <span className="font-medium text-[#111111]">Monday – Friday:</span>
                      <span>8:00 AM – 8:00 PM</span>
                    </p>
                    <p className="flex items-center justify-between">
                      <span className="font-medium text-[#111111]">Saturday:</span>
                      <span>8:00 AM – 6:00 PM</span>
                    </p>
                    <p className="flex items-center justify-between">
                      <span className="font-medium text-[#111111]">Sunday:</span>
                      <span className="text-brand-purple font-medium">Closed</span>
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Card 3: CAC Business Legitimacy */}
            <ScrollReveal direction="up" delay={120}>
              <div className="p-7 sm:p-8 bg-neutral-50 rounded-3xl border border-black/10 space-y-4 h-full flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-black/10 flex items-center justify-center text-brand-purple">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h4 className="font-display text-base sm:text-lg font-medium text-[#111111] uppercase tracking-wide">
                    CAC Registered
                  </h4>
                  <p className="text-xs text-[#181818]/75 leading-relaxed font-normal">
                    WondersScents is legally registered with the <strong>Corporate Affairs Commission (CAC)</strong> of Nigeria (Incorporated on January 10, 2023).
                  </p>
                </div>
                <div className="pt-2 border-t border-black/5 flex items-center space-x-2 text-emerald-600 text-xs font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>100% Genuine & Verified Brand</span>
                </div>
              </div>
            </ScrollReveal>

          </div>

        </div>
      </section>

    </div>
  );
};
