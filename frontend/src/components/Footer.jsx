import React from 'react';
import { Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-content text-surface pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Col */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <img src="/logo.jpeg" alt="VanSugandh" className="h-10 w-10 rounded-full" />
              <img src="/brandname.png" alt="VanSugandh" className="h-8 w-auto object-contain brightness-0 invert" />
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs font-medium">
              Bringing the most authentic, hand-picked, and sun-dried Indian spices directly to your kitchen. Taste the purity in every pinch.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-secondary hover:text-white transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://wa.me/message/HGMGQQTEPCS4C1" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-green-500 hover:text-white transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
              </a>
              <a href="tel:6206719403" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all">
                <Phone size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-[10px] mb-8">Quick Links</h4>
            <ul className="space-y-4 text-surface/70 text-sm">
              <li><a href="/about" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="/products" className="hover:text-primary transition-colors">Products Collection</a></li>
              <li><a href="/wholesale" className="hover:text-primary transition-colors">Wholesale</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
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
              <li className="flex items-center gap-3 hover:text-white transition-colors">
                <Phone size={18} className="text-secondary" />
                <a href="tel:6206719403">Phone: 6206719403</a>
              </li>
              <li className="flex items-center gap-3 hover:text-white transition-colors">
                <Mail size={18} className="text-secondary" />
                <a href="mailto:vansugandh@gmail.com">Email: vansugandh@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col gap-2 items-center md:items-start">
            <p className="text-surface/30 text-xs font-sans tracking-wide">
              © 2026 VanSugandh Foods Pvt Ltd. All Rights Reserved.
            </p>
            <p className="text-surface/60 text-sm font-bold tracking-wider">
              Designed and Developed by <a href="https://launchliftx.com" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-white transition-colors underline underline-offset-4">LaunchLiftX</a>
            </p>
          </div>
          <div className="flex gap-8 text-xs font-sans text-surface/30">
            <a href="/privacy" className="hover:text-primary">Privacy Policy</a>
            <a href="/terms" className="hover:text-primary">Terms of Service</a>
            <a href="/return-policy" className="hover:text-primary">Return Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
