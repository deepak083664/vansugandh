import React from 'react';
import { 
  ShieldCheck, 
  Info, 
  Tag, 
  ShoppingBag, 
  CreditCard, 
  Copyright, 
  AlertTriangle, 
  RefreshCcw,
  Mail,
  Phone,
  ChevronUp
} from 'lucide-react';

const AboutUs = () => {
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sections = [
    {
      icon: Info,
      title: "1. General Use",
      content: "This website is intended for personal and lawful use only. You agree not to use this website for any activity that may harm, disrupt, or misuse the platform."
    },
    {
      icon: Tag,
      title: "2. Product Information",
      content: "We try our best to ensure that all product descriptions, images, and details provided on the website are accurate and up to date. However, slight variations in color, packaging, or description may occur due to natural and technical factors."
    },
    {
      icon: ShoppingBag,
      title: "3. Pricing and Availability",
      content: "All prices listed on the website are subject to change without prior notice. Product availability may also change depending on stock. The final price charged will be the one displayed at the time of purchase."
    },
    {
      icon: ShieldCheck,
      title: "4. Orders and Acceptance",
      content: "Once an order is placed, you will receive a confirmation. However, Vansugandh Pvt. Ltd. reserves the right to accept or cancel any order due to reasons such as stock issues, pricing errors, or unforeseen circumstances."
    },
    {
      icon: CreditCard,
      title: "5. Payment",
      content: "All payments must be completed through the available payment methods on the website. We do not store your payment details."
    },
    {
      icon: Copyright,
      title: "6. Intellectual Property",
      content: "All content on this website, including text, images, logos, and graphics, belongs to Vansugandh Pvt. Ltd. and may not be used or reproduced without permission."
    },
    {
      icon: AlertTriangle,
      title: "7. Limitation of Liability",
      content: "We are not responsible for any direct or indirect damages resulting from the use or inability to use this website or our products."
    },
    {
      icon: RefreshCcw,
      title: "8. Changes to Terms",
      content: "We may update these terms from time to time. Continued use of the website means you accept the updated terms."
    }
  ];

  return (
    <div className="bg-[#fcfdfa] min-h-screen font-sans text-[#3a4a35] selection:bg-[#86a67a] selection:text-white pb-20">
      
      {/* Header */}
      <header className="bg-white border-b border-[#e9f0e6] py-12 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-black text-[#2d3a28] mb-4 text-secondary uppercase tracking-widest">About Us</h1>
        <div className="w-20 h-1 bg-secondary mx-auto mb-6 rounded-full"></div>
        <p className="max-w-2xl mx-auto text-[#6a7d65] font-medium leading-relaxed">
          Welcome to <span className="text-[#86a67a] font-bold">Vansugandh Pvt. Ltd.</span> By accessing or using our website, you agree to comply with the following terms and conditions. Please read them carefully before using our services.
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
           <h3 className="text-2xl font-bold text-[#2d3a28]">For any questions or support</h3>
           <p className="text-[#6a7d65] font-medium">Feel free to contact us:</p>
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

export default AboutUs;
