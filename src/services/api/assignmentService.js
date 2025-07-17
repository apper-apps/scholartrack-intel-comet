import { toast } from "react-toastify";

export const assignmentService = {
  getAll: async () => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title" } },
          { field: { Name: "category" } },
          { field: { Name: "total_points" } },
          { field: { Name: "due_date" } },
          { field: { Name: "class_id" } },
          { field: { Name: "Tags" } }
        ]
      };
      
      const response = await apperClient.fetchRecords('assignment', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching assignments:", error);
      toast.error("Failed to load assignments");
      return [];
    }
  },

  getById: async (id) => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title" } },
          { field: { Name: "category" } },
          { field: { Name: "total_points" } },
          { field: { Name: "due_date" } },
          { field: { Name: "class_id" } },
          { field: { Name: "Tags" } }
        ]
      };
      
      const response = await apperClient.getRecordById('assignment', id, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching assignment with ID ${id}:`, error);
      toast.error("Failed to load assignment");
      return null;
    }
  },

  create: async (assignmentData) => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      // Only include updateable fields
      const updateableData = {
        Name: assignmentData.Name || assignmentData.title,
        title: assignmentData.title,
        category: assignmentData.category,
        total_points: parseInt(assignmentData.totalPoints || assignmentData.total_points),
        due_date: assignmentData.dueDate || assignmentData.due_date,
        class_id: assignmentData.classId || assignmentData.class_id || "general",
        Tags: assignmentData.Tags || ""
      };
      
      const params = {
        records: [updateableData]
      };
      
      const response = await apperClient.createRecord('assignment', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulRecords.length > 0) {
          toast.success("Assignment created successfully!");
          return successfulRecords[0].data;
        }
      }
      
      throw new Error("Failed to create assignment");
    } catch (error) {
      console.error("Error creating assignment:", error);
      toast.error("Failed to create assignment");
      throw error;
    }
  },

  update: async (id, assignmentData) => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      // Only include updateable fields
      const updateableData = {
        Id: id,
        Name: assignmentData.Name || assignmentData.title,
        title: assignmentData.title,
        category: assignmentData.category,
        total_points: parseInt(assignmentData.totalPoints || assignmentData.total_points),
        due_date: assignmentData.dueDate || assignmentData.due_date,
        class_id: assignmentData.classId || assignmentData.class_id || "general",
        Tags: assignmentData.Tags || ""
      };
      
      const params = {
        records: [updateableData]
      };
      
      const response = await apperClient.updateRecord('assignment', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to update ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulRecords.length > 0) {
          toast.success("Assignment updated successfully!");
          return successfulRecords[0].data;
        }
      }
      
      throw new Error("Failed to update assignment");
    } catch (error) {
      console.error("Error updating assignment:", error);
      toast.error("Failed to update assignment");
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        RecordIds: [id]
      };
      
      const response = await apperClient.deleteRecord('assignment', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulDeletions.length > 0) {
          return true;
        }
      }
      
      throw new Error("Failed to delete assignment");
    } catch (error) {
      console.error("Error deleting assignment:", error);
      toast.error("Failed to delete assignment");
      throw error;
    }
  }
};