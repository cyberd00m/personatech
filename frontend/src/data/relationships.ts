export interface Relationship {
  id: string;
  sourceId: string;
  targetId: string;
  type: 'friend' | 'colleague' | 'family' | 'organization' | 'event' | 'location';
  strength: number;
  description: string;
  caseId: string;
  metadata?: Record<string, any>;
}

export const mockRelationships: Relationship[] = [];
