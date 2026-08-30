import type { Product } from '../types';
import { fragranceCatalog } from '../data/fragranceDatabase';

export const productService = {
  // Fetches all available products in WondersScents database
  async getProducts(): Promise<Product[]> {
    await new Promise(resolve => setTimeout(resolve, 50));
    return [...fragranceCatalog];
  },

  // Fetches featured products for the homepage
  async getFeaturedProducts(): Promise<Product[]> {
    await new Promise(resolve => setTimeout(resolve, 50));
    return fragranceCatalog.filter(p => p.availability === 'in-stock');
  },

  // Fetches details of a specific internal product by ID
  async getProductById(id: string): Promise<Product | null> {
    await new Promise(resolve => setTimeout(resolve, 50));
    const prod = fragranceCatalog.find(p => p.id === id);
    return prod ? { ...prod } : null;
  }
};
