import { SessionOptions } from "iron-session";

export type CustomerData = {
  username: string;
  email: string;
  password: string;
  image_url: string;
};

export type FormFieldProps = {
  errors: ErrorState;
  setErrors: React.Dispatch<React.SetStateAction<ErrorState>>;
};

export type ErrorState = {
  userErrors: string[];
  passwordErrors: string[];
  confirmPasswordErrors: string[];
  emailErrors: string[];
  imageErrors: string[];
};

export type EyeIconProps = {
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
};

export type AsideProps = {
  burguerIsClicked: boolean;
};

export type stateType = {
  error: string | undefined;
};

export type FileName = {
  fileName: string;
};

export interface SessionData {
  userId?: string;
  email?: string;
  image_url?: string;
  isLoggedIn: boolean | undefined;
  role?: string;
}

export const defaultSession: SessionData = {
  isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET!,
  cookieName: "lama-session",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  },
};

export type User = {
  id: string;
  email: string;
  password: string;
  image_url: string;
  role: string;
};

export interface SessionContextProps {
  session: SessionData | undefined;
  setSession: (session: SessionData) => void;
}
