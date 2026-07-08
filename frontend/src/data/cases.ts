export interface Case {
  id: string;
  name: string;
  status: 'active' | 'archived' | 'pending';
  profiles: number;
  evidence: number;
  createdAt: string;
  updatedAt: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
}

export const mockCases: Case[] = [
  {
    id: '1',
    name: 'Brighton Research',
    status: 'active',
    profiles: 3,
    evidence: 24,
    createdAt: '2024-03-15',
    updatedAt: '2024-03-20',
    description: 'Investigation into suspicious research activities at Brighton University involving multiple subjects with shared interests in alternative music and gaming communities.',
    priority: 'high'
  },
  {
    id: '2',
    name: 'Network Analysis',
    status: 'active',
    profiles: 7,
    evidence: 45,
    createdAt: '2024-03-10',
    updatedAt: '2024-03-18',
    description: 'Comprehensive network analysis of organizational connections and communication patterns between identified subjects across multiple platforms.',
    priority: 'medium'
  },
  {
    id: '3',
    name: 'Event Tracking',
    status: 'pending',
    profiles: 2,
    evidence: 12,
    createdAt: '2024-03-05',
    updatedAt: '2024-03-15',
    description: 'Tracking and analysis of event attendance patterns and geographic movements of subjects of interest in the London area.',
    priority: 'low'
  }
];
