import { toast } from "react-toastify";

export const studentService = {
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
          { field: { Name: "first_name" } },
          { field: { Name: "last_name" } },
          { field: { Name: "email" } },
          { field: { Name: "phone" } },
          { field: { Name: "date_of_birth" } },
          { field: { Name: "enrollment_date" } },
          { field: { Name: "grade" } },
          { field: { Name: "photo" } },
          { field: { Name: "Tags" } }
        ]
      };
      
      const response = await apperClient.fetchRecords('student', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching students:", error);
      toast.error("Failed to load students");
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
          { field: { Name: "first_name" } },
          { field: { Name: "last_name" } },
          { field: { Name: "email" } },
          { field: { Name: "phone" } },
          { field: { Name: "date_of_birth" } },
          { field: { Name: "enrollment_date" } },
          { field: { Name: "grade" } },
          { field: { Name: "photo" } },
          { field: { Name: "Tags" } }
        ]
      };
      
      const response = await apperClient.getRecordById('student', id, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching student with ID ${id}:`, error);
      toast.error("Failed to load student");
      return null;
    }
  },

  create: async (studentData) => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      // Only include updateable fields
      const updateableData = {
        Name: studentData.Name || `${studentData.first_name} ${studentData.last_name}`,
        first_name: studentData.first_name,
        last_name: studentData.last_name,
        email: studentData.email,
        phone: studentData.phone,
        date_of_birth: studentData.date_of_birth,
        enrollment_date: studentData.enrollment_date,
        grade: studentData.grade,
        photo: studentData.photo || "",
        Tags: studentData.Tags || ""
      };
      
      const params = {
        records: [updateableData]
      };
      
      const response = await apperClient.createRecord('student', params);
      
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
          toast.success("Student created successfully!");
          return successfulRecords[0].data;
        }
      }
      
      throw new Error("Failed to create student");
    } catch (error) {
      console.error("Error creating student:", error);
      toast.error("Failed to create student");
      throw error;
    }
  },

  update: async (id, studentData) => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      // Only include updateable fields
      const updateableData = {
        Id: id,
        Name: studentData.Name || `${studentData.first_name} ${studentData.last_name}`,
        first_name: studentData.first_name,
        last_name: studentData.last_name,
        email: studentData.email,
        phone: studentData.phone,
        date_of_birth: studentData.date_of_birth,
        enrollment_date: studentData.enrollment_date,
        grade: studentData.grade,
        photo: studentData.photo || "",
        Tags: studentData.Tags || ""
      };
      
      const params = {
        records: [updateableData]
      };
      
      const response = await apperClient.updateRecord('student', params);
      
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
          toast.success("Student updated successfully!");
          return successfulRecords[0].data;
        }
      }
      
      throw new Error("Failed to update student");
    } catch (error) {
      console.error("Error updating student:", error);
      toast.error("Failed to update student");
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
      
      const response = await apperClient.deleteRecord('student', params);
      
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
      
      throw new Error("Failed to delete student");
    } catch (error) {
      console.error("Error deleting student:", error);
      toast.error("Failed to delete student");
      throw error;
    }
  }
};