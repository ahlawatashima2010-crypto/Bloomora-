import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, ShoppingBag, User as UserIcon, Leaf, ChevronRight, LogOut, Settings, HelpCircle, Home as HomeIcon } from 'lucide-react';
import { PROMO_MESSAGES } from '../constants';
import { useCart, useUser } from '../App';

export const PromoBar = () => {
  return (
    <div className="bg-charcoal text-white text-xs py-2.5 overflow-hidden relative whitespace-nowrap">
      <div className="inline-flex gap-12 animate-scroll">
        {[...PROMO_MESSAGES, ...PROMO_MESSAGES, ...PROMO_MESSAGES].map((msg, i) => (
          <span key={i} className="font-medium tracking-wider uppercase inline-flex items-center gap-2">
            {msg} <span className="text-primary">•</span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export const Header: React.FC<{ toggleCart: () => void }> = ({ toggleCart }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { cartItems } = useCart();
  const { user, logout } = useUser();
  
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-natural/20 transition-all duration-300">
        <PromoBar />
        <div className="container mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Menu Button - Visible on All Screens */}
          <div className="flex items-center mr-2">
              <button 
              className="p-2 -ml-2 text-charcoal hover:bg-natural rounded-lg transition-colors" 
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open Menu"
              >
              <Menu size={26} strokeWidth={1.5} />
              </button>
          </div>

          {/* Logo - Centered on Mobile, Left on Desktop next to Menu Button */}
          <Link to="/" className="flex items-center gap-1 group absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 lg:mr-auto">
            <span className="font-serif text-3xl font-bold text-charcoal tracking-tight flex items-center">
               Bl
               <span className="text-primary inline-flex items-center justify-center relative top-[2px] mx-[1px]">
                  <Leaf size={24} fill="currentColor" className="transform rotate-12" />
               </span>
               omora
            </span>
          </Link>

          {/* Desktop Nav - Optional since we have the sidebar now, but keeping for easy access */}
          <nav className="hidden lg:flex items-center gap-10 mx-8">
            {[
              { name: 'Shop', path: '/catalog' },
              { name: 'Plant Care', path: '/care' },
              { name: 'Quiz', path: '/quiz' },
              { name: 'Blog', path: '/blog' },
            ].map((item) => (
              <Link 
                key={item.name} 
                to={item.path}
                className={`text-sm font-medium tracking-wide transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full ${location.pathname === item.path ? 'text-primary after:w-full' : 'text-charcoal/70 hover:text-charcoal'}`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 lg:gap-3">
            <Link to="/catalog" className="p-2.5 text-charcoal hover:text-primary hover:bg-natural rounded-full transition-colors hidden sm:block">
              <Search size={22} strokeWidth={1.5} />
            </Link>
            
            {user ? (
               <Link to="/profile" className="p-1 text-charcoal hover:text-primary transition-colors hidden sm:block" title="Profile">
                 {user.avatar ? (
                   <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover border border-gray-200" />
                 ) : (
                   <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                      {user.name.charAt(0)}
                   </div>
                 )}
               </Link>
            ) : (
               <Link to="/login" className="p-2.5 text-charcoal hover:text-primary hover:bg-natural rounded-full transition-colors hidden sm:block">
                  <UserIcon size={22} strokeWidth={1.5} />
               </Link>
            )}

            <button 
              onClick={toggleCart} 
              className="p-2.5 text-charcoal hover:text-primary hover:bg-natural rounded-full transition-colors relative"
            >
              <ShoppingBag size={22} strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-white text-[10px] font-bold flex items-center justify-center rounded-full animate-bounce-short border border-white">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Nav Drawer (Left Side) - Works on Mobile and Desktop */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60]">
            {/* Overlay */}
            <div 
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={() => setIsMenuOpen(false)}
            ></div>
            
            {/* Drawer */}
            <div className="absolute top-0 left-0 h-full w-[85%] max-w-sm bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out animate-slide-right">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-natural/20">
                    <div className="flex items-center gap-1">
                        <span className="font-serif text-2xl font-bold text-charcoal flex items-center">
                           Bl
                           <span className="text-primary inline-flex items-center justify-center relative top-[2px] mx-[1px]">
                              <Leaf size={20} fill="currentColor" className="transform rotate-12" />
                           </span>
                           omora
                        </span>
                    </div>
                    <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto py-4">
                    <nav className="flex flex-col">
                        {[
                          { name: 'Home', path: '/', icon: <HomeIcon size={18} /> },
                          { name: 'Shop Collection', path: '/catalog', icon: <Search size={18} /> },
                          { name: 'Plant Care Assistant', path: '/care', icon: <Leaf size={18} /> },
                          { name: 'Find My Plant (Quiz)', path: '/quiz', icon: <HelpCircle size={18} /> },
                          { name: 'Community Blog', path: '/blog', icon: <UserIcon size={18} /> },
                        ].map((item) => (
                          <Link 
                            key={item.name} 
                            to={item.path}
                            className={`flex items-center gap-4 px-6 py-4 text-base font-medium transition-colors border-l-4 ${location.pathname === item.path ? 'bg-natural/50 text-primary border-primary' : 'text-charcoal border-transparent hover:bg-gray-50'}`}
                          >
                             {item.icon}
                             {item.name}
                             <ChevronRight size={16} className="ml-auto text-gray-400" />
                          </Link>
                        ))}
                    </nav>

                    <div className="px-6 py-6 mt-4">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Account</h4>
                        <div className="space-y-1">
                            {user ? (
                                <>
                                  <Link to="/profile" className="flex items-center gap-3 px-0 py-3 text-sm text-gray-600 hover:text-charcoal">
                                      <UserIcon size={18} /> Profile & Orders
                                  </Link>
                                  <Link to="/settings" className="flex items-center gap-3 px-0 py-3 text-sm text-gray-600 hover:text-charcoal">
                                      <Settings size={18} /> Settings
                                  </Link>
                                  <button onClick={logout} className="flex items-center gap-3 px-0 py-3 text-sm text-red-500 hover:text-red-600 w-full text-left">
                                      <LogOut size={18} /> Sign Out
                                  </button>
                                </>
                            ) : (
                                <Link to="/login" className="flex items-center gap-3 px-0 py-3 text-sm text-primary font-bold hover:underline">
                                    <LogOut size={18} /> Sign In / Register
                                </Link>
                            )}
                        </div>
                    </div>
                </div>

                {user && (
                  <div className="p-6 bg-gray-50 border-t border-gray-100">
                     <Link to="/profile" className="flex items-center gap-3">
                        {user.avatar ? (
                          <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                             {user.name.charAt(0)}
                          </div>
                        )}
                        <div>
                           <p className="text-sm font-bold text-charcoal">{user.name}</p>
                           <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                     </Link>
                  </div>
                )}
            </div>
        </div>
      )}
    </>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="bg-charcoal text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="font-serif text-2xl font-bold flex items-center">
                   Bl
                   <span className="text-primary inline-flex items-center justify-center relative top-[2px] mx-[1px]">
                      <Leaf size={20} fill="currentColor" className="transform rotate-12" />
                   </span>
                   omora
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Your daily dose of nature. Sustainably sourced plants, expert care advice, and a community that grows together.
            </p>
          </div>
          
          <div>
            <h4 className="font-serif text-lg font-bold mb-6">Shop</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/catalog" className="hover:text-primary transition-colors">All Plants</Link></li>
              <li><Link to="/catalog" className="hover:text-primary transition-colors">New Arrivals</Link></li>
              <li><Link to="/catalog" className="hover:text-primary transition-colors">Bundles</Link></li>
              <li><Link to="/catalog" className="hover:text-primary transition-colors">Accessories</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-bold mb-6">Support</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#" className="hover:text-primary transition-colors">Care Guide</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">FAQs</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-bold mb-6">Stay in the loop</h4>
            <p className="text-gray-400 text-sm mb-4">Join our newsletter for care tips and exclusive offers.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary w-full"
              />
              <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>&copy; 2024 Bloomora. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};