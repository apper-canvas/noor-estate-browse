const MAX_COMPARISON = 3;
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const comparisonService = {
  async getAll() {
    await delay(150);
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

      const response = await apperClient.fetchRecords('comparison_c', params);
      
      if (!response?.data?.length) {
        return [];
      }

      return response.data.map(c => c.property_id_c);
    } catch (error) {
      console.error("Error fetching comparison:", error?.response?.data?.message || error);
      return [];
    }
  },

  async add(propertyId) {
    await delay(150);
    try {
      const comparison = await this.getAll();
      
      if (comparison.includes(propertyId)) {
        return comparison;
      }
      
      if (comparison.length >= MAX_COMPARISON) {
        throw new Error(`You can only compare up to ${MAX_COMPARISON} properties`);
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

      const response = await apperClient.createRecord('comparison_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return await this.getAll();
    } catch (error) {
      console.error("Error adding to comparison:", error?.response?.data?.message || error);
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

      const allResponse = await apperClient.fetchRecords('comparison_c', allParams);
      
      if (allResponse?.data?.length > 0) {
        const comparisonRecord = allResponse.data[0];
        const deleteParams = {
          RecordIds: [comparisonRecord.Id]
        };
        await apperClient.deleteRecord('comparison_c', deleteParams);
      }

      return await this.getAll();
    } catch (error) {
      console.error("Error removing from comparison:", error?.response?.data?.message || error);
      throw error;
    }
  },

  async clear() {
    await delay(100);
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const allParams = {
        fields: [
          {"field": {"Name": "Id"}}
        ]
      };

      const allResponse = await apperClient.fetchRecords('comparison_c', allParams);
      
      if (allResponse?.data?.length > 0) {
        const recordIds = allResponse.data.map(c => c.Id);
        const deleteParams = {
          RecordIds: recordIds
        };
        await apperClient.deleteRecord('comparison_c', deleteParams);
      }

      return [];
    } catch (error) {
      console.error("Error clearing comparison:", error?.response?.data?.message || error);
      throw error;
    }
  },

  async toggle(propertyId) {
    await delay(150);
    try {
      const comparison = await this.getAll();
      const isInComparison = comparison.includes(propertyId);
      
      if (isInComparison) {
        return await this.remove(propertyId);
      } else {
        return await this.add(propertyId);
      }
    } catch (error) {
      console.error("Error toggling comparison:", error?.response?.data?.message || error);
      throw error;
    }
  }
};

export default comparisonService;