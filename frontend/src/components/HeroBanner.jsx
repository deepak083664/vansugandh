import React from 'react';
import { ShoppingBag, ArrowRight, Star, Leaf, Award } from 'lucide-react';
import heroBannerImg from '../assets/hero-banner.png';

const HeroBanner = () => {
  return (
    <section className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax-like effect */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/herobg.png" 
          alt="Premium Indian Spices" 
          className="w-full h-full object-cover scale-105"
        />
        {/* Modern multi-layer overlay - Adjusted for better visibility on the left */}
        <div className="absolute inset-0 bg-gradient-to-r from-content/60 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-content/40 to-transparent"></div>
      </div>

      {/* Decorative Floating Elements - Removed top-left element as requested */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden hidden lg:block">
        <div className="absolute bottom-1/4 right-20 animate-fade-in opacity-10 transform rotate-45 delay-300">
            <Star size={180} className="text-secondary fill-secondary/20" />
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10 h-full flex flex-col justify-end pb-20 md:pb-32">
        <div className="max-w-2xl animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-surface mb-6 leading-none drop-shadow-lg">
            <img 
              src="/brandname.png" 
              alt="VanSugandh" 
              className="h-10 md:h-20 w-auto object-contain mb-1" 
              style={{ filter: 'drop-shadow(0.5px 0.5px 0 white) drop-shadow(-0.5px -0.5px 0 white) drop-shadow(0.5px -0.5px 0 white) drop-shadow(-0.5px 0.5px 0 white)' }}
            />
            Pure Heritage
          </h1>
          
          <div className="flex flex-wrap gap-4">
            <button className="group bg-primary text-content px-8 py-3.5 rounded-full font-bold flex items-center gap-2 hover:bg-white transition-all shadow-xl hover:-translate-y-1 text-xs uppercase tracking-widest">
              Shop Now
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Hero Bottom Ornament */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-surface to-transparent z-10"></div>
    </section>
  );
};

export default HeroBanner;
