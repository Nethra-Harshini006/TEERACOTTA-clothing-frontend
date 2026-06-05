import { useState, useEffect, useCallback, useRef } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { cartAPI, wishlistAPI } from './services/api';
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


function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

function AuthRoute({ children }) {
  const { user } = useAuth();
  return user ? <Navigate to="/" replace /> : children;
}

function AppContent() {
  const { user, loading } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark-theme');
    } else {
      document.documentElement.classList.remove('dark-theme');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);
  const skipCartSave = useRef(true);
  const skipWishlistSave = useRef(true);

  useEffect(() => {
    if (!user) {
      setCart([]);
      setWishlist([]);
      skipCartSave.current = true;
      skipWishlistSave.current = true;
      return;
    }

    setDataLoading(true);
    skipCartSave.current = true;
    skipWishlistSave.current = true;

    Promise.all([cartAPI.get(), wishlistAPI.get()])
      .then(([cartRes, wishlistRes]) => {
        setCart(cartRes.items || []);
        setWishlist(wishlistRes.items || []);
      })
      .catch((err) => console.error('Failed to load user data:', err.message))
      .finally(() => {
        setDataLoading(false);
        skipCartSave.current = false;
        skipWishlistSave.current = false;
      });
  }, [user]);

  useEffect(() => {
    if (!user || skipCartSave.current) return;
    cartAPI.save(cart).catch((err) => console.error('Cart save failed:', err.message));
  }, [cart, user]);

  useEffect(() => {
    if (!user || skipWishlistSave.current) return;
    wishlistAPI.save(wishlist).catch((err) => console.error('Wishlist save failed:', err.message));
  }, [wishlist, user]);

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
    if (qty < 1) setCart(prev => prev.filter(i => i.id !== id));
    else setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  };

  const removeItem = (id) => setCart(prev => prev.filter(i => i.id !== id));

  const clearCart = useCallback(async () => {
    skipCartSave.current = true;
    setCart([]);
    if (user) {
      try {
        await cartAPI.save([]);
      } catch (err) {
        console.error('Clear cart failed:', err.message);
      }
    }
    skipCartSave.current = false;
  }, [user]);

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.filter(i => i.id !== product.id);
      return [...prev, product];
    });
  };

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const wishlistCount = wishlist.length;

  if (loading || (user && dataLoading)) {
    return <Loading />;
  }

  return (
    <>
      {user && <Navbar cartCount={cartCount} wishlistCount={wishlistCount} theme={theme} onToggleTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} />}
      <main>
        <Routes>
          <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />
          <Route path="/signup" element={<AuthRoute><Signup /></AuthRoute>} />
          <Route path="/" element={<ProtectedRoute><Home onAddToCart={addToCart} onToggleWishlist={toggleWishlist} wishlist={wishlist} /></ProtectedRoute>} />
          <Route
  path="/shop"
  element={
    <ProtectedRoute>
      <Shop
        cart={cart}
        onAddToCart={addToCart}
        onUpdateQty={updateQty}
        onToggleWishlist={toggleWishlist}
        wishlist={wishlist}
      />
    </ProtectedRoute>
  }
/>
          <Route path="/product/:id" element={<ProtectedRoute><ProductDetail onAddToCart={addToCart} onToggleWishlist={toggleWishlist} wishlist={wishlist} /></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute><Cart cart={cart} onUpdateQty={updateQty} onRemove={removeItem} /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute><Checkout cart={cart} onClearCart={clearCart} /></ProtectedRoute>} />
          <Route path="/order-confirmation" element={<ProtectedRoute><OrderConfirmation /></ProtectedRoute>} />
          <Route path="/wishlist" element={<ProtectedRoute><Wishlist wishlist={wishlist} onToggleWishlist={toggleWishlist} onAddToCart={addToCart} /></ProtectedRoute>} />
          <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
          <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
          <Route path="/faq" element={<ProtectedRoute><FAQ /></ProtectedRoute>} />
          <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
          <Route path="*" element={user ? <Navigate to="/" replace /> : <Navigate to="/login" replace />} />
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
