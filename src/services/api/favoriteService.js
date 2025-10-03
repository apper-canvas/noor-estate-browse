const FAVORITES_KEY = "estate_browse_favorites";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const favoriteService = {
  async getAll() {
    await delay(200);
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  async add(propertyId) {
    await delay(150);
    const favorites = await this.getAll();
    if (!favorites.includes(propertyId)) {
      favorites.push(propertyId);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }
    return favorites;
  },

  async remove(propertyId) {
    await delay(150);
    const favorites = await this.getAll();
    const updated = favorites.filter(id => id !== propertyId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    return updated;
  },

  async toggle(propertyId) {
    await delay(150);
    const favorites = await this.getAll();
    const isFavorite = favorites.includes(propertyId);
    
    if (isFavorite) {
      return await this.remove(propertyId);
    } else {
      return await this.add(propertyId);
    }
  },

  async isFavorite(propertyId) {
    const favorites = await this.getAll();
    return favorites.includes(propertyId);
  }
};

export default favoriteService;