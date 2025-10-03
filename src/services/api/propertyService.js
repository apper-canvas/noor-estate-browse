const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const mapPropertyFromDB = (dbProperty) => {
  if (!dbProperty) return null;
  
  return {
    Id: dbProperty.Id,
    title: dbProperty.title_c || '',
    description: dbProperty.description_c || '',
    price: dbProperty.price_c || 0,
    propertyType: dbProperty.property_type_c || '',
    bedrooms: dbProperty.bedrooms_c || 0,
    bathrooms: dbProperty.bathrooms_c || 0,
    sqft: dbProperty.sqft_c || 0,
    yearBuilt: dbProperty.year_built_c || 0,
    lotSize: dbProperty.lot_size_c || 0,
    location: {
      address: dbProperty.address_c || '',
      city: dbProperty.city_c || '',
      state: dbProperty.state_c || '',
      zip: dbProperty.zip_c || ''
    },
    images: dbProperty.images_c ? (typeof dbProperty.images_c === 'string' ? JSON.parse(dbProperty.images_c) : dbProperty.images_c) : [],
    features: dbProperty.features_c ? (typeof dbProperty.features_c === 'string' ? JSON.parse(dbProperty.features_c) : dbProperty.features_c) : [],
    agentInfo: {
      name: dbProperty.agent_name_c || '',
      phone: dbProperty.agent_phone_c || '',
      email: dbProperty.agent_email_c || ''
    },
    listingDate: dbProperty.listing_date_c || new Date().toISOString()
  };
};

const propertyService = {
  async getAll() {
    await delay(300);
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "property_type_c"}},
          {"field": {"Name": "bedrooms_c"}},
          {"field": {"Name": "bathrooms_c"}},
          {"field": {"Name": "sqft_c"}},
          {"field": {"Name": "year_built_c"}},
          {"field": {"Name": "lot_size_c"}},
          {"field": {"Name": "address_c"}},
          {"field": {"Name": "city_c"}},
          {"field": {"Name": "state_c"}},
          {"field": {"Name": "zip_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "features_c"}},
          {"field": {"Name": "agent_name_c"}},
          {"field": {"Name": "agent_phone_c"}},
          {"field": {"Name": "agent_email_c"}},
          {"field": {"Name": "listing_date_c"}}
        ],
        orderBy: [{"fieldName": "listing_date_c", "sorttype": "DESC"}]
      };

      const response = await apperClient.fetchRecords('property_c', params);
      
      if (!response?.data?.length) {
        return [];
      }

      return response.data.map(mapPropertyFromDB);
    } catch (error) {
      console.error("Error fetching properties:", error?.response?.data?.message || error);
      return [];
    }
  },

  async getById(id) {
    await delay(250);
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "property_type_c"}},
          {"field": {"Name": "bedrooms_c"}},
          {"field": {"Name": "bathrooms_c"}},
          {"field": {"Name": "sqft_c"}},
          {"field": {"Name": "year_built_c"}},
          {"field": {"Name": "lot_size_c"}},
          {"field": {"Name": "address_c"}},
          {"field": {"Name": "city_c"}},
          {"field": {"Name": "state_c"}},
          {"field": {"Name": "zip_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "features_c"}},
          {"field": {"Name": "agent_name_c"}},
          {"field": {"Name": "agent_phone_c"}},
          {"field": {"Name": "agent_email_c"}},
          {"field": {"Name": "listing_date_c"}}
        ]
      };

      const response = await apperClient.getRecordById('property_c', parseInt(id), params);
      
      if (!response?.data) {
        throw new Error("Property not found");
      }

      return mapPropertyFromDB(response.data);
    } catch (error) {
      console.error(`Error fetching property ${id}:`, error?.response?.data?.message || error);
      throw new Error("Property not found");
    }
  },

  async getFeatured(limit = 3) {
    await delay(200);
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "property_type_c"}},
          {"field": {"Name": "bedrooms_c"}},
          {"field": {"Name": "bathrooms_c"}},
          {"field": {"Name": "sqft_c"}},
          {"field": {"Name": "year_built_c"}},
          {"field": {"Name": "lot_size_c"}},
          {"field": {"Name": "address_c"}},
          {"field": {"Name": "city_c"}},
          {"field": {"Name": "state_c"}},
          {"field": {"Name": "zip_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "features_c"}},
          {"field": {"Name": "agent_name_c"}},
          {"field": {"Name": "agent_phone_c"}},
          {"field": {"Name": "agent_email_c"}},
          {"field": {"Name": "listing_date_c"}}
        ],
        orderBy: [{"fieldName": "listing_date_c", "sorttype": "DESC"}],
        pagingInfo: {"limit": limit, "offset": 0}
      };

      const response = await apperClient.fetchRecords('property_c', params);
      
      if (!response?.data?.length) {
        return [];
      }

      return response.data.map(mapPropertyFromDB);
    } catch (error) {
      console.error("Error fetching featured properties:", error?.response?.data?.message || error);
      return [];
    }
  },

  async search(filters) {
    await delay(400);
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const whereConditions = [];

      if (filters.priceRange) {
        const { min, max } = filters.priceRange;
        if (min > 0) {
          whereConditions.push({
            "FieldName": "price_c",
            "Operator": "GreaterThanOrEqualTo",
            "Values": [min]
          });
        }
        if (max < 5000000) {
          whereConditions.push({
            "FieldName": "price_c",
            "Operator": "LessThanOrEqualTo",
            "Values": [max]
          });
        }
      }

      if (filters.location && filters.location.trim()) {
        const searchTerm = filters.location.toLowerCase().trim();
        whereConditions.push({
          "operator": "OR",
          "subGroups": [
            {
              "conditions": [
                {"fieldName": "city_c", "operator": "Contains", "values": [searchTerm]},
                {"fieldName": "state_c", "operator": "Contains", "values": [searchTerm]},
                {"fieldName": "address_c", "operator": "Contains", "values": [searchTerm]}
              ],
              "operator": "OR"
            }
          ]
        });
      }

      if (filters.propertyTypes && filters.propertyTypes.length > 0) {
        whereConditions.push({
          "FieldName": "property_type_c",
          "Operator": "ExactMatch",
          "Values": filters.propertyTypes,
          "Include": true
        });
      }

      if (filters.bedrooms > 0) {
        whereConditions.push({
          "FieldName": "bedrooms_c",
          "Operator": "GreaterThanOrEqualTo",
          "Values": [filters.bedrooms]
        });
      }

      if (filters.bathrooms > 0) {
        whereConditions.push({
          "FieldName": "bathrooms_c",
          "Operator": "GreaterThanOrEqualTo",
          "Values": [filters.bathrooms]
        });
      }

      if (filters.sqftRange) {
        const { min, max } = filters.sqftRange;
        if (min > 0) {
          whereConditions.push({
            "FieldName": "sqft_c",
            "Operator": "GreaterThanOrEqualTo",
            "Values": [min]
          });
        }
        if (max < 10000) {
          whereConditions.push({
            "FieldName": "sqft_c",
            "Operator": "LessThanOrEqualTo",
            "Values": [max]
          });
        }
      }

      let orderBy = [{"fieldName": "listing_date_c", "sorttype": "DESC"}];
      if (filters.sortBy) {
        switch (filters.sortBy) {
          case "price-asc":
            orderBy = [{"fieldName": "price_c", "sorttype": "ASC"}];
            break;
          case "price-desc":
            orderBy = [{"fieldName": "price_c", "sorttype": "DESC"}];
            break;
          case "sqft-desc":
            orderBy = [{"fieldName": "sqft_c", "sorttype": "DESC"}];
            break;
          case "date-desc":
            orderBy = [{"fieldName": "listing_date_c", "sorttype": "DESC"}];
            break;
        }
      }

      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "property_type_c"}},
          {"field": {"Name": "bedrooms_c"}},
          {"field": {"Name": "bathrooms_c"}},
          {"field": {"Name": "sqft_c"}},
          {"field": {"Name": "year_built_c"}},
          {"field": {"Name": "lot_size_c"}},
          {"field": {"Name": "address_c"}},
          {"field": {"Name": "city_c"}},
          {"field": {"Name": "state_c"}},
          {"field": {"Name": "zip_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "features_c"}},
          {"field": {"Name": "agent_name_c"}},
          {"field": {"Name": "agent_phone_c"}},
          {"field": {"Name": "agent_email_c"}},
          {"field": {"Name": "listing_date_c"}}
        ],
        where: whereConditions.filter(w => !w.operator),
        whereGroups: whereConditions.filter(w => w.operator),
        orderBy: orderBy
      };

      const response = await apperClient.fetchRecords('property_c', params);
      
      if (!response?.data?.length) {
        return [];
      }

      return response.data.map(mapPropertyFromDB);
    } catch (error) {
      console.error("Error searching properties:", error?.response?.data?.message || error);
      return [];
    }
  }
};

export default propertyService;