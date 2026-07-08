export interface Location {
  id: string;
  name: string;
  type: 'venue' | 'residence' | 'workplace' | 'public' | 'organization';
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  description: string;
  caseId: string;
  profileIds: string[];
  visitFrequency: 'rare' | 'occasional' | 'frequent' | 'regular';
  lastVisit: string;
}

export const mockLocations: Location[] = [];
