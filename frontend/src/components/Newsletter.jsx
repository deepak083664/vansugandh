import React from 'react';

const Newsletter = () => {
  return (
    <section className="py-24 bg-secondary relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-10 left-10 w-40 h-40 border-4 border-white rounded-full"></div>
            <div className="absolute bottom-10 right-10 w-60 h-60 border-4 border-white rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 w-80 h-80 border-2 border-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Join Our Spice Community</h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
                Subscribe to receive recipe inspirations, new product drops, and exclusive wholesale offers.
            </p>
            <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4 p-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-2xl">
                <input 
                    type="email" 
                    placeholder="Enter your email address" 
                    className="flex-1 px-6 py-4 bg-transparent border-none text-white placeholder:text-white/60 focus:outline-none focus:ring-0 text-lg w-full font-sans" 
                />
                <button className="bg-white text-secondary px-8 py-4 rounded-full font-bold text-lg hover:bg-primary hover:text-content transition-all shadow-md active:scale-95 shrink-0 flex items-center justify-center gap-2">
                    Subscribe
                </button>
            </div>
            <p className="mt-8 text-white/50 text-sm font-sans tracking-widest uppercase font-bold">We respect your privacy. No spam, ever.</p>
        </div>
    </section>
  );
};

export default Newsletter;
