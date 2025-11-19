import { apiClient } from './client';

export interface AssessmentAnswer {
  questionId: number;
  answer: string;
}

export interface SubmitAssessmentRequest {
  answers: AssessmentAnswer[];
}

export interface AssessmentResult {
  id: string;
  profile: string;
  answers: Record<number, string>;
  completedAt: string;
  recommendations?: string[];
}

export interface AssessmentQuestion {
  id: number;
  question: string;
  options: Array<{
    value: string;
    label: string;
    profile: string;
    icon?: string;
  }>;
}

export const assessmentApi = {
  getQuestions: async (): Promise<AssessmentQuestion[]> => {
    return apiClient.get<AssessmentQuestion[]>('/assessment/questions');
  },

  submitAssessment: async (data: SubmitAssessmentRequest): Promise<AssessmentResult> => {
    return apiClient.post<AssessmentResult>('/assessment/submit', data);
  },

  getResult: async (): Promise<AssessmentResult | null> => {
    try {
      return await apiClient.get<AssessmentResult>('/assessment/result');
    } catch (error) {
      // Return null if no assessment found (404)
      if ((error as { status?: number }).status === 404) {
        return null;
      }
      throw error;
    }
  },
};

