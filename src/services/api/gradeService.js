import { toast } from "react-toastify";

export const gradeService = {
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
          { field: { Name: "score" } },
          { field: { Name: "submitted_date" } },
          { field: { Name: "comments" } },
          { 
            field: { Name: "student_id" },
            referenceField: { field: { Name: "Name" } }
          },
          { 
            field: { Name: "assignment_id" },
            referenceField: { field: { Name: "Name" } }
          },
          { field: { Name: "Tags" } }
        ]
      };
      
      const response = await apperClient.fetchRecords('grade', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching grades:", error);
      toast.error("Failed to load grades");
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
          { field: { Name: "score" } },
          { field: { Name: "submitted_date" } },
          { field: { Name: "comments" } },
          { 
            field: { Name: "student_id" },
            referenceField: { field: { Name: "Name" } }
          },
          { 
            field: { Name: "assignment_id" },
            referenceField: { field: { Name: "Name" } }
          },
          { field: { Name: "Tags" } }
        ]
      };
      
      const response = await apperClient.getRecordById('grade', id, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching grade with ID ${id}:`, error);
      toast.error("Failed to load grade");
      return null;
    }
  },

  getByStudentId: async (studentId) => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "score" } },
          { field: { Name: "submitted_date" } },
          { field: { Name: "comments" } },
          { 
            field: { Name: "student_id" },
            referenceField: { field: { Name: "Name" } }
          },
          { 
            field: { Name: "assignment_id" },
            referenceField: { field: { Name: "Name" } }
          },
          { field: { Name: "Tags" } }
        ],
        where: [
          {
            FieldName: "student_id",
            Operator: "EqualTo",
            Values: [studentId]
          }
        ]
      };
      
      const response = await apperClient.fetchRecords('grade', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching grades by student ID:", error);
      toast.error("Failed to load student grades");
      return [];
    }
  },

  getByAssignmentId: async (assignmentId) => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "score" } },
          { field: { Name: "submitted_date" } },
          { field: { Name: "comments" } },
          { 
            field: { Name: "student_id" },
            referenceField: { field: { Name: "Name" } }
          },
          { 
            field: { Name: "assignment_id" },
            referenceField: { field: { Name: "Name" } }
          },
          { field: { Name: "Tags" } }
        ],
        where: [
          {
            FieldName: "assignment_id",
            Operator: "EqualTo",
            Values: [assignmentId]
          }
        ]
      };
      
      const response = await apperClient.fetchRecords('grade', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching grades by assignment ID:", error);
      toast.error("Failed to load assignment grades");
      return [];
    }
  },

  create: async (gradeData) => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      // Only include updateable fields
      const updateableData = {
        Name: gradeData.Name || `Grade for ${gradeData.studentId}`,
        score: parseInt(gradeData.score),
        submitted_date: gradeData.submittedDate || gradeData.submitted_date || new Date().toISOString().split('T')[0],
        comments: gradeData.comments || "",
        student_id: parseInt(gradeData.studentId || gradeData.student_id),
        assignment_id: parseInt(gradeData.assignmentId || gradeData.assignment_id),
        Tags: gradeData.Tags || ""
      };
      
      const params = {
        records: [updateableData]
      };
      
      const response = await apperClient.createRecord('grade', params);
      
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
          toast.success("Grade created successfully!");
          return successfulRecords[0].data;
        }
      }
      
      throw new Error("Failed to create grade");
    } catch (error) {
      console.error("Error creating grade:", error);
      toast.error("Failed to create grade");
      throw error;
    }
  },

  update: async (id, gradeData) => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      // Only include updateable fields
      const updateableData = {
        Id: id,
        Name: gradeData.Name || `Grade for ${gradeData.studentId}`,
        score: parseInt(gradeData.score),
        submitted_date: gradeData.submittedDate || gradeData.submitted_date || new Date().toISOString().split('T')[0],
        comments: gradeData.comments || "",
        student_id: parseInt(gradeData.studentId || gradeData.student_id),
        assignment_id: parseInt(gradeData.assignmentId || gradeData.assignment_id),
        Tags: gradeData.Tags || ""
      };
      
      const params = {
        records: [updateableData]
      };
      
      const response = await apperClient.updateRecord('grade', params);
      
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
          toast.success("Grade updated successfully!");
          return successfulRecords[0].data;
        }
      }
      
      throw new Error("Failed to update grade");
    } catch (error) {
      console.error("Error updating grade:", error);
      toast.error("Failed to update grade");
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
      
      const response = await apperClient.deleteRecord('grade', params);
      
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
      
      throw new Error("Failed to delete grade");
    } catch (error) {
      console.error("Error deleting grade:", error);
      toast.error("Failed to delete grade");
      throw error;
    }
  }
};