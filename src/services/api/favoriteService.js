const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const favoriteService = {
  async getAll() {
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
          {"field": {"Name": "property_id_c"}}
        ]
      };

      const response = await apperClient.fetchRecords('favorite_c', params);
      
      if (!response?.data?.length) {
        return [];
      }

      return response.data.map(f => f.property_id_c);
    } catch (error) {
      console.error("Error fetching favorites:", error?.response?.data?.message || error);
      return [];
    }
  },

  async add(propertyId) {
    await delay(150);
    try {
      const favorites = await this.getAll();
      
      if (favorites.includes(propertyId)) {
        return favorites;
      }

      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          property_id_c: propertyId
        }]
      };

      const response = await apperClient.createRecord('favorite_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return await this.getAll();
    } catch (error) {
      console.error("Error adding favorite:", error?.response?.data?.message || error);
      throw error;
    }
  },

  async remove(propertyId) {
    await delay(150);
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const allParams = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "property_id_c"}}
        ],
        where: [{"FieldName": "property_id_c", "Operator": "EqualTo", "Values": [propertyId]}]
      };

      const allResponse = await apperClient.fetchRecords('favorite_c', allParams);
      
      if (allResponse?.data?.length > 0) {
        const favoriteRecord = allResponse.data[0];
        const deleteParams = {
          RecordIds: [favoriteRecord.Id]
        };
        await apperClient.deleteRecord('favorite_c', deleteParams);
      }

      return await this.getAll();
    } catch (error) {
      console.error("Error removing favorite:", error?.response?.data?.message || error);
      throw error;
    }
  },

  async toggle(propertyId) {
    await delay(150);
    try {
      const favorites = await this.getAll();
      const isFavorite = favorites.includes(propertyId);
      
      if (isFavorite) {
        return await this.remove(propertyId);
      } else {
        return await this.add(propertyId);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error?.response?.data?.message || error);
      throw error;
    }
  },

  async isFavorite(propertyId) {
    const favorites = await this.getAll();
    return favorites.includes(propertyId);
  }
};

export default favoriteService;

export default favoriteService;