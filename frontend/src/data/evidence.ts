export interface Evidence {
  id: string;
  type: 'note' | 'image' | 'document' | 'link' | 'audio' | 'video';
  title: string;
  description: string;
  source: string;
  date: string;
  caseId: string;
  profileId?: string;
  tags: string[];
  url?: string;
  metadata?: Record<string, any>;
}

export const mockEvidence: Evidence[] = [];
