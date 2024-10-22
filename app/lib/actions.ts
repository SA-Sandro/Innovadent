"use server";

import {
  appointmentStateType,
  CredentialsType,
  SessionData,
  stateType,
} from "@/lib/definitions";
import bcrypt from "bcryptjs";
import { getParsedAppointmentData, getParsedCredentials } from "./schemas";
import { getUser, postAppointment } from "./data";
import getSession, { getPlainSession, saveSession } from "./session";

export async function logoutAction() {
  const session = await getSession();
  session.destroy();
}

export async function loginAction(
  prevState: stateType,
  formData: FormData
): Promise<{ session: SessionData | null; error?: string }> {
  const data: CredentialsType = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const parsedCredentials = getParsedCredentials(data);

  if (parsedCredentials.success) {
    const { email, password } = parsedCredentials.data;
    const user = await getUser(email);
    if (!user) return { session: null, error: "Credenciales incorrectas" };

    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (passwordsMatch) {
      await saveSession(user);
      const plainObject = await getPlainSession();
      return {
        session: plainObject,
        error: undefined,
      };
    }
  }

  return { session: null, error: "El usuario o la contraseña es incorrecto" };
}

export async function createAppointment(
  prevState: appointmentStateType,
  formData: FormData
): Promise<appointmentStateType> {
  const objectFormData = {
    motive:
      formData.get("motive") === "Otros"
        ? (formData.get("other") as string)
        : (formData.get("motive") as string),
    date: new Date(formData.get("date") as string),
    hour: formData.get("hour") as string,
  };

  const parsedData = await getParsedAppointmentData(objectFormData);

  if (!parsedData.success) {
    return {
      error: {
        date: parsedData.error.formErrors.fieldErrors.date,
        hour: parsedData.error.formErrors.fieldErrors.hour,
        reason: parsedData.error.formErrors.fieldErrors.motive,
      },
      isSuccess: false,
    };
  }

  const session = await getSession();
  await postAppointment(
    session.email!,
    parsedData.data.motive,
    parsedData.data.date,
    parsedData.data.hour
  );

  return {
    error: {
      date: undefined,
      hour: undefined,
      reason: undefined,
    },
    isSuccess: true,
    appointmentDate: `${parsedData.data.date} | ${parsedData.data.hour}`,
  };
}
