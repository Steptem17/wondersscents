import React, { useState } from 'react';
import { X, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';

import type { PageType } from '../App';

interface FooterProps {
  onNavigate: (page: PageType, categoryFilter?: string) => void;
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

// Official WhatsApp SVG Icon
const WhatsAppSVG = ({ className = "w-4 h-4 fill-current" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.144 4.18 4.225-1.109zm9.849-5.111c-.305-.153-1.805-.891-2.085-.993-.28-.102-.485-.153-.69.153-.204.306-.791.993-.969 1.196-.178.203-.356.229-.661.076-.305-.153-1.288-.474-2.453-1.513-.907-.808-1.519-1.807-1.697-2.113-.178-.306-.019-.471.133-.623.137-.137.305-.356.458-.534.153-.178.204-.306.305-.509.102-.204.051-.382-.025-.534-.076-.153-.69-1.66-.945-2.275-.248-.598-.501-.517-.69-.526-.178-.008-.382-.01-.585-.01s-.534.076-.814.382c-.28.306-1.069 1.045-1.069 2.551s1.095 2.96 1.247 3.164c.153.204 2.155 3.292 5.221 4.617.729.314 1.299.502 1.743.643.733.233 1.399.2 1.926.121.587-.088 1.805-.738 2.06-1.45.254-.713.254-1.324.178-1.45-.076-.28-.203-.585-.356z"/>
  </svg>
);

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [activeModal, setActiveModal] = useState<'terms' | 'refund' | null>(null);

  return (
    <footer className="bg-white text-[#3D3D3D] pt-16 pb-8 px-6 md:px-10 lg:px-12 border-t border-brand-charcoal/10 font-sans">
      <div className="max-w-7xl mx-auto text-left">
        
        {/* Responsive Grid: 1 col on mobile, 12 cols with smart spans on tablet & desktop */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Left Column: Logo & Socials */}
          <div className="md:col-span-5 lg:col-span-4 space-y-5">
            <div>
              <img 
                src="/images/general/logo.png" 
                alt="WondersScents Logo" 
                className="h-20 sm:h-24 w-auto object-contain cursor-pointer" 
                onClick={() => onNavigate('home')}
              />
            </div>

            <p className="text-sm text-[#3D3D3D]/80 leading-relaxed font-normal max-w-sm">
              Birthed in June 2019 under divine inspiration by Mary Adesokan and officially registered under CAC on January 10, 2023. Dedicated to luxury, 100% undiluted perfume oils.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center space-x-3 pt-2">
              <a 
                href="https://www.instagram.com/wondersscents001?igsh=MTJhcGhpNGtuNXFlbw==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-neutral-50 border border-brand-charcoal/15 text-[#3D3D3D] hover:bg-brand-purple hover:text-white hover:border-brand-purple transition-all duration-300 rounded-full cursor-pointer shadow-xs"
                title="Instagram"
              >
                <InstagramSVG />
              </a>

              <a 
                href="https://www.tiktok.com/@wondersscents001?_r=1&_t=ZS-98sbTaw5E4g" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-neutral-50 border border-brand-charcoal/15 text-[#3D3D3D] hover:bg-brand-purple hover:text-white hover:border-brand-purple transition-all duration-300 rounded-full cursor-pointer shadow-xs"
                title="TikTok"
              >
                <TikTokSVG />
              </a>
            </div>
          </div>

          {/* Center-Left Column: Shop */}
          <div className="md:col-span-4 lg:col-span-2">
            <h5 className="text-sm font-bold tracking-wider uppercase text-[#3D3D3D] mb-4">Shop</h5>
            <ul className="space-y-3 text-sm text-[#3D3D3D]/80 font-medium">
              <li>
                <button onClick={() => onNavigate('all-collections')} className="hover:text-brand-purple transition-colors whitespace-nowrap text-left cursor-pointer">
                  All Collections
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('women-collection')} className="hover:text-brand-purple transition-colors whitespace-nowrap text-left cursor-pointer">
                  Women's Collection
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('men-collection')} className="hover:text-brand-purple transition-colors whitespace-nowrap text-left cursor-pointer">
                  Men's Collection
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('unisex-collection')} className="hover:text-brand-purple transition-colors whitespace-nowrap text-left cursor-pointer">
                  Unisex Collection
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('pure-oils')} className="hover:text-brand-purple transition-colors whitespace-nowrap text-left cursor-pointer">
                  Undiluted Perfume Oils
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('home', 'wholesale')} className="hover:text-brand-purple transition-colors whitespace-nowrap text-left cursor-pointer">
                  Wholesale
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('training')} className="hover:text-brand-purple transition-colors whitespace-nowrap text-left cursor-pointer">
                  Training
                </button>
              </li>
            </ul>
          </div>

          {/* Center-Right Column: Brand */}
          <div className="md:col-span-3 lg:col-span-2">
            <h5 className="text-sm font-bold tracking-wider uppercase text-[#3D3D3D] mb-4">Brand</h5>
            <ul className="space-y-3 text-sm text-[#3D3D3D]/80 font-medium">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-brand-purple transition-colors whitespace-nowrap text-left cursor-pointer">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => setActiveModal('terms')} className="hover:text-brand-purple transition-colors whitespace-nowrap text-left cursor-pointer">
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => setActiveModal('refund')} className="hover:text-brand-purple transition-colors whitespace-nowrap text-left cursor-pointer">
                  Refund Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-brand-purple transition-colors whitespace-nowrap text-left cursor-pointer">
                  Contact Support
                </button>
              </li>
            </ul>
          </div>

          {/* Right Column: Contact & VIP WhatsApp Fragrance Group */}
          <div className="md:col-span-12 lg:col-span-4 space-y-6 text-left pt-6 md:pt-0 border-t md:border-t-0 lg:border-t-0 border-brand-charcoal/10">
            <div className="md:grid md:grid-cols-2 lg:block md:gap-8 lg:gap-0 space-y-6 md:space-y-0 lg:space-y-6">
              
              {/* Contact Info */}
              <div className="space-y-2">
                <h5 className="text-sm font-bold tracking-wider uppercase text-[#3D3D3D] mb-3">Get in Touch</h5>
                <p className="text-sm text-[#3D3D3D]/85 font-medium">
                  WhatsApp / Call: <a href="https://wa.me/2348145620271" target="_blank" rel="noopener noreferrer" className="hover:text-brand-purple transition-colors font-semibold">+234 814 562 0271</a>
                </p>
                <p className="text-sm text-[#3D3D3D]/85 font-medium">
                  Alternate Line: <a href="tel:09052329788" className="hover:text-brand-purple transition-colors font-semibold">+234 905 232 9788</a>
                </p>
                <p className="text-sm text-[#3D3D3D]/80 pt-1 leading-relaxed">
                  Pickup Address: 11 Peace Hostel, Alabata Road, Abeokuta, Ogun State.
                </p>
                <p className="text-xs sm:text-sm text-brand-purple font-semibold">
                  Nationwide Delivery Available Across Nigeria
                </p>
              </div>

              {/* Stay Updated via WhatsApp Community */}
              <div className="lg:pt-5 lg:border-t lg:border-brand-charcoal/10 space-y-3">
                <h5 className="text-sm font-bold tracking-wider uppercase text-[#3D3D3D]">Stay Updated</h5>
                <p className="text-sm text-[#3D3D3D]/80 font-normal leading-relaxed">
                  To get more details on your preferred fragrance and available fragrance products, you can join the group.
                </p>
                
                <div className="pt-1">
                  <a
                    href="https://chat.whatsapp.com/Dgft8Y8COhM6tyUA0nd4sa?mode=gi_t"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs sm:text-sm font-bold rounded-md transition-all duration-300 shadow-sm active:scale-95 cursor-pointer w-full sm:w-auto"
                  >
                    <WhatsAppSVG className="w-4 h-4 fill-white" />
                    <span>Join WhatsApp Group</span>
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-10 mt-10 border-t border-brand-charcoal/10 flex flex-col md:flex-row items-center justify-between text-xs sm:text-sm text-[#3D3D3D]/70 font-normal space-y-3 md:space-y-0 text-center md:text-left">
          <div>
            © {new Date().getFullYear()} WondersScents. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-6 gap-y-2 font-medium">
            <span>CAC Registered: Jan 10, 2023</span>
            <span>“Smell Nice, Feel Good, Look Good.”</span>
          </div>
        </div>

      </div>

      {/* 📄 TERMS OF SERVICE MODAL (Spacious, Owner-Written & Professional) */}
      {activeModal === 'terms' && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/65 backdrop-blur-sm select-none animate-fadeIn"
          onClick={() => setActiveModal(null)}
        >
          <div 
            className="bg-white max-w-2xl w-full p-6 sm:p-9 rounded-2xl border border-brand-charcoal/15 shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-brand-charcoal/10">
              <div className="space-y-1">
                <div className="flex items-center space-x-2.5">
                  <FileText className="w-5 h-5 text-brand-purple" />
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#1a1a1a]">Terms of Service</h3>
                </div>
                <p className="text-xs text-[#3D3D3D]/70">
                  Clear, honest terms for shopping with WondersScents.
                </p>
              </div>
              
              <button 
                onClick={() => setActiveModal(null)} 
                className="p-2 rounded-full text-[#3D3D3D]/60 hover:bg-neutral-100 hover:text-black transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Spacious Owner-Written Policy Blocks */}
            <div className="space-y-4 text-xs sm:text-sm text-[#3D3D3D]/80 leading-relaxed font-normal">
              
              <div className="p-4 sm:p-5 bg-neutral-50 rounded-xl border border-brand-charcoal/10 space-y-1.5">
                <h4 className="font-bold text-[#1a1a1a] flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-purple shrink-0" />
                  <span>100% Original Fragrance Guarantee</span>
                </h4>
                <p className="text-xs text-[#3D3D3D]/80 leading-relaxed pl-6">
                  We take scent authenticity seriously. Every designer perfume, body spray, and undiluted perfume oil we supply is strictly genuine and original. We never sell fakes, watered-down oils, or compromised batches.
                </p>
              </div>

              <div className="p-4 sm:p-5 bg-neutral-50 rounded-xl border border-brand-charcoal/10 space-y-1.5">
                <h4 className="font-bold text-[#1a1a1a] flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-purple shrink-0" />
                  <span>Personalized Direct Orders</span>
                </h4>
                <p className="text-xs text-[#3D3D3D]/80 leading-relaxed pl-6">
                  When you pick your items on our website, clicking checkout connects you directly with our sales team on WhatsApp. This allows us to confirm exact stock, advise you on scent profiles, and confirm your preferred delivery arrangement.
                </p>
              </div>

              <div className="p-4 sm:p-5 bg-neutral-50 rounded-xl border border-brand-charcoal/10 space-y-1.5">
                <h4 className="font-bold text-[#1a1a1a] flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-purple shrink-0" />
                  <span>Nationwide Nigerian Dispatch</span>
                </h4>
                <p className="text-xs text-[#3D3D3D]/80 leading-relaxed pl-6">
                  We package and dispatch orders across Nigeria daily with secure bubble wrap and protective casing. Deliveries typically arrive within 24 to 72 hours depending on your city and state.
                </p>
              </div>

              <div className="p-4 sm:p-5 bg-neutral-50 rounded-xl border border-brand-charcoal/10 space-y-1.5">
                <h4 className="font-bold text-[#1a1a1a] flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-purple shrink-0" />
                  <span>Wholesale & Perfume Training</span>
                </h4>
                <p className="text-xs text-[#3D3D3D]/80 leading-relaxed pl-6">
                  For entrepreneurs starting a fragrance brand, we provide bulk wholesale packages and hands-on masterclasses covering formulation, oil preservation, and supplier connections.
                </p>
              </div>

            </div>

            {/* Bottom Button */}
            <div className="pt-2 border-t border-brand-charcoal/10">
              <button 
                onClick={() => setActiveModal(null)}
                className="w-full py-3.5 bg-[#3D3D3D] hover:bg-brand-purple text-white text-xs font-semibold rounded-xs transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🛡️ REFUND & RETURN POLICY MODAL (Spacious, Owner-Written & Professional) */}
      {activeModal === 'refund' && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/65 backdrop-blur-sm select-none animate-fadeIn"
          onClick={() => setActiveModal(null)}
        >
          <div 
            className="bg-white max-w-2xl w-full p-6 sm:p-9 rounded-2xl border border-brand-charcoal/15 shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-brand-charcoal/10">
              <div className="space-y-1">
                <div className="flex items-center space-x-2.5">
                  <ShieldCheck className="w-5 h-5 text-brand-purple" />
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#1a1a1a]">Refund & Return Policy</h3>
                </div>
                <p className="text-xs text-[#3D3D3D]/70">
                  Our commitment to your satisfaction and peace of mind.
                </p>
              </div>
              
              <button 
                onClick={() => setActiveModal(null)} 
                className="p-2 rounded-full text-[#3D3D3D]/60 hover:bg-neutral-100 hover:text-black transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Spacious Owner-Written Policy Blocks */}
            <div className="space-y-4 text-xs sm:text-sm text-[#3D3D3D]/80 leading-relaxed font-normal">
              
              <div className="p-4 sm:p-5 bg-neutral-50 rounded-xl border border-brand-charcoal/10 space-y-1.5">
                <h4 className="font-bold text-[#1a1a1a] flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-purple shrink-0" />
                  <span>Damaged or Leaking on Arrival</span>
                </h4>
                <p className="text-xs text-[#3D3D3D]/80 leading-relaxed pl-6">
                  If your fragrance bottle arrives damaged, broken, or leaking during transit, please take a quick picture or short video and message our WhatsApp support (+234 814 562 0271 or +234 905 232 9788) within <strong>48 hours</strong> of delivery. We will immediately dispatch a fresh replacement to you at zero extra shipping charge, or give you a full refund.
                </p>
              </div>

              <div className="p-4 sm:p-5 bg-neutral-50 rounded-xl border border-brand-charcoal/10 space-y-1.5">
                <h4 className="font-bold text-[#1a1a1a] flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-purple shrink-0" />
                  <span>Incorrect Scent Dispatched</span>
                </h4>
                <p className="text-xs text-[#3D3D3D]/80 leading-relaxed pl-6">
                  If we sent you a different fragrance from what you ordered, let us know right away. We will swiftly exchange it for your exact requested scent at our own cost.
                </p>
              </div>

              <div className="p-4 sm:p-5 bg-neutral-50 rounded-xl border border-brand-charcoal/10 space-y-1.5">
                <h4 className="font-bold text-[#1a1a1a] flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-purple shrink-0" />
                  <span>Returns & Scent Guarantee</span>
                </h4>
                <p className="text-xs text-[#3D3D3D]/80 leading-relaxed pl-6">
                  Because fragrances are personal grooming products, bottles that have been heavily used or sprayed cannot be returned. Please note that certain authentic designer perfumes, Arabian flacons, and undiluted perfume oils naturally do not come with factory plastic cellophane seals from manufacturers; as long as the product is in its original received condition, our exchange and quality guarantee fully applies.
                </p>
              </div>

              <div className="p-4 sm:p-5 bg-neutral-50 rounded-xl border border-brand-charcoal/10 space-y-1.5">
                <h4 className="font-bold text-[#1a1a1a] flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-purple shrink-0" />
                  <span>We Are Always Here to Help</span>
                </h4>
                <p className="text-xs text-[#3D3D3D]/80 leading-relaxed pl-6">
                  Customer trust is the foundation of WondersScents. If you have any questions, inquiries, or special delivery needs, chat with our support team anytime on WhatsApp (+234 814 562 0271 / +234 905 232 9788)—we ensure every customer enjoys an exceptional fragrance experience.
                </p>
              </div>

            </div>

            {/* Bottom Button */}
            <div className="pt-2 border-t border-brand-charcoal/10">
              <button 
                onClick={() => setActiveModal(null)}
                className="w-full py-3.5 bg-[#3D3D3D] hover:bg-brand-purple text-white text-xs font-semibold rounded-xs transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </footer>
  );
};
