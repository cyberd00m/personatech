export interface JobExperience {
  title: string;
  company: string;
  startDate?: string;
  endDate?: string;
  description?: string;
}

export interface Education {
  institution: string;
  degree?: string;
  field?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
}

export interface Profile {
  id: string;
  name: string;
  alias?: string;
  ageRange?: string;
  location: string;
  interests: string[];
  occupation?: string;
  usernames: string[];
  websites: string[];
  organizations: string[];
  jobExperiences: JobExperience[];
  education: Education[];
  notes: string;
  events: string[];
  confidence: number;
  caseId: string;
  avatar?: string;
}

export const mockProfiles: Profile[] = [];
