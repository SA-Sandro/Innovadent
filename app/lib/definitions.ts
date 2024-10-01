import NextAuth, { DefaultSession } from "next-auth";

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

export type User = {
  id: string;
  email: string;
  password: string;
  role: string;
};

declare module "next-auth" {
  interface Session {
    user: {
      role: string;
    };
  }

  interface User {
    role: string;
  }
}
