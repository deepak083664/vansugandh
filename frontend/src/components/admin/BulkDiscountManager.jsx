import API_BASE_URL from '../../config';
import React, { useState } from 'react';
import { Percent, Trash2, Zap, AlertCircle, CheckCircle2 } from 'lucide-react';

const BulkDiscountManager = () => {
  const [percentage, setPercentage] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleApply = async () => {
    if (!percentage || percentage <= 0 || percentage >= 100) {
      setStatus({ type: 'error', message: 'Please enter a valid percentage (1-99)' });
      return;
    }

    if (!window.confirm(`Are you sure you want to apply a ${percentage}% discount to ALL products? This will update all retail and wholesale items.`)) return;

    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const res = await fetch(`${API_BASE_URL}/api/products/bulk-discount`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ percentage })
      });

      if (res.ok) {
        setStatus({ type: 'success', message: `Successfully applied ${percentage}% discount to all products!` });
        setPercentage('');
      } else {
        setStatus({ type: 'error', message: 'Failed to apply discount. Please try again.' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Server error. Please check connection.' });
    } finally {
      setLoading(false);
    }
  };

  const handleClear = async () => {
    if (!window.confirm('Clear all discounts and restore original prices for all products?')) return;

    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const res = await fetch(`${API_BASE_URL}/api/products/clear-discounts`, { method: 'POST' });
      if (res.ok) {
        setStatus({ type: 'success', message: 'All discounts cleared and original prices restored!' });
      } else {
        setStatus({ type: 'error', message: 'Failed to clear discounts.' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Server error.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <div className="mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-black text-content flex items-center gap-3">
          <Zap className="text-secondary flex-shrink-0" />
          Bulk Discount Tool
        </h2>
        <p className="text-content/60 mt-1 uppercase text-[9px] md:text-[10px] font-bold tracking-widest">Festival & Promotional Sale Manager</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* Apply Section */}
        <div className="bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-secondary/5 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5 hidden sm:block">
            <Percent size={120} />
          </div>
          
          <h3 className="text-lg md:text-xl font-bold text-content mb-3 md:mb-4">Apply Global Discount</h3>
          <p className="text-xs md:text-sm text-content/50 mb-6 md:mb-8 leading-relaxed">
            Set a percentage discount for your entire catalog. This will move current prices to M.R.P. and set new discounted prices.
          </p>

          <div className="space-y-6">
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-content/30 mb-3 block">Discount Percentage (%)</label>
              <div className="relative">
                <input 
                  type="number" 
                  value={percentage}
                  onChange={(e) => setPercentage(e.target.value)}
                  placeholder="20"
                  className="w-full bg-surface border-2 border-transparent focus:border-secondary/20 p-4 md:p-5 rounded-2xl outline-none text-xl md:text-2xl font-black"
                />
                <div className="absolute right-5 top-1/2 -translate-y-1/2 text-content/20">
                  <Percent size={24} />
                </div>
              </div>
            </div>

            <button 
              onClick={handleApply}
              disabled={loading}
              className="w-full bg-secondary text-white py-4 md:py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] md:text-xs shadow-xl shadow-secondary/20 hover:bg-content transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Activate Sale for All Products'}
            </button>
          </div>
        </div>

        {/* Info & Reset Section */}
        <div className="flex flex-col gap-6">
          <div className="bg-surface p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-secondary/5 flex-1">
             <h4 className="font-bold text-content mb-4 flex items-center gap-2 text-sm md:text-base">
                <AlertCircle size={18} className="text-secondary" />
                How it works
             </h4>
             <ul className="space-y-3 md:space-y-4">
                {[
                  'Applies to both Retail and Wholesale items.',
                  'Current price becomes "Old Price" (M.R.P).',
                  'New price is calculated based on percentage.',
                  'A "Festival Sale" badge will appear on products.'
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-[11px] md:text-xs text-content/60 leading-relaxed font-medium">
                    <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
             </ul>
          </div>

          <div className="bg-red-50 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-red-100">
             <h4 className="font-bold text-red-600 mb-2 text-sm md:text-base">End All Sales</h4>
             <p className="text-[9px] md:text-[10px] text-red-400 font-bold uppercase tracking-widest mb-4 md:mb-6">Restore Original Prices</p>
             <button 
                onClick={handleClear}
                disabled={loading}
                className="w-full bg-white text-red-500 border-2 border-red-100 py-3 md:py-4 rounded-2xl font-black uppercase tracking-widest text-[9px] md:text-[10px] hover:bg-red-500 hover:text-white transition-all shadow-sm"
             >
                {loading ? 'Restoring...' : 'Reset Catalog to Normal'}
             </button>
          </div>
        </div>
      </div>

      {status.message && (
        <div className={`mt-8 p-5 rounded-2xl flex items-center gap-4 animate-in slide-in-from-top-4 ${status.type === 'success' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'}`}>
          {status.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          <p className="text-sm font-bold">{status.message}</p>
        </div>
      )}
    </div>
  );
};

export default BulkDiscountManager;
