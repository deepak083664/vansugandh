import React, { useState, useEffect, useRef } from 'react';
import { Search, ShoppingBag, User, Menu, X, Heart, Package } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';


const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { getCartCount, setIsCartOpen } = useCart();
  const { wishlist, setIsWishlistOpen } = useWishlist();
  const { user, loginWithGoogle, logout } = useContext(AuthContext);
  
  // Disable scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  
  // Secret Admin Trigger State
  const [clickCount, setClickCount] = useState(0);
  const clickTimeout = useRef(null);

  const handleLogoClick = () => {
    setClickCount((prev) => {
      const newCount = prev + 1;
      
      if (newCount === 5) {
        const token = localStorage.getItem('adminToken');
        if (token) {
          navigate('/admin/dashboard');
        } else {
          navigate('/admin/login');
        }
        return 0; // Reset
      }

      // Reset if not clicked again within 2 seconds
      if (clickTimeout.current) clearTimeout(clickTimeout.current);
      clickTimeout.current = setTimeout(() => setClickCount(0), 2000);

      return newCount;
    });

    // Also navigate home if it's the first few clicks just like standard behaviour
    if (clickCount === 0 && location.pathname !== '/') {
        navigate('/');
    }
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Wholesale', path: '/wholesale' },
    { name: 'Contact Us', path: '#' },
    { name: 'About', path: '/about' }
  ];

  return (
    <nav className="sticky top-0 z-50 transition-all duration-300 bg-surface/90 backdrop-blur-md shadow-sm py-2">
      <div className="container mx-auto px-2 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={handleLogoClick}
          className="flex-1 flex items-center gap-1.5 group cursor-pointer -ml-1"
        >
            <img 
              src="/logo.jpeg" 
              alt="VanSugandh" 
              className="h-10 w-auto object-contain rounded-full shadow-sm group-hover:scale-105 transition-transform"
            />
            <img 
              src="/brandname.png" 
              alt="VanSugandh" 
              className="h-8 md:h-11 w-auto object-contain transition-transform group-hover:scale-105"
            />
        </div>

        {/* Menu - Desktop */}
        <div className="hidden lg:flex items-center space-x-8 flex-1 justify-center">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              to={item.path} 
              className={`font-semibold text-sm uppercase tracking-wider transition-colors relative group ${location.pathname === item.path && item.path !== '#' ? 'text-secondary' : 'text-content/70 hover:text-secondary'}`}
            >
              {item.name}
              <span className={`absolute -bottom-1.5 left-0 h-0.5 bg-secondary transition-all group-hover:w-full ${location.pathname === item.path && item.path !== '#' ? 'w-full' : 'w-0'}`}></span>
            </Link>
          ))}
        </div>

        {/* Icons - Right */}
        <div className="flex-1 flex items-center justify-end space-x-3 md:space-x-5">
          <button className="text-content hover:text-secondary p-1 transition-transform hover:scale-110 hidden sm:block">
            <Search size={22} strokeWidth={1.5} />
          </button>
          <button 
            onClick={() => setIsWishlistOpen(true)}
            className="text-content hover:text-secondary p-1 transition-transform hover:scale-110 hidden sm:block relative"
          >
            <Heart size={22} strokeWidth={1.5} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-[8px] w-3 h-3 rounded-full flex items-center justify-center border border-white">
                {wishlist.length}
              </span>
            )}
          </button>
          {user ? (
            <Link to="/profile" className="hidden sm:block p-1 text-content hover:text-secondary transition-transform hover:scale-110">
              <User size={22} strokeWidth={1.5} />
            </Link>
          ) : (
            <button onClick={loginWithGoogle} className="hidden sm:flex items-center gap-2 bg-white text-content/80 border border-content/10 hover:border-content/20 hover:shadow-sm px-3 py-1.5 rounded-full text-xs font-semibold transition-all">
               <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-4 h-4" />
               Login
            </button>
          )}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="text-content hover:text-secondary p-1 transition-transform hover:scale-110 relative"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-300 drop-shadow-sm group-active:scale-110">
              <defs>
                <linearGradient id="navAmazonCartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#232f3e" />
                  <stop offset="100%" stopColor="#37475a" />
                </linearGradient>
              </defs>
              <circle cx="9" cy="21" r="1" fill="#232f3e" />
              <circle cx="20" cy="21" r="1" fill="#232f3e" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" stroke="url(#navAmazonCartGradient)" strokeWidth="2" fill="url(#navAmazonCartGradient)" fillOpacity="0.1" />
              <path d="M7 10h12" stroke="white" strokeWidth="1" strokeOpacity="0.3" />
            </svg>
            {getCartCount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-secondary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in duration-300">
                {getCartCount()}
              </span>
            )}
          </button>
          
          {/* Profile - Mobile */}
          <div className="lg:hidden flex items-center">
            {user ? (
              <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="p-1 text-content">
                <User size={22} strokeWidth={1.5} />
              </Link>
            ) : (
              <button onClick={loginWithGoogle} className="p-1 text-content/70">
                <User size={22} strokeWidth={1.5} />
              </button>
            )}
          </div>
          
          <button className="lg:hidden text-content p-1" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[60px] w-full h-screen bg-white shadow-xl border-t border-content/5 py-8 px-6 flex flex-col gap-4 z-[100] animate-in slide-in-from-top duration-300 overflow-y-auto">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              to={item.path} 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`font-semibold py-3 border-b border-secondary/5 uppercase tracking-widest text-[10px] ${location.pathname === item.path && item.path !== '#' ? 'text-secondary' : 'text-content/80'}`}
            >
              {item.name}
            </Link>
          ))}
          
          {/* Mobile Profile Actions */}
          <div className="mt-4 pt-4 border-t border-secondary/10 flex flex-col gap-4">
            {user ? (
              <>
                <Link 
                  to="/profile" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 text-content/80 font-bold text-xs uppercase tracking-widest"
                >
                  <User size={18} className="text-secondary" />
                  My Profile
                </Link>
                <Link 
                  to="/myorders" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 text-content/80 font-bold text-xs uppercase tracking-widest"
                >
                  <Package size={18} className="text-secondary" />
                  My Orders
                </Link>
                <button 
                  onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                  className="flex items-center gap-3 text-red-500 font-bold text-xs uppercase tracking-widest text-left"
                >
                  <X size={18} />
                  Logout
                </button>
              </>
            ) : (
              <button 
                onClick={() => { loginWithGoogle(); setIsMobileMenuOpen(false); }}
                className="flex items-center gap-3 text-secondary font-bold text-xs uppercase tracking-widest text-left"
              >
                <User size={18} />
                Login / Register
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
