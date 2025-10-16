export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  status: 'active' | 'inactive';
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SurveyQuestion {
  id: string;
  surveyId: string;
  text: string;
  maxChoices: number;
  type: 'positive' | 'negative' | 'neutral';
  order: number;
}

export interface Survey {
  id: string;
  name: string;
  description?: string;
  questions: SurveyQuestion[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  status: 'draft' | 'active' | 'completed';
}

export interface SurveyResponse {
  id: string;
  employeeId: string;
  surveyId: string;
  responses: {
    questionId: string;
    choices: string[];
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface SurveyLink {
  token: string;
  employeeId: string;
  surveyId: string;
  status: 'pending' | 'completed';
  createdAt: string;
  completedAt?: string;
  expiresAt?: string;
}

export interface Team {
  id: string;
  name: string;
  description?: string;
  members: string[];
  cohesion: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface GraphNode {
  id: string;
  name: string;
  department: string;
  avatar?: string;
  size: number;
}

export interface GraphLink {
  source: string;
  target: string;
  type: 'positive' | 'negative';
  strength: number;
}

export interface SociometricData {
  nodes: GraphNode[];
  links: GraphLink[];
}

// Tipos relacionados ao Supabase
export interface User {
  id: string;
  username: string;
  email?: string;
  createdAt: string;
  updatedAt: string;
}
