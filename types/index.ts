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

export interface EmptyStateProps {
  title: string;
  subTitle: string;
}

export interface AuthContextProps {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  login: (token: string, user: User) => Promise<void>;
  logout: () => Promise<void>;
  profile: UserProfile | null;
  getProfileData: () => Promise<void>;
}

export interface User {
  id: string;
  email: string;
  username: string;
  exp: number;
}

export type UserProfile = {
  id: string;
  full_name: string;
  phone_number: string;
  location: string;
  bio: string;
  highest_qualification: string;
  university: string;
  graduation_year: number;
  current_position: string;
  experience_years: string; // If it's coming as a string (like "4.5"), keep this as string
  skills: string;
  linkedin: string;
  github: string;
  portfolio: string;
  is_complete: boolean;
  created_at: string; // ISO date string
  user: string; // user ID
};

export type Job = {
  job_id: string;
  job_title: string;
  employer_name: string;
  job_posted_at: string;
  employer_logo: string | null;
  job_employment_type: string;
  job_location: string;
};

export interface JobHighlights {
  Qualifications?: string[];
  Benefits?: string[];
  Responsibilities?: string[];
}

export interface JobDetailsType {
  job_id: string;
  job_title: string;
  employer_name: string;
  employer_logo?: string;
  employer_website?: string;
  job_publisher?: string;
  job_employment_type: string;
  job_apply_link: string;
  job_description: string;
  job_posted_at: string;
  job_posted_at_datetime_utc?: string;
  job_location: string;
  job_highlights?: JobHighlights;
}

export type Stats = {
  id: string; // UUID of the Statistics record
  user: string; // UUID of the associated user
  jobs_visited: number; // Number of jobs visited
};
