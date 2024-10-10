"use server";

import {
  appointmentStateType,
  CredentialsType,
  defaultSession,
  SessionData,
  stateType,
} from "@/lib/definitions";
import { sessionOptions } from "@/lib/definitions";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { getParsedAppointmentData, getParsedCredentials } from "./schemas";
import { getUser, postAppointment } from "./data";

export async function getSession() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }
  return session;
}

export async function getPlainObject() {
  const session = await getSession();
  return {
    userId: session.userId,
    userName: session.userName,
    email: session.email,
    role: session.role,
    isLoggedIn: session.isLoggedIn,
    image_url: session.image_url,
  } as SessionData;
}

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

  const session = await getSession();
  const parsedCredentials = getParsedCredentials(data);

  if (parsedCredentials.success) {
    const { email, password } = parsedCredentials.data;
    const user = await getUser(email);
    if (!user) return { session: null, error: "Credenciales incorrectas" };

    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (passwordsMatch) {
      session.userId = user.id;
      session.userName = user.username;
      session.email = user.email;
      session.role = user.role;
      session.isLoggedIn = true;
      session.image_url = user.image_url;
      await session.save();

      const plainObject = await getPlainObject();

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

  const parsedData = getParsedAppointmentData(objectFormData);

  if (!parsedData.success) {
    return {
      error: {
        date: parsedData.error.formErrors.fieldErrors.date,
        hour: parsedData.error.formErrors.fieldErrors.hour,
        reason: parsedData.error.formErrors.fieldErrors.motive,
      },
    };
  }

  const session = await getSession();
  console.log(session);
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
  };
}
