import React from 'react';
import { Leaf, ShieldCheck, Truck, Clock } from 'lucide-react';

const featuresList = [
  { icon: Leaf, title: '100% Natural', desc: 'No artificial colors or preservatives added.' },
  { icon: ShieldCheck, title: 'Premium Quality', desc: 'Handpicked from the finest farms in India.' },
  { icon: Truck, title: 'Fast Delivery', desc: 'Secure packaging and quick nationwide delivery.' },
  { icon: Clock, title: 'Authentic Taste', desc: 'Traditional processing for maximum aroma.' },
];

const Features = () => {
  return (
    <section className="py-16 bg-white border-y border-content/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {featuresList.map((f, i) => (
            <div key={i} className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 rounded-full bg-surface group-hover:bg-primary/10 flex items-center justify-center mb-6 transition-colors duration-300">
                <f.icon className="text-secondary group-hover:text-primary transition-colors duration-300" size={32} />
              </div>
              <h4 className="text-lg font-bold text-content mb-3">{f.title}</h4>
              <p className="text-content/60 text-sm leading-relaxed max-w-xs">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
