import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import WholesaleProducts from './pages/WholesaleProducts';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Checkout from './pages/Checkout';
import MyOrders from './pages/MyOrders';
import TrackOrder from './pages/TrackOrder';
import Profile from './pages/Profile';
import AboutUs from './pages/AboutUs';
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ReturnPolicy from './pages/ReturnPolicy';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col selection:bg-primary selection:text-content">
        <Navbar />
        <CartDrawer />
        <WishlistDrawer />
        <div className="flex-grow flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/wholesale" element={<WholesaleProducts />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/myorders" element={<MyOrders />} />
            <Route path="/track-order/:orderId" element={<TrackOrder />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/terms" element={<TermsAndConditions />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/return-policy" element={<ReturnPolicy />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </div>
        <Footer />
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;
