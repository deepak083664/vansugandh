import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import turmeric from '../assets/turmeric.png';
import chilli from '../assets/chilli.png';
import masala from '../assets/masala.png';
import cardamom from '../assets/cardamom.png';
import heroImage from '../assets/hero.png';
import { ShoppingCart, Heart, Star, ChevronRight } from 'lucide-react';
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
    <div className="group bg-white rounded-none overflow-hidden transition-all duration-500 relative flex flex-col h-full">
      {/* Tag */}
      {product.tag && (
        <div className="absolute top-5 left-5 z-20">
            <span className="bg-secondary/95 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest leading-none shadow-md">
                {product.tag}
            </span>
        </div>
      )}
      
      <Link to={`/product/${product._id || product.id}`} className="absolute inset-0 z-30 block" />

      {/* Action Buttons */}
      <div className="absolute top-5 right-5 z-40 flex flex-col gap-3 translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
          <button 
            onClick={() => toggleWishlist(product)}
            className={`p-3 rounded-full shadow-lg transition-all transform hover:scale-110 ${isWishlisted ? 'bg-red-500 text-white' : 'bg-white/90 backdrop-blur-md text-content hover:bg-red-500 hover:text-white'}`}
          >
              <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} strokeWidth={isWishlisted ? 0 : 2} />
          </button>
      </div>

      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-surface">
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
        
        <img 
          src={product.image || heroImage} 
          alt={product.name} 
          className="w-full h-full object-cover transform group-hover:scale-[1.15] transition-transform duration-700 ease-out z-0 relative origin-center"
        />
        
        {/* Quick Add Button */}
        <div className="absolute bottom-6 left-0 right-0 px-6 z-40 flex justify-center">
            <button 
              onClick={() => addToCart(product)}
              className="w-full bg-white text-content py-3.5 rounded-2xl font-bold translate-y-16 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-2 hover:bg-secondary hover:text-white shadow-xl hover:shadow-secondary/30"
            >
              <ShoppingCart size={18} className="transform group-hover:-rotate-12 transition-transform duration-300" />
              <span>Add to Cart</span>
            </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 bg-white z-20 relative grow flex flex-col">
        <div className="mb-4">
            <h3 className="text-lg font-bold text-content leading-tight group-hover:text-secondary transition-all duration-300 tracking-tight line-clamp-2 min-h-[3rem]">
              {product.name}
            </h3>
        </div>
        
        <div className="flex items-center gap-3 mt-auto">
          <span className="text-2xl font-black text-content tracking-tighter">
            ₹{String(product.price).replace(/[^0-9.]/g, '')}
          </span>
          
          {product.oldPrice && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-content/20 line-through font-bold">
                ₹{String(product.oldPrice).replace(/[^0-9.]/g, '')}
              </span>
              <span className="text-[10px] font-black text-white bg-secondary px-2 py-1 rounded-lg uppercase tracking-widest">
                {Math.round((1 - (parseFloat(String(product.price).replace(/[^0-9.]/g, '')) / parseFloat(String(product.oldPrice).replace(/[^0-9.]/g, '')))) * 100)}% OFF
              </span>
            </div>
          )}
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
    <section className="pb-24 pt-0 bg-white/50">
      <div className="w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-8 px-4 md:px-8 relative">
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-[120px] -z-10"></div>
          <div className="max-w-2xl">
            <span className="text-secondary font-black tracking-[0.3em] uppercase text-[10px] mb-4 block opacity-60">Premium Collection</span>
            <h2 className="text-4xl md:text-7xl font-bold text-content font-brand tracking-tight leading-[0.9] uppercase">Our <span className="text-secondary italic lowercase font-normal">exclusive</span> Products</h2>
            <div className="w-20 h-1 bg-secondary mt-8 rounded-full"></div>
          </div>
          <button className="group flex items-center gap-3 text-content/60 font-black uppercase tracking-widest text-[10px] hover:text-secondary transition-all">
             <span className="border-b-2 border-primary/20 pb-1 group-hover:border-secondary transition-all">View All Collection</span>
             <div className="w-8 h-8 rounded-full bg-surface flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-all">
                <ChevronRight size={14} />
             </div>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
          {loading ? (
            [...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse bg-surface rounded-3xl h-[450px] shadow-sm border border-content/5"></div>
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
