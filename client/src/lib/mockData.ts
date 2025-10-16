import { Employee, Survey, SurveyResponse, Team, SociometricData } from '@/types';
import avatar1 from '@assets/generated_images/Professional_employee_avatar_1_8f0364c1.png';
import avatar2 from '@assets/generated_images/Professional_employee_avatar_2_d08104ac.png';
import avatar3 from '@assets/generated_images/Professional_employee_avatar_3_df9e806e.png';
import avatar4 from '@assets/generated_images/Professional_employee_avatar_4_4b3f71ab.png';

const avatars = [avatar1, avatar2, avatar3, avatar4];

const departments = ['IT', 'Sales', 'Marketing', 'HR', 'Finance', 'Operations'];
const positions = {
  IT: ['Developer', 'Tech Lead', 'DevOps', 'QA Engineer', 'System Analyst'],
  Sales: ['Sales Rep', 'Account Manager', 'Sales Director', 'BDR'],
  Marketing: ['Marketing Manager', 'Content Creator', 'SEO Specialist', 'Designer'],
  HR: ['HR Manager', 'Recruiter', 'HR Coordinator', 'Benefits Specialist'],
  Finance: ['Accountant', 'Financial Analyst', 'Controller', 'CFO'],
  Operations: ['Operations Manager', 'Logistics Coordinator', 'Process Analyst']
};

const firstNames = ['Ana', 'Bruno', 'Carlos', 'Diana', 'Eduardo', 'Fernanda', 'Gabriel', 'Helena', 'Igor', 'Julia',
  'Lucas', 'Mariana', 'Nicolas', 'Olivia', 'Pedro', 'Rafaela', 'Santiago', 'Tatiana', 'Vicente', 'Yasmin',
  'Andre', 'Beatriz', 'Diego', 'Elisa', 'Felipe', 'Giovana', 'Henrique', 'Isabella', 'João', 'Kamila'];

const lastNames = ['Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira', 'Alves', 'Pereira', 'Lima', 'Gomes',
  'Costa', 'Ribeiro', 'Martins', 'Carvalho', 'Rocha', 'Almeida', 'Nascimento', 'Araujo', 'Melo', 'Barbosa'];

export const mockEmployees: Employee[] = Array.from({ length: 50 }, (_, i) => {
  const dept = departments[i % departments.length];
  return {
    id: i + 1,
    name: `${firstNames[i % firstNames.length]} ${lastNames[(i * 2) % lastNames.length]}`,
    email: `${firstNames[i % firstNames.length].toLowerCase()}.${lastNames[(i * 2) % lastNames.length].toLowerCase()}@socioteam.com`,
    department: dept,
    position: positions[dept as keyof typeof positions][i % positions[dept as keyof typeof positions].length],
    status: i % 10 === 0 ? 'inactive' : 'active',
    avatar: avatars[i % avatars.length]
  };
});

export const mockSurvey: Survey = {
  id: 1,
  name: 'Team Formation Survey 2025',
  questions: [
    { id: 1, text: 'Who would you most like to work with?', maxChoices: 5, type: 'positive' },
    { id: 2, text: 'Who would you prefer not to work with?', maxChoices: 3, type: 'negative' },
    { id: 3, text: 'Who is a technical reference?', maxChoices: 3, type: 'neutral' }
  ],
  createdAt: new Date().toISOString()
};

export const mockSurveyResponses: SurveyResponse[] = mockEmployees.slice(0, 35).map((emp, idx) => ({
  employeeId: emp.id,
  surveyId: 1,
  responses: [
    {
      questionId: 1,
      choices: Array.from({ length: 3 + (idx % 3) }, (_, i) => ((emp.id + i + 1) % 50) + 1)
    },
    {
      questionId: 2,
      choices: Array.from({ length: 1 + (idx % 2) }, (_, i) => ((emp.id + i + 10) % 50) + 1)
    },
    {
      questionId: 3,
      choices: Array.from({ length: 2 + (idx % 2) }, (_, i) => ((emp.id + i + 5) % 50) + 1)
    }
  ],
  timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
}));

export const mockTeams: Team[] = [
  { id: 1, name: 'Team Alpha', members: [1, 5, 8, 12, 15], cohesion: 8.5 },
  { id: 2, name: 'Team Beta', members: [2, 6, 9, 13, 16], cohesion: 7.2 },
  { id: 3, name: 'Team Gamma', members: [3, 7, 10, 14, 17], cohesion: 9.1 }
];

export function generateSociometricData(): SociometricData {
  const nodes = mockEmployees.slice(0, 35).map(emp => {
    const positiveCount = mockSurveyResponses.filter(r =>
      r.responses[0]?.choices.includes(emp.id)
    ).length;

    return {
      id: emp.id,
      name: emp.name,
      department: emp.department,
      avatar: emp.avatar,
      size: 10 + positiveCount * 3
    };
  });

  const links = [];
  for (const response of mockSurveyResponses) {
    for (const choice of response.responses[0]?.choices || []) {
      if (choice <= 35) {
        links.push({
          source: response.employeeId,
          target: choice,
          type: 'positive' as const,
          strength: Math.random() * 0.5 + 0.5
        });
      }
    }
    for (const choice of response.responses[1]?.choices || []) {
      if (choice <= 35 && Math.random() > 0.7) {
        links.push({
          source: response.employeeId,
          target: choice,
          type: 'negative' as const,
          strength: Math.random() * 0.3 + 0.2
        });
      }
    }
  }

  return { nodes, links };
}

export function generateDashboardData() {
  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      responses: Math.floor(Math.random() * 10) + i
    };
  });

  const byDepartment = departments.map(dept => ({
    department: dept,
    responses: mockEmployees.filter(e => e.department === dept && mockSurveyResponses.some(r => r.employeeId === e.id)).length
  }));

  const choiceDistribution = [
    { name: 'Positive', value: mockSurveyResponses.reduce((acc, r) => acc + (r.responses[0]?.choices.length || 0), 0) },
    { name: 'Negative', value: mockSurveyResponses.reduce((acc, r) => acc + (r.responses[1]?.choices.length || 0), 0) }
  ];

  return { last30Days, byDepartment, choiceDistribution };
}
