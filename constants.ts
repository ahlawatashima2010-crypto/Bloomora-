

import { Product, CareTask, BlogPost } from './types';

// High-quality Unsplash IDs for potted plants (Verified Links)
export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Monstera Deliciosa',
    botanicalName: 'Monstera deliciosa',
    price: 1200,
    salePrice: 999,
    description: 'The classic Swiss Cheese Plant in a premium terracotta pot. Perfect for adding a tropical vibe to any room.',
    category: 'Indoor',
    difficulty: 'Easy',
    light: 'Medium',
    water: 'Medium',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=800', 
    ecoScore: 9,
    isNew: true,
    reviews: 124,
    rating: 4.8
  },
  {
    id: '2',
    name: 'Snake Plant Laurentii',
    botanicalName: 'Sansevieria trifasciata',
    price: 850,
    description: 'The ultimate survivor. Thrives in low light and neglect. Comes in a modern white ceramic pot.',
    category: 'Pet-Friendly',
    difficulty: 'Easy',
    light: 'Low',
    water: 'Low',
    image: 'https://images.unsplash.com/photo-1593696954577-ab3d39317b97?auto=format&fit=crop&q=80&w=800', 
    ecoScore: 10,
    reviews: 89,
    rating: 4.9
  },
  {
    id: '3',
    name: 'Fiddle Leaf Fig',
    botanicalName: 'Ficus lyrata',
    price: 2500,
    description: 'A stunning statement piece with large, violin-shaped leaves. Requires bright, filtered light.',
    category: 'Indoor',
    difficulty: 'Expert',
    light: 'Bright',
    water: 'Medium',
    image: 'https://images.unsplash.com/photo-1613143525141-866412bcbf4f?auto=format&fit=crop&q=80&w=800', 
    ecoScore: 8,
    reviews: 45,
    rating: 4.2
  },
  {
    id: '4',
    name: 'Urban Jungle Bundle',
    botanicalName: 'Assorted Collection',
    price: 3500,
    salePrice: 2999,
    description: 'Start your collection instantly with our curated trio. Includes three varying sizes of easy-care plants.',
    category: 'Bundle',
    difficulty: 'Easy',
    light: 'Medium',
    water: 'Medium',
    image: 'https://images.unsplash.com/photo-1612361661642-1e905d45d612?auto=format&fit=crop&q=80&w=800', 
    ecoScore: 9.5,
    isNew: true,
    reviews: 12,
    rating: 5.0
  },
  {
    id: '5',
    name: 'Peace Lily',
    botanicalName: 'Spathiphyllum',
    price: 650,
    description: 'Elegant white blooms and dark green leaves. Communicates when it needs water by drooping slightly.',
    category: 'Indoor',
    difficulty: 'Medium',
    light: 'Low',
    water: 'High',
    image: 'https://images.unsplash.com/photo-1593482831268-e64c7c9c2288?auto=format&fit=crop&q=80&w=800',
    ecoScore: 8.5,
    reviews: 230,
    rating: 4.7
  },
  {
    id: '6',
    name: 'ZZ Plant',
    botanicalName: 'Zamioculcas zamiifolia',
    price: 1100,
    description: 'Waxy, shiny leaves that reflect light. Extremely drought tolerant and minimal care required.',
    category: 'Indoor',
    difficulty: 'Easy',
    light: 'Low',
    water: 'Low',
    image: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?auto=format&fit=crop&q=80&w=800',
    ecoScore: 9,
    reviews: 56,
    rating: 4.8
  },
  {
    id: '7',
    name: 'Rubber Plant',
    botanicalName: 'Ficus elastica',
    price: 1400,
    description: 'Glossy burgundy leaves. A sturdy indoor tree that can grow quite tall.',
    category: 'Indoor',
    difficulty: 'Medium',
    light: 'Bright',
    water: 'Medium',
    image: 'https://images.unsplash.com/photo-1598887142487-3c854d53d265?auto=format&fit=crop&q=80&w=800',
    ecoScore: 8,
    reviews: 34,
    rating: 4.5
  },
  {
    id: '8',
    name: 'Aloe Vera',
    botanicalName: 'Aloe barbadensis miller',
    price: 450,
    description: 'Medicinal and decorative. Loves the sun and needs very little water.',
    category: 'Pet-Friendly',
    difficulty: 'Easy',
    light: 'Bright',
    water: 'Low',
    image: 'https://images.unsplash.com/photo-1616035805517-15d2a9d20c4c?auto=format&fit=crop&q=80&w=800',
    ecoScore: 9,
    isSoldOut: true,
    reviews: 150,
    rating: 4.6
  }
];

export const MOCK_TASKS: CareTask[] = [
  {
    id: 't1',
    plantName: 'Monstera Deliciosa',
    taskType: 'Water',
    dueDate: new Date().toISOString(),
    completed: false,
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 't2',
    plantName: 'Fiddle Leaf Fig',
    taskType: 'Mist',
    dueDate: new Date().toISOString(),
    completed: false,
    image: 'https://images.unsplash.com/photo-1613143525141-866412bcbf4f?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 't3',
    plantName: 'Snake Plant',
    taskType: 'Fertilize',
    dueDate: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
    completed: false,
    image: 'https://images.unsplash.com/photo-1593696954577-ab3d39317b97?auto=format&fit=crop&q=80&w=200'
  }
];

export const MOCK_BLOGS: BlogPost[] = [
  {
    id: 'b1',
    title: '5 Plants That Purify Your Air',
    category: 'Sustainable Living',
    readTime: '4 min',
    image: 'https://images.unsplash.com/photo-1512428813837-c59934360d8e?auto=format&fit=crop&q=80&w=800',
    excerpt: 'Discover the top NASA-approved plants for a cleaner, fresher home environment.',
    date: 'Oct 12, 2023'
  },
  {
    id: 'b2',
    title: 'A Beginner’s Guide to Propagating',
    category: 'Beginner Tips',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1610332822927-b5cb51dc4383?auto=format&fit=crop&q=80&w=800',
    excerpt: 'Turn one plant into many! Learn the basics of water propagation with Pothos.',
    date: 'Sep 28, 2023'
  },
  {
    id: 'b3',
    title: 'Styling Your Home Office with Greenery',
    category: 'Office Greenery',
    readTime: '3 min',
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800',
    excerpt: 'Boost productivity and reduce stress by adding the right plants to your workspace.',
    date: 'Sep 15, 2023'
  }
];

export const PROMO_MESSAGES = [
  "🌱 Just Planted — Fresh arrivals added!",
  "🚚 Free Shipping Pan-India above ₹1500",
  "✨ 15% OFF above ₹2000 — Use code GREEN15"
];
