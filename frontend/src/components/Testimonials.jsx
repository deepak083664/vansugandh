import React, { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'Home Chef',
    text: "The aroma of VanSugandh's Garam Masala instantly transported me back to my grandmother's kitchen. Absolutely authentic!"
  },
  {
    id: 2,
    name: 'Rahul Deshmukh',
    role: 'Restaurant Owner',
    text: "We switched to VanSugandh spices for our restaurant a year ago, and our customers constantly rave about the enhanced flavors."
  },
  {
    id: 3,
    name: 'Anita Verma',
    role: 'Food Blogger',
    text: "The quality of their turmeric is unmatched. The deep golden color and rich earthy flavor make every dish stand out."
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="pt-8 pb-24 bg-surface overflow-hidden relative">
      {/* Background Element */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-10">
          <span className="text-secondary font-bold tracking-widest uppercase text-xs mb-3 block">From Our Customers</span>
          <h2 className="text-4xl md:text-5xl font-bold text-content">Words of Love</h2>
        </div>

        <div className="max-w-4xl mx-auto relative cursor-grab active:cursor-grabbing">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-700 ease-in-out" 
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((t) => (
                <div key={t.id} className="w-full shrink-0 flex flex-col items-center px-4 py-4">
                  <div className="bg-white p-10 md:p-14 rounded-2xl shadow-[0_10px_40px_rgb(0,0,0,0.05)] text-center relative max-w-3xl border border-content/5">
                    <Quote className="text-primary/20 absolute top-6 left-6 md:top-10 md:left-10" size={64} />
                    <p className="text-xl md:text-2xl text-content/80 font-display italic leading-relaxed mb-8 relative z-10">
                      "{t.text}"
                    </p>
                    <div className="w-16 h-1 bg-primary/30 mx-auto mb-6 rounded-full"></div>
                    <h4 className="text-xl font-bold text-content">{t.name}</h4>
                    <span className="text-sm tracking-widest uppercase text-content/40 font-bold">{t.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation Dots */}
          <div className="flex justify-center mt-10 gap-3">
            {testimonials.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setActiveIndex(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${activeIndex === i ? 'bg-secondary w-8' : 'bg-content/20 hover:bg-content/40'}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
