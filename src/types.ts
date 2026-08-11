export type TabType = 'All' | 'Projects' | 'Tech & Tools' | 'Career';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  fullDescription: string;
  imageUrl: string;
  tags: string[];
  duration: string;
  githubUrl?: string;
  liveUrl?: string;
  architectureHighlights: string[];
  isLiked?: boolean;
}

export interface SkillCategory {
  title: string;
  items: string[];
  description: string;
}

export interface CareerTrack {
  id: number;
  role: string;
  company: string;
  location: string;
  period: string;
  responsibilities: string[];
  whatILearned: string[];
  impact: string[];
  duration: string; // e.g. "2 yrs 4 mos"
  employmentType: string; // e.g. "Full-time", "Freelance", "Internship"
  logoUrl?: string;
}

export interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  gpa?: string;
  highlights: string[];
  logoUrl?: string;
}
