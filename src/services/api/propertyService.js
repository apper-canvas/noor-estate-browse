import propertiesData from "@/services/mockData/properties.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const propertyService = {
  async getAll() {
    await delay(300);
    return [...propertiesData];
  },

  async getById(id) {
    await delay(250);
    const property = propertiesData.find(p => p.Id === parseInt(id));
    if (!property) {
      throw new Error("Property not found");
    }
    return { ...property };
  },

  async getFeatured(limit = 3) {
    await delay(200);
    const featured = [...propertiesData]
      .sort((a, b) => new Date(b.listingDate) - new Date(a.listingDate))
      .slice(0, limit);
    return featured;
  },

  async search(filters) {
    await delay(400);
    let results = [...propertiesData];

    if (filters.priceRange) {
      const { min, max } = filters.priceRange;
      results = results.filter(p => p.price >= min && p.price <= max);
    }

    if (filters.location && filters.location.trim()) {
      const searchTerm = filters.location.toLowerCase().trim();
      results = results.filter(p =>
        p.location.city.toLowerCase().includes(searchTerm) ||
        p.location.state.toLowerCase().includes(searchTerm) ||
        p.location.address.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.propertyTypes && filters.propertyTypes.length > 0) {
      results = results.filter(p => filters.propertyTypes.includes(p.propertyType));
    }

    if (filters.bedrooms) {
      results = results.filter(p => p.bedrooms >= filters.bedrooms);
    }

    if (filters.bathrooms) {
      results = results.filter(p => p.bathrooms >= filters.bathrooms);
    }

    if (filters.sqftRange) {
      const { min, max } = filters.sqftRange;
      results = results.filter(p => p.sqft >= min && p.sqft <= max);
    }

    if (filters.sortBy) {
      switch (filters.sortBy) {
        case "price-asc":
          results.sort((a, b) => a.price - b.price);
          break;
        case "price-desc":
          results.sort((a, b) => b.price - a.price);
          break;
        case "sqft-desc":
          results.sort((a, b) => b.sqft - a.sqft);
          break;
        case "date-desc":
          results.sort((a, b) => new Date(b.listingDate) - new Date(a.listingDate));
          break;
        default:
          break;
      }
    }

    return results;
  }
};

export default propertyService;