import type { ExternalFragranceMetadata, Product } from '../types';
import { externalFragrancesDb } from '../data/mockData';

// Normalization Layer: Converts raw third-party API data into the app's internal model
export function normalizeExternalFragrance(raw: ExternalFragranceMetadata): Product {
  return {
    id: raw.id,
    name: raw.name,
    brand: raw.brand,
    category: 'Perfume', // Default category for external catalog
    price: 0, // External catalog doesn't dictate WondersScents prices
    sizes: ['100ml'],
    stock: 0,
    availability: 'out-of-stock', // Not in WondersScents stock by default unless linked
    image: raw.image,
    description: raw.description,
    sku: `EXT-${raw.brand.substring(0, 3).toUpperCase()}-${raw.name.substring(0, 3).toUpperCase()}`,
    externalApiId: raw.id,
    tags: [...raw.mainAccords.map(a => a.toLowerCase()), raw.family.toLowerCase(), raw.gender.toLowerCase()],
    fragranceProfile: {
      topNotes: raw.topNotes,
      middleNotes: raw.middleNotes,
      baseNotes: raw.baseNotes,
      family: raw.family
    }
  };
}

// Service Layer for External Fragrance database
export const fragranceService = {
  // Simulates an API call to search the external database
  async searchExternalDatabase(query: string): Promise<Product[]> {
    // Artificial latency to simulate real network request
    await new Promise(resolve => setTimeout(resolve, 350));
    
    if (!query) return [];
    
    const lowerQuery = query.toLowerCase();
    const matches = externalFragrancesDb.filter(item => 
      item.name.toLowerCase().includes(lowerQuery) ||
      item.brand.toLowerCase().includes(lowerQuery) ||
      item.family.toLowerCase().includes(lowerQuery) ||
      item.topNotes.some(note => note.toLowerCase().includes(lowerQuery)) ||
      item.middleNotes.some(note => note.toLowerCase().includes(lowerQuery)) ||
      item.baseNotes.some(note => note.toLowerCase().includes(lowerQuery))
    );
    
    return matches.map(normalizeExternalFragrance);
  },

  // Simulates getting details of a specific external fragrance
  async getExternalDetails(id: string): Promise<Product | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const found = externalFragrancesDb.find(item => item.id === id);
    return found ? normalizeExternalFragrance(found) : null;
  }
};
