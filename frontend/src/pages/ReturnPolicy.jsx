import React from 'react';
import { 
  ShieldCheck, 
  Package, 
  RotateCcw, 
  AlertCircle, 
  CreditCard, 
  XCircle,
  Mail,
  Phone,
  ChevronUp
} from 'lucide-react';

const ReturnPolicy = () => {
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sections = [
    {
      icon: Package,
      title: "1. Return Eligibility",
      content: "Returns are only accepted if the product is damaged, leaking, defective, or if you received the wrong item. Please inform us within 48 hours of delivery with clear photos/videos."
    },
    {
      icon: ShieldCheck,
      title: "2. Opened Packets",
      content: "For safety and hygiene reasons, we do not accept returns if the packet has been opened. Unopened and sealed packets may be eligible for return subject to approval."
    },
    {
      icon: AlertCircle,
      title: "3. Non-Returnable Conditions",
      content: "Returns are not accepted if the product is used, opened, the request is after 48 hours, or if damage occurred due to improper handling after delivery."
    },
    {
      icon: CreditCard,
      title: "4. Refund / Replacement",
      content: "Once approved, we will provide a replacement or initiate a refund to your original payment method. Refunds usually take 5–7 working days."
    },
    {
      icon: XCircle,
      title: "5. Order Cancellation",
      content: "Orders can only be cancelled before dispatch. Once the product has been shipped, cancellation will no longer be possible."
    },
    {
      icon: RotateCcw,
      title: "6. Need Help?",
      content: "For any return request or issue, please contact us with your order details at our official email or phone number listed below."
    }
  ];

  return (
    <div className="bg-[#fcfdfa] min-h-screen font-sans text-[#3a4a35] selection:bg-[#86a67a] selection:text-white pb-20">
      
      {/* Header */}
      <header className="bg-white border-b border-[#e9f0e6] py-12 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-black text-[#2d3a28] mb-4 text-secondary uppercase tracking-widest">Return & Refund</h1>
        <div className="w-20 h-1 bg-secondary mx-auto mb-6 rounded-full"></div>
        <p className="max-w-2xl mx-auto text-[#6a7d65] font-medium leading-relaxed">
          At <span className="text-[#86a67a] font-bold">Vansugandh Pvt. Ltd.</span>, we make sure that every pack of spices reaches you fresh, sealed, and in the best condition.
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
           <h3 className="text-2xl font-bold text-[#2d3a28]">Simple & Fair</h3>
           <p className="text-[#6a7d65] font-medium italic font-serif">"Vansugandh – Freshness sealed, trust delivered."</p>
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

export default ReturnPolicy;
