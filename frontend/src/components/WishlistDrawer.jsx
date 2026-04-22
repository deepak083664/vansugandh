import React from 'react';
import { X, Heart, Trash2, ShoppingCart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const WishlistDrawer = () => {
  const { wishlist, isWishlistOpen, setIsWishlistOpen, toggleWishlist } = useWishlist();
  const { addToCart, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  if (!isWishlistOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-content/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-300" 
        onClick={() => setIsWishlistOpen(false)}
      />
      
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md pointer-events-auto">
          <div className="h-full flex flex-col bg-white shadow-2xl animate-in slide-in-from-right duration-500">
            
            {/* Header */}
            <div className="px-6 py-6 border-b border-secondary/5 flex items-center justify-between bg-surface/30">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-xl text-primary">
                  <Heart size={20} fill="currentColor" />
                </div>
                <h2 className="text-xl font-black font-display text-content">Your Favorites</h2>
              </div>
              <button 
                onClick={() => setIsWishlistOpen(false)}
                className="p-2 text-content/40 hover:text-red-500 hover:rotate-90 transition-all rounded-xl hover:bg-white"
              >
                <X size={24} />
              </button>
            </div>

            {/* Wishlist Items */}
            <div className="flex-1 overflow-y-auto px-6 py-6 no-scrollbar">
              {wishlist.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-6">
                  <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center text-content/10">
                    <Heart size={48} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-content mb-2">Feeling empty?</h3>
                    <p className="text-sm text-content/40 max-w-[200px]">Pin your favorite authentic spices here for quick access later.</p>
                  </div>
                  <button 
                    onClick={() => { setIsWishlistOpen(false); navigate('/products'); }}
                    className="bg-secondary text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-secondary/20 hover:scale-105 active:scale-95 transition-all"
                  >
                    Discover Spices
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {wishlist.map((item) => (
                    <div key={item._id} className="flex gap-4 group">
                      <div className="w-20 h-24 shrink-0 rounded-2xl overflow-hidden border border-secondary/5 bg-surface relative">
                         <img src={item.image || '/logo.jpeg'} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-bold text-content leading-tight hover:text-secondary cursor-pointer transition-colors" onClick={() => { navigate(`/product/${item._id}`); setIsWishlistOpen(false); }}>{item.name}</h4>
                            <button onClick={() => toggleWishlist(item)} className="text-content/20 hover:text-red-500 transition-colors p-1">
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">{item.category}</p>
                        </div>
                        
                        <div className="flex justify-between items-center mt-2">
                           <span className="font-black text-content">₹{parseFloat(String(item.price).replace(/[^0-9.]/g, ''))}</span>
                           <button 
                             onClick={() => { 
                               addToCart(item); 
                               toggleWishlist(item); // optionally remove from wishlist after adding to cart
                               setIsWishlistOpen(false);
                               setIsCartOpen(true);
                             }} 
                             className="text-[10px] font-black uppercase tracking-widest bg-secondary text-white px-3 py-1.5 rounded-lg hover:bg-content transition-colors flex items-center gap-1.5 shadow-md shadow-secondary/20"
                           >
                              <ShoppingCart size={12} />
                              Move to Bag
                           </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistDrawer;
