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
  metrics?: string;
  duration: string;
  audioText: string;
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

export interface SkillItem {
  id: string;
  name: string;
  category: string;
  level: number; // 0-100
  description: string;
  icon?: string;
  tags: string[];
}

export interface CareerTrack {
  id: number;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  highlights: string[];
  responsibilities: string[];
  whatILearned: string[];
  impact: string[];
  duration: string; // e.g. "2 yrs 4 mos"
  employmentType: string; // e.g. "Full-time", "Freelance", "Internship"
  logoUrl?: string;
  audioText: string;
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

export interface AudioTrack {
  id: string;
  title: string;
  artist: string;
  album: string;
  coverUrl: string;
  duration: number; // in seconds
  audioText: string;
  type: 'overview' | 'project' | 'skill' | 'episode';
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  itemCount: number;
  coverUrl?: string;
  items: string[]; // project or skill IDs
  isCustom?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}
