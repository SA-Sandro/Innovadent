import { z } from "zod";
import { CredentialsType, ObjectFormData } from "./definitions";
import { getBookedHourByDate } from "./data";
import { ACCEPTED_FILE_TYPES, MAX_UPLOAD_SIZE, REGEX } from "./constants";

export const getParsedCredentials = (data: CredentialsType) => {
  const parsedCredentials = z
    .object({ email: z.string().email(), password: z.string().min(6) })
    .safeParse(data);

  return parsedCredentials;
};

export const getParsedUsername = (username: string) => {
  const usernameSchema = z
    .string()
    .min(5, {
      message: "El nombre de usuario debe de tener 5 caracteres como mínimo. ",
    })
    .max(20, {
      message: "El nombre de usuario debe de tener como máximo 20 caracteres. ",
    });

  return usernameSchema.safeParse(username);
};

export const getParsedEmail = (numberRows: number, currentEmail: string) => {
  const mySchema = z
    .string()
    .email({ message: "Formato inválido. " })
    .refine((email) => numberRows === 0 || email === "", {
      message: "Este email ya existe. ",
    });

  return mySchema.safeParse(currentEmail);
};

export const getParsedPassword = (password: string) => {
  const passwordSchema = z
    .string()
    .min(5, { message: "La contraseña debe de tener al menos 5 caracteres. " })
    .max(15, {
      message: "La contraseña debe de tener como máximo 15 caracteres. ",
    })
    .regex(REGEX, {
      message:
        "La contraseña debe de tener al menos: 1 dígito, una mayúscula y una minúscula.  ",
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
      message: "Las contraseñas no coinciden",
    });

  return confirmPasswordSchema.safeParse(confirmPassword);
};

export const getParsedPhoto = (file: File) => {
  const photoSchema = z
    .instanceof(File)
    .refine((f) => {
      return ACCEPTED_FILE_TYPES.includes(f.type);
    }, "La extensión del archivo es inválida. ")
    .refine((f) => {
      return f.size <= MAX_UPLOAD_SIZE;
    }, "La imagen debe de pesar menos de 3Mb. ");

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

type UpdateData = {
  date: Date;
  hour: string | undefined;
  state: string;
};

export const getParsedAppointmentToUpdate = async (
  data: UpdateData,
  hour?: string
) => {
  const formattedDate = new Date(data.date);
  const bookedHours = await getBookedHourByDate(new Date(formattedDate));

  let updateDataSchema;
  if (data.hour === hour) {
    updateDataSchema = z.object({
      date: z.date().refine((date) => date > new Date(), {
        message: "La fecha elegida debe ser mayor a la actual",
      }),
      hour: z.string(),
      state: z.string(),
    });
  } else {
    updateDataSchema = z.object({
      date: z.date().refine((date) => date > new Date(), {
        message: "La fecha elegida debe ser mayor a la actual",
      }),
      hour: z.string().refine((hour) => !bookedHours?.includes(hour), {
        message: "Esta hora ya está reservada",
      }),
      state: z.string(),
    });
  }

  return updateDataSchema.safeParse(data);
};
