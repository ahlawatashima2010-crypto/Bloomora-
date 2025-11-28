
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter, ChevronDown, Search, X, Check, ChevronLeft } from 'lucide-react';
import { ProductCard, Button } from '../components/UI';
import { MOCK_PRODUCTS } from '../constants';
import { useCart } from '../App';

const Catalog: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);

  const categories = ['All', 'Indoor', 'Pet-Friendly', 'Bundle', 'Outdoor'];

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [searchTerm, activeCategory, priceRange]);

  // Filters Content Component (Reusable for Sidebar and Drawer)
  const FiltersContent = () => (
    <>
      {/* Categories */}
      <div className="mb-8">
        <h4 className="font-bold text-sm text-charcoal mb-4 uppercase tracking-wide">Category</h4>
        <div className="space-y-3">
          {categories.map(cat => (
            <label key={cat} className="flex items-center gap-3 cursor-pointer group">
              <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${activeCategory === cat ? 'border-primary bg-primary' : 'border-gray-300 bg-white group-hover:border-primary'}`}>
                {activeCategory === cat && <Check size={12} className="text-white" />}
              </div>
              <input 
                type="radio" 
                name="category" 
                className="hidden" 
                checked={activeCategory === cat} 
                onChange={() => setActiveCategory(cat)} 
              />
              <span className={`text-sm ${activeCategory === cat ? 'text-primary font-bold' : 'text-gray-600 group-hover:text-charcoal'}`}>
                {cat}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="font-bold text-sm text-charcoal mb-4 uppercase tracking-wide">Price Range</h4>
        <div className="px-2">
            <input 
            type="range" 
            min="0" 
            max="5000" 
            step="100"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
            className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
        </div>
        <div className="flex justify-between mt-4 text-sm text-charcoal font-medium bg-gray-50 p-2 rounded-lg border border-gray-100">
          <span>₹0</span>
          <span>₹{priceRange[1]}</span>
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-natural/30 pt-8 pb-20">
      <div className="container mx-auto px-6">
        {/* Back Button */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-charcoal mb-6 transition-colors font-medium">
           <ChevronLeft size={20} /> Back
        </button>

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="font-serif text-4xl font-bold text-charcoal">All Plants</h1>
            <p className="text-gray-500 mt-2 font-medium">Found {filteredProducts.length} results</p>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
             <div className="relative flex-1 md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Search by name..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white shadow-sm text-sm"
                />
             </div>
             <Button variant="outline" className="md:hidden flex items-center gap-2 px-4" onClick={() => setFilterOpen(true)}>
               <Filter size={18} /> Filters
             </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Desktop Sidebar Filters */}
          <aside className="w-64 flex-shrink-0 hidden md:block">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
              <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                 <h3 className="font-serif text-xl font-bold">Filters</h3>
                 <button className="text-xs text-primary font-medium hover:underline" onClick={() => {setActiveCategory('All'); setPriceRange([0,5000])}}>Reset</button>
              </div>
              <FiltersContent />
            </div>
          </aside>

          {/* Mobile Filter Drawer (Left Side) */}
          {filterOpen && (
            <div className="fixed inset-0 z-[60] md:hidden">
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setFilterOpen(false)}></div>
                <div className="absolute top-0 left-0 h-full w-[85%] max-w-sm bg-white shadow-2xl flex flex-col animate-slide-right">
                    <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-natural/20">
                        <h3 className="font-serif text-xl font-bold text-charcoal">Filters</h3>
                        <button onClick={() => setFilterOpen(false)} className="p-2 hover:bg-gray-200 rounded-full">
                            <X size={20} />
                        </button>
                    </div>
                    <div className="p-6 flex-1 overflow-y-auto">
                        <FiltersContent />
                    </div>
                    <div className="p-5 border-t border-gray-100 bg-gray-50 flex gap-3">
                         <Button variant="outline" className="flex-1" onClick={() => {setActiveCategory('All'); setPriceRange([0,5000]);}}>Reset</Button>
                         <Button className="flex-1" onClick={() => setFilterOpen(false)}>View Results</Button>
                    </div>
                </div>
            </div>
          )}

          {/* Product Grid */}
          <div className="flex-1">
             {filteredProducts.length > 0 ? (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                 {filteredProducts.map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onAddToCart={addToCart}
                      onNavigate={(id) => navigate(`/product/${id}`)}
                    />
                 ))}
               </div>
             ) : (
               <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl border border-gray-100">
                 <div className="w-20 h-20 bg-natural rounded-full flex items-center justify-center mb-6 text-primary">
                    <Search size={32} />
                 </div>
                 <h3 className="font-serif text-2xl font-bold text-charcoal mb-2">No plants found</h3>
                 <p className="text-gray-500 max-w-xs mx-auto">We couldn't find any plants matching your criteria. Try adjusting your filters.</p>
                 <Button variant="outline" className="mt-6" onClick={() => {setSearchTerm(''); setActiveCategory('All'); setPriceRange([0,5000])}}>
                    Clear All Filters
                 </Button>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
