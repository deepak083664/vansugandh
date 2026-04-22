import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-content text-surface pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Col */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <img src="/logo.jpeg" alt="VanSugandh" className="h-10 w-10 rounded-full" />
              <span className="text-2xl font-bold tracking-tight text-white font-brand">VanSugandh</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs font-medium">
              Bringing the most authentic, hand-picked, and sun-dried Indian spices directly to your kitchen. Taste the purity in every pinch.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-[10px] mb-8">Quick Links</h4>
            <ul className="space-y-4 text-surface/70 text-sm">
              {['About Us', 'Products Collection', 'Wholesale', 'Contact Us'].map((item) => (
                <li key={item}><a href={item === 'Products Collection' ? '/products' : item === 'Wholesale' ? '/wholesale' : '#'} className="hover:text-primary transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-[10px] mb-8">Shop By Category</h4>
            <ul className="space-y-4 text-surface/70 text-sm">
              {['Whole Spices', 'Ground Spices', 'Blends', 'Masalas', 'Organic Herbs'].map((item) => (
                <li key={item}><a href="#" className="hover:text-primary transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-[10px] mb-8">Get In Touch</h4>
            <ul className="space-y-4 text-surface/70 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-[#ea4335] shrink-0 fill-[#ea4335]/10" />
                <span>124/B Heritage Square, Old Town Market, Mumbai — 400001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-[#2563eb] shrink-0 fill-[#2563eb]/10" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-[#ea4335] shrink-0 fill-[#ea4335]/10" />
                <span>hello@vansugandh.com</span>
              </li>
            </ul>
            
            <div className="mt-8">
                <p className="text-xs font-bold uppercase tracking-widest text-surface/40 mb-3">Subscribe to Newsletter</p>
                <div className="flex gap-2">
                    <input type="email" placeholder="Email Address" className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg focus:outline-none focus:border-primary flex-1 text-sm" />
                    <button className="bg-primary text-content px-4 py-2 rounded-lg font-bold hover:bg-white transition-colors">Join</button>
                </div>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-surface/30 text-xs font-sans tracking-wide">
            © 2026 VanSugandh Foods Pvt Ltd. All Rights Reserved.
          </p>
          <div className="flex gap-8 text-xs font-sans text-surface/30">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms of Service</a>
            <a href="#" className="hover:text-primary">Return Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
