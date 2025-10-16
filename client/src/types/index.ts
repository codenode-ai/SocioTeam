export interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  position: string;
  status: 'active' | 'inactive';
  avatar?: string;
}

export interface SurveyQuestion {
  id: number;
  text: string;
  maxChoices: number;
  type: 'positive' | 'negative' | 'neutral';
}

export interface Survey {
  id: number;
  name: string;
  questions: SurveyQuestion[];
  createdAt: string;
}

export interface SurveyResponse {
  employeeId: number;
  surveyId: number;
  responses: {
    questionId: number;
    choices: number[];
  }[];
  timestamp: string;
}

export interface SurveyLink {
  token: string;
  employeeId: number;
  surveyId: number;
  status: 'pending' | 'completed';
  createdAt: string;
  completedAt?: string;
}

export interface Team {
  id: number;
  name: string;
  members: number[];
  cohesion: number;
}

export interface GraphNode {
  id: number;
  name: string;
  department: string;
  avatar?: string;
  size: number;
}

export interface GraphLink {
  source: number;
  target: number;
  type: 'positive' | 'negative';
  strength: number;
}

export interface SociometricData {
  nodes: GraphNode[];
  links: GraphLink[];
}
