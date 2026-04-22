import React from 'react';
import { ShoppingBag, ArrowRight, Star, Leaf, Award } from 'lucide-react';
import heroBannerImg from '../assets/hero-banner.png';

const HeroBanner = () => {
  return (
    <section className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax-like effect */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBannerImg} 
          alt="Premium Indian Spices" 
          className="w-full h-full object-cover scale-105"
        />
        {/* Modern multi-layer overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-content/90 via-content/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-content/20 to-transparent"></div>
      </div>

      {/* Decorative Floating Elements (CSS animated) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden hidden lg:block">
        <div className="absolute top-1/4 left-10 animate-fade-in opacity-20 transform -rotate-12">
            <Leaf size={120} className="text-primary fill-primary/20" />
        </div>
        <div className="absolute bottom-1/4 right-20 animate-fade-in opacity-10 transform rotate-45 delay-300">
            <Star size={180} className="text-secondary fill-secondary/20" />
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl animate-fade-in">
          <h1 className="text-7xl md:text-9xl font-bold text-surface mb-8 leading-[1]">
            <span className="block italic font-brand text-primary drop-shadow-sm mb-2 text-5xl md:text-6xl">VanSugandh</span>
            Pure Heritage
          </h1>
          
          <div className="flex flex-wrap gap-6">
            <button className="group bg-primary text-content px-12 py-5 rounded-full font-bold flex items-center gap-3 hover:bg-white transition-all shadow-2xl hover:shadow-primary/20 hover:-translate-y-1">
              Shop Now
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
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
