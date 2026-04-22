import React, { useState, useEffect } from 'react';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/categories');
        if (res.ok) {
          const data = await res.json();
          setCategories(data);
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) return null;
  if (categories.length === 0) return null;

  return (
    <section className="pb-4 pt-0 bg-surface">
      <div className="w-full">
        <div className="text-center mb-16 pt-12 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-secondary/5 rounded-full blur-[100px] -z-10 animate-pulse"></div>
          <span className="bg-secondary/5 backdrop-blur-md text-secondary border border-secondary/10 font-black tracking-[0.3em] uppercase text-[10px] px-6 py-2 rounded-full mb-6 inline-block shadow-sm">
            Discover More
          </span>
          <h2 className="text-4xl md:text-7xl font-bold text-content font-brand tracking-tight leading-none">
            Shop by <span className="text-secondary italic">Category</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent mx-auto mt-8 rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 auto-rows-[350px]">
          {categories.map(cat => (
            <div 
                key={cat._id} 
                className="group relative rounded-none overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 w-full h-full"
            >
              <img src={cat.image || '/logo.jpeg'} alt={cat.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500"></div>
              
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-2xl font-bold text-white mb-2">{cat.name}</h3>
                <span className="text-white/90 font-bold uppercase text-[10px] tracking-widest group-hover:text-primary transition-colors flex items-center gap-2">
                  Explore Collection 
                  <span className="transform group-hover:translate-x-2 transition-transform duration-300">→</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
