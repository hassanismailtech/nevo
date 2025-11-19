import { apiClient } from './client';

export interface SignupRequest {
  fullName: string;
  email: string;
  password: string;
  role: 'student' | 'teacher' | 'parent';
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    fullName: string;
    email: string;
    role: 'student' | 'teacher' | 'parent';
    createdAt: string;
  };
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: 'student' | 'teacher' | 'parent';
  createdAt: string;
}

export const authApi = {
  signup: async (data: SignupRequest): Promise<AuthResponse> => {
    return apiClient.post<AuthResponse>('/auth/signup', data);
  },

  login: async (data: LoginRequest): Promise<AuthResponse> => {
    return apiClient.post<AuthResponse>('/auth/login', data);
  },

  getCurrentUser: async (): Promise<User> => {
    return apiClient.get<User>('/auth/me');
  },
};

