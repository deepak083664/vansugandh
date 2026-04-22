import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

const Analytics = ({ revenueData }) => {
  // Mock data if empty
  const graphData = (revenueData && revenueData.length > 0) ? revenueData : [
    { _id: 'Jan', amount: 4500, count: 24 },
    { _id: 'Feb', amount: 5200, count: 28 },
    { _id: 'Mar', amount: 4800, count: 22 },
    { _id: 'Apr', amount: 6100, count: 35 },
    { _id: 'May', amount: 5900, count: 32 },
    { _id: 'Jun', amount: 7200, count: 48 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Revenue Area Chart */}
        <div className="bg-white p-8 rounded-[3rem] border border-secondary/5 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-black text-content font-display">Revenue Growth</h3>
              <p className="text-xs font-bold text-content/30 uppercase tracking-widest mt-1">Last 12 months trajectory</p>
            </div>
          </div>
          <div className="h-80 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={graphData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#813C24" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#813C24" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                <XAxis 
                  dataKey="_id" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fontSize: 10, fontWeight: 700, fill: '#813C24', opacity: 0.4}}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fontSize: 10, fontWeight: 700, fill: '#813C24', opacity: 0.4}}
                />
                <Tooltip 
                  contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', padding: '15px'}}
                />
                <Area type="monotone" dataKey="amount" stroke="#813C24" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Orders Bar Chart */}
        <div className="bg-white p-8 rounded-[3rem] border border-secondary/5 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-black text-content font-display">Order Volume</h3>
              <p className="text-xs font-bold text-content/30 uppercase tracking-widest mt-1">Orders processed per month</p>
            </div>
          </div>
          <div className="h-80 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={graphData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                <XAxis 
                  dataKey="_id" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fontSize: 10, fontWeight: 700, fill: '#813C24', opacity: 0.4}}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fontSize: 10, fontWeight: 700, fill: '#813C24', opacity: 0.4}}
                />
                <Tooltip 
                  cursor={{fill: '#fcfcfc', radius: 10}}
                  contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', padding: '15px'}}
                />
                <Bar dataKey="count" fill="#E67E22" radius={[8, 8, 0, 0]} barSize={35} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Analytics Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
           { label: 'Highest Revenue Month', value: 'June 2026', note: 'Driven by Bulk Wholesale' },
           { label: 'Avg order Value', value: '₹2,450', note: '+12% from previous year' },
           { label: 'Retention Rate', value: '64%', note: 'Returning spicy enthusiasts' },
         ].map((stat, i) => (
           <div key={i} className="bg-surface/50 p-6 rounded-[2rem] border border-secondary/5">
              <p className="text-[10px] font-black uppercase tracking-widest text-content/30 mb-2">{stat.label}</p>
              <h4 className="text-2xl font-black text-content">{stat.value}</h4>
              <p className="text-[10px] font-bold text-secondary mt-1">{stat.note}</p>
           </div>
         ))}
      </div>
    </div>
  );
};

export default Analytics;
