export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'profile' | 'evidence' | 'location' | 'event' | 'connection';
  caseId: string;
  profileId?: string;
  importance: 'low' | 'medium' | 'high';
  relatedIds: string[];
}

export const mockTimelineEvents: TimelineEvent[] = [];
