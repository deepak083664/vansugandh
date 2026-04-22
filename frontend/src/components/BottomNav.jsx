import React from 'react';
import { Home, Heart, ShoppingBag, Store } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
const BottomNav = () => {
  const location = useLocation();
  const { getCartCount, setIsCartOpen } = useCart();
  const { wishlist, setIsWishlistOpen } = useWishlist();
  
  const navItems = [
    { 
      label: 'Home', 
      icon: (
        <div className="relative group">
          <svg viewBox="0 0 24 24" width="22" height="22" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-300 drop-shadow-sm group-active:scale-110">
            <defs>
              <linearGradient id="homeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F2994A" />
                <stop offset="100%" stopColor="#F2C94C" />
              </linearGradient>
            </defs>
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="url(#homeGradient)" fill="url(#homeGradient)" />
            <polyline points="9 22 9 12 15 12 15 22" stroke="white" strokeWidth="1.5" fill="none" />
          </svg>
        </div>
      ), 
      path: '/' 
    },
    { 
      label: 'Wishlist', 
      icon: (
        <div className="relative">
          <Heart size={22} className="text-red-500 fill-red-500" />
          {wishlist.length > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-primary text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center border border-white">
              {wishlist.length}
            </span>
          )}
        </div>
      ), 
      onClick: () => setIsWishlistOpen(true)
    },
    { 
      label: 'Wholesale', 
      icon: <Store size={28} />, 
      path: '/wholesale',
      isFloating: true 
    },
    { 
      label: 'Cart', 
      icon: (
        <div className="relative group">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-300 drop-shadow-sm group-active:scale-110">
            <defs>
              <linearGradient id="amazonCartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#232f3e" />
                <stop offset="100%" stopColor="#37475a" />
              </linearGradient>
            </defs>
            {/* The Cart Base */}
            <circle cx="9" cy="21" r="1" fill="#232f3e" />
            <circle cx="20" cy="21" r="1" fill="#232f3e" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" stroke="url(#amazonCartGradient)" strokeWidth="2" fill="url(#amazonCartGradient)" fillOpacity="0.1" />
            {/* Amazon-style accent (subtle) */}
            <path d="M7 10h12" stroke="white" strokeWidth="1" strokeOpacity="0.3" />
          </svg>
          {getCartCount() > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-secondary text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center border border-white animate-in zoom-in duration-300 shadow-sm">
              {getCartCount()}
            </span>
          )}
        </div>
      ), 
      onClick: () => setIsCartOpen(true)
    },
    { 
      label: 'WhatsApp', 
      icon: (
        <div className="relative group">
          <svg viewBox="0 0 24 24" width="22" height="22" className="transition-all duration-300 group-active:scale-110 drop-shadow-sm">
            <defs>
              <linearGradient id="whatsappGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#25D366" />
                <stop offset="100%" stopColor="#128C7E" />
              </linearGradient>
            </defs>
            <path 
              d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" 
              fill="url(#whatsappGradient)" 
            />
          </svg>
        </div>
      ), 
      path: 'https://wa.me/919876543210',
      isExternal: true 
    },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full z-50 animate-fade-in">
      <div className="bg-surface border-t border-content/5 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] px-2 py-1 flex items-center justify-between h-16">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          
          if (item.isFloating) {
            return (
              <div key={index} className="flex-1 flex justify-center items-center h-full">
                <Link 
                  to={item.path} 
                  className="relative -top-5 flex items-center justify-center"
                >
                  <div className="bg-gradient-to-tr from-[#FF512F] via-[#DD2476] to-[#FF512F] p-3 rounded-full shadow-[0_10px_25px_rgba(221,36,118,0.4)] border-2 border-white transform transition-all duration-500 hover:scale-110 hover:-rotate-6 group">
                    <div className="relative">
                      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-md">
                        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                        <path d="m3.3 7 8.7 5 8.7-5" />
                        <path d="M12 22V12" />
                        <circle cx="12" cy="12" r="3" fill="white" fillOpacity="0.2" stroke="none" />
                      </svg>
                      {/* Premium Sparkle Effect */}
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-300 rounded-full animate-ping opacity-75"></div>
                    </div>
                  </div>
                  <span className="absolute -bottom-6 text-[8px] font-black uppercase tracking-widest text-[#DD2476] whitespace-nowrap bg-white/80 backdrop-blur-sm px-2 rounded-full py-0.5 border border-[#DD2476]/10">Wholesale</span>
                </Link>
              </div>
            );
          }

          const getIconColor = (label) => {
            if (isActive) return 'text-secondary';
            if (label === 'WhatsApp') return 'text-[#25D366]';
            if (label === 'Cart') return 'text-[#ff9900]';
            if (label === 'Wishlist') return 'text-red-500';
            return 'text-content/60';
          };

          const content = (
            <div className={`flex flex-col items-center gap-0.5 transition-all duration-300 ${isActive ? 'scale-110' : ''}`}>
              <div className={`${getIconColor(item.label)} ${isActive && item.label !== 'WhatsApp' && item.label !== 'Cart' && item.label !== 'Wishlist' && item.label !== 'Home' ? 'text-secondary' : ''}`}>
                {item.icon}
              </div>
              <span className={`text-[9px] font-bold uppercase tracking-widest ${isActive ? 'text-secondary' : 'text-content/40'}`}>{item.label}</span>
              {isActive && <div className="w-1 h-1 bg-secondary rounded-full mt-0.5"></div>}
            </div>
          );

          if (item.isExternal) {
            return (
              <a key={index} href={item.path} target="_blank" rel="noopener noreferrer" className="flex-1 h-full flex flex-col items-center justify-center">
                {content}
              </a>
            );
          }

          if (item.onClick) {
            return (
              <button key={index} onClick={item.onClick} className="flex-1 h-full flex flex-col items-center justify-center bg-transparent border-none appearance-none cursor-pointer p-0">
                {content}
              </button>
            );
          }

          return (
            <Link key={index} to={item.path} className="flex-1 h-full flex flex-col items-center justify-center">
              {content}
            </Link>
          );
        })}
      </div>
      {/* Safe area padding for iPhones */}
      <div className="h-safe-area bg-surface/80 backdrop-blur-lg"></div>
    </div>
  );
};

export default BottomNav;
