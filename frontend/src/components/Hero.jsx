import React from 'react';
import heroImage from '../assets/hero.png';

const Hero = () => {
  return (
    <section className="relative w-full min-h-[85vh] flex items-center overflow-hidden bg-surface">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div className="animate-fade-in">
          <span className="text-secondary font-bold tracking-[0.2em] uppercase text-[10px] mb-4 block">Authentic Indian Flavors</span>
          <h2 className="text-5xl md:text-7xl font-bold text-content leading-[1.1] mb-8 tracking-tight">
            Bring the Soul of <span className="text-secondary">India</span> to Your Kitchen
          </h2>
          <p className="text-lg text-content/60 max-w-lg mb-10 leading-relaxed font-medium">
            Handpicked, sun-dried, and traditionally ground spices. Experience the aroma and purity that has defined Indian cooking for generations.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-secondary text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-content transition-all shadow-xl shadow-secondary/20 hover:-translate-y-1">
              Shop Now
            </button>
            <button className="bg-white border-2 border-secondary/10 text-content px-10 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:border-secondary transition-all">
              Explore Blends
            </button>
          </div>
          
          <div className="mt-12 flex items-center gap-8">
            <div className="flex flex-col">
                <span className="text-2xl font-bold text-content">50+</span>
                <span className="text-xs uppercase tracking-widest text-content/50">Pure Spices</span>
            </div>
            <div className="h-10 w-px bg-content/10"></div>
            <div className="flex flex-col">
                <span className="text-2xl font-bold text-content">100%</span>
                <span className="text-xs uppercase tracking-widest text-content/50">Organic</span>
            </div>
            <div className="h-10 w-px bg-content/10"></div>
            <div className="flex flex-col">
                <span className="text-2xl font-bold text-content">24h</span>
                <span className="text-xs uppercase tracking-widest text-content/50">Fast Delivery</span>
            </div>
          </div>
        </div>
        
        <div className="relative h-full flex justify-center items-center">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/10 rounded-full blur-3xl"></div>
            <div className="relative z-10 w-full max-w-md mx-auto transform hover:scale-105 transition-transform duration-700">
                <img 
                    src={heroImage} 
                    alt="Indian Spices Hero" 
                    className="w-full h-auto rounded-2xl shadow-2xl border-8 border-white"
                />
                {/* Decorative element */}
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce">
                    <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-white">✓</div>
                    <div>
                        <p className="text-xs text-content/60 font-medium">Bestseller</p>
                        <p className="font-bold text-content">Garam Masala</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 transform origin-top translate-x-20"></div>
    </section>
  );
};

export default Hero;
