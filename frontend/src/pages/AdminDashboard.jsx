import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar';
import Overview from '../components/admin/Overview';
import Analytics from '../components/admin/Analytics';
import ProductManager from '../components/admin/ProductManager';
import CategoryManager from '../components/admin/CategoryManager';
import OrderManager from '../components/admin/OrderManager';
import UserManager from '../components/admin/UserManager';
import CouponManager from '../components/admin/CouponManager';
import BulkDiscountManager from '../components/admin/BulkDiscountManager';
import { Search, Bell, User as UserIcon, Menu } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview'); // overview, products, orders, users, analytics
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [stats, setStats] = useState({});
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchAllData();
  }, [navigate]);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [statsRes, ordersRes, usersRes, revRes] = await Promise.all([
        fetch('http://localhost:5000/api/admin/stats'),
        fetch('http://localhost:5000/api/admin/orders'),
        fetch('http://localhost:5000/api/admin/users'),
        fetch('http://localhost:5000/api/admin/analytics/revenue')
      ]);

      if (statsRes.ok) setStats(await statsRes.json());
      if (ordersRes.ok) setOrders(await ordersRes.json());
      if (usersRes.ok) setUsers(await usersRes.json());
      if (revRes.ok) setRevenueData(await revRes.json());
      
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <Overview stats={stats} />;
      case 'analytics': return <Analytics revenueData={revenueData} />;
      case 'products': return <ProductManager />;
      case 'categories': return <CategoryManager />;
      case 'orders': return <OrderManager orders={orders} />;
      case 'users': return <UserManager users={users} onDeleteUser={(id) => { /* Reuse logic */ }} />;
      case 'coupons': return <CouponManager />;
      case 'discounts': return <BulkDiscountManager />;
      default: return <Overview stats={stats} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col lg:flex-row">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={handleLogout} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      
      <main className="flex-1 min-h-screen overflow-y-auto no-scrollbar pb-20">
        {/* Top Header */}
        <div className="bg-white/80 backdrop-blur-xl border-b border-secondary/5 sticky top-0 z-40 px-4 md:px-10 py-5 flex items-center justify-between">
           <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 bg-surface text-secondary rounded-xl"
              >
                <Menu size={20} />
              </button>
              <div>
                <h2 className="text-lg md:text-xl font-black text-content font-display capitalize">{activeTab}</h2>
                <p className="text-[9px] md:text-[10px] font-bold text-content/30 uppercase tracking-widest mt-0.5">Control Center</p>
              </div>
           </div>
           
           <div className="flex items-center gap-3 md:gap-6">
              <div className="relative hidden md:block">
                 <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-content/20" />
                 <input type="text" placeholder="Quick search..." className="bg-surface pl-10 pr-4 py-2 rounded-xl text-xs font-bold outline-none w-48 lg:w-64 focus:ring-2 focus:ring-secondary/10" />
              </div>
              <div className="flex items-center gap-2 md:gap-3 md:border-l md:border-secondary/10 md:pl-6">
                 <button className="p-2 md:p-2.5 bg-surface text-content/40 hover:text-secondary rounded-xl transition-all relative">
                    <Bell size={18} />
                    <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-primary rounded-full border border-white" />
                 </button>
                 <div className="flex items-center gap-2 md:gap-3 ml-1 md:ml-2">
                    <div className="text-right hidden sm:block">
                       <p className="text-[10px] md:text-xs font-black text-content leading-none">Vansugandh Admin</p>
                       <p className="text-[8px] md:text-[9px] font-bold text-green-500 uppercase tracking-tighter mt-1">Super Admin</p>
                    </div>
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary">
                        <UserIcon size={18} />
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <div className="p-4 md:p-10 font-sans">
           {loading ? (
             <div className="flex flex-col items-center justify-center py-40 gap-4">
                <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
                <p className="text-[10px] font-black uppercase tracking-widest text-content/40">Synchronizing Dashboard...</p>
             </div>
           ) : renderContent()}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
