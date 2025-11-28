export interface Product {
  id: string;
  name: string;
  botanicalName: string;
  price: number;
  salePrice?: number;
  description: string;
  category: 'Indoor' | 'Outdoor' | 'Pet-Friendly' | 'Bundle' | 'Pot';
  difficulty: 'Easy' | 'Medium' | 'Expert';
  light: 'Low' | 'Medium' | 'Bright';
  water: 'Low' | 'Medium' | 'High';
  image: string;
  ecoScore: number; // 1-10
  isNew?: boolean;
  isSoldOut?: boolean;
  reviews: number;
  rating: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  name: string;
  email: string;
  avatar?: string;
  isGoogle?: boolean;
}

export interface CareTask {
  id: string;
  plantName: string;
  taskType: 'Water' | 'Fertilize' | 'Mist' | 'Prune';
  dueDate: string; // ISO date
  completed: boolean;
  image: string;
}

export interface UserProfile {
  name: string;
  points: number;
  rank: 'Plant Parent' | 'Eco Guardian' | 'Bloom Champion';
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  readTime: string;
  image: string;
  excerpt: string;
  date: string;
}

export enum SortOption {
  RECOMMENDED = 'Recommended',
  PRICE_LOW = 'Price: Low to High',
  PRICE_HIGH = 'Price: High to Low',
  NEWEST = 'New Arrivals',
}