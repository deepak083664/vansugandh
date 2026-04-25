import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Package, Truck, CheckCircle2, Home, MapPin, Clock } from 'lucide-react';

const TrackOrder = () => {
  const { orderId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTracking = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/orders/track-order/${orderId}`, {
        credentials: 'include'
      });
      if (res.ok) {
        const data = await res.json();
        setTrackingData(data);
      } else {
        setError('Order not found or tracking unavailable');
      }
    } catch (err) {
      setError('Network error. Failed to fetch tracking data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    fetchTracking();

    // Auto-refresh tracking every 30 mins (1800000 ms) as per bonus requirement
    const interval = setInterval(() => {
      fetchTracking();
    }, 1800000);

    return () => clearInterval(interval);
  }, [user, orderId, navigate]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <div className="animate-spin inline-block w-12 h-12 border-4 border-current border-t-transparent text-secondary rounded-full"></div>
        <p className="mt-4 font-bold text-content/50 uppercase tracking-widest">Locating your package...</p>
      </div>
    );
  }

  if (error || !trackingData) {
    return (
      <div className="container mx-auto px-4 py-32 text-center max-w-md">
        <div className="bg-red-50 text-red-500 p-6 rounded-3xl border border-red-100">
          <Package className="mx-auto h-12 w-12 mb-4 opacity-50" />
          <h2 className="text-xl font-bold mb-2">Oops!</h2>
          <p className="font-medium text-red-500/80">{error}</p>
          <button onClick={() => navigate('/myorders')} className="mt-6 bg-red-500 text-white px-6 py-2 rounded-xl font-bold hover:bg-red-600 transition-colors">Go Back</button>
        </div>
      </div>
    );
  }

  // Predefined stages for the timeline
  const stages = [
    { label: 'Order Placed', icon: Package, statusKey: 'placed' },
    { label: 'In Transit', icon: Truck, statusKey: 'transit' },
    { label: 'Out for Delivery', icon: MapPin, statusKey: 'out' },
    { label: 'Delivered', icon: Home, statusKey: 'delivered' }
  ];

  const currentStatusLower = trackingData.status.toLowerCase();
  
  let currentStageIndex = 0;
  if (currentStatusLower.includes('delivered')) currentStageIndex = 3;
  else if (currentStatusLower.includes('out')) currentStageIndex = 2;
  else if (currentStatusLower.includes('transit')) currentStageIndex = 1;

  const isFailed = currentStatusLower.includes('fail') || currentStatusLower.includes('cancel');

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="bg-white rounded-[2rem] shadow-xl shadow-secondary/5 border border-secondary/10 overflow-hidden">
        
        {/* Header */}
        <div className="bg-surface/50 p-8 border-b border-secondary/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl font-black text-content font-display tracking-tight mb-2 flex items-center gap-3">
              Order Tracking
              {trackingData.cached && <span className="text-[10px] bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full tracking-widest font-bold border border-yellow-200">CACHED</span>}
            </h1>
            <p className="text-content/60 font-medium font-mono bg-white px-3 py-1 rounded-lg inline-block border border-secondary/5">
              ID: {trackingData.orderId}
            </p>
          </div>
          <div className="text-left md:text-right bg-white p-4 rounded-2xl border border-secondary/5 shadow-sm">
            <p className="text-xs font-bold text-content/40 uppercase tracking-widest mb-1 flex items-center justify-start md:justify-end gap-1"><Clock size={12}/> Estimated Delivery</p>
            <p className="text-lg font-black text-secondary">
              {trackingData.estimatedDelivery ? new Date(trackingData.estimatedDelivery).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) : 'Pending Update'}
            </p>
          </div>
        </div>

        {/* Timeline UI */}
        <div className="p-8 md:p-12">
          {isFailed ? (
            <div className="bg-red-50 text-red-500 p-8 rounded-3xl text-center border border-red-100 mb-8">
              <h2 className="text-2xl font-black mb-2">Delivery Failed</h2>
              <p className="font-medium opacity-80">There was an issue delivering your package. Please contact support.</p>
            </div>
          ) : (
            <div className="relative mb-16 mt-4">
              {/* Connecting Line Background */}
              <div className="absolute top-1/2 left-0 w-full h-1.5 bg-secondary/10 -translate-y-1/2 rounded-full hidden md:block"></div>
              
              {/* Connecting Line Active */}
              <div 
                className="absolute top-1/2 left-0 h-1.5 bg-gradient-to-r from-secondary to-green-500 -translate-y-1/2 rounded-full transition-all duration-1000 ease-out hidden md:block shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                style={{ width: `${(currentStageIndex / (stages.length - 1)) * 100}%` }}
              ></div>

              <div className="flex flex-col md:flex-row justify-between relative z-10 gap-8 md:gap-0">
                {stages.map((stage, index) => {
                  const Icon = stage.icon;
                  const isActive = index <= currentStageIndex;
                  const isCurrent = index === currentStageIndex;
                  
                  return (
                    <div key={index} className="flex flex-row md:flex-col items-center gap-4 md:gap-3 group">
                      {/* Vertical line for mobile */}
                      {index < stages.length - 1 && (
                        <div className={`absolute left-[1.15rem] top-[3rem] w-0.5 h-12 md:hidden ${isActive ? 'bg-secondary' : 'bg-secondary/10'}`}></div>
                      )}
                      
                      <div className={`
                        w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center shrink-0 transition-all duration-500 relative
                        ${isActive 
                          ? (isCurrent && index === 3) ? 'bg-green-500 text-white shadow-lg shadow-green-500/40 scale-110' : 
                            isCurrent ? 'bg-secondary text-white shadow-lg shadow-secondary/40 scale-110' : 
                            'bg-secondary text-white border-2 border-white' 
                          : 'bg-white text-content/30 border-2 border-secondary/10'}
                      `}>
                        <Icon size={isCurrent ? 24 : 20} strokeWidth={isCurrent ? 2.5 : 2} className={isCurrent ? 'animate-pulse' : ''} />
                        
                        {/* Pulse ring for current active stage */}
                        {isCurrent && (
                          <div className={`absolute inset-0 rounded-full animate-ping opacity-20 ${index === 3 ? 'bg-green-500' : 'bg-secondary'}`}></div>
                        )}
                        
                        {/* Checkmark for completed stages */}
                        {isActive && !isCurrent && (
                          <div className="absolute -bottom-1 -right-1 bg-white text-green-500 rounded-full border-2 border-white">
                            <CheckCircle2 size={14} className="fill-current text-white bg-green-500 rounded-full" />
                          </div>
                        )}
                      </div>
                      
                      <div className="md:text-center">
                        <p className={`font-bold text-sm md:text-base ${isActive ? 'text-content' : 'text-content/40'}`}>
                          {stage.label}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Detailed Tracking Events */}
          <div className="bg-surface/30 rounded-3xl p-6 md:p-8 border border-secondary/5">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
              <Clock className="text-secondary" />
              Tracking History
            </h3>
            
            {trackingData.trackingEvents && trackingData.trackingEvents.length > 0 ? (
              <div className="space-y-6">
                {[...trackingData.trackingEvents].reverse().map((event, idx) => (
                  <div key={idx} className="flex gap-4 relative">
                    {idx < trackingData.trackingEvents.length - 1 && (
                      <div className="absolute left-[11px] top-8 bottom-[-24px] w-0.5 bg-secondary/10"></div>
                    )}
                    <div className="w-6 h-6 rounded-full bg-white border-2 border-secondary flex items-center justify-center shrink-0 z-10 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-secondary"></div>
                    </div>
                    <div>
                      <h4 className="font-bold text-content text-sm">{event.status}</h4>
                      <p className="text-xs text-content/60 mt-1">{event.message}</p>
                      <div className="flex items-center gap-3 mt-2 text-[10px] font-bold uppercase tracking-widest text-content/40">
                        <span className="flex items-center gap-1"><MapPin size={10} /> {event.location}</span>
                        <span className="flex items-center gap-1"><Clock size={10} /> {new Date(event.timestamp).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-content/50 font-medium py-4">No tracking events available yet.</p>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default TrackOrder;
