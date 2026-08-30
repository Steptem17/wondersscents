import React, { useEffect } from 'react';
import { 
  Sparkles, 
  GraduationCap, 
  BookOpen, 
  Award, 
  CheckCircle2, 
  ArrowRight,
  MessageCircle
} from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface TrainingPageProps {
  onNavigateHome: () => void;
  onNavigateAllCollections?: () => void;
}

// Official WhatsApp Brand SVG Logo
const WhatsAppLogo = ({ className = "w-4 h-4 fill-current" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.144 4.18 4.225-1.109zm9.849-5.111c-.305-.153-1.805-.891-2.085-.993-.28-.102-.485-.153-.69.153-.204.306-.791.993-.969 1.196-.178.203-.356.229-.661.076-.305-.153-1.288-.474-2.453-1.513-.907-.808-1.519-1.807-1.697-2.113-.178-.306-.019-.471.133-.623.137-.137.305-.356.458-.534.153-.178.204-.306.305-.509.102-.204.051-.382-.025-.534-.076-.153-.69-1.66-.945-2.275-.248-.598-.501-.517-.69-.526-.178-.008-.382-.01-.585-.01s-.534.076-.814.382c-.28.306-1.069 1.045-1.069 2.551s1.095 2.96 1.247 3.164c.153.204 2.155 3.292 5.221 4.617.729.314 1.299.502 1.743.643.733.233 1.399.2 1.926.121.587-.088 1.805-.738 2.06-1.45.254-.713.254-1.324.178-1.45-.076-.28-.203-.585-.356z"/>
  </svg>
);

export const TrainingPage: React.FC<TrainingPageProps> = ({
  onNavigateHome,
  onNavigateAllCollections
}) => {
  // Reset window scroll position to 0 on mount
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  const handleJoinWaitlist = () => {
    const message = "Hello WondersScents! I would like to join the waitlist for the WondersScents Perfumery Training & Masterclass.";
    const whatsappUrl = `https://wa.me/2348145620271?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="w-full bg-white text-[#181818] font-sans min-h-screen selection:bg-brand-purple selection:text-white flex flex-col justify-between">
      
      {/* ========================================================================= */}
      {/* 1. COMING SOON HERO WITH BACKGROUND SCROLLING MARQUEE                     */}
      {/* ========================================================================= */}
      <section className="relative w-full bg-white py-20 sm:py-28 md:py-36 px-4 sm:px-8 md:px-12 lg:px-16 border-b border-black/10 overflow-hidden flex items-center justify-center">
        
        {/* Background Scrolling Marquee (Exact Match with Home & About Pages) */}
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
              <span>Coming Soon</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={80}>
            <div className="space-y-3">
              <span className="text-xs font-semibold tracking-[0.25em] text-brand-purple uppercase block">
                WONDERSSCENTS PERFUMERY ACADEMY
              </span>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-[#111111] uppercase tracking-tight leading-[1.08]">
                Master The Art of <br className="hidden sm:block" />
                <span>Fragrance Creation</span>
              </h1>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={140}>
            <p className="text-base sm:text-lg md:text-xl text-[#181818]/80 font-normal leading-relaxed max-w-2xl mx-auto">
              We are putting together practical, hands-on perfumery sessions where you will learn oil blending, formulation, and the business strategies behind building a profitable fragrance brand.
            </p>
          </ScrollReveal>

          {/* Equal Width, Balanced Sized Action Buttons */}
          <ScrollReveal direction="up" delay={200}>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
              <button
                onClick={handleJoinWaitlist}
                className="w-64 sm:w-72 h-14 py-4 px-8 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-full transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer shadow-none active:scale-95"
              >
                <WhatsAppLogo className="w-5 h-5" />
                <span>Join Waitlist</span>
              </button>

              <button
                onClick={onNavigateAllCollections || onNavigateHome}
                className="w-64 sm:w-72 h-14 py-4 px-8 bg-neutral-100 hover:bg-neutral-200 text-[#111111] font-bold text-xs sm:text-sm uppercase tracking-wider rounded-full transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer shadow-none active:scale-95 border border-black/10"
              >
                <span>Explore Store</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. CURRICULUM PREVIEW PILLARS (CLEAN & GENEROUSLY SPACED)                  */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 md:px-12 lg:px-16 bg-neutral-50/50 border-b border-black/10">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs sm:text-sm font-bold tracking-[0.25em] text-brand-purple uppercase block">
              WHAT YOU WILL LEARN
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium text-[#111111] uppercase tracking-tight">
              Curriculum Highlights
            </h2>
            <p className="text-base sm:text-lg text-[#181818]/80 leading-relaxed font-normal">
              Structured training designed for aspiring perfumers, resellers, and fragrance entrepreneurs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            
            {/* Pillar 1 */}
            <ScrollReveal direction="up" delay={60}>
              <div className="p-8 sm:p-10 bg-white rounded-3xl border border-black/10 space-y-5 h-full flex flex-col justify-between text-left">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center text-brand-purple border border-black/5">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-[#111111] uppercase tracking-wide">
                    Scent Formulation & Blending
                  </h3>
                  <p className="text-xs sm:text-sm text-[#181818]/75 leading-relaxed font-normal">
                    Understand fragrance notes, oil concentration ratios, and professional dilution methods for long-lasting performance.
                  </p>
                </div>

                <div className="pt-4 border-t border-black/5 space-y-2 text-xs text-[#181818]/70">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-purple shrink-0" />
                    <span>Raw concentrate handling</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-purple shrink-0" />
                    <span>Custom accord blending</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Pillar 2 */}
            <ScrollReveal direction="up" delay={120}>
              <div className="p-8 sm:p-10 bg-white rounded-3xl border border-black/10 space-y-5 h-full flex flex-col justify-between text-left">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center text-brand-purple border border-black/5">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-[#111111] uppercase tracking-wide">
                    The Business of Perfumery
                  </h3>
                  <p className="text-xs sm:text-sm text-[#181818]/75 leading-relaxed font-normal">
                    How to source quality oils, bottle luxury designs, price for healthy margins, and grow your fragrance brand in Nigeria.
                  </p>
                </div>

                <div className="pt-4 border-t border-black/5 space-y-2 text-xs text-[#181818]/70">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-purple shrink-0" />
                    <span>Sourcing & packaging guide</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-purple shrink-0" />
                    <span>Wholesale & retail pricing</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Pillar 3 */}
            <ScrollReveal direction="up" delay={180}>
              <div className="p-8 sm:p-10 bg-white rounded-3xl border border-black/10 space-y-5 h-full flex flex-col justify-between text-left">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center text-brand-purple border border-black/5">
                    <Award className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-[#111111] uppercase tracking-wide">
                    Mentorship & Community
                  </h3>
                  <p className="text-xs sm:text-sm text-[#181818]/75 leading-relaxed font-normal">
                    Direct guidance on your formulations, feedback on your scent blends, and entry into our private alumni network.
                  </p>
                </div>

                <div className="pt-4 border-t border-black/5 space-y-2 text-xs text-[#181818]/70">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-purple shrink-0" />
                    <span>Direct founder guidance</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-purple shrink-0" />
                    <span>Alumni support group</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. NOTIFICATION & EARLY ACCESS FOOTER CARD                                */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 md:px-12 lg:px-16 bg-white">
        <ScrollReveal direction="up">
          <div className="max-w-4xl mx-auto p-8 sm:p-12 bg-neutral-50 rounded-3xl border border-black/10 flex flex-col md:flex-row items-center justify-between gap-8 text-left">
            <div className="space-y-3 max-w-lg">
              <div className="inline-flex items-center space-x-2 text-xs font-bold tracking-[0.2em] text-brand-purple uppercase">
                <Sparkles className="w-4 h-4" />
                <span>Priority Enrollment</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-normal text-[#111111] uppercase leading-tight">
                Get Notified First
              </h3>
              <p className="text-xs sm:text-sm text-[#181818]/70 leading-relaxed font-normal">
                Cohort sizes will be kept small for personalized practical sessions. Message us on WhatsApp to register your early interest.
              </p>
            </div>

            <div className="shrink-0 w-full md:w-auto">
              <button
                onClick={handleJoinWaitlist}
                className="w-full md:w-60 h-13 py-3.5 px-6 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs uppercase tracking-wider rounded-full transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Chat on WhatsApp</span>
              </button>
            </div>
          </div>
        </ScrollReveal>
      </section>

    </div>
  );
};
