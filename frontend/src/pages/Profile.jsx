import React, { useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Package, Heart, ShoppingBag, LogOut, ChevronRight, MapPin, User, ShieldCheck } from 'lucide-react';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { setIsCartOpen } = useCart();
  const { setIsWishlistOpen } = useWishlist();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getFirstName = () => {
    if (user.name) return user.name.split(' ')[0];
    if (user.email) return user.email.split('@')[0];
    return 'User';
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl min-h-[70vh]">
      <div className="bg-white rounded-3xl shadow-xl shadow-secondary/5 border border-secondary/10 overflow-hidden">
        
        {/* Profile Header */}
        <div className="relative bg-gradient-to-b from-secondary/10 to-transparent pt-12 pb-8 px-6 text-center border-b border-secondary/5">
          <div className="absolute top-4 right-4 bg-white/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-secondary/10 flex items-center gap-1.5 shadow-sm">
             <ShieldCheck size={14} className="text-green-500" />
             <span className="text-[10px] font-bold text-content/60 uppercase tracking-widest">Verified</span>
          </div>

          <div className="relative w-28 h-28 mx-auto mb-4">
            <div className="absolute inset-0 bg-secondary/20 rounded-full animate-pulse"></div>
            <img 
              src={user.avatar || 'https://via.placeholder.com/150'} 
              alt={user.name} 
              className="w-full h-full object-cover rounded-full border-4 border-white shadow-lg relative z-10"
            />
          </div>
          
          <h1 className="text-3xl font-black text-content font-display mb-1">
            Welcome, {getFirstName()}!
          </h1>
          <p className="text-content/60 font-medium text-sm mb-4">
            {user.email}
          </p>
          <div className="inline-block bg-secondary text-white text-xs font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-md shadow-secondary/20">
            VanSugandh Family
          </div>
        </div>

        {/* Profile Links */}
        <div className="p-6 md:p-8 space-y-4">
          <h2 className="text-sm font-bold text-content/40 uppercase tracking-widest mb-4 pl-2">My Account</h2>
          
          <Link 
            to="/myorders" 
            className="flex items-center justify-between p-4 bg-surface/50 hover:bg-secondary/5 rounded-2xl border border-secondary/5 hover:border-secondary/20 transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                <Package className="text-secondary" />
              </div>
              <div>
                <h3 className="font-bold text-content">My Orders</h3>
                <p className="text-xs text-content/50 font-medium mt-0.5">Track, return, or view history</p>
              </div>
            </div>
            <ChevronRight className="text-content/20 group-hover:text-secondary group-hover:translate-x-1 transition-all" />
          </Link>

          <button 
            onClick={() => setIsWishlistOpen(true)}
            className="w-full flex items-center justify-between p-4 bg-surface/50 hover:bg-secondary/5 rounded-2xl border border-secondary/5 hover:border-secondary/20 transition-all group text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                <Heart className="text-secondary" />
              </div>
              <div>
                <h3 className="font-bold text-content">My Wishlist</h3>
                <p className="text-xs text-content/50 font-medium mt-0.5">View your saved items</p>
              </div>
            </div>
            <ChevronRight className="text-content/20 group-hover:text-secondary group-hover:translate-x-1 transition-all" />
          </button>

          <button 
            onClick={() => setIsCartOpen(true)}
            className="w-full flex items-center justify-between p-4 bg-surface/50 hover:bg-secondary/5 rounded-2xl border border-secondary/5 hover:border-secondary/20 transition-all group text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                <ShoppingBag className="text-secondary" />
              </div>
              <div>
                <h3 className="font-bold text-content">My Cart</h3>
                <p className="text-xs text-content/50 font-medium mt-0.5">Checkout your added items</p>
              </div>
            </div>
            <ChevronRight className="text-content/20 group-hover:text-secondary group-hover:translate-x-1 transition-all" />
          </button>

          <div className="mt-8 pt-8 border-t border-secondary/10">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white py-4 rounded-2xl font-bold transition-colors group"
            >
              <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
