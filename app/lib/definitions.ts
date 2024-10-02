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

export type FileName = {
  fileName: string;
};

export interface SessionData {
  userId?: string;
  email?: string;
  img?: string;
  isLoggedIn: boolean;
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
