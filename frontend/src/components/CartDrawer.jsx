import React from 'react';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShoppingCart, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';


const CartDrawer = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const { user, loginWithGoogle } = useContext(AuthContext);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      setShowAuthModal(true);
    } else {
      const message = `Hello VanSugandh! I'd like to place an order:\n\n${cart.map(item => `- ${item.name} (${item.weight}) x ${item.quantity} - ₹${parseFloat(String(item.price).replace(/[^0-9.]/g, '')) * item.quantity}`).join('\n')}\n\nTotal: ₹${getCartTotal()}\n\nPlease guide me with the next steps.`;
      window.open(`https://wa.me/919876543210?text=${encodeURIComponent(message)}`, '_blank');
    }
  };


  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-content/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-300" 
        onClick={() => setIsCartOpen(false)}
      />
      
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md pointer-events-auto">
          <div className="h-full flex flex-col bg-white shadow-2xl animate-in slide-in-from-right duration-500">
            
            {/* Header */}
            <div className="px-6 py-6 border-b border-secondary/5 flex items-center justify-between bg-surface/30">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-secondary/10 rounded-xl text-secondary">
                  <ShoppingBag size={20} />
                </div>
                <h2 className="text-xl font-black font-display text-content">Shopping Bag</h2>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-content/40 hover:text-red-500 hover:rotate-90 transition-all rounded-xl hover:bg-white"
              >
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-6 py-6 no-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-6">
                  <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center text-content/10">
                    <ShoppingCart size={48} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-content mb-2">Your bag is empty</h3>
                    <p className="text-sm text-content/40 max-w-[200px]">Looks like you haven't added any authentic spices yet.</p>
                  </div>
                  <button 
                    onClick={() => { setIsCartOpen(false); navigate('/products'); }}
                    className="bg-secondary text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-secondary/20 hover:scale-105 active:scale-95 transition-all"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div key={`${item._id}-${item.weight}`} className="flex gap-4 group">
                      <div className="w-20 h-24 shrink-0 rounded-2xl overflow-hidden border border-secondary/5 bg-surface relative">
                         <img src={item.image || '/logo.jpeg'} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-bold text-content leading-tight hover:text-secondary cursor-pointer transition-colors" onClick={() => { navigate(`/product/${item._id}`); setIsCartOpen(false); }}>{item.name}</h4>
                            <button onClick={() => removeFromCart(item._id, item.weight)} className="text-content/20 hover:text-red-500 transition-colors p-1">
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">{item.category}</p>
                            <span className="text-[10px] bg-secondary/10 text-secondary px-2 py-0.5 rounded-full font-bold">{item.weight}</span>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center bg-surface rounded-lg p-1 border border-secondary/5">
                            <button onClick={() => updateQuantity(item._id, item.weight, -1)} className="p-1 hover:text-secondary transition-colors"><Minus size={14} /></button>
                            <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item._id, item.weight, 1)} className="p-1 hover:text-secondary transition-colors"><Plus size={14} /></button>
                          </div>
                          <span className="font-black text-content">₹{parseFloat(String(item.price).replace(/[^0-9.]/g, '')) * item.quantity}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="px-6 py-8 border-t border-secondary/5 bg-surface/30 space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm font-bold text-content/40 px-1">
                    <span>Subtotal</span>
                    <span>₹{getCartTotal()}</span>
                  </div>
                  <div className="flex justify-between items-center text-xl font-black text-content px-1">
                    <span>Order Total</span>
                    <span>₹{getCartTotal()}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button 
                    onClick={handleCheckout}
                    className="w-full relative group overflow-hidden bg-gradient-to-r from-secondary to-[#c23616] text-white py-4 rounded-2xl font-bold uppercase tracking-[0.2em] text-xs shadow-[0_10px_30px_rgba(165,42,42,0.3)] hover:shadow-[0_15px_40px_rgba(165,42,42,0.5)] transition-all duration-500 active:scale-[0.98] flex items-center justify-center gap-3"
                  >
                    <span className="relative z-10">Order Now</span>
                    <ArrowRight size={18} className="relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
                    
                    {/* Shiny overlay animation */}
                    <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:left-[100%] transition-all duration-1000 ease-in-out"></div>
                  </button>
                  <p className="text-[10px] text-center font-bold text-content/30 uppercase tracking-[0.25em]">Direct Order via WhatsApp</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl transform animate-in zoom-in duration-300">
             <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                <User size={32} />
             </div>
             <h3 className="text-2xl font-black text-content mb-2">Login Required</h3>
             <p className="text-content/60 text-sm mb-8">Please login with Google to continue with your checkout process.</p>
             <div className="flex flex-col gap-3">
                <button 
                  onClick={loginWithGoogle}
                  className="w-full bg-white text-content/80 border border-content/20 hover:border-content/40 hover:shadow-md py-3 rounded-2xl font-bold transition-all flex items-center justify-center gap-3"
                >
                  <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                  Continue with Google
                </button>
                <button 
                  onClick={() => setShowAuthModal(false)}
                  className="w-full text-content/50 hover:text-content text-sm font-bold py-2 transition-colors"
                >
                  Cancel
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default CartDrawer;
