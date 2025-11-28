
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Leaf, ArrowLeft, CreditCard, Truck, CheckCircle, Smartphone, Wallet, ShieldCheck, ChevronLeft } from 'lucide-react';
import { useCart, useUser } from '../App';
import { Button } from '../components/UI';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const { user } = useUser();
  
  const [step, setStep] = useState<'shipping' | 'success'>('shipping');
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'cod'>('card');
  
  const cartTotal = cartItems.reduce((acc, item) => acc + ((item.salePrice || item.price) * item.quantity), 0);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep('success');
      clearCart();
    }, 2000);
  };

  if (cartItems.length === 0 && step !== 'success') {
    return (
      <div className="min-h-screen bg-natural/20 flex items-center justify-center p-6">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-bold text-charcoal mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Looks like you haven't added any plants yet.</p>
          <Button onClick={() => navigate('/catalog')}>Start Shopping</Button>
        </div>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-natural/20 flex items-center justify-center p-6 animate-fade-in">
        <div className="bg-white p-12 rounded-3xl shadow-xl max-w-lg w-full text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-green-300"></div>
          <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-short">
             <CheckCircle size={48} />
          </div>
          <h1 className="font-serif text-4xl font-bold text-charcoal mb-4">Order Placed!</h1>
          <p className="text-gray-500 mb-8 text-lg">
             Thank you for your purchase, {user?.name || 'Plant Lover'}. Your green friends are getting ready for their journey home.
          </p>
          <div className="bg-gray-50 p-4 rounded-xl mb-8 text-sm text-gray-600 border border-gray-100">
             <p className="font-bold mb-1">Order #BLM-{Math.floor(Math.random() * 10000)}</p>
             <p>Check your email for tracking details.</p>
          </div>
          <div className="space-y-3">
             <Button className="w-full" onClick={() => navigate('/')}>Return Home</Button>
             <Button variant="outline" className="w-full" onClick={() => navigate('/catalog')}>Continue Shopping</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-charcoal">
      {/* Checkout Header */}
      <header className="bg-white border-b border-gray-100 py-4 px-6 sticky top-0 z-10">
        <div className="container mx-auto max-w-6xl flex justify-between items-center">
           <div className="flex items-center gap-4">
               <button onClick={() => navigate(-1)} className="p-1 text-gray-500 hover:text-charcoal transition-colors">
                  <ChevronLeft size={24} />
               </button>
               <Link to="/" className="flex items-center gap-1 group">
                 <span className="font-serif text-2xl font-bold text-charcoal tracking-tight flex items-center">
                    Bl
                    <span className="text-primary inline-flex items-center justify-center relative top-[2px] mx-[1px]">
                       <Leaf size={20} fill="currentColor" className="transform rotate-12" />
                    </span>
                    omora
                 </span>
               </Link>
           </div>
           
           <div className="flex items-center gap-2 text-sm font-medium text-gray-400">
              <span className="text-primary">Shipping</span>
              <span>/</span>
              <span className={step === 'success' ? 'text-primary' : ''}>Confirmation</span>
           </div>
        </div>
      </header>

      <main className="container mx-auto max-w-6xl p-6 py-10">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Column - Forms */}
          <div className="flex-1">
             <form id="checkout-form" onSubmit={handlePlaceOrder}>
                {/* Contact */}
                <section className="mb-10">
                   <h2 className="font-serif text-xl font-bold text-charcoal mb-4 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-charcoal text-white text-xs flex items-center justify-center">1</span> Contact Information
                   </h2>
                   <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
                      <div>
                         <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                         <input type="email" defaultValue={user?.email} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary" required />
                      </div>
                      <div className="flex items-center gap-2">
                         <input type="checkbox" id="newsletter" className="rounded text-primary focus:ring-primary" defaultChecked />
                         <label htmlFor="newsletter" className="text-sm text-gray-600">Keep me posted about new products and offers</label>
                      </div>
                   </div>
                </section>

                {/* Shipping */}
                <section className="mb-10">
                   <h2 className="font-serif text-xl font-bold text-charcoal mb-4 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-charcoal text-white text-xs flex items-center justify-center">2</span> Shipping Address
                   </h2>
                   <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                         <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                            <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary" required />
                         </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                            <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary" required />
                         </div>
                      </div>
                      <div>
                         <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                         <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary" required />
                      </div>
                      <div>
                         <label className="block text-sm font-medium text-gray-700 mb-1">Apartment, suite, etc. (optional)</label>
                         <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary" />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                         <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                            <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary" required />
                         </div>
                         <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                            <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary" required />
                         </div>
                         <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                            <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary" required />
                         </div>
                      </div>
                   </div>
                </section>

                {/* Payment */}
                <section className="mb-8">
                   <h2 className="font-serif text-xl font-bold text-charcoal mb-4 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-charcoal text-white text-xs flex items-center justify-center">3</span> Payment Method
                   </h2>
                   <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                      {/* Card Option */}
                      <label className={`flex items-center gap-4 p-4 border-b border-gray-100 cursor-pointer transition-colors ${paymentMethod === 'card' ? 'bg-primary/5' : 'hover:bg-gray-50'}`}>
                         <input type="radio" name="payment" className="text-primary focus:ring-primary" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
                         <div className="flex-1 flex justify-between items-center">
                            <span className="font-medium flex items-center gap-2"><CreditCard size={20} className="text-gray-500"/> Credit/Debit Card</span>
                            <div className="flex gap-2">
                               <div className="w-8 h-5 bg-gray-200 rounded"></div>
                               <div className="w-8 h-5 bg-gray-200 rounded"></div>
                            </div>
                         </div>
                      </label>
                      {paymentMethod === 'card' && (
                         <div className="p-6 bg-gray-50 border-b border-gray-100 animate-slide-up">
                            <div className="space-y-4">
                               <div>
                                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Card Number</label>
                                  <input type="text" placeholder="0000 0000 0000 0000" className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white" />
                               </div>
                               <div className="grid grid-cols-2 gap-4">
                                  <div>
                                     <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Expiry</label>
                                     <input type="text" placeholder="MM / YY" className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white" />
                                  </div>
                                  <div>
                                     <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">CVC</label>
                                     <input type="text" placeholder="123" className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white" />
                                  </div>
                               </div>
                            </div>
                         </div>
                      )}

                      {/* UPI Option */}
                      <label className={`flex items-center gap-4 p-4 border-b border-gray-100 cursor-pointer transition-colors ${paymentMethod === 'upi' ? 'bg-primary/5' : 'hover:bg-gray-50'}`}>
                         <input type="radio" name="payment" className="text-primary focus:ring-primary" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} />
                         <span className="font-medium flex items-center gap-2"><Smartphone size={20} className="text-gray-500"/> UPI / Wallet</span>
                      </label>
                      {paymentMethod === 'upi' && (
                         <div className="p-6 bg-gray-50 border-b border-gray-100 animate-slide-up">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">UPI ID</label>
                            <input type="text" placeholder="username@upi" className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white" />
                         </div>
                      )}

                      {/* COD Option */}
                      <label className={`flex items-center gap-4 p-4 cursor-pointer transition-colors ${paymentMethod === 'cod' ? 'bg-primary/5' : 'hover:bg-gray-50'}`}>
                         <input type="radio" name="payment" className="text-primary focus:ring-primary" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
                         <span className="font-medium flex items-center gap-2"><Wallet size={20} className="text-gray-500"/> Cash on Delivery</span>
                      </label>
                   </div>
                </section>
             </form>
          </div>

          {/* Right Column - Summary */}
          <div className="lg:w-96">
             <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-lg sticky top-24">
                <h3 className="font-serif text-lg font-bold text-charcoal mb-4">Order Summary</h3>
                <div className="space-y-4 max-h-60 overflow-y-auto mb-6 pr-2 custom-scrollbar">
                   {cartItems.map(item => (
                      <div key={item.id} className="flex gap-3">
                         <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0 relative">
                            <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                            <span className="absolute top-0 right-0 bg-primary text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-bl-md font-bold">{item.quantity}</span>
                         </div>
                         <div className="flex-1">
                            <h4 className="text-sm font-bold text-charcoal line-clamp-1">{item.name}</h4>
                            <p className="text-xs text-gray-500">{item.category}</p>
                         </div>
                         <span className="text-sm font-medium">₹{(item.salePrice || item.price) * item.quantity}</span>
                      </div>
                   ))}
                </div>

                <div className="border-t border-gray-100 pt-4 space-y-3 text-sm">
                   <div className="flex justify-between text-gray-500">
                      <span>Subtotal</span>
                      <span>₹{cartTotal}</span>
                   </div>
                   <div className="flex justify-between text-gray-500">
                      <span>Shipping</span>
                      <span className="text-green-600 font-medium">Free</span>
                   </div>
                   <div className="flex justify-between border-t border-gray-100 pt-3 text-lg font-bold text-charcoal">
                      <span>Total</span>
                      <span>₹{cartTotal}</span>
                   </div>
                </div>

                <div className="mt-6 space-y-3">
                   <Button 
                     type="submit" 
                     form="checkout-form"
                     className="w-full h-12 text-lg" 
                     isLoading={loading}
                   >
                     {loading ? 'Processing...' : `Pay ₹${cartTotal}`}
                   </Button>
                   <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1">
                      <ShieldCheck size={12}/> Secure 256-bit SSL encrypted payment
                   </p>
                </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
