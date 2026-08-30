export interface FragranceProfile {
  topNotes: string[];
  middleNotes: string[];
  baseNotes: string[];
  family: string;
  whenToWear?: string[];
}

// Normalized internal product representation (WondersScents specific)
export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'Perfume' | 'Eau de Parfum' | 'Eau de Toilette' | 'Perfume Oil' | 'Body Spray' | 'Body Mist' | 'Roll-On' | 'Fragrance Oil' | 'Perfume Sets' | 'Gift Sets' | 'Wholesale Perfume Oil' | 'Other';
  price: number; // Single piece price in Naira
  wholesalePrices?: {
    single: number;
    dozen: number;
  };
  sizes: string[]; // e.g., ['3ml', '6ml', '150ml']
  stock: number;
  availability: 'in-stock' | 'out-of-stock' | 'coming-soon';
  image: string;
  images?: string[];
  hoverImage?: string;
  gender?: 'Men' | 'Women' | 'Unisex' | string;
  description: string;
  fragranceProfile?: FragranceProfile;
  whenToWear?: string[];
  sku: string;
  externalApiId?: string;
  tags: string[];
}

// Normalized fragrance metadata representing external API database records
export interface ExternalFragranceMetadata {
  id: string;
  name: string;
  brand: string;
  perfumer?: string;
  releaseYear?: number;
  description: string;
  image: string;
  gender: 'Men' | 'Women' | 'Unisex';
  family: string;
  topNotes: string[];
  middleNotes: string[];
  baseNotes: string[];
  mainAccords: string[];
}

// Inquiry model
export interface Inquiry {
  id: string;
  productId?: string;
  productName?: string;
  type: 'product' | 'wholesale' | 'training' | 'general';
  name: string;
  phone: string;
  message: string;
  status: 'pending' | 'responded';
  createdAt: string;
}

// Chat models
export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  // If the AI found actual products or fragrances in the database
  products?: Product[];
  fragrances?: ExternalFragranceMetadata[];
}
