
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, Droplet, Sun, Calendar, ChevronLeft } from 'lucide-react';
import { MOCK_TASKS } from '../constants';
import { Button } from '../components/UI';

const Care: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-primary text-white pt-8 pb-24 px-6 rounded-b-[40px] shadow-lg relative">
        <div className="container mx-auto">
          {/* Back Button */}
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors font-medium">
             <ChevronLeft size={20} /> Back
          </button>

          <div className="flex justify-between items-center mb-6">
             <div>
               <h1 className="font-serif text-3xl font-bold">Good Morning, Plant Parent! 🌿</h1>
               <p className="text-primary-100 opacity-90">You have 3 tasks for today.</p>
             </div>
             <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center font-bold text-lg backdrop-blur-sm">
                JD
             </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-16">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
           {[
             { label: 'Streak', val: '12 Days', icon: '🔥' },
             { label: 'Plants', val: '8', icon: '🌵' },
             { label: 'Next Level', val: '80%', icon: '🏆' },
           ].map((stat, i) => (
             <div key={i} className="bg-white p-4 rounded-2xl shadow-sm text-center">
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="font-bold text-charcoal">{stat.val}</div>
                <div className="text-xs text-gray-500 uppercase font-medium tracking-wide">{stat.label}</div>
             </div>
           ))}
        </div>

        {/* Tasks */}
        <div className="mb-10">
          <h2 className="font-serif text-2xl font-bold text-charcoal mb-4 flex items-center gap-2">
            <Calendar size={24} className="text-primary"/> Today's Tasks
          </h2>
          <div className="space-y-4">
            {MOCK_TASKS.map(task => (
              <div key={task.id} className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer group">
                 <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                    <img src={task.image} className="w-full h-full object-cover" alt="Plant"/>
                 </div>
                 <div className="flex-1">
                    <h3 className="font-bold text-charcoal">{task.plantName}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      {task.taskType === 'Water' && <Droplet size={14} className="text-blue-500"/>}
                      {task.taskType === 'Mist' && <Droplet size={14} className="text-cyan-500"/>}
                      {task.taskType === 'Fertilize' && <Sun size={14} className="text-yellow-500"/>}
                      {task.taskType}
                    </div>
                 </div>
                 <button className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center text-transparent hover:border-primary hover:bg-primary hover:text-white transition-all">
                    <CheckCircle size={20} />
                 </button>
              </div>
            ))}
          </div>
        </div>

        {/* Diagnose Banner */}
        <div className="bg-charcoal rounded-2xl p-6 text-white flex justify-between items-center shadow-xl">
           <div>
              <h3 className="font-serif text-xl font-bold mb-2">Sick Plant?</h3>
              <p className="text-gray-400 text-sm mb-4 max-w-xs">Snap a photo and our AI will diagnose the issue instantly.</p>
              <Button size="sm" variant="primary">Diagnose Now</Button>
           </div>
           <div className="text-6xl opacity-20">🏥</div>
        </div>
      </div>
    </div>
  );
};

export default Care;
