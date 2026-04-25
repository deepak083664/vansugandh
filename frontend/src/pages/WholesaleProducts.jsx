import API_BASE_URL from '../config';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Store, ChevronRight, PackageOpen } from 'lucide-react';
import heroImage from '../assets/hero.png';

const fallbackWholesaleProducts = [
  { id: 101, name: 'Bulk Organic Turmeric', wholesalePrice: 110, price: 149, minWholesaleQty: 50, image: heroImage, tag: 'Bulk Deal' },
];

const WholesaleProductCard = ({ product }) => (
  <div className="group bg-white rounded-2xl overflow-hidden transition-all duration-500 relative flex flex-col h-full border border-secondary/5 shadow-md hover:shadow-2xl hover:-translate-y-1">
    {product.tag && (
      <div className="absolute top-4 left-4 z-20">
          <span className="bg-primary text-content text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
              {product.tag}
          </span>
      </div>
    )}
    
    <Link to={`/product/${product._id || product.id}`} className="absolute inset-0 z-30 block" />

    {/* Image Container */}
    <div className="relative aspect-square overflow-hidden bg-surface/50">
      <img src={product.image || heroImage} alt={product.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out" />
      
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center p-6">
          <button className="w-full bg-white text-content py-3 rounded-xl font-bold translate-y-4 group-hover:translate-y-0 transition-all duration-500 flex items-center justify-center gap-2 hover:bg-secondary hover:text-white shadow-xl">
            <ShoppingCart size={16} />
            <span className="text-xs uppercase tracking-widest">Add to Bulk Order</span>
          </button>
      </div>
    </div>

    <div className="p-5 flex flex-col grow bg-white">
      <div className="mb-4">
          <div className="flex items-center gap-2 mb-3 bg-secondary/5 w-fit px-3 py-1 rounded-full border border-secondary/5">
            <PackageOpen size={12} className="text-secondary" />
            <span className="text-[9px] font-black text-secondary uppercase tracking-widest">Min: {product.minWholesaleQty || 20} kg</span>
          </div>
          <h3 className="text-lg md:text-xl font-bold text-content font-display leading-snug hover:text-secondary transition-colors tracking-tight line-clamp-2 min-h-[2.5rem]">{product.name}</h3>
      </div>
      
      <div className="mt-auto pt-4 border-t border-secondary/5">
        <div className="flex items-center justify-between mb-2">
            <div className="flex flex-col">
                <span className="text-[8px] font-bold text-content/30 uppercase tracking-[0.2em] mb-1">Wholesale Rate</span>
                <span className="text-2xl font-black text-content tracking-tighter leading-none">₹{String(product.wholesalePrice || product.price).replace(/[^0-9.]/g, '')}</span>
            </div>
            <div className="flex flex-col items-end">
                <span className="text-[8px] font-bold text-content/20 uppercase tracking-[0.2em] mb-1">M.R.P.</span>
                <span className="text-sm font-bold text-content/20 line-through tracking-tighter leading-none">
                  ₹{product.price && product.price > (product.wholesalePrice || 0) 
                    ? String(product.price).replace(/[^0-9.]/g, '') 
                    : Math.round(parseFloat(String(product.wholesalePrice || product.price).replace(/[^0-9.]/g, '')) * 1.4)}
                </span>
            </div>
        </div>
        <div className="mt-2 bg-green-50 rounded-lg py-2 px-3 text-center border border-green-100">
            <span className="text-[9px] font-black text-green-600 uppercase tracking-widest">
              Save {product.price && product.price > (product.wholesalePrice || 0)
                ? Math.round((1 - (parseFloat(String(product.wholesalePrice).replace(/[^0-9.]/g, '')) / parseFloat(String(product.oldPrice || product.price).replace(/[^0-9.]/g, '')))) * 100)
                : 40}% with Bulk Pricing
            </span>
        </div>
      </div>
    </div>
  </div>
);

const WholesaleProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/products`);
        if (!res.ok) throw new Error('API Error');
        const data = await res.json();
        
        if (data && data.length > 0) {
          const wholesaleProds = data.filter(p => p.isWholesale);
          setProducts(wholesaleProds.length > 0 ? wholesaleProds : fallbackWholesaleProducts);
        } else {
          setProducts(fallbackWholesaleProducts);
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setProducts(fallbackWholesaleProducts);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  return (
    <div className="bg-surface/30 min-h-screen pt-3 md:pt-6 pb-12 md:pb-20 border-t border-content/5">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="mb-6 md:mb-8 bg-white p-6 md:p-12 rounded-[1.5rem] md:rounded-[2rem] shadow-sm border border-content/5 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
            <div className="text-center md:text-left">
                <div className="flex flex-col md:flex-row items-center gap-3 mb-3 md:mb-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-secondary/10 rounded-full flex items-center justify-center text-secondary shrink-0">
                        <Store size={20} className="md:w-6 md:h-6" />
                    </div>
                    <h1 className="text-2xl md:text-5xl font-bold font-display text-content">Wholesale Hub</h1>
                </div>
                <p className="text-content/70 text-sm md:text-lg max-w-xl font-sans leading-relaxed">Premium quality spices at wholesale rates. Fuel your business with Vansugandh's bulk authentic products.</p>
                <div className="flex items-center justify-center md:justify-start text-[10px] md:text-sm font-sans text-content/60 gap-2 mt-4 md:mt-6 uppercase tracking-widest font-bold">
                    <span>Home</span>
                    <ChevronRight size={12} className="md:w-3.5 md:h-3.5" />
                    <span className="text-secondary">Wholesale Store</span>
                </div>
            </div>
            <div className="hidden md:block shrink-0">
                <img src={heroImage} alt="Wholesale" className="w-32 h-32 md:w-48 md:h-48 object-cover rounded-full shadow-lg border-4 border-white" />
            </div>
        </div>

        <div className="w-full">
            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {loading ? (
                  [...Array(4)].map((_, i) => (
                    <div key={i} className="animate-pulse bg-white rounded-3xl h-[450px] shadow-sm border border-content/5"></div>
                  ))
                ) : (
                  products.map(product => (
                      <WholesaleProductCard key={product._id || product.id} product={product} />
                  ))
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default WholesaleProducts;
