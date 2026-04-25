import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Star, ChevronLeft, ShieldCheck, Truck, CheckCircle, Store } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import heroImage from '../assets/hero.png';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [added, setAdded] = useState(false);
  const { addToCart, setIsCartOpen } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(id);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchProductDetails = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!res.ok) throw new Error('Product not found');
        const data = await res.json();
        setProduct(data);
        setSelectedImage(data.image || (data.images && data.images[0]) || heroImage);
        if (data.variants && data.variants.length > 0) {
            setSelectedVariant(data.variants[0]);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProductDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen py-24 bg-[#FDFBF7] flex justify-center items-center">
        <div className="flex flex-col items-center gap-4">
           <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
           <p className="text-xs font-bold text-content/40 tracking-widest uppercase">Loading Product...</p>
        </div>
      </div>
    );
  }

  if (!product) return (
     <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFBF7] gap-6">
        <h2 className="text-2xl font-bold text-content">Product not found</h2>
        <button onClick={() => navigate('/products')} className="bg-secondary text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-secondary/20">Return to Store</button>
     </div>
  );

  const images = product.images && product.images.length > 0 ? product.images : [product.image || heroImage];

  return (
    <div className="bg-[#FDFBF7] min-h-screen pt-2 pb-12 md:pt-4 md:pb-16">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        {/* Breadcrumb */}
        <div className="mb-2 flex items-center justify-between">
            <button 
                onClick={() => navigate(-1)} 
                className="flex items-center gap-2 text-content/60 hover:text-secondary transition-colors font-bold text-sm"
            >
                <ChevronLeft size={18} />
                Store
            </button>
            <div className="hidden md:flex items-center text-xs font-bold text-content/30 gap-2 uppercase tracking-widest">
                <span>Vansugandh</span> / <span>{product.category}</span> / <span className="text-secondary">{product.name}</span>
            </div>
        </div>

        <div className="bg-white rounded-none p-4 md:p-6 md:py-8 shadow-[0_10px_60px_rgb(0,0,0,0.02)] border border-secondary/5 flex flex-col lg:flex-row gap-8 lg:gap-12">
            
            {/* Left Gallery Section (Professional Studio Slider) */}
            <div className="w-full lg:w-[60%] flex flex-col md:flex-row gap-6">
                
                {/* Vertical Thumbnails (Desktop Only) */}
                <div className="hidden md:flex flex-col gap-4 w-20 shrink-0 max-h-[600px] overflow-y-auto no-scrollbar py-2">
                   {images.map((img, idx) => (
                      <button 
                        key={idx}
                        onClick={() => setSelectedImage(img)}
                        className={`aspect-square w-full rounded-none border-2 transition-all p-1.5 bg-surface overflow-hidden hover:scale-105 active:scale-95 ${selectedImage === img ? 'border-secondary shadow-lg scale-105' : 'border-transparent hover:border-secondary/30'}`}
                      >
                         <img src={img} alt="" className="w-full h-full object-cover rounded-none" />
                      </button>
                   ))}
                </div>

                {/* Main Feature / Mobile Slider Container */}
                <div className="relative flex-1 group">
                    {/* Main Image View (Desktop) / Slider (Mobile) */}
                    <div className="relative aspect-[3/4] bg-stone-50 rounded-none overflow-hidden border border-secondary/5 shadow-inner flex md:block overflow-x-auto md:overflow-visible snap-x snap-mandatory no-scrollbar scroll-smooth">
                        
                        {/* Mobile Swipeable Gallery */}
                        <div className="md:hidden flex h-full">
                            {images.map((img, idx) => (
                                <div key={idx} className="w-full h-full shrink-0 snap-center flex items-center justify-center">
                                    <img 
                                        src={img} 
                                        alt={`${product.name} ${idx + 1}`} 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Desktop Static View */}
                        <div className="hidden md:flex h-full items-center justify-center">
                            <img 
                                src={selectedImage} 
                                alt={product.name} 
                                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                            />
                        </div>

                        {/* Badges / Tags */}
                        {product.tag && (
                            <div className="absolute top-8 left-8 z-20">
                                <span className="bg-secondary text-white text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-widest leading-none shadow-xl">
                                    {product.tag}
                                </span>
                            </div>
                        )}
                        
                        <button 
                            onClick={() => toggleWishlist(product)}
                            className={`absolute top-8 right-8 z-20 p-4 rounded-2xl shadow-xl transition-all transform hover:scale-110 active:scale-95 ${isWishlisted ? 'bg-red-500 text-white shadow-red-500/20' : 'bg-white/90 backdrop-blur-md text-content hover:bg-red-500 hover:text-white'}`}
                        >
                            <Heart size={22} fill={isWishlisted ? "currentColor" : "none"} strokeWidth={isWishlisted ? 0 : 2} />
                        </button>
                    </div>

                    {/* Mobile Only Indicator Dots */}
                    <div className="md:hidden flex justify-center gap-3 mt-6">
                        {images.map((img, idx) => (
                            <button 
                              key={idx}
                              onClick={() => setSelectedImage(img)}
                              className={`h-1.5 rounded-full transition-all duration-300 ${selectedImage === img ? 'bg-secondary w-8' : 'bg-secondary/20 w-1.5'}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Details Section */}
            <div className="w-full lg:w-[40%] flex flex-col">
                <div className="space-y-4">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                           <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary bg-secondary/5 px-4 py-1.5 rounded-full border border-secondary/10">{product.category}</span>
                           {product.isWholesale && <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-content/40 bg-surface px-4 py-1.5 rounded-full border border-content/5">Wholesale Ready</span>}
                        </div>
                        <h1 className="text-2xl md:text-5xl font-black text-content leading-tight tracking-tight uppercase">
                            {product.name}
                        </h1>
                    </div>

                    <div className="flex items-center gap-1.5 py-1">
                        <div className="flex gap-0.5">
                           {[...Array(5)].map((_, i) => (
                              <Star key={i} size={16} className={i < 4 ? "fill-primary text-primary" : "text-gray-200"} />
                           ))}
                        </div>
                        <span className="font-bold text-sm ml-2">{product.rating || "4.8"}</span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-content/20 ml-2">/ 124 Sales</span>
                    </div>
                    <div className="flex flex-col gap-1 py-2">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl md:text-5xl font-black text-content tracking-tighter">
                                ₹{String(selectedVariant ? selectedVariant.price : product.price).replace(/[^0-9.]/g, '')}
                            </span>
                            {(selectedVariant?.oldPrice || product.oldPrice) && (
                                <span className="text-lg md:text-xl text-content/20 line-through font-bold">
                                    ₹{String(selectedVariant ? selectedVariant.oldPrice : product.oldPrice).replace(/[^0-9.]/g, '')}
                                </span>
                            )}
                            {(selectedVariant?.oldPrice || product.oldPrice) && (
                                <span className="bg-secondary text-white text-[10px] md:text-xs font-black uppercase px-3 py-1.5 rounded-lg shadow-lg shadow-secondary/10">
                                    {Math.round((((selectedVariant ? selectedVariant.oldPrice : product.oldPrice) - (selectedVariant ? selectedVariant.price : product.price))/(selectedVariant ? selectedVariant.oldPrice : product.oldPrice))*100)}% OFF
                                </span>
                            )}
                        </div>
                        {quantity > 1 && (
                          <div className="flex items-center gap-2 animate-in fade-in slide-in-from-left duration-500">
                             <span className="text-xs font-black uppercase tracking-widest text-secondary bg-secondary/5 px-3 py-1 rounded-lg border border-secondary/10">
                               Total: ₹{parseFloat(String(selectedVariant ? selectedVariant.price : product.price).replace(/[^0-9.]/g, '')) * quantity}
                             </span>
                             <span className="text-[10px] font-bold text-content/30 uppercase tracking-widest">for {quantity} items</span>
                          </div>
                        )}
                    </div>

                     {/* Weight Variants Selector */}
                     {product.variants && product.variants.length > 0 && (
                        <div>
                           <label className="text-[10px] font-black uppercase tracking-widest text-content/30 block mb-3">Select Weight</label>
                            <div className="flex flex-wrap gap-2">
                               {product.variants.map((variant, idx) => (
                                  <button 
                                     key={idx}
                                     onClick={() => setSelectedVariant(variant)}
                                     className={`px-4 py-2 rounded-xl font-black text-[10px] md:text-xs transition-all border-2 ${selectedVariant?.weight === variant.weight ? 'bg-secondary text-white border-secondary shadow-md shadow-secondary/20' : 'bg-surface text-content/40 border-secondary/5 hover:border-secondary/20'}`}
                                  >
                                     {variant.weight}
                                  </button>
                               ))}
                            </div>
                        </div>
                     )}

                     {/* Attributes */}
                     <div className="grid grid-cols-2 gap-3 pb-2">
                        <div className="bg-surface/50 p-4 md:p-6 rounded-none flex flex-col gap-1 border border-secondary/5">
                            <span className="text-[9px] text-content/30 font-bold uppercase tracking-[0.2em]">Weight</span>
                            <span className="text-content font-black text-base md:text-xl">{selectedVariant ? selectedVariant.weight : (product.weight || '250g')}</span>
                        </div>
                        <div className="bg-surface/50 p-4 md:p-6 rounded-none flex flex-col gap-1 border border-secondary/5">
                            <span className="text-[9px] text-content/30 font-bold uppercase tracking-[0.2em]">Origin</span>
                            <span className="text-content font-black text-base md:text-xl">{product.origin || 'India'}</span>
                        </div>
                    </div>
                </div>

                {/* Action Controls */}
                <div className="mt-6 space-y-6">
                    <div className="flex items-center justify-between bg-surface p-1 rounded-3xl border border-secondary/5">
                        <span className="font-black text-[10px] md:text-xs uppercase tracking-widest text-content/40 ml-4 md:ml-6">Quantity</span>
                        <div className="flex items-center bg-white rounded-2xl p-0.5 md:p-1 shadow-sm">
                            <button 
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-content font-black text-lg md:text-xl transition-all active:scale-90 hover:text-secondary"
                            >
                                -
                            </button>
                            <span className="w-10 md:w-12 text-center font-black text-md md:text-lg">{quantity}</span>
                            <button 
                                onClick={() => setQuantity(quantity + 1)}
                                className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-content font-black text-lg md:text-xl transition-all active:scale-90 hover:text-secondary"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <button 
                            onClick={() => {
                                const prodToCart = {
                                    ...product,
                                    price: selectedVariant ? selectedVariant.price : product.price,
                                    weight: selectedVariant ? selectedVariant.weight : product.weight
                                };
                                addToCart(prodToCart, quantity);
                                setAdded(true);
                                setTimeout(() => setAdded(false), 2000);
                            }}
                            className={`flex-1 ${added ? 'bg-green-50 text-green-600 border-green-200' : 'bg-white border-secondary/10 text-content'} border-2 py-5 rounded-[2rem] font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg shadow-black/5`}
                        >
                            <ShoppingCart size={18} />
                            {added ? 'Added!' : 'Add to Cart'}
                        </button>
                        <button 
                            onClick={() => { 
                                const prodToCart = {
                                    ...product,
                                    price: selectedVariant ? selectedVariant.price : product.price,
                                    weight: selectedVariant ? selectedVariant.weight : product.weight
                                };
                                addToCart(prodToCart, quantity); 
                                setIsCartOpen(true); 
                            }}
                            className="flex-1 bg-secondary text-white py-5 rounded-[2rem] font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-content transition-all active:scale-95 shadow-2xl shadow-secondary/30"
                        >
                            Purchase Now
                        </button>
                    </div>

                    {/* Description Section */}
                    <div className="pt-6 border-t border-secondary/5">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-secondary mb-3">Product Description</h4>
                        <p className="text-content/60 text-base leading-relaxed font-sans whitespace-pre-wrap">
                            {product.description || "Experience the authentic taste of India with our premium quality spices. Carefully sourced, cleaned, and packed to preserve their natural aroma and flavor."}
                        </p>
                    </div>

                    {/* Trust Architecture */}
                    <div className="bg-surface/30 p-8 rounded-[2.5rem] border border-secondary/5 grid grid-cols-3 gap-4">
                        <div className="flex flex-col items-center text-center gap-3">
                            <ShieldCheck size={24} className="text-secondary opacity-50" />
                            <span className="text-[9px] font-black uppercase tracking-tighter text-content/50">Verified<br/>Security</span>
                        </div>
                        <div className="flex flex-col items-center text-center gap-3 border-x border-secondary/10 px-4">
                            <CheckCircle size={24} className="text-secondary opacity-50" />
                            <span className="text-[9px] font-black uppercase tracking-tighter text-content/50">Premium<br/>Harvest</span>
                        </div>
                        <div className="flex flex-col items-center text-center gap-3">
                            <Truck size={24} className="text-secondary opacity-50" />
                            <span className="text-[9px] font-black uppercase tracking-tighter text-content/50">Express<br/>Shipping</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
