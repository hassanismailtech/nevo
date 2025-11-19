import { apiClient } from './client';

export interface ConnectionRequest {
  email: string;
  connectionType: 'teacher' | 'parent' | 'student';
}

export interface Connection {
  id: string;
  email: string;
  role: 'student' | 'teacher' | 'parent';
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

export interface StudentConnection {
  id: string;
  name: string;
  email: string;
  profile?: string;
  progress: number;
  lessonsCompleted: number;
  totalLessons: number;
  lastActive: string;
}

export const connectionsApi = {
  sendInvite: async (data: ConnectionRequest): Promise<{ message: string }> => {
    return apiClient.post('/link/student-to-teacher', data);
  },

  sendTeacherInvite: async (data: ConnectionRequest): Promise<{ message: string }> => {
    return apiClient.post('/link/teacher-to-student', data);
  },

  sendParentInvite: async (data: ConnectionRequest): Promise<{ message: string }> => {
    return apiClient.post('/link/parent-to-student', data);
  },

  getConnections: async (): Promise<Connection[]> => {
    return apiClient.get<Connection[]>('/connections');
  },

  getStudents: async (): Promise<StudentConnection[]> => {
    return apiClient.get<StudentConnection[]>('/teacher/students');
  },

  getChildData: async (childId: string): Promise<StudentConnection> => {
    return apiClient.get<StudentConnection>(`/parent/${childId}/students`);
  },
};

