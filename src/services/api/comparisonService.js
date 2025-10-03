const COMPARISON_KEY = "estate_browse_comparison";
const MAX_COMPARISON = 3;

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const comparisonService = {
  async getAll() {
    await delay(150);
    const stored = localStorage.getItem(COMPARISON_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  async add(propertyId) {
    await delay(150);
    const comparison = await this.getAll();
    
    if (comparison.includes(propertyId)) {
      return comparison;
    }
    
    if (comparison.length >= MAX_COMPARISON) {
      throw new Error(`You can only compare up to ${MAX_COMPARISON} properties`);
    }
    
    comparison.push(propertyId);
    localStorage.setItem(COMPARISON_KEY, JSON.stringify(comparison));
    return comparison;
  },

  async remove(propertyId) {
    await delay(150);
    const comparison = await this.getAll();
    const updated = comparison.filter(id => id !== propertyId);
    localStorage.setItem(COMPARISON_KEY, JSON.stringify(updated));
    return updated;
  },

  async clear() {
    await delay(100);
    localStorage.setItem(COMPARISON_KEY, JSON.stringify([]));
    return [];
  },

  async toggle(propertyId) {
    await delay(150);
    const comparison = await this.getAll();
    const isInComparison = comparison.includes(propertyId);
    
    if (isInComparison) {
      return await this.remove(propertyId);
    } else {
      return await this.add(propertyId);
    }
  }
};

export default comparisonService;