import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Tag, Calendar, IndianRupee, Percent } from 'lucide-react';

const CouponManager = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    discountType: 'percentage',
    discountValue: '',
    minPurchase: '',
    expiryDate: ''
  });

  const fetchCoupons = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/coupons', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}` // Assuming admin auth uses token for now, or cookie
        }
      });
      // Note: If using cookie-based auth, we need credentials: true
      const data = await res.json();
      setCoupons(data);
    } catch (err) {
      console.error('Error fetching coupons:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleAddCoupon = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/coupons', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(newCoupon)
      });
      if (res.ok) {
        setShowAddModal(false);
        fetchCoupons();
        setNewCoupon({ code: '', discountType: 'percentage', discountValue: '', minPurchase: '', expiryDate: '' });
      }
    } catch (err) {
      console.error('Error adding coupon:', err);
    }
  };

  const handleDeleteCoupon = async (id) => {
    if (!window.confirm('Are you sure you want to delete this coupon?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/coupons/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      if (res.ok) fetchCoupons();
    } catch (err) {
      console.error('Error deleting coupon:', err);
    }
  };

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="min-w-0">
          <h2 className="text-xl md:text-3xl font-black text-content flex items-center gap-3">
            <Tag className="text-secondary flex-shrink-0" />
            <span className="truncate">Coupon Manager</span>
          </h2>
          <p className="text-[10px] md:text-sm text-content/60 mt-1 font-bold uppercase tracking-widest">Create and manage codes</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-secondary text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2 hover:bg-content transition-all shadow-lg shadow-secondary/20 text-[10px] md:text-sm uppercase tracking-widest self-end sm:self-auto"
        >
          <Plus size={18} strokeWidth={3} />
          <span>New Coupon</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-20 text-content/40">Loading coupons...</div>
        ) : coupons.length === 0 ? (
          <div className="col-span-full text-center py-20 bg-surface rounded-3xl border-2 border-dashed border-content/10">
            <Tag size={48} className="mx-auto mb-4 text-content/20" />
            <p className="text-content/40 font-medium">No coupons created yet.</p>
          </div>
        ) : (
          coupons.map((coupon) => (
            <div key={coupon._id} className="bg-white rounded-[2rem] border border-secondary/5 shadow-md hover:shadow-xl transition-all duration-500 group relative overflow-hidden flex flex-col">
              {/* Delete Button */}
              <button 
                onClick={() => handleDeleteCoupon(coupon._id)}
                className="absolute top-4 right-4 z-20 p-2 bg-red-50 text-red-500 rounded-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"
              >
                <Trash2 size={16} />
              </button>

              {/* Top Section (The "Value") */}
              <div className="p-6 pb-4 bg-gradient-to-br from-white to-surface/30">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary shadow-inner">
                    {coupon.discountType === 'percentage' ? <Percent size={28} strokeWidth={2.5} /> : <IndianRupee size={28} strokeWidth={2.5} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-black text-content tracking-tight uppercase truncate leading-tight">{coupon.code}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`w-2 h-2 rounded-full ${new Date(coupon.expiryDate) > new Date() ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                      <span className={`text-[9px] font-black uppercase tracking-widest ${new Date(coupon.expiryDate) > new Date() ? 'text-green-600' : 'text-red-500'}`}>
                        {new Date(coupon.expiryDate) > new Date() ? 'Valid Coupon' : 'Expired'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dashed Separator with Notches */}
              <div className="relative h-4 flex items-center">
                <div className="absolute left-0 -translate-x-1/2 w-6 h-6 bg-[#FDFBF7] rounded-full border-r border-secondary/5 shadow-inner" />
                <div className="flex-1 border-t-2 border-dashed border-secondary/10 mx-4" />
                <div className="absolute right-0 translate-x-1/2 w-6 h-6 bg-[#FDFBF7] rounded-full border-l border-secondary/5 shadow-inner" />
              </div>

              {/* Bottom Section (The "Details") */}
              <div className="p-6 pt-2 space-y-4 grow">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-surface/50 p-3 rounded-2xl border border-secondary/5">
                    <p className="text-[8px] font-black text-content/30 uppercase tracking-widest mb-1">Discount</p>
                    <p className="text-sm font-bold text-secondary">
                      {coupon.discountValue}{coupon.discountType === 'percentage' ? '%' : ' OFF'}
                    </p>
                  </div>
                  <div className="bg-surface/50 p-3 rounded-2xl border border-secondary/5">
                    <p className="text-[8px] font-black text-content/30 uppercase tracking-widest mb-1">Min Spend</p>
                    <p className="text-sm font-bold text-content">₹{coupon.minPurchase}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-2">
                    <Calendar size={12} className="text-content/30" />
                    <span className="text-[9px] font-bold text-content/40 uppercase tracking-widest">Valid Until</span>
                  </div>
                  <span className="text-[10px] font-black text-content">{new Date(coupon.expiryDate).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
              </div>
              
              {/* Mobile Decorative Notch Shadow */}
              <div className="h-2 bg-gradient-to-t from-secondary/5 to-transparent opacity-50" />
            </div>
          ))
        )}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 shadow-2xl animate-fade-in max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl md:text-2xl font-bold text-content mb-6">Create New Coupon</h3>
            <form onSubmit={handleAddCoupon} className="space-y-5">
              <div>
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-content/40 mb-2 block">Coupon Code</label>
                <input 
                  type="text" 
                  value={newCoupon.code}
                  onChange={(e) => setNewCoupon({...newCoupon, code: e.target.value})}
                  className="w-full bg-surface border-2 border-transparent focus:border-secondary/20 p-4 rounded-2xl outline-none font-bold uppercase"
                  placeholder="SAVE30"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-content/40 mb-2 block">Type</label>
                  <select 
                    value={newCoupon.discountType}
                    onChange={(e) => setNewCoupon({...newCoupon, discountType: e.target.value})}
                    className="w-full bg-surface border-2 border-transparent focus:border-secondary/20 p-4 rounded-2xl outline-none font-bold appearance-none"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="flat">Flat Amount (₹)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-content/40 mb-2 block">Value</label>
                  <input 
                    type="number" 
                    value={newCoupon.discountValue}
                    onChange={(e) => setNewCoupon({...newCoupon, discountValue: e.target.value})}
                    className="w-full bg-surface border-2 border-transparent focus:border-secondary/20 p-4 rounded-2xl outline-none font-bold"
                    placeholder="20"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-content/40 mb-2 block">Min Purchase (₹)</label>
                <input 
                  type="number" 
                  value={newCoupon.minPurchase}
                  onChange={(e) => setNewCoupon({...newCoupon, minPurchase: e.target.value})}
                  className="w-full bg-surface border-2 border-transparent focus:border-secondary/20 p-4 rounded-2xl outline-none font-bold"
                  placeholder="499"
                />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-content/40 mb-2 block">Expiry Date</label>
                <input 
                  type="date" 
                  value={newCoupon.expiryDate}
                  onChange={(e) => setNewCoupon({...newCoupon, expiryDate: e.target.value})}
                  className="w-full bg-surface border-2 border-transparent focus:border-secondary/20 p-4 rounded-2xl outline-none font-bold"
                  required
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-4 rounded-2xl font-bold text-content hover:bg-surface transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-secondary text-white py-4 rounded-2xl font-bold shadow-lg shadow-secondary/30 hover:bg-secondary/90 transition-all"
                >
                  Save Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CouponManager;
