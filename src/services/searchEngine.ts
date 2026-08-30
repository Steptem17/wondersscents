import { fragranceCatalog, type FragranceItem } from '../data/fragranceDatabase';

export const searchEngine = {
  // Returns all store fragrances
  getAllFragrances(): FragranceItem[] {
    return fragranceCatalog;
  },

  // Live real-time search matching strictly across Name, Brand, Gender, or Category/Type
  search(query: string): FragranceItem[] {
    if (!query || query.trim() === '') {
      return [];
    }

    const cleanQuery = query.toLowerCase().trim();
    const tokens = cleanQuery.split(/\s+/).filter(t => t.length > 0);

    return fragranceCatalog.filter(item => {
      // Map category to user-friendly search terms
      const catLower = item.category.toLowerCase();
      const simpleCat = 
        catLower.includes('mist') ? 'body mist mist' :
        catLower.includes('spray') ? 'body spray spray' :
        catLower.includes('oil') ? 'perfume oil oil roll on' :
        catLower.includes('roll') ? 'roll-on roll on deodorant' : 'perfume edp edt';

      const notesStr = item.fragranceProfile 
        ? [
            item.fragranceProfile.family || '',
            ...(item.fragranceProfile.topNotes || []),
            ...(item.fragranceProfile.middleNotes || []),
            ...(item.fragranceProfile.baseNotes || [])
          ].join(' ')
        : '';

      const searchTarget = [
        item.name,
        item.brand,
        item.gender,
        item.category,
        simpleCat,
        item.description || '',
        notesStr,
        ...(item.tags || [])
      ].join(' ').toLowerCase();

      // Ensure every typed token is matched in the product target
      return tokens.every(token => {
        if (token === 'men' || token === 'mens' || token === 'male') {
          return item.gender.toLowerCase() === 'men';
        }
        if (token === 'women' || token === 'womens' || token === 'female' || token === 'ladies') {
          return item.gender.toLowerCase() === 'women';
        }
        if (token === 'unisex') {
          return item.gender.toLowerCase() === 'unisex';
        }
        if (token === 'mist') {
          return item.category.toLowerCase().includes('mist');
        }
        if (token === 'spray') {
          return item.category.toLowerCase().includes('spray');
        }
        if (token === 'oil') {
          return item.category.toLowerCase().includes('oil');
        }
        if (token === 'rollon' || token === 'roll-on') {
          return item.category.toLowerCase().includes('roll-on') || item.category.toLowerCase().includes('roll on');
        }

        return searchTarget.includes(token);
      });
    });
  }
};
