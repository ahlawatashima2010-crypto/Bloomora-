import React from 'react';
import { LucideIcon, ShoppingBag, Heart, Sun, Droplets, Wind, AlertCircle } from 'lucide-react';
import { Product } from '../types';

// --- Buttons ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, variant = 'primary', size = 'md', isLoading, className = '', ...props 
}) => {
  const base = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none disabled:opacity-50 active:scale-95";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-[#256648] shadow-md shadow-primary/20",
    secondary: "bg-accent text-primary hover:bg-[#d4f0e2]",
    outline: "border-2 border-primary text-primary hover:bg-primary/5",
    ghost: "text-charcoal hover:bg-black/5"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-2.5 text-base",
    lg: "px-8 py-3.5 text-lg"
  };

  return (
    <button 
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? <span className="animate-spin mr-2">❀</span> : null}
      {children}
    </button>
  );
};

// --- Badge ---
export const Badge: React.FC<{ children: React.ReactNode; color?: 'green' | 'yellow' | 'red' | 'gray' }> = ({ children, color = 'gray' }) => {
  const colors = {
    green: "bg-green-100 text-green-800",
    yellow: "bg-yellow-100 text-yellow-800",
    red: "bg-red-100 text-red-800",
    gray: "bg-gray-100 text-gray-800",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[color]}`}>
      {children}
    </span>
  );
};

// --- Product Card ---
interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
  onNavigate: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onNavigate }) => {
  return (
    <div 
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-gray-100"
      onClick={() => onNavigate(product.id)}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {product.isNew && (
          <div className="absolute top-3 left-3">
            <Badge color="green">New Arrival</Badge>
          </div>
        )}
        {product.salePrice && (
          <div className="absolute top-3 right-3">
             <Badge color="red">Sale</Badge>
          </div>
        )}
        <div className="absolute bottom-4 right-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <Button 
            variant="primary" 
            size="sm" 
            className="rounded-full w-10 h-10 p-0"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
          >
            <ShoppingBag size={18} />
          </Button>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-serif text-lg text-charcoal font-semibold group-hover:text-primary transition-colors line-clamp-1">{product.name}</h3>
        <p className="text-xs text-gray-500 italic mb-2 line-clamp-1">{product.botanicalName}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            {product.salePrice ? (
              <div className="flex items-baseline gap-2">
                 <span className="text-primary font-bold">₹{product.salePrice}</span>
                 <span className="text-gray-400 text-xs line-through">₹{product.price}</span>
              </div>
            ) : (
              <span className="text-charcoal font-bold">₹{product.price}</span>
            )}
          </div>
          <div className="flex gap-1">
             <div className="w-2 h-2 rounded-full bg-green-500" title={`Water: ${product.water}`}></div>
             <div className="w-2 h-2 rounded-full bg-yellow-400" title={`Light: ${product.light}`}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Features ---
export const FeatureIcon: React.FC<{ type: 'Water' | 'Light' | 'Difficulty' | 'Pet'; value: string }> = ({ type, value }) => {
  let icon = <AlertCircle size={18} />;
  let color = "text-gray-500";
  
  switch(type) {
    case 'Water': 
      icon = <Droplets size={18} />; 
      color="text-blue-500";
      break;
    case 'Light': 
      icon = <Sun size={18} />; 
      color="text-yellow-500";
      break;
    case 'Difficulty': 
      icon = <Wind size={18} />; 
      color="text-green-500";
      break;
    case 'Pet': 
      icon = <Heart size={18} />; 
      color="text-red-500";
      break;
  }

  return (
    <div className="flex flex-col items-center p-3 bg-natural rounded-xl gap-1 min-w-[80px]">
      <div className={`${color} mb-1`}>{icon}</div>
      <span className="text-[10px] uppercase tracking-wider text-gray-500 font-medium">{type}</span>
      <span className="text-sm font-semibold text-charcoal">{value}</span>
    </div>
  );
}