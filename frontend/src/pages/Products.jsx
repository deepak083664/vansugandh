import React, { useState, useEffect } from 'react';
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
    <div className="group bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] transition-all duration-500 border border-content/10 relative flex flex-col h-full hover:-translate-y-2">
      {product.tag && (
        <div className="absolute top-5 left-5 z-20">
            <span className="bg-secondary/95 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest leading-none shadow-md">
                {product.tag}
            </span>
        </div>
      )}
      
      <Link to={`/product/${product._id || product.id}`} className="absolute inset-0 z-30 block" />

      <div className="absolute top-5 right-5 z-40 flex flex-col gap-3 translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
          <button 
            onClick={() => toggleWishlist(product)}
            className={`p-3 rounded-full shadow-lg transition-all transform hover:scale-110 ${isWishlisted ? 'bg-red-500 text-white' : 'bg-white/90 backdrop-blur-md text-content hover:bg-red-500 hover:text-white'}`}
          >
              <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} strokeWidth={isWishlisted ? 0 : 2} />
          </button>
      </div>

      <div className="relative aspect-[4/5] overflow-hidden bg-surface">
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
        
        <img src={product.image || heroImage} alt={product.name} className="w-full h-full object-cover transform group-hover:scale-[1.15] transition-transform duration-700 ease-out z-0 relative origin-center" />
        
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

      <div className="p-6 pt-5 bg-white z-20 relative grow flex flex-col justify-between">
        <div>
            <div className="flex items-center gap-1.5 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} className={i < Math.floor(product.rating || 5) ? "fill-primary text-primary" : "text-gray-200"} />
              ))}
              <span className="text-[10px] text-content/30 ml-1 font-bold tracking-widest uppercase mt-0.5">({product.rating || 5.0})</span>
            </div>
            <h3 className="text-lg font-bold text-content leading-tight mb-4 group-hover:text-secondary transition-all duration-300 tracking-tight line-clamp-2 min-h-[3rem]">{product.name}</h3>
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

const Products = () => {
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
                    <div key={i} className="animate-pulse bg-white rounded-3xl h-[400px] shadow-sm border border-content/5"></div>
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
