import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../config';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star, Filter, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import turmeric from '../assets/turmeric.png';
import chilli from '../assets/chilli.png';
import masala from '../assets/masala.png';
import cardamom from '../assets/cardamom.png';
import heroImage from '../assets/hero.png';

const fallbackProducts = [
  { id: 1, name: 'Organic Turmeric Powder', price: '₹149', oldPrice: '₹199', rating: 4.8, image: turmeric, tag: 'Best Seller' },
  { id: 2, name: 'Premium Kashmiri Chilli', price: '₹225', oldPrice: '₹280', rating: 4.9, image: chilli, tag: 'Must Try' },
  { id: 3, name: 'Royal Garam Masala', price: '₹185', oldPrice: '₹210', rating: 4.7, image: masala, tag: 'Authentic' },
  { id: 4, name: 'Imperial Green Cardamom', price: '₹450', oldPrice: '₹550', rating: 5.0, image: cardamom, tag: 'Luxury' },
  { id: 5, name: 'Cumin Seeds (Jeera)', price: '₹160', oldPrice: '₹185', rating: 4.6, image: heroImage, tag: 'Pure' },
  { id: 6, name: 'Guntur Red Chilli', price: '₹210', oldPrice: '₹250', rating: 4.8, image: chilli, tag: 'Spicy' },
];

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product._id);

  return (
    <div className="group bg-white rounded-2xl overflow-hidden transition-all duration-500 relative flex flex-col h-full border border-secondary/5 shadow-md hover:shadow-2xl hover:-translate-y-1">
      {product.tag && (
        <div className="absolute top-4 left-4 z-20">
            <span className="bg-primary text-content text-[9px] font-bold px-2 py-1 rounded-full uppercase tracking-widest shadow-sm">
                {product.tag}
            </span>
        </div>
      )}
      
      <Link to={`/product/${product._id || product.id}`} className="absolute inset-0 z-30 block" />

      <div className="absolute top-4 right-4 z-40 flex flex-col gap-2 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
          <button 
            onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
            className={`p-2.5 rounded-full shadow-lg transition-all transform hover:scale-110 ${isWishlisted ? 'bg-red-500 text-white' : 'bg-white/90 backdrop-blur-md text-content hover:bg-red-500 hover:text-white'}`}
          >
              <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} strokeWidth={isWishlisted ? 0 : 2} />
          </button>
      </div>

      <div className="relative aspect-square overflow-hidden bg-surface/50">
        <img src={product.image || heroImage} alt={product.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out" />
        
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center p-4">
            <button 
              onClick={(e) => { e.preventDefault(); addToCart(product); }}
              className="w-full bg-white text-content py-3 rounded-xl font-bold translate-y-4 group-hover:translate-y-0 transition-all duration-500 flex items-center justify-center gap-2 hover:bg-secondary hover:text-white shadow-xl"
            >
              <ShoppingCart size={14} />
              <span className="text-[9px] uppercase tracking-widest">Add to Bag</span>
            </button>
        </div>
      </div>

      <div className="p-4 flex flex-col grow bg-white">
        <div className="mb-2">
            {/* Star Rating */}
            <div className="flex items-center justify-end gap-1 mb-1.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={10} className={i < Math.floor(product.rating || 4) ? "fill-primary text-primary" : "text-gray-200"} />
              ))}
              <span className="text-[9px] text-content/30 font-bold ml-1">({product.rating || 4.5})</span>
            </div>
            <h3 className="text-base md:text-lg font-black text-content font-display leading-tight hover:text-secondary transition-colors tracking-tight line-clamp-2">{product.name}</h3>
        </div>
        
        <div className="mt-1 flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <span className="text-[8px] font-black text-secondary uppercase tracking-wider">
              -{product.discount > 0 
                ? product.discount 
                : product.oldPrice 
                  ? Math.round((1 - (parseFloat(String(product.price).replace(/[^0-9.]/g, '')) / parseFloat(String(product.oldPrice).replace(/[^0-9.]/g, '')))) * 100)
                  : 25}%
            </span>
            <span className="text-[10px] text-content/30 line-through font-bold">
              ₹{product.oldPrice 
                ? String(product.oldPrice).replace(/[^0-9.]/g, '') 
                : Math.round(parseFloat(String(product.price).replace(/[^0-9.]/g, '')) * 1.25)}
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-black text-content tracking-tighter leading-none">
              ₹{String(product.price).replace(/[^0-9.]/g, '')}
            </span>
            <span className="text-[8px] text-content/40 font-bold uppercase tracking-widest">M.R.P.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/products`);
        if (!res.ok) throw new Error('API Error');
        const data = await res.json();
        
        if (data && data.length > 0) {
          setProducts(data);
        } else {
          setProducts(fallbackProducts);
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setProducts(fallbackProducts);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  return (
    <div className="bg-surface/30 min-h-screen py-8 md:py-16 border-t border-content/5">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="mb-8 md:mb-12 text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-bold text-content mb-3 tracking-tight">Our Spices</h1>
            <div className="flex items-center justify-center md:justify-start text-xs font-sans text-content/60 gap-2">
                <span>Home</span>
                <ChevronRight size={12} />
                <span className="text-secondary font-semibold">Products</span>
            </div>
        </div>

        <div className="w-full">
            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                {loading ? (
                  [...Array(10)].map((_, i) => (
                    <div key={i} className="animate-pulse bg-white rounded-none h-[400px] shadow-sm border border-content/5"></div>
                  ))
                ) : (
                  products
                    .filter(p => !p.isWholesale)
                    .map(product => (
                      <ProductCard key={product._id || product.id} product={product} />
                    ))
                )}
            </div>
            
            {/* Pagination UI */}
            <div className="flex justify-center mt-16 gap-2">
                {['1', '2', '3', '...'].map((p, i) => (
                    <button key={i} className={`w-10 h-10 rounded-full font-bold flex items-center justify-center transition-all ${i === 0 ? 'bg-secondary text-white shadow-md' : 'bg-white text-content border border-content/10 hover:bg-surface'}`}>
                        {p}
                    </button>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
