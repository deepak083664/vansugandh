import React from 'react';
import { LayoutDashboard, Package, ShoppingCart, Users, BarChart3, LogOut, Store, ChevronRight, X, Tag, Zap } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, onLogout, isOpen, onClose }) => {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={20} /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={20} /> },
    { id: 'products', label: 'Products', icon: <Package size={20} /> },
    { id: 'categories', label: 'Categories', icon: <Store size={20} /> },
    { id: 'orders', label: 'Orders', icon: <ShoppingCart size={20} /> },
    { id: 'users', label: 'Users', icon: <Users size={20} /> },
    { id: 'coupons', label: 'Coupons', icon: <Tag size={20} /> },
    { id: 'discounts', label: 'Bulk Discount', icon: <Zap size={20} /> },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-content/20 backdrop-blur-sm z-50 lg:hidden"
          onClick={onClose}
        />
      )}

      <div className={`fixed lg:sticky top-0 left-0 z-50 w-72 h-screen bg-white border-r border-secondary/5 flex flex-col transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-8 pb-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-secondary rounded-2xl flex items-center justify-center text-white shadow-xl shadow-secondary/20">
              <Store size={22} />
            </div>
            <div>
              <h1 className="text-xl font-black font-display text-content leading-none">Admin<span className="text-secondary">Hub</span></h1>
              <p className="text-[10px] font-bold text-content/30 uppercase tracking-[0.2em] mt-1.5">Vansugandh v2.0</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden p-2 text-content/20 hover:text-secondary hover:bg-surface rounded-xl transition-all">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-1.5">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                if (window.innerWidth < 1024) onClose();
              }}
              className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all group ${activeTab === item.id ? 'bg-secondary text-white shadow-lg shadow-secondary/20' : 'text-content/50 hover:bg-surface hover:text-content'}`}
            >
              <div className="flex items-center gap-3.5">
                <span className={`${activeTab === item.id ? 'text-white' : 'text-secondary/50 group-hover:text-secondary'} transition-colors`}>
                  {item.icon}
                </span>
                <span className="text-sm font-bold tracking-tight">{item.label}</span>
              </div>
              {activeTab === item.id && <ChevronRight size={14} className="opacity-50" />}
            </button>
          ))}
        </nav>

        <div className="p-6 mt-auto border-t border-secondary/5">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3.5 text-red-500 font-bold text-sm bg-red-50/50 hover:bg-red-50 rounded-2xl transition-all active:scale-[0.98]"
          >
            <LogOut size={20} />
            Logout System
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
