import React from 'react';
import HeroBanner from '../components/HeroBanner';
import Features from '../components/Features';
import Categories from '../components/Categories';
import FeaturedProducts from '../components/FeaturedProducts';
import About from '../components/About';
import Testimonials from '../components/Testimonials';

const Home = () => {
  return (
    <div className="flex flex-col">
      <div className="order-1">
        <HeroBanner />
      </div>

      <div className="order-last lg:order-2">
        <Features />
      </div>
      
      {/* Decorative Divider - also reordered */}
      <div className="w-full h-12 bg-gradient-to-b from-surface to-white flex items-center justify-center overflow-hidden order-2 lg:order-none">
          <div className="flex gap-4">
              {[...Array(20)].map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-primary/20"></div>
              ))}
          </div>
      </div>

      <div className="order-3 lg:order-4">
        <Categories />
      </div>

      <div className="order-2 lg:order-3 pt-2 md:pt-4">
        <FeaturedProducts />
      </div>

      <div className="order-4 lg:order-5">
        <About />
      </div>

      <div className="order-5 lg:order-6">
        <Testimonials />
      </div>

    </div>
  );
};

export default Home;
