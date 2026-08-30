import type { Product } from '../types';
import { productService } from './productService';
import { fragranceService } from './fragranceService';

export const searchService = {
  // Searches both WondersScents internal catalog and external database
  async search(query: string): Promise<Product[]> {
    if (!query || query.trim() === '') {
      return [];
    }

    const lowerQuery = query.toLowerCase().trim();

    // 1. Fetch internal catalog products
    const internalProducts = await productService.getProducts();
    const internalMatches = internalProducts.filter(product => {
      const matchName = product.name.toLowerCase().includes(lowerQuery);
      const matchBrand = product.brand.toLowerCase().includes(lowerQuery);
      const matchCategory = product.category.toLowerCase().includes(lowerQuery);
      const matchTag = product.tags.some(tag => tag.toLowerCase().includes(lowerQuery));
      
      const matchNotes = product.fragranceProfile 
        ? [
            ...product.fragranceProfile.topNotes,
            ...product.fragranceProfile.middleNotes,
            ...product.fragranceProfile.baseNotes
          ].some(note => note.toLowerCase().includes(lowerQuery))
        : false;

      const matchFamily = product.fragranceProfile
        ? product.fragranceProfile.family.toLowerCase().includes(lowerQuery)
        : false;

      return matchName || matchBrand || matchCategory || matchTag || matchNotes || matchFamily;
    });

    // 2. Fetch external fragrance API database products (normalized)
    const externalMatches = await fragranceService.searchExternalDatabase(lowerQuery);

    // 3. Merge results, prioritizing WondersScents internal products
    // If the external search matches a brand/name that WondersScents already sells,
    // we omit the external mock record and use our internal one.
    const mergedResults = [...internalMatches];

    for (const extProd of externalMatches) {
      const isAlreadyInCatalog = internalMatches.some(
        intProd => intProd.name.toLowerCase() === extProd.name.toLowerCase() &&
                   intProd.brand.toLowerCase() === extProd.brand.toLowerCase()
      );

      if (!isAlreadyInCatalog) {
        mergedResults.push(extProd);
      }
    }

    return mergedResults;
  }
};
