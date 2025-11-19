import { apiClient } from './client';

export interface Lesson {
  id: string;
  title: string;
  subject: string;
  status: 'not-started' | 'in-progress' | 'completed';
  progress: number;
  xp: number;
  duration: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LessonSlide {
  type: 'intro' | 'content' | 'visual' | 'interactive' | 'quiz' | 'summary';
  title?: string;
  content: string;
  visual?: string;
  question?: {
    text: string;
    options: string[];
    correct: number;
    explanation: string;
  };
  breakSuggestion?: boolean;
}

export interface LessonContent {
  id: string;
  title: string;
  subject: string;
  profile: string;
  slides: LessonSlide[];
  xpReward: number;
}

export interface UploadLessonRequest {
  title: string;
  subject: string;
  content: string;
}

export interface UploadLessonResponse {
  id: string;
  message: string;
}

export const lessonsApi = {
  getStudentLessons: async (): Promise<Lesson[]> => {
    return apiClient.get<Lesson[]>('/lesson/list');
  },

  getLesson: async (lessonId: string): Promise<LessonContent> => {
    return apiClient.get<LessonContent>(`/lesson/${lessonId}`);
  },

  uploadLesson: async (data: UploadLessonRequest): Promise<UploadLessonResponse> => {
    return apiClient.post<UploadLessonResponse>('/lesson/upload', data);
  },

  completeLesson: async (lessonId: string, score: number): Promise<void> => {
    return apiClient.post(`/lesson/${lessonId}/complete`, { score });
  },
};

