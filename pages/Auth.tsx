

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, ArrowRight, Mail, Lock, User as UserIcon, Eye, EyeOff } from 'lucide-react';
import { Button } from '../components/UI';
import { useUser } from '../App';

// Shared Layout for Auth Pages
const AuthLayout: React.FC<{ children: React.ReactNode; title: string; subtitle: string; image: string }> = ({ children, title, subtitle, image }) => {
  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden bg-natural">
        <img 
          src={image} 
          alt="Auth Background" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>
        <div className="absolute bottom-12 left-12 right-12 text-white z-10">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary mb-6">
             <Leaf size={24} fill="currentColor" />
          </div>
          <h2 className="font-serif text-4xl font-bold mb-4">Grow your urban jungle with Bloomora.</h2>
          <p className="text-white/90 text-lg">Join a community of over 50,000 plant enthusiasts.</p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="max-w-md w-full">
           <Link to="/" className="inline-flex items-center gap-2 text-charcoal font-bold mb-12 group">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
                  <Leaf size={16} fill="currentColor" />
              </div>
              <span className="font-serif text-xl">Bloomora</span>
           </Link>
           
           <div className="mb-8">
             <h1 className="font-serif text-3xl font-bold text-charcoal mb-2">{title}</h1>
             <p className="text-gray-500">{subtitle}</p>
           </div>

           {children}
        </div>
      </div>
    </div>
  );
};

// --- Login Component ---
export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, loginWithGoogle } = useUser();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login
    setTimeout(() => {
      login(email, name || "Plant Enthusiast");
      setIsLoading(false);
      navigate('/');
    }, 800);
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    await loginWithGoogle();
    setIsGoogleLoading(false);
    navigate('/');
  };

  return (
    <AuthLayout 
      title="Welcome Back" 
      subtitle="Enter your details to access your account."
      image="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1200"
    >
      <div className="space-y-5">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Field (Added as requested so profile shows correct name) */}
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">Your Name</label>
            <div className="relative">
               <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
               <input 
                 type="text" 
                 value={name}
                 onChange={(e) => setName(e.target.value)}
                 placeholder="What should we call you?"
                 className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                 required
               />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">Email Address</label>
            <div className="relative">
               <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
               <input 
                 type="email" 
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 placeholder="you@gmail.com"
                 className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                 required
                 pattern=".*@gmail\.com"
                 title="Please use a valid @gmail.com address"
               />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">Password</label>
            <div className="relative">
               <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
               <input 
                 type={showPassword ? "text" : "password"} 
                 placeholder="••••••••"
                 className="w-full pl-12 pr-12 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                 required
               />
               <button 
                 type="button" 
                 onClick={() => setShowPassword(!showPassword)}
                 className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-charcoal"
               >
                 {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
               </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
             <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                <span className="text-gray-600">Remember me</span>
             </label>
             <Link to="/forgot-password" className="text-primary font-medium hover:underline">Forgot password?</Link>
          </div>

          <Button type="submit" className="w-full h-12 text-base" isLoading={isLoading}>Sign In</Button>
        </form>
        
        <div className="relative my-6">
           <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
           <div className="relative flex justify-center text-sm"><span className="bg-white px-2 text-gray-500">Or continue with</span></div>
        </div>

        <div className="grid grid-cols-1 gap-4">
           <button 
             type="button" 
             onClick={handleGoogleSignIn}
             disabled={isGoogleLoading}
             className="flex items-center justify-center gap-3 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium relative overflow-hidden"
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
              {isGoogleLoading ? 'Connecting to Google...' : 'Sign in with Google'}
           </button>
        </div>

        <p className="text-center text-sm text-gray-600 mt-6">
           Don't have an account? <Link to="/signup" className="text-primary font-bold hover:underline">Sign up</Link>
        </p>
      </div>
    </AuthLayout>
  );
};

// --- Signup Component ---
export const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useUser();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      login(formData.email, formData.name);
      setIsLoading(false);
      navigate('/');
    }, 800);
  };

  return (
    <AuthLayout 
      title="Create Account" 
      subtitle="Start your plant journey today."
      image="https://images.unsplash.com/photo-1463320898484-cdee8141c787?auto=format&fit=crop&q=80&w=1200"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-charcoal mb-2">Full Name</label>
          <div className="relative">
             <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
             <input 
               type="text" 
               placeholder="John Doe"
               value={formData.name}
               onChange={(e) => setFormData({...formData, name: e.target.value})}
               className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
               required
             />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal mb-2">Email Address</label>
          <div className="relative">
             <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
             <input 
               type="email" 
               placeholder="you@gmail.com"
               value={formData.email}
               onChange={(e) => setFormData({...formData, email: e.target.value})}
               className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
               required
             />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-charcoal mb-2">Password</label>
          <div className="relative">
             <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
             <input 
               type={showPassword ? "text" : "password"} 
               placeholder="Create a strong password"
               value={formData.password}
               onChange={(e) => setFormData({...formData, password: e.target.value})}
               className="w-full pl-12 pr-12 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
               required
             />
             <button 
               type="button" 
               onClick={() => setShowPassword(!showPassword)}
               className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-charcoal"
             >
               {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
             </button>
          </div>
        </div>

        <Button type="submit" className="w-full h-12 text-base" isLoading={isLoading}>Create Account</Button>
        
        <p className="text-center text-sm text-gray-600 mt-6">
           Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Log in</Link>
        </p>
      </form>
    </AuthLayout>
  );
};

// --- Forgot Password Component ---
export const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <AuthLayout 
      title="Reset Password" 
      subtitle="Don't worry, it happens to the best of us."
      image="https://images.unsplash.com/photo-1463320898484-cdee8141c787?auto=format&fit=crop&q=80&w=1200"
    >
      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">Email Address</label>
            <div className="relative">
               <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
               <input 
                 type="email" 
                 placeholder="you@example.com"
                 className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                 required
               />
            </div>
          </div>

          <Button type="submit" className="w-full h-12 text-base">Send Reset Link</Button>
          
          <div className="text-center">
             <Link to="/login" className="text-sm font-medium text-gray-500 hover:text-charcoal flex items-center justify-center gap-1">
               <ArrowRight size={14} className="rotate-180"/> Back to Login
             </Link>
          </div>
        </form>
      ) : (
        <div className="text-center py-8">
           <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail size={32} />
           </div>
           <h3 className="font-serif text-2xl font-bold text-charcoal mb-2">Check your email</h3>
           <p className="text-gray-500 mb-8">We've sent a password reset link to your email address.</p>
           <Button variant="outline" className="w-full" onClick={() => navigate('/login')}>Back to Login</Button>
        </div>
      )}
    </AuthLayout>
  );
};
