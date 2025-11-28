
import React, { createContext, useContext, useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import { X, Trash2, ArrowRight } from 'lucide-react';
import { Header, Footer } from './components/Layout';
import { Button } from './components/UI';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Quiz from './pages/Quiz';
import Care from './pages/Care';
import Admin from './pages/Admin';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Blog from './pages/Blog';
import Checkout from './pages/Checkout';
import { Login, Signup, ForgotPassword } from './pages/Auth';
import { Product, CartItem, User } from './types';

// --- Cart Context ---
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};

// --- User Context ---
interface UserContextType {
  user: User | null;
  login: (email: string, name?: string) => void;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};

// --- Main App ---
const App: React.FC = () => {
  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // User State
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('bloomora_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email: string, name: string = "Plant Lover") => {
    const newUser = { name, email, avatar: undefined };
    setUser(newUser);
    localStorage.setItem('bloomora_user', JSON.stringify(newUser));
  };

  const loginWithGoogle = async () => {
    // Simulate Google Login Delay
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const googleUser: User = {
          name: "Alex Smith", // Simulated Google Account Name
          email: "alex.smith@gmail.com",
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100", // Simulated Google Avatar
          isGoogle: true
        };
        setUser(googleUser);
        localStorage.setItem('bloomora_user', JSON.stringify(googleUser));
        resolve();
      }, 1500);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('bloomora_user');
    window.location.href = '#/login';
  };

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce((acc, item) => acc + ((item.salePrice || item.price) * item.quantity), 0);

  // Scroll to top on route change
  const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
    return null;
  };

  return (
    <UserContext.Provider value={{ user, login, loginWithGoogle, logout, isAuthenticated: !!user }}>
      <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, isCartOpen, toggleCart: () => setIsCartOpen(!isCartOpen) }}>
        <HashRouter>
          <ScrollToTop />
          <div className="font-sans text-charcoal antialiased">
            <Routes>
              <Route path="/admin" element={<Admin />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="*" element={
                <>
                  <Header toggleCart={() => setIsCartOpen(true)} />
                  <main className="min-h-screen">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/catalog" element={<Catalog />} />
                      <Route path="/product/:id" element={<ProductDetail />} />
                      <Route path="/quiz" element={<Quiz />} />
                      <Route path="/care" element={<Care />} />
                      <Route path="/blog" element={<Blog />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/settings" element={<Settings />} />
                    </Routes>
                  </main>
                  <Footer />
                </>
              } />
            </Routes>

            {/* Cart Drawer */}
            {isCartOpen && (
              <div className="fixed inset-0 z-[60]">
                 <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={() => setIsCartOpen(false)}></div>
                 <div className="absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl animate-slide-left flex flex-col">
                    <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-natural/20">
                       <h2 className="font-serif text-2xl font-bold">Your Cart ({cartItems.length})</h2>
                       <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={24}/></button>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                       {cartItems.length === 0 ? (
                         <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                            <div className="text-6xl mb-4">🍃</div>
                            <p className="text-lg font-medium">Your cart is feeling lonely.</p>
                            <Button className="mt-6" onClick={() => setIsCartOpen(false)}>Start Shopping</Button>
                         </div>
                       ) : (
                         cartItems.map(item => (
                           <div key={item.id} className="flex gap-4">
                              <div className="w-20 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                 <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                              </div>
                              <div className="flex-1">
                                 <div className="flex justify-between items-start mb-1">
                                    <h3 className="font-bold text-charcoal">{item.name}</h3>
                                    <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500"><Trash2 size={16}/></button>
                                 </div>
                                 <p className="text-xs text-gray-500 mb-2">{item.category}</p>
                                 <div className="flex justify-between items-end">
                                    <div className="flex items-center border rounded px-2 py-1 gap-3">
                                       <button onClick={() => updateQuantity(item.id, -1)} className="px-1 text-gray-500">-</button>
                                       <span className="text-sm font-medium">{item.quantity}</span>
                                       <button onClick={() => updateQuantity(item.id, 1)} className="px-1 text-gray-500">+</button>
                                    </div>
                                    <span className="font-bold text-primary">₹{(item.salePrice || item.price) * item.quantity}</span>
                                 </div>
                              </div>
                           </div>
                         ))
                       )}
                    </div>

                    {cartItems.length > 0 && (
                      <div className="p-6 border-t border-gray-100 bg-gray-50">
                         <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-sm">
                               <span className="text-gray-500">Subtotal</span>
                               <span className="font-bold">₹{cartTotal}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                               <span className="text-gray-500">Shipping</span>
                               <span className="text-green-600 font-medium">Free</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold pt-3 border-t">
                               <span>Total</span>
                               <span>₹{cartTotal}</span>
                            </div>
                         </div>
                         <Link to="/checkout" onClick={() => setIsCartOpen(false)}>
                            <Button className="w-full h-12 text-lg shadow-lg flex items-center justify-center gap-2">
                              Checkout <ArrowRight size={18} />
                            </Button>
                         </Link>
                      </div>
                    )}
                 </div>
              </div>
            )}
          </div>
        </HashRouter>
      </CartContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
