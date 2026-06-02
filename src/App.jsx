import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loading from './components/Loading';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Wishlist from './pages/Wishlist';
import Account from './pages/Account';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import FeedbackModal from './components/FeedbackModal';
import './styles/global.css';

// Protected Route Component
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

// Auth Route Component
function AuthRoute({ children }) {
  const { user } = useAuth();
  return user ? <Navigate to="/" replace /> : children;
}

function AppContent() {
  const { user, loading } = useAuth();
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Load user data when user logs in
  useEffect(() => {
    if (user) {
      try {
        const savedCart = localStorage.getItem(`cart_${user.id}`);
        const savedWishlist = localStorage.getItem(`wishlist_${user.id}`);
        
        if (savedCart) {
          setCart(JSON.parse(savedCart));
        }
        
        if (savedWishlist) {
          setWishlist(JSON.parse(savedWishlist));
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        setCart([]);
        setWishlist([]);
      }
    } else {
      setCart([]);
      setWishlist([]);
    }
  }, [user]);

  // Save cart to localStorage
  useEffect(() => {
    if (user && cart.length >= 0) {
      try {
        localStorage.setItem(`cart_${user.id}`, JSON.stringify(cart));
      } catch (error) {
        console.error('Error saving cart:', error);
      }
    }
  }, [cart, user]);

  // Save wishlist to localStorage
  useEffect(() => {
    if (user && wishlist.length >= 0) {
      try {
        localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(wishlist));
      } catch (error) {
        console.error('Error saving wishlist:', error);
      }
    }
  }, [wishlist, user]);

  // Cart functions
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id, qty) => {
    if (qty < 1) {
      setCart(prev => prev.filter(i => i.id !== id));
    } else {
      setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
    }
  };

  const removeItem = (id) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist functions
  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.filter(i => i.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const wishlistCount = wishlist.length;

  // Show loading screen while checking authentication
  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {user && <Navbar cartCount={cartCount} wishlistCount={wishlistCount} />}
      <main>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={
            <AuthRoute>
              <Login />
            </AuthRoute>
          } />
          <Route path="/signup" element={
            <AuthRoute>
              <Signup />
            </AuthRoute>
          } />
          
          {/* Protected Routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <Home onAddToCart={addToCart} onToggleWishlist={toggleWishlist} wishlist={wishlist} />
            </ProtectedRoute>
          } />
          <Route path="/shop" element={
            <ProtectedRoute>
              <Shop onAddToCart={addToCart} onToggleWishlist={toggleWishlist} wishlist={wishlist} />
            </ProtectedRoute>
          } />
          <Route path="/product/:id" element={
            <ProtectedRoute>
              <ProductDetail onAddToCart={addToCart} onToggleWishlist={toggleWishlist} wishlist={wishlist} />
            </ProtectedRoute>
          } />
          <Route path="/cart" element={
            <ProtectedRoute>
              <Cart cart={cart} onUpdateQty={updateQty} onRemove={removeItem} />
            </ProtectedRoute>
          } />
          <Route path="/checkout" element={
            <ProtectedRoute>
              <Checkout cart={cart} onClearCart={clearCart} />
            </ProtectedRoute>
          } />
          <Route path="/order-confirmation" element={
            <ProtectedRoute>
              <OrderConfirmation />
            </ProtectedRoute>
          } />
          <Route path="/wishlist" element={
            <ProtectedRoute>
              <Wishlist wishlist={wishlist} onToggleWishlist={toggleWishlist} onAddToCart={addToCart} />
            </ProtectedRoute>
          } />
          <Route path="/account" element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          } />
          <Route path="/about" element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          } />
          <Route path="/faq" element={
            <ProtectedRoute>
              <FAQ />
            </ProtectedRoute>
          } />
          <Route path="/contact" element={
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          } />

          {/* Catch all route */}
          <Route path="*" element={
            user ? <Navigate to="/" replace /> : <Navigate to="/login" replace />
          } />
        </Routes>
      </main>
      {user && <Footer />}
      {user && <FeedbackModal />}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}