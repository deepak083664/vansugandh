import React from 'react';
import { 
  ShieldCheck, 
  User, 
  Eye, 
  Lock, 
  Share2, 
  Cookie, 
  CheckCircle, 
  FileText,
  Mail,
  Phone,
  ChevronUp
} from 'lucide-react';

const PrivacyPolicy = () => {
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sections = [
    {
      icon: User,
      title: "1. Information We Collect",
      content: "When you interact with our website, we may collect the following details: Name, Phone number, Email address, and Shipping/billing address. This is collected when you place an order or contact us."
    },
    {
      icon: Eye,
      title: "2. How We Use Your Information",
      content: "We use your data to process and deliver orders, provide customer support, improve our services, and send updates or offers (only if you opt-in)."
    },
    {
      icon: Lock,
      title: "3. Data Protection",
      content: "We take reasonable steps to protect your personal data from unauthorized access or misuse. However, please note that no online transmission is 100% secure."
    },
    {
      icon: Share2,
      title: "4. Sharing of Information",
      content: "We do not sell or rent your personal information. Details are only shared with trusted partners like delivery companies to fulfill your orders."
    },
    {
      icon: Cookie,
      title: "5. Cookies",
      content: "Our website may use cookies to improve your browsing experience and help us understand user behavior to serve you better."
    },
    {
      icon: CheckCircle,
      title: "6. Your Consent",
      content: "By using our website, you agree to the terms of this privacy policy and how we handle your data for a better experience."
    },
    {
      icon: FileText,
      title: "7. Policy Updates",
      content: "This policy may be updated from time to time. We recommend checking this page periodically to stay informed about any changes."
    }
  ];

  return (
    <div className="bg-[#fcfdfa] min-h-screen font-sans text-[#3a4a35] selection:bg-[#86a67a] selection:text-white pb-20">
      
      {/* Header */}
      <header className="bg-white border-b border-[#e9f0e6] py-12 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-black text-[#2d3a28] mb-4 text-secondary uppercase tracking-widest">Privacy Policy</h1>
        <div className="w-20 h-1 bg-secondary mx-auto mb-6 rounded-full"></div>
        <p className="max-w-2xl mx-auto text-[#6a7d65] font-medium leading-relaxed">
          At <span className="text-[#86a67a] font-bold">Vansugandh Pvt. Ltd.</span>, we respect your privacy and are committed to protecting your personal information. This policy explains how we collect, use, and safeguard your data.
        </p>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 max-w-4xl py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-3xl border border-[#e9f0e6] shadow-sm hover:shadow-md hover:border-[#86a67a]/30 transition-all group"
            >
              <div className="w-12 h-12 bg-[#f4f8f2] rounded-2xl flex items-center justify-center text-[#86a67a] mb-6 group-hover:scale-110 group-hover:bg-[#86a67a] group-hover:text-white transition-all">
                <section.icon size={24} />
              </div>
              <h2 className="text-xl font-bold text-[#2d3a28] mb-3">{section.title}</h2>
              <p className="text-[#6a7d65] leading-relaxed text-sm font-medium">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer Contact */}
      <footer className="container mx-auto px-4 max-w-4xl">
        <div className="bg-[#f4f8f2] rounded-[3rem] p-10 md:p-12 border border-[#e9f0e6] text-center space-y-6">
           <h3 className="text-2xl font-bold text-[#2d3a28]">Have any questions?</h3>
           <p className="text-[#6a7d65] font-medium italic font-serif">"Vansugandh – Where Every Spice Tells a Story."</p>
           <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-4">
              <a href="mailto:vansugandh@gmail.com" className="flex items-center gap-3 bg-white px-6 py-3 rounded-full border border-[#e9f0e6] hover:border-[#86a67a] text-[#3a4a35] font-bold transition-all shadow-sm">
                 <Mail size={18} className="text-[#86a67a]" />
                 vansugandh@gmail.com
              </a>
              <a href="tel:6206719403" className="flex items-center gap-3 bg-white px-6 py-3 rounded-full border border-[#e9f0e6] hover:border-[#86a67a] text-[#3a4a35] font-bold transition-all shadow-sm">
                 <Phone size={18} className="text-[#86a67a]" />
                 +91 6206719403
              </a>
           </div>
           <p className="text-[10px] uppercase tracking-widest text-[#6a7d65]/60 pt-8">
              © {new Date().getFullYear()} Vansugandh Pvt. Ltd. All rights reserved.
           </p>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button 
        onClick={scrollToTop}
        className="fixed bottom-24 right-6 md:right-10 bg-white border border-[#e9f0e6] text-[#86a67a] p-4 rounded-full shadow-lg hover:bg-[#86a67a] hover:text-white transition-all z-50 group active:scale-90"
      >
        <ChevronUp size={24} className="group-hover:-translate-y-1 transition-transform" />
      </button>

    </div>
  );
};

export default PrivacyPolicy;
