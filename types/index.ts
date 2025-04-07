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
  profile: UserProfile | null;
  getProfileData: () => Promise<void>;
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
};

export interface JobCardProps {
  job: Job;
}
