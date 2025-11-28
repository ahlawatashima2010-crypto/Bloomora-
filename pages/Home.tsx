

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Truck, ShieldCheck, Droplets, X, Leaf } from 'lucide-react';
import { Button, ProductCard } from '../components/UI';
import { MOCK_PRODUCTS, MOCK_BLOGS } from '../constants';
import { useCart, useUser } from '../App';

const WelcomeModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const navigate = useNavigate();
  const { loginWithGoogle } = useUser();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    await loginWithGoogle();
    setIsGoogleLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>
      
      {/* Modal Content */}
      <div className="bg-white rounded-3xl overflow-hidden max-w-md w-full relative z-10 shadow-2xl animate-scale-up">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white rounded-full text-charcoal transition-colors z-20 backdrop-blur-md">
           <X size={20} />
        </button>
        
        <div className="relative h-40 bg-natural overflow-hidden">
           <img src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Welcome" />
           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
              <div className="flex items-center gap-3 text-white">
                 <div className="bg-primary p-2 rounded-xl">
                    <Leaf size={24} fill="currentColor" />
                 </div>
                 <div>
                    <h3 className="font-serif text-2xl font-bold leading-none">Bloomora</h3>
                    <p className="text-xs text-white/80 font-medium tracking-wider uppercase mt-1">Your Green Companion</p>
                 </div>
              </div>
           </div>
        </div>

        <div className="p-8 text-center">
           <h2 className="font-serif text-3xl font-bold text-charcoal mb-2">Welcome Back</h2>
           <p className="text-gray-500 mb-6 leading-relaxed text-sm">
              Sign in to unlock exclusive bundles, earn LeafCoins, and get personalized care tips.
           </p>
           
           <div className="space-y-3">
               {/* Google Sign In Button */}
               <button 
                 type="button" 
                 onClick={handleGoogleSignIn}
                 disabled={isGoogleLoading}
                 className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium relative overflow-hidden group shadow-sm"
               >
                  {isGoogleLoading ? (
                    <span className="w-5 h-5 border-2 border-charcoal border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  )}
                  {isGoogleLoading ? 'Signing in...' : 'Sign in with Google'}
               </button>

              <div className="grid grid-cols-2 gap-3">
                 <Button variant="primary" onClick={() => navigate('/login')}>Sign In</Button>
                 <Button variant="outline" onClick={() => navigate('/signup')}>Sign Up</Button>
              </div>
           </div>
           
           <button onClick={onClose} className="mt-6 text-xs text-gray-400 hover:text-charcoal transition-colors font-medium border-b border-transparent hover:border-charcoal">
              Continue as Guest
           </button>
        </div>
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useUser();
  const newArrivals = MOCK_PRODUCTS.slice(0, 4);
  
  // Show modal immediately if user is NOT logged in.
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    if (!user) {
      setShowWelcome(true);
    } else {
      setShowWelcome(false);
    }
  }, [user]);

  const categories = [
    { name: 'Easy Care', image: 'https://images.unsplash.com/photo-1593696954577-ab3d39317b97?auto=format&fit=crop&q=80&w=600', subtitle: 'Hard to kill' },
    { name: 'Pet Friendly', image: 'https://images.unsplash.com/photo-1615454657158-94f42475e810?auto=format&fit=crop&q=80&w=600', subtitle: 'Safe for fur babies' },
    { name: 'Air Purifying', image: 'https://images.unsplash.com/photo-1596728328634-112348c66e66?auto=format&fit=crop&q=80&w=600', subtitle: 'Breathe better' },
    { name: 'Bundles', image: 'https://images.unsplash.com/photo-1612361661642-1e905d45d612?auto=format&fit=crop&q=80&w=600', subtitle: 'Start your jungle' },
  ];

  return (
    <div className="animate-fade-in relative">
      {showWelcome && <WelcomeModal onClose={() => setShowWelcome(false)} />}
      
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden bg-[#F4F1EE]">
        <div className="container mx-auto px-6 relative z-20 flex flex-col justify-center h-full">
           <div className="max-w-4xl relative">
              <span className="text-primary font-bold tracking-[0.2em] text-sm uppercase mb-6 block animate-slide-up">
                 Est. 2024 • Modern Greenery
              </span>
              
              <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-bold text-charcoal mb-6 leading-[0.9] tracking-tighter animate-slide-up delay-100">
                BLOOMORA
              </h1>
              
              <div className="h-1 w-32 bg-primary mb-8 animate-slide-right delay-200"></div>

              <p className="text-gray-600 text-xl md:text-2xl mb-10 max-w-lg leading-relaxed animate-slide-up delay-200 font-light">
                Bring nature home. A curated collection of plants that breathe life into your personal space.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-5 animate-slide-up delay-300">
                <Button size="lg" className="px-10 h-14 text-lg shadow-xl shadow-primary/20" onClick={() => navigate('/catalog')}>
                  Start Shopping
                </Button>
                <Button size="lg" variant="outline" className="px-10 h-14 text-lg border-charcoal text-charcoal hover:bg-charcoal hover:text-white" onClick={() => navigate('/quiz')}>
                  Find Your Match
                </Button>
              </div>
           </div>
        </div>

        {/* Hero Image */}
        <div className="absolute top-0 right-0 w-full md:w-[60%] h-full z-10 pointer-events-none">
           <div className="absolute inset-0 bg-gradient-to-r from-[#F4F1EE] via-transparent to-transparent z-20"></div>
           <img 
              src="https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&q=80&w=1600" 
              className="w-full h-full object-cover object-center transform translate-x-10 md:translate-x-0"
              alt="Hero Plant"
           />
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-white border-b border-natural">
        <div className="container mx-auto px-6 max-w-4xl text-center">
           <div className="inline-flex items-center justify-center p-3 bg-natural rounded-full mb-6 text-primary">
              <Leaf size={24} />
           </div>
           <span className="text-primary font-bold uppercase tracking-wider text-xs mb-4 block">Our Philosophy</span>
           <h2 className="font-serif text-4xl md:text-5xl font-bold text-charcoal mb-8">Effortless Plant Care</h2>
           <div className="prose prose-lg mx-auto text-gray-600 leading-relaxed space-y-6">
             <p className="text-xl font-light text-charcoal/80">
               We offer self-watering solutions that combine aesthetic and technology, fostering a thriving environment for your plants.
             </p>
             <p>
               We believe plants are more than decor, they’re companions that improve well-being, and transform any corner into a vibrant space.
               We design self-watering planters, and tailored greenery solutions that are beautiful, sustainable, and effortless to maintain.
             </p>
             <p>
               From personal planters to large scale landscaping and workplace greenery solutions, <span className="font-serif font-bold text-primary">Bloomora</span> blends design, care, and convenience into every offering.
               We serve both individual customers and businesses who want to create greener, healthier environments.
             </p>
           </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-16 bg-[#FAFAFA]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <ShieldCheck size={28} />, title: "Sustainably Grown", desc: "Ethical sourcing from local nurseries." },
              { icon: <Truck size={28} />, title: "Safe Delivery", desc: "Specialized packaging ensures safe arrival." },
              { icon: <Droplets size={28} />, title: "Care Guarantee", desc: "14-day happiness guarantee on all plants." },
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:translate-y-[-5px] transition-transform duration-300">
                <div className="text-primary mb-4 p-4 bg-natural/50 rounded-full">{feature.icon}</div>
                <h3 className="font-serif text-xl font-bold mb-2 text-charcoal">{feature.title}</h3>
                <p className="text-gray-500 text-sm max-w-xs">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
           <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
               <span className="text-primary font-bold uppercase tracking-wider text-xs block mb-2">Curated Collections</span>
               <h2 className="font-serif text-4xl font-bold text-charcoal">Shop by Category</h2>
            </div>
            <button className="text-primary font-medium hover:underline flex items-center gap-1 group" onClick={() => navigate('/catalog')}>
              View All <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {categories.map((cat, idx) => (
               <div 
                  key={cat.name} 
                  className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-500" 
                  onClick={() => navigate('/catalog')}
                >
                 <img 
                    src={cat.image} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    alt={cat.name} 
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                    <span className="text-white/80 text-xs font-medium uppercase tracking-wider mb-1 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">{cat.subtitle}</span>
                    <span className="text-white font-serif text-2xl font-bold group-hover:text-accent transition-colors">{cat.name}</span>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-24 bg-natural/30">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary font-bold uppercase tracking-wider text-xs">Fresh from the nursery</span>
            <h2 className="font-serif text-4xl font-bold text-charcoal mt-3 mb-4">New Arrivals</h2>
            <p className="text-gray-500">Check out our latest additions, perfect for the season.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {newArrivals.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={addToCart}
                onNavigate={(id) => navigate(`/product/${id}`)}
              />
            ))}
          </div>
          
          <div className="mt-16 text-center">
             <Button variant="outline" size="lg" onClick={() => navigate('/catalog')}>Shop All Plants</Button>
          </div>
        </div>
      </section>

      {/* Quiz Teaser */}
      <section className="py-24 bg-primary overflow-hidden relative">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
         <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-black/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
         
         <div className="container mx-auto px-6 relative z-10 text-center text-white">
            <h2 className="font-serif text-4xl md:text-6xl font-bold mb-6">Not sure what to choose?</h2>
            <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
               Every home is unique. Take our 30-second mood quiz to find the perfect plant match for your space, light, and lifestyle.
            </p>
            <Button variant="secondary" size="lg" onClick={() => navigate('/quiz')} className="bg-white text-primary hover:bg-gray-100">
               Find My Perfect Plant
            </Button>
         </div>
      </section>

      {/* Blog Preview */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-3xl font-bold text-charcoal mb-10">From the Community</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
             {MOCK_BLOGS.map(blog => (
               <div key={blog.id} className="group cursor-pointer" onClick={() => navigate('/blog')}>
                  <div className="h-64 overflow-hidden rounded-2xl mb-6 shadow-sm">
                    <img src={blog.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={blog.title} />
                  </div>
                  <div>
                     <span className="text-xs font-bold text-primary uppercase tracking-wide mb-2 block">{blog.category}</span>
                     <h3 className="font-serif text-xl font-bold text-charcoal mb-3 group-hover:text-primary transition-colors leading-tight">{blog.title}</h3>
                     <p className="text-gray-500 text-sm mb-4 line-clamp-2">{blog.excerpt}</p>
                     <button className="text-xs font-bold text-charcoal uppercase tracking-wide border-b border-charcoal pb-0.5 group-hover:text-primary group-hover:border-primary transition-all">Read Article</button>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
