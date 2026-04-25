import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import turmeric from '../assets/turmeric.png';
import chilli from '../assets/chilli.png';
import masala from '../assets/masala.png';
import cardamom from '../assets/cardamom.png';
import heroImage from '../assets/hero.png';
import { ShoppingCart, Heart, Star, ChevronRight, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const fallbackProducts = [
  {
    id: 1,
    name: 'Organic Turmeric Powder',
    price: '₹149',
    oldPrice: '₹199',
    rating: 4.8,
    image: turmeric,
    tag: 'Best Seller'
  },
  {
    id: 2,
    name: 'Premium Kashmiri Chilli',
    price: '₹225',
    oldPrice: '₹280',
    rating: 4.9,
    image: chilli,
    tag: 'Must Try'
  },
  {
    id: 3,
    name: 'Royal Garam Masala',
    price: '₹185',
    oldPrice: '₹210',
    rating: 4.7,
    image: masala,
    tag: 'Authentic'
  },
  {
    id: 4,
    name: 'Imperial Green Cardamom',
    price: '₹450',
    oldPrice: '₹550',
    rating: 5.0,
    image: cardamom,
    tag: 'Luxury'
  }
];

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product._id);

  return (
    <div className="group bg-white rounded-2xl overflow-hidden transition-all duration-500 relative flex flex-col h-full border border-secondary/5 shadow-md hover:shadow-2xl hover:-translate-y-1">
      {/* Tag */}
      {product.tag && (
        <div className="absolute top-4 left-4 z-20">
            <span className="bg-primary text-content text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                {product.tag}
            </span>
        </div>
      )}
      
      <Link to={`/product/${product._id || product.id}`} className="absolute inset-0 z-30 block" />

      {/* Action Buttons */}
      <div className="absolute top-4 right-4 z-40 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
          <button 
            onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
            className={`p-3 rounded-full shadow-lg transition-all transform hover:scale-110 ${isWishlisted ? 'bg-red-500 text-white' : 'bg-white/90 backdrop-blur-md text-content hover:bg-red-500 hover:text-white'}`}
          >
              <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} strokeWidth={isWishlisted ? 0 : 2} />
          </button>
      </div>

      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-surface/50">
        <img 
          src={product.image || heroImage} 
          alt={product.name} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
        />
        
        {/* Quick Add Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center p-6">
            <button 
              onClick={(e) => { e.preventDefault(); addToCart(product); }}
              className="w-full bg-white text-content py-3 rounded-xl font-bold translate-y-4 group-hover:translate-y-0 transition-all duration-500 flex items-center justify-center gap-2 hover:bg-secondary hover:text-white shadow-xl"
            >
              <ShoppingCart size={16} />
              <span className="text-xs uppercase tracking-widest">Add to Bag</span>
            </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col grow bg-white">
        <div className="mb-3">
            {/* Star Rating */}
            <div className="flex items-center justify-end gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} className={i < Math.floor(product.rating || 4) ? "fill-primary text-primary" : "text-gray-200"} />
              ))}
              <span className="text-[10px] text-content/30 font-bold ml-1">({product.rating || 4.5})</span>
            </div>
            <h3 className="text-lg md:text-xl font-black text-content font-display leading-tight hover:text-secondary transition-colors tracking-tight line-clamp-2">
              {product.name}
            </h3>
        </div>
        
        <div className="mt-1 flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-content tracking-tighter">
                  ₹{String(product.price).replace(/[^0-9.]/g, '')}
                </span>
                <span className="text-[10px] font-black text-green-600 bg-green-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {product.discount > 0 
                    ? product.discount 
                    : product.oldPrice 
                      ? Math.round((1 - (parseFloat(String(product.price).replace(/[^0-9.]/g, '')) / parseFloat(String(product.oldPrice).replace(/[^0-9.]/g, '')))) * 100)
                      : 25}% OFF
                </span>
              </div>
              <span className="text-xs text-content/30 line-through font-bold">
                M.R.P. ₹{product.oldPrice 
                  ? String(product.oldPrice).replace(/[^0-9.]/g, '') 
                  : Math.round(parseFloat(String(product.price).replace(/[^0-9.]/g, '')) * 1.25)}
              </span>
            </div>
            

          </div>
        </div>
      </div>
    </div>
  );
};

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/products');
        if (!res.ok) throw new Error('API Error');
        const data = await res.json();
        
        if (data && data.length > 0) {
          setProducts(data);
        } else {
          setProducts(fallbackProducts);
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setProducts(fallbackProducts); // fallback gracefully to showcase UI design
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  return (
    <section className="pb-24 pt-0 bg-surface/30">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-8 relative">
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-[120px] -z-10"></div>
          <div className="max-w-2xl">
            <span className="text-secondary font-black tracking-[0.3em] uppercase text-[10px] mb-1 block opacity-60">Premium Collection</span>
            <h2 className="text-4xl md:text-7xl font-bold text-content font-brand tracking-tight leading-[0.9] uppercase">Our <span className="text-secondary italic lowercase font-normal">Products</span></h2>
            <div className="w-20 h-1 bg-secondary mt-8 rounded-full"></div>
          </div>
          <button 
            onClick={() => window.location.href='/products'} 
            className="group self-end md:self-auto flex items-center gap-2 bg-white border border-secondary/10 px-4 py-2 rounded-none shadow-sm hover:bg-secondary hover:text-white transition-all duration-300 -mt-12 md:mt-0"
          >
             <span className="font-black uppercase tracking-[0.2em] text-[9px]">View All Collection</span>
             <div className="w-6 h-6 rounded-none bg-secondary/10 flex items-center justify-center group-hover:bg-white/20 transition-all">
                <ChevronRight size={12} />
             </div>
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {loading ? (
            [...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse bg-white rounded-none h-[450px] shadow-sm border border-secondary/5"></div>
            ))
          ) : (
            products
              .filter(p => !p.isWholesale)
              .slice(0, 4)
              .map(product => (
                <ProductCard key={product._id || product.id} product={product} />
              ))
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
