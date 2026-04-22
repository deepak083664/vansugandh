import React, { useState, useEffect, useRef } from 'react';
import { Search, ShoppingBag, User, Menu, X, Heart } from 'lucide-react';
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
    { name: 'About', path: '#' }
  ];

  return (
    <nav className="sticky top-0 z-50 transition-all duration-300 bg-surface/90 backdrop-blur-md shadow-sm py-2">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={handleLogoClick}
          className="flex-1 flex items-center gap-3 group cursor-pointer"
        >
            <img 
              src="/logo.jpeg" 
              alt="VanSugandh" 
              className="h-10 w-auto object-contain rounded-full shadow-sm group-hover:scale-105 transition-transform"
            />
            <img 
              src="/brandname.png" 
              alt="VanSugandh" 
              className="h-6 md:h-8 w-auto object-contain transition-transform group-hover:scale-105"
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
        <div className="flex-1 flex items-center justify-end space-x-5">
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
            <div className="relative group hidden sm:block">
              <div className="flex items-center gap-2 cursor-pointer p-1">
                <img src={user.avatar || 'https://via.placeholder.com/150'} alt={user.name} className="w-7 h-7 rounded-full shadow-sm" />
                <span className="text-sm font-semibold text-content">{user.name.split(' ')[0]}</span>
              </div>
              <div className="absolute right-0 top-full mt-1 w-40 bg-white shadow-xl rounded-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right border border-black/5 z-50">
                <div className="block px-4 py-2 text-sm text-content/80 hover:bg-primary/10 hover:text-primary cursor-pointer transition-colors">My Profile</div>
                <div onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 cursor-pointer transition-colors">Logout</div>
              </div>
            </div>
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
          
          <button className="lg:hidden text-content p-1" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-content/5 py-4 px-6 flex flex-col gap-4">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              to={item.path} 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`font-medium py-2 border-b border-content/5 ${location.pathname === item.path && item.path !== '#' ? 'text-secondary' : 'text-content/80'}`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
