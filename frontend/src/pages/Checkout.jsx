import API_BASE_URL from '../config';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMode, setPaymentMode] = useState('COD');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!user) {
    navigate('/');
    return null;
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <button onClick={() => navigate('/products')} className="bg-secondary text-white px-6 py-2 rounded-full font-bold">Shop Now</button>
      </div>
    );
  }

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const orderData = {
        orderItems: cart.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: parseFloat(String(item.price).replace(/[^0-9.]/g, '')),
          image: item.image,
          product: item._id
        })),
        totalPrice: getCartTotal(),
        deliveryAddress: address,
        deliveryPhones: phone,
        paymentMode
      };

      const res = await fetch(`${API_BASE_URL}/api/orders/createOrder`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
        credentials: 'include' // to send the token via cookie
      });

      const data = await res.json();

      if (res.ok) {
        if (clearCart) clearCart();
        navigate('/myorders');
      } else {
        setError(data.message || 'Failed to place order');
      }
    } catch (err) {
      setError('Network error, please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-black text-content mb-8 font-display">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-xl font-bold mb-6">Delivery Details</h2>
          <form onSubmit={handlePlaceOrder} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-content/70 mb-2">Full Address</label>
              <textarea 
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full border-2 border-secondary/10 rounded-xl p-3 focus:border-secondary transition-colors"
                rows="3"
                placeholder="Enter complete delivery address"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-bold text-content/70 mb-2">Phone Number</label>
              <input 
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border-2 border-secondary/10 rounded-xl p-3 focus:border-secondary transition-colors"
                placeholder="10-digit mobile number"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-content/70 mb-2">Payment Mode</label>
              <select 
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value)}
                className="w-full border-2 border-secondary/10 rounded-xl p-3 focus:border-secondary transition-colors"
              >
                <option value="COD">Cash on Delivery (COD)</option>
                <option value="Prepaid">Prepaid</option>
              </select>
            </div>
            
            {error && <p className="text-red-500 font-bold text-sm">{error}</p>}
            
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-secondary text-white font-bold text-lg py-4 rounded-xl hover:bg-secondary/90 transition-colors disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Place Order & Pay'}
            </button>
          </form>
        </div>
        
        <div>
          <div className="bg-surface/30 p-6 rounded-2xl border border-secondary/5">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {cart.map(item => (
                <div key={`${item._id}-${item.weight}`} className="flex justify-between items-center text-sm font-semibold">
                  <span className="text-content/70">{item.quantity}x {item.name}</span>
                  <span>₹{parseFloat(String(item.price).replace(/[^0-9.]/g, '')) * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-secondary/10 pt-4 flex justify-between items-center font-black text-xl">
              <span>Total</span>
              <span className="text-secondary">₹{getCartTotal()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
