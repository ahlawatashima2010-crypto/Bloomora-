

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { MOCK_BLOGS } from '../constants';
import { Button } from '../components/UI';

const Blog: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white pt-8 pb-20">
      <div className="container mx-auto px-6">
        {/* Back Button */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-charcoal mb-6 transition-colors font-medium">
           <ChevronLeft size={20} /> Back
        </button>

        <div className="text-center max-w-2xl mx-auto mb-16">
           <span className="text-primary font-bold uppercase tracking-wider text-xs">Community & Care</span>
           <h1 className="font-serif text-5xl font-bold text-charcoal mt-4 mb-6">The Green Leaf Journal</h1>
           <p className="text-gray-500 text-lg">
              Expert advice, plant care tips, and inspiration for your urban jungle.
           </p>
        </div>

        {/* Featured Post */}
        <div className="relative rounded-3xl overflow-hidden h-[500px] mb-16 group cursor-pointer">
           <img src="https://images.unsplash.com/photo-1416879115539-592649a4626d?auto=format&fit=crop&q=80&w=1600" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Featured" />
           <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-8 md:p-12">
              <span className="bg-white text-charcoal px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md w-fit mb-4">Featured</span>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-4">How to Create a Sustainable Indoor Garden</h2>
              <p className="text-white/90 text-lg max-w-xl mb-8">Learn the secrets to building a thriving plant collection that is good for you and the planet.</p>
              <Button variant="primary" className="w-fit">Read Article</Button>
           </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
           {MOCK_BLOGS.map(blog => (
             <div key={blog.id} className="group cursor-pointer flex flex-col h-full">
                <div className="h-64 overflow-hidden rounded-2xl mb-6 shadow-sm">
                  <img src={blog.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={blog.title} />
                </div>
                <div className="flex-1 flex flex-col">
                   <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-bold text-primary uppercase tracking-wide">{blog.category}</span>
                      <span className="text-xs text-gray-400">{blog.readTime} read</span>
                   </div>
                   <h3 className="font-serif text-2xl font-bold text-charcoal mb-3 group-hover:text-primary transition-colors leading-tight">{blog.title}</h3>
                   <p className="text-gray-500 text-sm mb-6 line-clamp-3">{blog.excerpt}</p>
                   <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-400">
                      <span>{blog.date}</span>
                      <span className="text-charcoal font-medium group-hover:underline">Read more</span>
                   </div>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
