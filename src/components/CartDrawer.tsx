import React, { useState, useEffect } from 'react';
import { X, Trash2, Plus, Minus, MessageCircle, ShoppingCart } from 'lucide-react';
import type { CartItem } from '../hooks/useAppState';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemove: (productId: string, size: string) => void;
  onUpdateQuantity: (productId: string, size: string, quantity: number) => void;
  subtotal?: number;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onRemove,
  onUpdateQuantity
}) => {
  // State to manage smooth entry and exit animation
  const [isVisible, setIsVisible] = useState(isOpen);
  const [isClosing, setIsClosing] = useState(false);

  // Checkout form state
  const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'delivery'>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsClosing(false);
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else if (isVisible && !isClosing) {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setIsClosing(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSmoothClose = () => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
      onClose();
    }, 500);
  };

  // 🔒 Handle ESC key when cart is open
  useEffect(() => {
    if (!isVisible) {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleSmoothClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isVisible, isClosing]);

  if (!isVisible && !isOpen) return null;

  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim() || (deliveryMethod === 'delivery' && !address.trim())) {
      alert('Please fill in all required customer contact details.');
      return;
    }

    // High-end, structured WhatsApp message format
    const itemsText = cart.map(item => {
      return `• ${item.quantity}x ${item.product.name} (${item.selectedSize})`;
    }).join('\n');

    const checkoutMessage = `Hello Wonders Scents,

I would like to place an order from your website. Here are the details:

*ORDER*
${itemsText}

*Total Items:* ${totalItemsCount}

*CUSTOMER & DELIVERY DETAILS*
• *Name:* ${customerName.trim()}
• *Phone:* ${phone.trim()}
• *Delivery Method:* ${deliveryMethod === 'delivery' ? 'Home Delivery' : 'Store Pickup'}
${deliveryMethod === 'delivery' ? `• *Delivery Address:* ${address.trim()}\n` : ''}
Please confirm product availability and provide payment details to proceed. Thank you!`;

    const whatsappUrl = `https://wa.me/2348145620271?text=${encodeURIComponent(checkoutMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div 
      className={`fixed inset-0 z-50 flex justify-end bg-brand-charcoal/50 backdrop-blur-xs select-none ${
        isClosing ? 'animate-fadeOutBackdrop' : 'animate-fadeInBackdrop'
      }`}
    >
      {/* Backdrop overlay trigger to close */}
      <div className="absolute inset-0" onClick={handleSmoothClose}></div>

      {/* Drawer Container (Smooth Slide In and Out) */}
      <div 
        className={`relative z-10 bg-white w-full max-w-md h-full flex flex-col justify-between border-l border-brand-charcoal/10 font-sans shadow-2xl ${
          isClosing ? 'animate-slideRightOut' : 'animate-slideLeft'
        }`}
      >
        
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-brand-charcoal/10 flex items-center justify-between bg-white">
          <div className="flex items-center space-x-2.5 text-brand-charcoal">
            <ShoppingCart className="w-5 h-5 text-brand-purple" />
            <h3 className="font-display text-base font-bold tracking-tight text-brand-charcoal">
              Your Cart ({totalItemsCount})
            </h3>
          </div>
          <button 
            onClick={handleSmoothClose} 
            className="p-1.5 border border-brand-charcoal/10 text-[#3D3D3D] rounded-full hover:bg-brand-purple hover:text-white hover:border-brand-purple transition-all duration-200 cursor-pointer"
            title="Close Cart (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {cart.length === 0 ? (
            <div className="text-center py-20 space-y-4">
              <ShoppingCart className="w-12 h-12 text-brand-charcoal/20 mx-auto" />
              <p className="text-sm text-brand-charcoal/60">Your cart is currently empty.</p>
              <button 
                onClick={handleSmoothClose}
                className="px-6 py-2.5 bg-[#3D3D3D] hover:bg-brand-purple text-white text-xs font-semibold tracking-wider transition-colors cursor-pointer"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div 
                  key={`${item.product.id}-${item.selectedSize}`}
                  className="flex items-center space-x-4 p-3 bg-neutral-50 border border-brand-charcoal/10 rounded-xs transition-colors hover:border-brand-charcoal/20"
                >
                  <img 
                    src={item.product.image} 
                    alt={item.product.name} 
                    className="w-16 h-16 object-contain border border-brand-charcoal/10 rounded-xs shrink-0 bg-white p-1"
                  />
                  <div className="flex-1 text-left">
                    <h4 className="text-xs font-bold text-[#3D3D3D] line-clamp-1">{item.product.name}</h4>
                    <p className="text-[11px] text-[#3D3D3D]/60 mt-0.5">Size: {item.selectedSize}</p>
                    
                    <div className="flex items-center space-x-3 mt-2">
                      <button 
                        onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, item.quantity - 1)}
                        className="p-1 bg-white border border-brand-charcoal/15 text-[#3D3D3D] hover:bg-brand-purple hover:text-white transition-colors cursor-pointer rounded-xs active:scale-95"
                        title="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-[#3D3D3D] min-w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, item.quantity + 1)}
                        className="p-1 bg-white border border-brand-charcoal/15 text-[#3D3D3D] hover:bg-brand-purple hover:text-white transition-colors cursor-pointer rounded-xs active:scale-95"
                        title="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <button 
                    onClick={() => onRemove(item.product.id, item.selectedSize)}
                    className="p-1.5 text-brand-charcoal/40 hover:text-red-600 transition-colors cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Checkout Form */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-brand-charcoal/10 bg-white space-y-4 text-left">
            <div className="flex items-center justify-between text-sm font-bold text-[#3D3D3D]">
              <span>Total Items:</span>
              <span className="text-brand-purple text-base">{totalItemsCount} item{totalItemsCount === 1 ? '' : 's'}</span>
            </div>

            <form onSubmit={handleCheckout} className="space-y-3">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#3D3D3D] uppercase tracking-wider">Fulfillment Option</label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('delivery')}
                    className={`py-2 px-3 border text-center font-medium transition-colors cursor-pointer rounded-xs ${
                      deliveryMethod === 'delivery' ? 'border-brand-purple bg-brand-purple-light text-brand-purple' : 'border-brand-charcoal/15 text-[#3D3D3D]'
                    }`}
                  >
                    Home Delivery
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('pickup')}
                    className={`py-2 px-3 border text-center font-medium transition-colors cursor-pointer rounded-xs ${
                      deliveryMethod === 'pickup' ? 'border-brand-purple bg-brand-purple-light text-brand-purple' : 'border-brand-charcoal/15 text-[#3D3D3D]'
                    }`}
                  >
                    Store Pickup
                  </button>
                </div>
              </div>

              <input 
                type="text"
                required
                placeholder="Full Name *"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full bg-neutral-50 border border-brand-charcoal/15 px-3 py-2 text-xs text-[#3D3D3D] focus:outline-none focus:border-brand-purple rounded-xs transition-colors"
              />

              <input 
                type="tel"
                required
                placeholder="Phone Number *"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-neutral-50 border border-brand-charcoal/15 px-3 py-2 text-xs text-[#3D3D3D] focus:outline-none focus:border-brand-purple rounded-xs transition-colors"
              />

              {deliveryMethod === 'delivery' && (
                <textarea 
                  required
                  rows={2}
                  placeholder="Delivery Address *"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-neutral-50 border border-brand-charcoal/15 px-3 py-2 text-xs text-[#3D3D3D] focus:outline-none focus:border-brand-purple rounded-xs transition-colors"
                />
              )}

              <button 
                type="submit"
                className="w-full py-3.5 bg-brand-purple hover:bg-brand-purple-deep text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center space-x-2 rounded-xs cursor-pointer shadow-md active:scale-[0.99]"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Complete Order via WhatsApp</span>
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
