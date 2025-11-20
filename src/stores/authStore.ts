import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { authApi, type AuthResponse } from '../api/auth'

export interface User {
  id: string
  name: string
  email: string
  role: 'student' | 'teacher' | 'parent'
  createdAt: string
}

export interface AssessmentData {
  id: string
  profile: string
  answers: Record<number, string>
  completedAt: string
  recommendations?: string[]
}

interface AuthState {
  currentUser: User | null
  token: string | null
  assessmentData: AssessmentData | null
  isLoading: boolean
  error: string | null
  setUser: (user: User) => void
  setToken: (token: string | null) => void
  setAssessmentData: (data: AssessmentData | null) => void
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string, role: 'student' | 'teacher' | 'parent') => Promise<void>
  logout: () => void
  clearError: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      currentUser: null,
      token: null,
      assessmentData: null,
      isLoading: false,
      error: null,
      
      setUser: (user) => set({ currentUser: user }),
      setToken: (token) => {
        console.log('[AuthStore] setToken called:', token);
        set({ token });
      },
      setAssessmentData: (data) => set({ assessmentData: data }),
      
      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null })
        try {
          const response: AuthResponse = await authApi.login({ email, password })
          console.log('[AuthStore] login response:', response);
          set({
            currentUser: response.user,
            token: response.token,
            isLoading: false,
            error: null,
          })
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || 'Login failed. Please check your credentials.',
          })
          throw error
        }
      },
      
      signup: async (name: string, email: string, password: string, role: 'student' | 'teacher' | 'parent') => {
        set({ isLoading: true, error: null })
        try {
          const response: AuthResponse = await authApi.signup({ name, email, password, role })
          console.log('[AuthStore] signup response:', response);
          set({
            currentUser: response.user,
            token: response.token,
            isLoading: false,
            error: null,
          })
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || 'Signup failed. Please try again.',
          })
          throw error
        }
      },
      
      logout: () => set({ 
        currentUser: null, 
        token: null, 
        assessmentData: null,
        error: null 
      }),
      
      clearError: () => set({ error: null }),
    }),
    {
      name: 'nevo-auth-storage',
    }
  )
)
