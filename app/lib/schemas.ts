import { z } from "zod";
import { CredentialsType, ObjectFormData } from "./definitions";
import { getBookedHourByDate } from "./data";

const ACCEPTED_FILE_TYPES = [
  "image/png",
  "image/jpg",
  "image/jpeg",
  "image/webp",
];
const MAX_UPLOAD_SIZE = 1024 * 1024 * 3;
const REGEX = new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)[A-Za-z\\d]{5,20}$");

export const getParsedCredentials = (data: CredentialsType) => {
  const parsedCredentials = z
    .object({ email: z.string().email(), password: z.string().min(6) })
    .safeParse(data);

  return parsedCredentials;
};

export const getParsedUsername = (username: string) => {
  const usernameSchema = z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(20, { message: "Username must not exceed 20 characters long" });

  return usernameSchema.safeParse(username);
};

export const getParsedEmail = (numberRows: number, currentEmail: string) => {
  const mySchema = z
    .string()
    .email({ message: "Formato inválido. " })
    .refine(() => numberRows === 0, {
      message: "Este email ya existe. ",
    });

  return mySchema.safeParse(currentEmail);
};

export const getParsedPassword = (password: string) => {
  const passwordSchema = z
    .string()
    .min(5, { message: "Password must be at least 5 characters long. " })
    .max(15, { message: "Password must be at most 15 characters long. " })
    .regex(REGEX, {
      message:
        "Password should contain at least one digit, one uppercase and one lowercase. ",
    });

  return passwordSchema.safeParse(password);
};

export const getParsedConfirmPassword = (
  confirmPassword: string,
  firstInputPassword: string
) => {
  const confirmPasswordSchema = z
    .string()
    .refine((confirmPassword) => confirmPassword === firstInputPassword, {
      message: "Passwords do not match",
    });

  return confirmPasswordSchema.safeParse(confirmPassword);
};

export const getParsedPhoto = (file: File) => {
  const photoSchema = z
    .instanceof(File)
    .refine((f) => {
      return ACCEPTED_FILE_TYPES.includes(f.type);
    }, "Invalid extension. ")
    .refine((f) => {
      return f.size <= MAX_UPLOAD_SIZE;
    }, "File size must be less than 3MB. ");

  return photoSchema.safeParse(file);
};

export const getParsedAppointmentData = async (formData: ObjectFormData) => {
  const bookedHours = await getBookedHourByDate(formData.date);

  const formDataSchema = z.object({
    motive: z
      .string()
      .max(300, "El texto no debe de superar los 300 caracteres")
      .min(1, { message: "Este campo es requerido" }),
    date: z
      .date()
      .refine((date) => date !== undefined, {
        message: "Este campo es requerido",
      })
      .refine((date) => date > new Date(), {
        message: "La fecha elegida debe de ser mayor a la actual",
      }),
    hour: z
      .string()
      .min(1, { message: "Este campo es requerido" })
      .max(100, { message: "Este campo excede los 100 caracteres" })
      .refine((hour) => !bookedHours?.includes(hour), {
        message: "Esta hora ya está reservada",
      }),
  });
  return formDataSchema.safeParse(formData);
};
