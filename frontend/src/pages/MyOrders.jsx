import API_BASE_URL from '../config';
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Package, Truck, Calendar, MapPin, Search } from 'lucide-react';

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/orders/myorders`, {
          credentials: 'include'
        });
        if (res.ok) {
          const data = await res.json();
          setOrders(data);
        }
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center text-secondary">
        <div className="animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-secondary rounded-full" role="status" aria-label="loading">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    if (status?.toLowerCase().includes('delivered')) return 'text-green-500 bg-green-500/10 border-green-500/20';
    if (status?.toLowerCase().includes('transit') || status?.toLowerCase().includes('placed') || status?.toLowerCase().includes('received')) return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
    if (status?.toLowerCase().includes('fail') || status?.toLowerCase().includes('cancel')) return 'text-red-500 bg-red-500/10 border-red-500/20';
    return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <h1 className="text-3xl font-black text-content mb-8 font-display flex items-center gap-3">
        <Package className="text-secondary" />
        My Orders
      </h1>
      
      {orders.length === 0 ? (
        <div className="text-center bg-surface py-16 rounded-3xl border border-secondary/5">
          <Package className="mx-auto h-16 w-16 text-content/20 mb-4" />
          <h2 className="text-xl font-bold mb-4">No orders found</h2>
          <button onClick={() => navigate('/products')} className="bg-secondary text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-secondary/20 hover:scale-105 transition-all">Start Shopping</button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-2xl p-6 shadow-sm border border-secondary/10 hover:shadow-md transition-all">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-6 border-b border-secondary/5">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-lg">Order #{order.orderId || order._id.toString().substring(0,8)}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="text-sm text-content/60 flex items-center gap-2 font-medium">
                    <Calendar size={14} />
                    Placed on {new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </div>
                </div>
                
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="text-left md:text-right">
                    <div className="text-xs text-content/50 font-bold uppercase tracking-widest mb-1">Total Amount</div>
                    <div className="font-black text-xl text-secondary">₹{order.totalPrice}</div>
                  </div>
                  <button 
                    onClick={() => navigate(`/track-order/${order.orderId || order._id}`)}
                    className="ml-auto md:ml-0 flex items-center gap-2 bg-surface hover:bg-secondary/10 hover:text-secondary text-content px-4 py-2 rounded-xl text-sm font-bold transition-colors border border-secondary/10"
                  >
                    <Search size={16} />
                    Track Order
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-sm text-content/50 uppercase tracking-widest mb-4">Items</h4>
                  <div className="space-y-3">
                    {order.orderItems.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 bg-surface/30 p-2 rounded-xl border border-secondary/5">
                        <img src={item.image || '/logo.jpeg'} alt={item.name} className="w-12 h-12 rounded-lg object-cover bg-white" />
                        <div className="flex-1">
                          <p className="font-bold text-sm leading-tight">{item.name}</p>
                          <p className="text-xs text-content/50 font-medium">Qty: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-6">
                  {order.deliveryAddress && (
                    <div>
                      <h4 className="font-bold text-sm text-content/50 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <MapPin size={14} />
                        Delivery Address
                      </h4>
                      <p className="text-sm font-medium bg-surface/30 p-4 rounded-xl border border-secondary/5 leading-relaxed">
                        {order.deliveryAddress}
                        <br />
                        <span className="text-content/50 mt-1 block">Phone: {order.deliveryPhones}</span>
                      </p>
                    </div>
                  )}

                  {order.estimatedDelivery && (
                    <div>
                      <h4 className="font-bold text-sm text-content/50 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <Truck size={14} />
                        Estimated Delivery
                      </h4>
                      <p className="text-sm font-bold text-secondary bg-secondary/5 p-3 rounded-xl border border-secondary/10 inline-block">
                        {new Date(order.estimatedDelivery).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
