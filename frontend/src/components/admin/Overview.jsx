import React from 'react';
import { IndianRupee, Users, ShoppingCart, Package, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const StatCard = ({ title, value, icon, trend, subValue, color }) => (
  <div className="bg-white p-6 rounded-[2.5rem] border border-secondary/5 shadow-sm hover:shadow-xl transition-all duration-500 group relative overflow-hidden">
    <div className={`absolute top-0 right-0 w-32 h-32 bg-${color}/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700`} />
    
    <div className="relative z-10 flex items-start justify-between">
      <div className={`p-4 bg-${color}/10 rounded-2xl text-${color}`}>
        {icon}
      </div>
      <div className="flex flex-col items-end">
        <span className={`flex items-center gap-1 text-xs font-bold ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {trend >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {Math.abs(trend)}%
        </span>
        <span className="text-[10px] font-bold text-content/20 uppercase tracking-widest mt-1">vs last month</span>
      </div>
    </div>

    <div className="relative z-10 mt-6">
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-content/30 mb-1">{title}</p>
      <h3 className="text-3xl font-black text-content tracking-tighter">{value}</h3>
      <p className="text-xs font-bold text-content/40 mt-2">{subValue}</p>
    </div>
  </div>
);

const Overview = ({ stats }) => {
  const cards = [
    { title: 'Total Revenue', value: `₹${stats.totalRevenue || 0}`, icon: <IndianRupee size={24} />, trend: 12.5, subValue: 'All time earnings', color: 'secondary' },
    { title: 'Active Users', value: stats.totalUsers || 0, icon: <Users size={24} />, trend: 8.2, subValue: 'Total registered', color: 'blue-500' },
    { title: 'Total Orders', value: stats.totalOrders || 0, icon: <ShoppingCart size={24} />, trend: 15.1, subValue: 'Completed orders', color: 'green-500' },
    { title: 'Products', value: stats.totalProducts || 0, icon: <Package size={24} />, trend: 2.1, subValue: 'In inventory', color: 'amber-500' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <StatCard key={i} {...card} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders Overview */}
        <div className="lg:col-span-2 bg-white rounded-[3rem] p-8 border border-secondary/5 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-black text-content font-display">Recent Activity</h3>
              <p className="text-xs font-bold text-content/30 uppercase tracking-widest mt-1">Latest transactions</p>
            </div>
            <button className="text-secondary font-black text-[10px] uppercase tracking-widest hover:underline">View All Orders</button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-secondary/5">
                  <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-content/20">Customer</th>
                  <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-content/20">Status</th>
                  <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-content/20">Amount</th>
                  <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-content/20 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary/5">
                {(stats.recentOrders || []).map((order, i) => (
                  <tr key={i} className="group transition-colors hover:bg-surface/50">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-surface rounded-xl flex items-center justify-center text-secondary font-bold text-xs uppercase">
                          {order.user?.name?.charAt(0) || 'U'}
                        </div>
                        <span className="font-bold text-content text-sm">{order.user?.name || 'Guest User'}</span>
                      </div>
                    </td>
                    <td className="py-4 text-xs font-bold">
                       <span className={`px-3 py-1 rounded-full uppercase tracking-tighter text-[9px] ${order.status === 'delivered' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
                         {order.status}
                       </span>
                    </td>
                    <td className="py-4 font-black text-content">₹{order.totalPrice}</td>
                    <td className="py-4 text-right text-xs font-bold text-content/30">{new Date(order.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mini Analytics Preview */}
        <div className="bg-secondary p-8 rounded-[3rem] text-white flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-content opacity-90" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-32 translate-y-32 blur-3xl group-hover:scale-110 transition-transform duration-1000" />
          
          <div className="relative z-10">
             <div className="flex items-center gap-3 mb-6">
               <div className="p-2.5 bg-white/10 rounded-xl backdrop-blur-md">
                 <TrendingUp size={20} />
               </div>
               <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Performance Note</span>
             </div>
             <h4 className="text-2xl font-black font-display leading-tight tracking-tight">Your organic growth is up <span className="text-primary">+15%</span> compared to last quarter.</h4>
          </div>

          <div className="relative z-10 mt-12 bg-white/10 backdrop-blur-xl p-6 rounded-[2rem] border border-white/5">
             <div className="flex justify-between items-center mb-4">
               <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Goal Status</span>
               <span className="text-xs font-bold">78%</span>
             </div>
             <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
               <div className="h-full bg-primary w-[78%] rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)]" />
             </div>
             <p className="text-[9px] font-bold opacity-30 mt-4 leading-normal">Our AI models suggest increasing wholesale stock for 'Guntur Chilli' based on recent trends.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
