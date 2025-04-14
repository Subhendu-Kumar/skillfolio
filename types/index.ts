import { KeyboardTypeOptions } from "react-native";

export interface FormStateSignIn {
  email: string;
  password: string;
}

export interface FormStateSignUp {
  email: string;
  username: string;
  password: string;
}

export interface FormFieldProps {
  title: string;
  value: string;
  [key: string]: any;
  placeholder?: string;
  otherStyles?: string;
  keyBoardType?: KeyboardTypeOptions;
  handleChangeText: (e: string) => void;
}

export interface AuthContextProps {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
  login: (token: string, user: User) => Promise<void>;
}

export interface User {
  id: string;
  exp: number;
  email: string;
  username: string;
}

export type UserProfile = {
  id: string;
  bio: string;
  user: string;
  skills: string;
  github: string;
  full_name: string;
  location: string;
  linkedin: string;
  portfolio: string;
  university: string;
  created_at: string;
  phone_number: string;
  is_complete: boolean;
  graduation_year: number;
  current_position: string;
  experience_years: string;
  highest_qualification: string;
};

export type Job = {
  job_id: string;
  job_title: string;
  job_location: string;
  employer_name: string;
  job_posted_at: string;
  job_employment_type: string;
  employer_logo: string | null;
};

export interface JobHighlights {
  Benefits?: string[];
  Qualifications?: string[];
  Responsibilities?: string[];
}

export interface JobDetailsType {
  job_id: string;
  job_title: string;
  job_location: string;
  job_posted_at: string;
  employer_name: string;
  employer_logo?: string;
  job_publisher?: string;
  job_apply_link: string;
  job_description: string;
  employer_website?: string;
  job_employment_type: string;
  job_highlights?: JobHighlights;
  job_posted_at_datetime_utc?: string;
}

export type Stats = {
  id: string;
  user: string;
  jobs_visited: number;
  resume_enhanced: number;
  ats_score: number;
};

export interface JobCardProps {
  job: Job;
}

export interface PersonalInfo {
  [key: string]: string;
}

export interface Experience {
  company: string;
  role: string;
  dates: string;
  responsibilities: string;
}

export interface Education {
  institution: string;
  degree: string;
  dates: string;
}

export interface Project {
  title: string;
  tech_stack: string;
  description: string;
}

export interface EnhancedResume {
  personal_info: PersonalInfo;
  summary: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
  certifications: string[];
  projects: Project[];
  additional_information?: string;
}

export type GroupMember = {
  userId: string;
  userName: string;
};

export type LatestMessage = {
  id: string;
  message: string;
  timestamp: Date;
  senderId: string;
  senderName: string;
};

export type JoinedGroup = {
  id: string;
  groupName: string;
  groupIconUrl: string;
  latestMessage: LatestMessage | null;
};

export interface NotJoinedGroups {
  id: string;
  groupName: string;
  groupIconUrl: string;
}

export interface ScoreResponse {
  total_score: string;
  common_mistakes: string[];
  optimizations: string[];
  job_description_keywords: string[];
  keyword_skill_matching: {
    matched_keywords: string[];
    missing_keywords: string[];
    suggestions: string;
  };
  essential_checks: Record<string, string>;
}

// types/chat.ts
export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  messageText: string;
  timestamp: any; // Firestore timestamp
}
