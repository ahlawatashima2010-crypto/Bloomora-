

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Truck, ShieldCheck, Box, Minus, Plus, Smartphone } from 'lucide-react';
import { MOCK_PRODUCTS } from '../constants';
import { Button, FeatureIcon, Badge } from '../components/UI';
import { useCart } from '../App';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = MOCK_PRODUCTS.find(p => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [showAR, setShowAR] = useState(false);

  if (!product) return <div className="p-20 text-center">Product not found</div>;

  const handleAddToCart = () => {
    // Add multiple times based on quantity
    for(let i=0; i<quantity; i++) addToCart(product);
  };

  if (showAR) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex flex-col">
        <div className="relative flex-1 bg-gray-900 overflow-hidden">
          {/* Mock Camera View */}
          <img src="https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover opacity-50" alt="Room" />
          
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="relative animate-bounce-slow">
               <img src={product.image} className="w-64 h-64 object-contain drop-shadow-2xl" style={{ filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.5))' }} />
               <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-40 h-10 bg-black/20 blur-xl rounded-[100%]"></div>
             </div>
          </div>

          <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
             <button onClick={() => setShowAR(false)} className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm">Close AR</button>
             <div className="bg-black/50 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full">
                Scan surface to place
             </div>
          </div>
        </div>
        <div className="bg-white p-6 flex flex-col items-center gap-4 rounded-t-3xl -mt-6 relative z-10">
           <p className="font-serif font-bold text-lg">{product.name}</p>
           <Button className="w-full" onClick={() => setShowAR(false)}>Place in Room</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-8 pb-20 bg-white">
      <div className="container mx-auto px-6">
        <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-charcoal mb-6 text-sm flex items-center gap-1">← Back to shop</button>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-[4/5] bg-natural rounded-2xl overflow-hidden shadow-sm relative group">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              <button 
                onClick={() => setShowAR(true)}
                className="absolute bottom-6 right-6 bg-white/90 backdrop-blur text-charcoal px-4 py-2 rounded-full shadow-lg flex items-center gap-2 hover:bg-primary hover:text-white transition-all font-medium text-sm transform hover:scale-105"
              >
                <Smartphone size={18} /> View in AR
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div>
             <div className="mb-2 flex items-center gap-2">
                {product.isNew && <Badge color="green">New Arrival</Badge>}
                {product.ecoScore >= 9 && <Badge color="green">Eco-Choice</Badge>}
                <Badge color="gray">{product.category}</Badge>
             </div>
             
             <h1 className="font-serif text-4xl md:text-5xl font-bold text-charcoal mb-2">{product.name}</h1>
             <p className="text-gray-500 italic text-lg mb-6">{product.botanicalName}</p>
             
             <div className="flex items-center gap-4 mb-8">
                <span className="text-3xl font-bold text-primary">₹{product.salePrice || product.price}</span>
                {product.salePrice && <span className="text-xl text-gray-400 line-through">₹{product.price}</span>}
                <div className="flex items-center gap-1 ml-auto">
                   <Star className="fill-yellow-400 text-yellow-400" size={20} />
                   <span className="font-bold">{product.rating}</span>
                   <span className="text-gray-400 text-sm">({product.reviews} reviews)</span>
                </div>
             </div>

             <div className="prose text-gray-600 mb-8 leading-relaxed">
               {product.description}
             </div>

             {/* Care Icons */}
             <div className="grid grid-cols-4 gap-4 mb-8">
                <FeatureIcon type="Water" value={product.water} />
                <FeatureIcon type="Light" value={product.light} />
                <FeatureIcon type="Difficulty" value={product.difficulty} />
                <FeatureIcon type="Pet" value={product.category === 'Pet-Friendly' ? 'Safe' : 'Toxic'} />
             </div>

             {/* Add to Cart Actions */}
             <div className="flex flex-col sm:flex-row gap-4 mb-8 pt-6 border-t border-gray-100">
               <div className="flex items-center border border-gray-300 rounded-lg h-12 w-32">
                  <button className="flex-1 flex items-center justify-center text-gray-500 hover:text-charcoal" onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={16}/></button>
                  <span className="font-bold text-charcoal">{quantity}</span>
                  <button className="flex-1 flex items-center justify-center text-gray-500 hover:text-charcoal" onClick={() => setQuantity(quantity + 1)}><Plus size={16}/></button>
               </div>
               <Button className="flex-1 h-12" onClick={handleAddToCart} disabled={product.isSoldOut}>
                 {product.isSoldOut ? 'Sold Out' : 'Add to Cart'}
               </Button>
             </div>

             <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                   <Truck size={20} className="text-primary"/>
                   <span>Free shipping on orders over ₹1500</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                   <ShieldCheck size={20} className="text-primary"/>
                   <span>14-Day Health Guarantee</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                   <Box size={20} className="text-primary"/>
                   <span>Includes Sustainable Pot & Soil</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
