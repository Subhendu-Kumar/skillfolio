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
