import React, { useState } from 'react';
import { Package, Truck, CheckCircle, Search, Filter, Eye, MoreVertical } from 'lucide-react';

const OrderManager = ({ orders }) => {
  const [filter, setFilter] = useState('all');

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(o => o.status === filter);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white p-4 md:p-6 rounded-[2rem] border border-secondary/5 shadow-sm flex flex-col lg:flex-row justify-between items-center gap-4">
        <div className="text-center lg:text-left w-full lg:w-auto">
          <h3 className="text-lg md:text-xl font-black text-content font-display">Order Fulfillment</h3>
          <p className="text-[10px] md:text-xs font-bold text-content/30 uppercase tracking-widest mt-1">Track customer orders</p>
        </div>
        
        <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-4">
            <div className="flex bg-surface p-1 rounded-xl border border-secondary/10 overflow-x-auto no-scrollbar max-w-full">
               {['all', 'pending', 'shipped', 'delivered'].map(s => (
                 <button 
                  key={s} 
                  onClick={() => setFilter(s)} 
                  className={`px-3 md:px-4 py-1.5 rounded-lg text-[10px] md:text-xs font-bold transition-all uppercase tracking-widest whitespace-nowrap ${filter === s ? 'bg-white text-secondary shadow-sm' : 'text-content/30 hover:text-content'}`}
                 >
                    {s}
                 </button>
               ))}
            </div>
            <div className="relative flex-1 sm:w-64">
               <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-content/30" />
               <input type="text" placeholder="Search orders..." className="w-full pl-10 pr-4 py-2.5 bg-surface border-none rounded-xl text-sm outline-none" />
            </div>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-secondary/5 shadow-xl overflow-hidden min-h-[400px]">
        {filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[400px] text-center gap-4">
             <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center text-content/10">
                <Package size={32} />
             </div>
             <div>
                <p className="font-bold text-content leading-snug">No orders found</p>
                <p className="text-xs text-content/30">There are no orders matching your current filter.</p>
             </div>
          </div>
        ) : (
          <div className="overflow-x-auto no-scrollbar scroll-smooth">
            <div className="min-w-full inline-block align-middle">
              <div className="border-b border-secondary/5">
                <table className="w-full text-left font-sans min-w-[800px]">
              <thead>
                <tr className="bg-surface/50 border-b border-secondary/5">
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-content/40">Order ID</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-content/40">Customer</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-content/40">Amount</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-content/40">Status</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-content/40">Payment</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-content/40 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary/5">
                {filteredOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-surface/30 transition-colors group">
                    <td className="px-8 py-5">
                      <span className="text-[10px] font-black text-secondary uppercase tracking-widest bg-secondary/5 px-2 py-1 rounded-md">
                          #{order._id.substring(order._id.length - 6)}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex flex-col">
                        <span className="font-bold text-content text-sm">{order.user?.name || 'Guest User'}</span>
                        <span className="text-[10px] text-content/30 font-bold">{order.user?.email || 'No email provided'}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 font-black text-content">₹{order.totalPrice}</td>
                    <td className="px-8 py-5">
                       <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest inline-flex items-center gap-2 ${
                         order.status === 'delivered' ? 'bg-green-100 text-green-600' : 
                         order.status === 'shipped' ? 'bg-blue-100 text-blue-600' : 'bg-amber-100 text-amber-600'
                       }`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${order.status === 'delivered' ? 'bg-green-600' : order.status === 'shipped' ? 'bg-blue-600' : 'bg-amber-600'}`} />
                          {order.status}
                       </span>
                    </td>
                    <td className="px-8 py-5">
                       <span className={`text-[10px] font-bold ${order.isPaid ? 'text-green-500' : 'text-content/30'}`}>
                          {order.isPaid ? 'Verification Success' : 'Awaiting Payment'}
                       </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                       <div className="flex justify-end gap-2 lg:opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                          <button className="p-2.5 bg-white hover:bg-secondary hover:text-white rounded-xl shadow-sm border border-secondary/10 transition-all">
                             <Eye size={16} />
                          </button>
                          <button className="p-2.5 bg-white hover:bg-content hover:text-white rounded-xl shadow-sm border border-secondary/10 transition-all">
                             <MoreVertical size={16} />
                          </button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderManager;
