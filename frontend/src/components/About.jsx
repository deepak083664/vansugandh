import React from 'react';
import aboutImage from '../assets/about.png';
import { Award, Zap, ShieldCheck } from 'lucide-react';

const About = () => {
  return (
    <section className="pb-8 pt-0 bg-surface relative overflow-hidden">
      {/* Full-width Image Banner */}
      <div className="w-full h-[400px] md:h-[600px] relative overflow-hidden mb-16">
          <img 
              src={aboutImage} 
              alt="Spice Heritage" 
              className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20"></div>
      </div>

      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto space-y-12 text-center">
            <div>
              <h2 className="flex flex-col items-center gap-4 text-4xl md:text-5xl font-bold text-content leading-tight tracking-tight">
                <img src="/brandname.png" alt="VanSugandh" className="h-16 md:h-24 w-auto object-contain" />
                <span className="text-secondary uppercase text-xl font-black tracking-[0.1em]">The Fragrance of Purity</span>
              </h2>
            </div>
            
            <p className="text-lg md:text-xl text-content/60 leading-relaxed font-medium max-w-2xl mx-auto italic">
              "We don't just sell spices; we deliver the essence of Indian heritage. Every grain of VanSugandh is a testament to the soil, the sun, and the hands that nurtured it."
            </p>
            
            <p className="text-content/70 leading-relaxed max-w-3xl mx-auto">
              Derived from "Van" (Forest) and "Sugandh" (Fragrance), our name reflects our commitment to natural purity. For over four decades, we have sourced the finest whole spices directly from farmers across India, ensuring that only the most aromatic and flavorful spices reach your kitchen.
            </p>
            
            <div className="grid grid-cols-3 gap-3 md:gap-6 pt-4 max-w-4xl mx-auto">
                <div className="p-4 md:p-8 bg-white rounded-none shadow-sm border border-content/5 group hover:bg-secondary transition-all flex flex-col items-center">
                    <Award className="text-secondary group-hover:text-white mb-2 md:mb-4 transition-colors" size={24} />
                    <h4 className="font-bold text-content group-hover:text-white transition-colors uppercase tracking-widest text-[8px] md:text-xs text-center">Premium Grade</h4>
                </div>
                <div className="p-4 md:p-8 bg-white rounded-none shadow-sm border border-content/5 group hover:bg-secondary transition-all flex flex-col items-center">
                    <Zap className="text-secondary group-hover:text-white mb-2 md:mb-4 transition-colors" size={24} />
                    <h4 className="font-bold text-content group-hover:text-white transition-colors uppercase tracking-widest text-[8px] md:text-xs text-center">Traditional Method</h4>
                </div>
                <div className="p-4 md:p-8 bg-white rounded-none shadow-sm border border-content/5 group hover:bg-secondary transition-all flex flex-col items-center">
                    <ShieldCheck className="text-secondary group-hover:text-white mb-2 md:mb-4 transition-colors" size={24} />
                    <h4 className="font-bold text-content group-hover:text-white transition-colors uppercase tracking-widest text-[8px] md:text-xs text-center">No Additives</h4>
                </div>
            </div>
            
            <div className="pt-8">
              <button className="bg-content text-white px-12 py-5 rounded-none font-bold hover:bg-primary hover:text-content transition-all shadow-xl shadow-content/10 uppercase tracking-[0.2em] text-sm">
                  Read Our Story
              </button>
            </div>
          </div>
        </div>
    </section>
  );
};

export default About;
