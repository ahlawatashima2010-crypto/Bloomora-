import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { LayoutDashboard, Package, Users, Settings, Plus } from 'lucide-react';
import { MOCK_PRODUCTS } from '../constants';

const data = [
  { name: 'Mon', sales: 4000 },
  { name: 'Tue', sales: 3000 },
  { name: 'Wed', sales: 2000 },
  { name: 'Thu', sales: 2780 },
  { name: 'Fri', sales: 1890 },
  { name: 'Sat', sales: 2390 },
  { name: 'Sun', sales: 3490 },
];

const Admin: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-charcoal text-white hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-700 font-serif text-xl font-bold">
          Bloomora Admin
        </div>
        <nav className="flex-1 p-4 space-y-2">
           <a href="#" className="flex items-center gap-3 px-4 py-3 bg-primary rounded-lg text-white font-medium">
             <LayoutDashboard size={20} /> Dashboard
           </a>
           <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
             <Package size={20} /> Products
           </a>
           <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
             <Users size={20} /> Customers
           </a>
           <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
             <Settings size={20} /> Settings
           </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
           <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
           <button className="bg-charcoal text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors">
              <Plus size={18} /> Add Product
           </button>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
           {[
             { label: 'Total Revenue', val: '₹4,23,000', change: '+12%' },
             { label: 'Orders', val: '156', change: '+5%' },
             { label: 'New Customers', val: '48', change: '+18%' },
             { label: 'Avg Order Value', val: '₹2,450', change: '-2%' },
           ].map((stat, i) => (
             <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <p className="text-gray-500 text-sm font-medium uppercase">{stat.label}</p>
                <div className="flex items-end justify-between mt-2">
                   <h3 className="text-2xl font-bold text-charcoal">{stat.val}</h3>
                   <span className={`text-sm font-bold ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{stat.change}</span>
                </div>
             </div>
           ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
           {/* Chart */}
           <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg mb-6 text-charcoal">Weekly Sales</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                    <Bar dataKey="sales" fill="#2F7A57" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
           </div>

           {/* Recent Orders */}
           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg mb-4 text-charcoal">Recent Activity</h3>
              <div className="space-y-4">
                 {[1,2,3,4,5].map(i => (
                   <div key={i} className="flex items-center gap-3 pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-500">
                         #{1000 + i}
                      </div>
                      <div className="flex-1">
                         <p className="text-sm font-bold text-charcoal">New Order</p>
                         <p className="text-xs text-gray-400">2 mins ago</p>
                      </div>
                      <span className="text-sm font-medium text-green-600">+₹1,200</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Inventory Table Preview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
           <div className="p-6 border-b border-gray-100">
              <h3 className="font-bold text-lg text-charcoal">Inventory Snapshot</h3>
           </div>
           <div className="overflow-x-auto">
             <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider">
                   <tr>
                     <th className="px-6 py-3 font-medium">Product</th>
                     <th className="px-6 py-3 font-medium">Price</th>
                     <th className="px-6 py-3 font-medium">Stock</th>
                     <th className="px-6 py-3 font-medium">Status</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                   {MOCK_PRODUCTS.slice(0, 5).map(p => (
                      <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                         <td className="px-6 py-4 font-medium text-charcoal">{p.name}</td>
                         <td className="px-6 py-4">₹{p.price}</td>
                         <td className="px-6 py-4">42</td>
                         <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${p.isSoldOut ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                               {p.isSoldOut ? 'Out of Stock' : 'Active'}
                            </span>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
           </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;