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

export type CredentialsType = {
  email: string;
  password: string;
};

export type appointmentStateType = {
  error: {
    reason?: string[] | undefined;
    date?: string[] | undefined;
    hour?: string[] | undefined;
  };
  isSuccess?: boolean;
  appointmentDate?: string;
};

export type FileName = {
  fileName: string;
};

export interface SessionData {
  userId?: string;
  userName?: string;
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
  username: string;
  email: string;
  password: string;
  image_url: string;
  role: string;
};

export interface SessionContextProps {
  session: SessionData | undefined;
  setSession: (session: SessionData) => void;
}

export const initialState: stateType = {
  error: "",
};

export const appointmentInitialState: appointmentStateType = {
  error: {
    reason: [],
    date: [],
    hour: [],
  },
};

export type ObjectFormData = {
  motive: string;
  date: Date;
  hour: string;
};

export type AppointmentRows = {
  rows: Array<AppointmentData>;
  rowCount: number;
};

export type AppointmentData = {
  id?: string;
  username?: string;
  user_email?: string;
  image_url?: string;
  appointment_reason?: string;
  date?: Date;
  hour?: string;
  state?: string;
};

export type APIResponseFile = {
  url: string;
};
