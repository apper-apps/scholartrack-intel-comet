import { toast } from "react-toastify";

export const attendanceService = {
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
          { 
            field: { Name: "student_id" },
            referenceField: { field: { Name: "Name" } }
          },
          { field: { Name: "date" } },
          { field: { Name: "status" } },
          { field: { Name: "notes" } },
          { field: { Name: "Tags" } }
        ]
      };
      
      const response = await apperClient.fetchRecords('attendance', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching attendance:", error);
      toast.error("Failed to load attendance");
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
          { 
            field: { Name: "student_id" },
            referenceField: { field: { Name: "Name" } }
          },
          { field: { Name: "date" } },
          { field: { Name: "status" } },
          { field: { Name: "notes" } },
          { field: { Name: "Tags" } }
        ]
      };
      
      const response = await apperClient.getRecordById('attendance', id, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching attendance with ID ${id}:`, error);
      toast.error("Failed to load attendance record");
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
          { 
            field: { Name: "student_id" },
            referenceField: { field: { Name: "Name" } }
          },
          { field: { Name: "date" } },
          { field: { Name: "status" } },
          { field: { Name: "notes" } },
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
      
      const response = await apperClient.fetchRecords('attendance', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching attendance by student ID:", error);
      toast.error("Failed to load student attendance");
      return [];
    }
  },

  getByDate: async (date) => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const dateString = new Date(date).toISOString().split("T")[0];
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { 
            field: { Name: "student_id" },
            referenceField: { field: { Name: "Name" } }
          },
          { field: { Name: "date" } },
          { field: { Name: "status" } },
          { field: { Name: "notes" } },
          { field: { Name: "Tags" } }
        ],
        where: [
          {
            FieldName: "date",
            Operator: "EqualTo",
            Values: [dateString]
          }
        ]
      };
      
      const response = await apperClient.fetchRecords('attendance', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching attendance by date:", error);
      toast.error("Failed to load attendance for date");
      return [];
    }
  },

  create: async (attendanceData) => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      // Only include updateable fields
      const updateableData = {
        Name: attendanceData.Name || `Attendance for ${attendanceData.studentId}`,
        student_id: parseInt(attendanceData.studentId || attendanceData.student_id),
        date: attendanceData.date,
        status: attendanceData.status,
        notes: attendanceData.notes || "",
        Tags: attendanceData.Tags || ""
      };
      
      const params = {
        records: [updateableData]
      };
      
      const response = await apperClient.createRecord('attendance', params);
      
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
          toast.success("Attendance recorded successfully!");
          return successfulRecords[0].data;
        }
      }
      
      throw new Error("Failed to create attendance record");
    } catch (error) {
      console.error("Error creating attendance:", error);
      toast.error("Failed to record attendance");
      throw error;
    }
  },

  update: async (id, attendanceData) => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      // Only include updateable fields
      const updateableData = {
        Id: id,
        Name: attendanceData.Name || `Attendance for ${attendanceData.studentId}`,
        student_id: parseInt(attendanceData.studentId || attendanceData.student_id),
        date: attendanceData.date,
        status: attendanceData.status,
        notes: attendanceData.notes || "",
        Tags: attendanceData.Tags || ""
      };
      
      const params = {
        records: [updateableData]
      };
      
      const response = await apperClient.updateRecord('attendance', params);
      
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
          toast.success("Attendance updated successfully!");
          return successfulRecords[0].data;
        }
      }
      
      throw new Error("Failed to update attendance record");
    } catch (error) {
      console.error("Error updating attendance:", error);
      toast.error("Failed to update attendance");
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
      
      const response = await apperClient.deleteRecord('attendance', params);
      
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
      
      throw new Error("Failed to delete attendance record");
    } catch (error) {
      console.error("Error deleting attendance:", error);
      toast.error("Failed to delete attendance");
      throw error;
    }
  },

  getAttendanceAnalytics: async () => {
    try {
      // Get all attendance records first
      const allAttendance = await attendanceService.getAll();
      
      const now = new Date();
      const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
      
      const recentAttendance = allAttendance.filter(record => 
        new Date(record.date) >= thirtyDaysAgo
      );
      
      const patterns = [];
      const dateGroups = {};
      
      recentAttendance.forEach(record => {
        const dateKey = record.date;
        if (!dateGroups[dateKey]) {
          dateGroups[dateKey] = { present: 0, absent: 0, late: 0, excused: 0 };
        }
        dateGroups[dateKey][record.status]++;
      });
      
      Object.keys(dateGroups).sort().forEach(date => {
        patterns.push({ date, ...dateGroups[date] });
      });
      
      const totalRecords = recentAttendance.length;
      const presentCount = recentAttendance.filter(r => r.status === 'present').length;
      const absentCount = recentAttendance.filter(r => r.status === 'absent').length;
      const lateCount = recentAttendance.filter(r => r.status === 'late').length;
      
      return {
        patterns,
        averageAttendance: totalRecords > 0 ? Math.round((presentCount / totalRecords) * 100) : 0,
        totalAbsences: absentCount,
        totalLate: lateCount,
        totalRecords
      };
    } catch (error) {
      console.error("Error fetching attendance analytics:", error);
      toast.error("Failed to load attendance analytics");
      return {
        patterns: [],
        averageAttendance: 0,
        totalAbsences: 0,
        totalLate: 0,
        totalRecords: 0
      };
    }
  },

  getAttendanceAlerts: async () => {
    try {
      // Get all attendance records first
      const allAttendance = await attendanceService.getAll();
      
      const alerts = [];
      const studentAttendance = {};
      
      // Group attendance by student
      allAttendance.forEach(record => {
        const studentId = record.student_id?.Id || record.student_id;
        if (!studentAttendance[studentId]) {
          studentAttendance[studentId] = [];
        }
        studentAttendance[studentId].push(record);
      });
      
      // Check each student for excessive absences
      Object.keys(studentAttendance).forEach(studentId => {
        const records = studentAttendance[studentId].sort((a, b) => 
          new Date(a.date) - new Date(b.date)
        );
        
        const totalAbsences = records.filter(r => r.status === 'absent').length;
        const consecutiveAbsences = calculateConsecutiveAbsences(records);
        
        // Alert for 3+ consecutive absences
        if (consecutiveAbsences >= 3) {
          alerts.push({
            id: `consecutive-${studentId}`,
            studentId: parseInt(studentId),
            type: 'consecutive',
            count: consecutiveAbsences,
            message: `${consecutiveAbsences} consecutive absences - immediate attention required`,
            severity: 'high',
            date: new Date().toISOString()
          });
        }
        
        // Alert for 5+ total absences in last 30 days
        if (totalAbsences >= 5) {
          alerts.push({
            id: `total-${studentId}`,
            studentId: parseInt(studentId),
            type: 'total',
            count: totalAbsences,
            message: `${totalAbsences} total absences - consider intervention`,
            severity: 'medium',
            date: new Date().toISOString()
          });
        }
      });
      
      return alerts;
    } catch (error) {
      console.error("Error fetching attendance alerts:", error);
      toast.error("Failed to load attendance alerts");
      return [];
    }
  }
};

function calculateConsecutiveAbsences(records) {
  let maxConsecutive = 0;
  let currentConsecutive = 0;
  
  records.forEach(record => {
    if (record.status === 'absent') {
      currentConsecutive++;
      maxConsecutive = Math.max(maxConsecutive, currentConsecutive);
    } else {
      currentConsecutive = 0;
    }
  });
  
  return maxConsecutive;
}