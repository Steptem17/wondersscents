import React from 'react';
import { ShieldCheck, Sparkles, Heart, Target, Compass, ArrowRight, Zap, Feather } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

// Official WhatsApp Brand SVG Logo
const WhatsAppLogo = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.144 4.18 4.225-1.109zm9.849-5.111c-.305-.153-1.805-.891-2.085-.993-.28-.102-.485-.153-.69.153-.204.306-.791.993-.969 1.196-.178.203-.356.229-.661.076-.305-.153-1.288-.474-2.453-1.513-.907-.808-1.519-1.807-1.697-2.113-.178-.306-.019-.471.133-.623.137-.137.305-.356.458-.534.153-.178.204-.306.305-.509.102-.204.051-.382-.025-.534-.076-.153-.69-1.66-.945-2.275-.248-.598-.501-.517-.69-.526-.178-.008-.382-.01-.585-.01s-.534.076-.814.382c-.28.306-1.069 1.045-1.069 2.551s1.095 2.96 1.247 3.164c.153.204 2.155 3.292 5.221 4.617.729.314 1.299.502 1.743.643.733.233 1.399.2 1.926.121.587-.088 1.805-.738 2.06-1.45.254-.713.254-1.324.178-1.45-.076-.127-.28-.203-.585-.356z"/>
  </svg>
);

interface AboutPageProps {
  onNavigateHome: () => void;
  onNavigateAllCollections?: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigateHome, onNavigateAllCollections }) => {
  return (
    <div className="w-full bg-white text-[#3D3D3D] font-sans min-h-screen flex flex-col justify-between selection:bg-brand-purple-light selection:text-brand-purple">
      
      {/* 1. ASYMMETRIC EDITORIAL HERO SECTION */}
      <section className="relative py-20 sm:py-24 md:py-36 px-6 md:px-12 bg-white border-b border-brand-charcoal/10 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center space-y-6 sm:space-y-8 relative z-10">
          <ScrollReveal direction="up">
            <span className="text-xs font-bold text-brand-purple tracking-widest uppercase block">
              ABOUT WONDERS SCENTS
            </span>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100}>
            <h1 className="font-display text-3xl sm:text-5xl lg:text-7xl font-medium text-[#3D3D3D] uppercase leading-[1.15] sm:leading-[1.1] tracking-tight w-full mx-auto">
              “Smell Nice, Feel Good, Look Good.”
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <p className="text-sm sm:text-base md:text-lg text-[#3D3D3D]/80 font-normal leading-relaxed w-full max-w-4xl mx-auto pt-2">
              Birthed in June 2019 and officially incorporated under Nigeria's Corporate Affairs Commission (CAC) on January 10, 2023, WondersScents is an authentic luxury fragrance brand dedicated to eradicating body odor and fostering youth empowerment.
            </p>
          </ScrollReveal>
        </div>

        <div className="absolute inset-0 flex items-center overflow-hidden pointer-events-none z-0 opacity-[0.03]">
          <div className="animate-marquee flex whitespace-nowrap text-[22vw] font-black uppercase text-brand-charcoal leading-none">
            <span className="mr-24">WONDERS SCENTS</span>
            <span className="mr-24">WONDERS SCENTS</span>
          </div>
        </div>
      </section>

      {/* 2. FOUNDER & ORIGIN SPOTLIGHT */}
      <section className="py-20 sm:py-24 md:py-36 px-6 md:px-12 bg-neutral-50/60 border-b border-brand-charcoal/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 lg:gap-20 items-center text-left">
          
          <div className="lg:col-span-5 flex justify-center">
            <ScrollReveal direction="left">
              <div className="relative max-w-md w-full rounded-xs overflow-hidden border border-brand-charcoal/10 bg-white group">
                <img 
                  src="/images/general/founder.jpg" 
                  alt="Bolu Adesokan - WondersScents Founder" 
                  loading="eager"
                  decoding="async"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-102"
                />
                
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 border border-brand-charcoal/10 text-left">
                  <span className="text-[10px] font-bold text-brand-purple tracking-widest uppercase block">
                    FOUNDED IN JUNE 2019
                  </span>
                  <h4 className="text-base font-bold text-[#3D3D3D] mt-0.5">
                    Bolu Adesokan <span className="text-xs font-normal text-[#3D3D3D]/70">• Founder</span>
                  </h4>
                  <p className="text-[11px] font-medium text-[#3D3D3D]/60 mt-0.5">
                    CAC Incorporated • Jan 10, 2023
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <ScrollReveal direction="right">
              <span className="text-xs font-bold text-brand-purple uppercase tracking-widest block">
                OUR INSPIRATION & JOURNEY
              </span>
              <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-medium text-[#3D3D3D] uppercase leading-tight tracking-tight pt-2">
                From Inspiration To A Purpose-Driven Movement.
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={100}>
              <p className="text-sm sm:text-base md:text-lg text-[#3D3D3D]/80 font-normal leading-relaxed text-left w-full">
                WondersScents was birthed in June 2019, inspired by a vision to eradicate body odor, restore personal hygiene, and elevate confidence. Under the leadership of <strong>Bolu Adesokan</strong>, the brand officially launched on <strong>January 10, 2023</strong>, after registration under the Corporate Affairs Commission (CAC).
              </p>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={200}>
              <p className="text-sm sm:text-base md:text-lg text-[#3D3D3D]/80 font-normal leading-relaxed text-left w-full">
                We cater to everyone who loves to smell divine, including individuals who sweat excessively or battle stubborn body odor. Our products are formulated with high-quality, 100% undiluted fragrance oils for maximum projection and long-lasting performance.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={300}>
              <div className="pt-4 grid grid-cols-2 gap-3 sm:gap-6">
                <div className="p-4 sm:p-6 bg-white border border-brand-charcoal/10 rounded-xs text-left">
                  <span className="text-2xl sm:text-3xl font-bold text-brand-purple block">100%</span>
                  <span className="text-[10px] sm:text-xs font-bold text-[#3D3D3D] uppercase tracking-wider block mt-1">Undiluted Pure Oils</span>
                </div>
                <div className="p-4 sm:p-6 bg-white border border-brand-charcoal/10 rounded-xs text-left">
                  <span className="text-2xl sm:text-3xl font-bold text-brand-purple block">1,000</span>
                  <span className="text-[10px] sm:text-xs font-bold text-[#3D3D3D] uppercase tracking-wider block mt-1">Youths Empowered Mission</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* 3. UNIQUE SELLING PROPOSITION (USP) FEATURED BLOCK */}
      <section className="py-16 sm:py-24 md:py-32 px-6 md:px-12 bg-white border-b border-brand-charcoal/10">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="up">
            <div className="bg-[#3D3D3D] text-white p-6 sm:p-12 md:p-16 lg:p-20 rounded-xs relative overflow-hidden text-left space-y-5 sm:space-y-6">
              
              <div className="space-y-3 sm:space-y-4 relative z-10 w-full">
                <span className="text-[10px] sm:text-xs font-bold text-brand-purple-light uppercase tracking-widest block">
                  UNIQUE SELLING PROPOSITION (USP)
                </span>
                <h3 className="font-display text-xl sm:text-3xl md:text-4xl lg:text-5xl font-medium leading-snug sm:leading-tight w-full">
                  Combining Quality, Spirituality, and Empowerment.
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-white/80 font-normal leading-relaxed text-left w-full">
                  WondersScents stands out by combining unmatched quality, divine inspiration, and youth empowerment—delivering exceptional fragrance products while nurturing the next generation of fragrance entrepreneurs.
                </p>
              </div>

              <div className="pt-4 sm:pt-6 relative z-10 flex flex-wrap items-center gap-4 sm:gap-6">
                <div className="flex items-center space-x-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-brand-purple-light">
                  <Sparkles className="w-4 h-4 shrink-0" />
                  <span>Quality</span>
                </div>
                <div className="flex items-center space-x-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-brand-purple-light">
                  <Feather className="w-4 h-4 shrink-0" />
                  <span>Spirituality</span>
                </div>
                <div className="flex items-center space-x-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-brand-purple-light">
                  <Heart className="w-4 h-4 shrink-0" />
                  <span>Empowerment</span>
                </div>
              </div>

            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 4. VISION & MISSION DUAL CARDS */}
      <section className="py-16 sm:py-20 md:py-28 px-6 md:px-12 bg-neutral-50/60 border-b border-brand-charcoal/10">
        <div className="max-w-7xl mx-auto space-y-8 sm:space-y-10 text-left">
          
          <div className="text-center w-full mx-auto space-y-2">
            <span className="text-[10px] sm:text-xs font-bold text-brand-purple uppercase tracking-widest block">
              OUR CORE PURPOSE
            </span>
            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-medium text-[#3D3D3D] uppercase tracking-tight">
              Vision & Mission
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
            {/* Vision Card */}
            <ScrollReveal direction="left">
              <div className="bg-white p-6 sm:p-8 md:p-10 border border-brand-charcoal/10 rounded-xs text-left h-full flex flex-col justify-start space-y-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-brand-purple-light/50 border border-brand-purple/20 flex items-center justify-center rounded-xs text-brand-purple shrink-0">
                  <Target className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                
                <h3 className="font-display text-xl sm:text-2xl font-bold uppercase text-[#3D3D3D]">
                  Our Vision
                </h3>
                
                <p className="text-sm sm:text-base md:text-lg text-[#3D3D3D]/80 leading-relaxed font-normal text-left w-full">
                  To be a leading force in eradicating body odor while empowering individuals to embrace confidence and excellence through exquisite fragrances. WondersScents aims to cater to people who love to smell good, including those who sweat excessively, by offering high-quality, undiluted, and long-lasting perfume oils and products.
                </p>
              </div>
            </ScrollReveal>

            {/* Mission Card */}
            <ScrollReveal direction="right">
              <div className="bg-white p-6 sm:p-8 md:p-10 border border-brand-charcoal/10 rounded-xs text-left h-full flex flex-col justify-start space-y-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-brand-purple-light/50 border border-brand-purple/20 flex items-center justify-center rounded-xs text-brand-purple shrink-0">
                  <Compass className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-bold uppercase text-[#3D3D3D]">
                  Our Mission
                </h3>
                
                <div className="space-y-3.5 text-sm sm:text-base md:text-lg text-[#3D3D3D]/80 leading-relaxed font-normal text-left w-full">
                  <p>
                    <span className="font-medium text-[#3D3D3D]">1. Enhancing Confidence:</span> To ensure people feel good, look good, and smell their best with premium perfumes and fragrance solutions.
                  </p>
                  <p>
                    <span className="font-medium text-[#3D3D3D]">2. Empowering Entrepreneurs:</span> To empower and train 1,000 youths (ages 18-40) with the skills and knowledge to build successful businesses in the fragrance industry.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* 5. BRAND PERSONALITY & CORE VALUES GRID */}
      <section className="py-20 sm:py-24 md:py-36 px-6 md:px-12 bg-white border-b border-brand-charcoal/10">
        <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16 text-left">
          
          <ScrollReveal direction="up">
            <div className="text-center w-full mx-auto space-y-2 sm:space-y-3">
              <span className="text-xs font-bold text-brand-purple uppercase tracking-widest block">
                THE WONDERS SCENTS IDENTITY
              </span>
              <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-medium text-[#3D3D3D] uppercase tracking-tight">
                Brand Personality & Values
              </h2>
            </div>
          </ScrollReveal>

          {/* 4 Brand Personality Cards */}
          <ScrollReveal direction="up" delay={120}>
            <div className="space-y-6">
              <h4 className="text-xs font-bold tracking-widest uppercase text-[#3D3D3D]/60 border-b border-brand-charcoal/10 pb-2">
                Brand Personality
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: 'Authentic', icon: ShieldCheck, desc: 'True to the promise of quality and care.' },
                  { title: 'Empathetic', icon: Heart, desc: "Understanding customers’ and trainees' unique needs." },
                  { title: 'Innovative', icon: Zap, desc: 'Always exploring new ways to enhance the fragrance experience.' },
                  { title: 'Inspirational', icon: Feather, desc: 'Uplifting people through both scents and opportunities.' }
                ].map((item, idx) => (
                  <div key={idx} className="p-6 sm:p-8 bg-neutral-50/60 border border-brand-charcoal/10 rounded-xs text-left space-y-3">
                    <item.icon className="w-6 h-6 text-brand-purple" />
                    <h4 className="font-display text-lg sm:text-xl font-semibold text-[#3D3D3D]">{item.title}</h4>
                    <p className="text-sm sm:text-base md:text-lg text-[#3D3D3D]/70 leading-relaxed text-left">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Core Values Cards */}
          <ScrollReveal direction="up" delay={200}>
            <div className="space-y-6 pt-4 sm:pt-6">
              <h4 className="text-xs font-bold tracking-widest uppercase text-[#3D3D3D]/60 border-b border-brand-charcoal/10 pb-2">
                Core Values
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6">
                {[
                  { title: 'Excellence', desc: 'Commitment to delivering top-notch, undiluted, and long-lasting fragrance solutions.' },
                  { title: 'Empowerment', desc: 'Providing opportunities for youth to gain entrepreneurial skills and financial independence.' },
                  { title: 'Integrity', desc: 'Building trust through transparency, ethical practices, and quality assurance.' },
                  { title: 'Innovation', desc: 'Continuously exploring unique scents and sustainable methods to stay ahead in the fragrance industry.' },
                  { title: 'Customer-Centric Approach', desc: "Placing customers' needs and satisfaction at the forefront of every decision." }
                ].map((val, idx) => (
                  <div key={idx} className="p-6 sm:p-8 bg-neutral-50/60 border border-brand-charcoal/10 rounded-xs text-left space-y-3">
                    <span className="text-xs font-extrabold text-brand-purple block">0{idx + 1}.</span>
                    <h4 className="font-display text-lg sm:text-xl font-semibold text-[#3D3D3D]">{val.title}</h4>
                    <p className="text-sm sm:text-base md:text-lg text-[#3D3D3D]/70 leading-normal text-left">{val.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* 6. ACADEMY & TRAINING CALL TO ACTION */}
      <section className="py-20 sm:py-24 px-6 md:px-12 bg-neutral-50 border-b border-brand-charcoal/10">
        <div className="max-w-5xl mx-auto text-center space-y-6 sm:space-y-8">
          <ScrollReveal direction="up">
            <div className="space-y-3">
              <span className="text-xs font-bold text-brand-purple uppercase tracking-widest block">
                JOIN THE WONDERS SCENTS MOVEMENT
              </span>
              <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-medium text-[#3D3D3D] uppercase tracking-tight">
                Ready To Smell Nice, Feel Good, Look Good, Or Build Your Own Business?
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-[#3D3D3D]/80 leading-relaxed font-normal w-full max-w-3xl mx-auto pt-2">
                Explore our undiluted fragrance collections or register for our perfume entrepreneur training academy today.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={150}>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onNavigateAllCollections || onNavigateHome}
                className="w-full sm:w-auto px-8 py-4 bg-[#3D3D3D] hover:bg-brand-purple text-white text-xs font-bold uppercase tracking-wider transition-colors rounded-xs flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Explore Fragrances</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="https://wa.me/2348145620271?text=Hello%20WondersScents!%20I%20want%20to%20register%20for%20the%20Perfume%20Academy%20Training."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold uppercase tracking-wider transition-colors rounded-xs flex items-center justify-center space-x-2"
              >
                <WhatsAppLogo />
                <span>Perfume Business Training</span>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
};
