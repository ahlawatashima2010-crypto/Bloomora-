
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User as UserIcon, Package, Heart, MapPin, Settings, LogOut, CreditCard, ChevronLeft } from 'lucide-react';
import { Button } from '../components/UI';
import { useUser } from '../App';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useUser();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col p-6 bg-natural/20">
         <h2 className="font-serif text-2xl font-bold text-charcoal mb-4">Please Sign In</h2>
         <p className="text-gray-500 mb-6">You need to be logged in to view your profile.</p>
         <Button onClick={() => navigate('/login')}>Go to Login</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-natural/20 pt-8 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Back Button */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-charcoal mb-6 transition-colors font-medium">
           <ChevronLeft size={20} /> Back
        </button>

        <h1 className="font-serif text-4xl font-bold text-charcoal mb-8">My Profile</h1>

        {/* User Info Card */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
           {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full object-cover border-4 border-natural" />
           ) : (
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary text-3xl font-bold">
                  {user.name.charAt(0)}
              </div>
           )}
           <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-charcoal mb-1">{user.name}</h2>
              <p className="text-gray-500 mb-2">{user.email}</p>
              {user.isGoogle && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 mb-2">
                   Google Account
                </span>
              )}
              <div className="mt-2">
                <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                  Level: Eco Guardian
                </div>
              </div>
              <p className="text-gray-600 max-w-md">
                 "I love filling my apartment with greenery. Monstera enthusiast."
              </p>
           </div>
           <Button variant="outline" className="flex-shrink-0" onClick={() => navigate('/settings')}>
              Edit Profile
           </Button>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-4 mb-4">
                 <div className="bg-blue-100 p-3 rounded-xl text-blue-600"><Package size={24}/></div>
                 <h3 className="font-bold text-lg text-charcoal">My Orders</h3>
              </div>
              <p className="text-gray-500 text-sm mb-4">Track active shipments and view order history.</p>
              <span className="text-primary font-bold text-sm">2 Active Orders</span>
           </div>

           <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-4 mb-4">
                 <div className="bg-red-100 p-3 rounded-xl text-red-600"><Heart size={24}/></div>
                 <h3 className="font-bold text-lg text-charcoal">Wishlist</h3>
              </div>
              <p className="text-gray-500 text-sm mb-4">Your saved plants for later.</p>
              <span className="text-primary font-bold text-sm">5 Items Saved</span>
           </div>
           
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-4 mb-4">
                 <div className="bg-yellow-100 p-3 rounded-xl text-yellow-600"><CreditCard size={24}/></div>
                 <h3 className="font-bold text-lg text-charcoal">Payment Methods</h3>
              </div>
              <p className="text-gray-500 text-sm mb-4">Manage saved cards and billing.</p>
              <span className="text-primary font-bold text-sm">Visa ending in 4242</span>
           </div>

           <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-4 mb-4">
                 <div className="bg-purple-100 p-3 rounded-xl text-purple-600"><MapPin size={24}/></div>
                 <h3 className="font-bold text-lg text-charcoal">Addresses</h3>
              </div>
              <p className="text-gray-500 text-sm mb-4">Manage shipping and billing addresses.</p>
              <span className="text-primary font-bold text-sm">1 Default Address</span>
           </div>
        </div>

        {/* Menu Links */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
           <Link to="/settings" className="flex items-center justify-between p-5 border-b border-gray-100 hover:bg-gray-50">
              <div className="flex items-center gap-3 text-charcoal font-medium">
                 <Settings size={20} className="text-gray-400"/> Settings
              </div>
              <span className="text-gray-400">→</span>
           </Link>
           <button onClick={logout} className="w-full flex items-center justify-between p-5 hover:bg-red-50 text-red-500 font-medium">
              <div className="flex items-center gap-3">
                 <LogOut size={20} /> Sign Out
              </div>
           </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
