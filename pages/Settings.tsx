import React, { useState } from 'react';
import { Bell, Lock, Moon, Globe, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Toggle: React.FC<{ checked: boolean; onChange: () => void }> = ({ checked, onChange }) => (
  <button 
    className={`w-12 h-6 rounded-full transition-colors relative ${checked ? 'bg-primary' : 'bg-gray-300'}`}
    onClick={onChange}
  >
    <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${checked ? 'left-7' : 'left-1'}`}></div>
  </button>
);

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [location, setLocation] = useState(true);

  return (
    <div className="min-h-screen bg-natural/20 pt-8 pb-20">
      <div className="container mx-auto px-6 max-w-2xl">
         <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-charcoal mb-6">
            <ChevronLeft size={20} /> Back
         </button>
         
         <h1 className="font-serif text-3xl font-bold text-charcoal mb-8">Settings</h1>

         <div className="space-y-6">
            {/* Account Settings */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
               <div className="p-4 bg-gray-50 border-b border-gray-100 font-bold text-gray-500 text-xs uppercase tracking-wider">
                  Preferences
               </div>
               
               <div className="p-6 flex items-center justify-between border-b border-gray-100">
                  <div className="flex items-center gap-4">
                     <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><Bell size={20}/></div>
                     <div>
                        <p className="font-medium text-charcoal">Push Notifications</p>
                        <p className="text-xs text-gray-500">Receive order updates and care tips</p>
                     </div>
                  </div>
                  <Toggle checked={notifications} onChange={() => setNotifications(!notifications)} />
               </div>

               <div className="p-6 flex items-center justify-between border-b border-gray-100">
                  <div className="flex items-center gap-4">
                     <div className="bg-purple-100 p-2 rounded-lg text-purple-600"><Moon size={20}/></div>
                     <div>
                        <p className="font-medium text-charcoal">Dark Mode</p>
                        <p className="text-xs text-gray-500">Easier on the eyes at night</p>
                     </div>
                  </div>
                  <Toggle checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
               </div>

               <div className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <div className="bg-green-100 p-2 rounded-lg text-green-600"><Globe size={20}/></div>
                     <div>
                        <p className="font-medium text-charcoal">Use Device Location</p>
                        <p className="text-xs text-gray-500">For accurate delivery estimates</p>
                     </div>
                  </div>
                  <Toggle checked={location} onChange={() => setLocation(!location)} />
               </div>
            </div>

            {/* Privacy */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
               <div className="p-4 bg-gray-50 border-b border-gray-100 font-bold text-gray-500 text-xs uppercase tracking-wider">
                  Security
               </div>
               <button className="w-full p-6 flex items-center gap-4 text-left hover:bg-gray-50 transition-colors">
                  <div className="bg-gray-100 p-2 rounded-lg text-charcoal"><Lock size={20}/></div>
                  <span className="font-medium text-charcoal">Change Password</span>
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Settings;