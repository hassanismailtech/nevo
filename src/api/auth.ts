import { apiClient } from './client';

export interface SignupRequest {
  name: string;
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
    name: string;
    email: string;
    role: 'student' | 'teacher' | 'parent';
    createdAt: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'parent';
  createdAt: string;
}

export const authApi = {

  signup: async (data: SignupRequest): Promise<AuthResponse> => {
    return apiClient.post<AuthResponse>('/signup', data);
  },

  login: async (data: LoginRequest): Promise<AuthResponse> => {
    return apiClient.post<AuthResponse>('/login', data);
  },

  getCurrentUser: async (): Promise<User> => {
    return apiClient.get<User>('/auth/me');
  },
};

