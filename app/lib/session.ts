"use server";

import { getIronSession } from "iron-session";
import {
  defaultSession,
  SessionData,
  sessionOptions,
  User,
} from "./definitions";
import { cookies } from "next/headers";

export default async function getSession() {
  const cookieStore = cookies();
  const session = await getIronSession<SessionData>(
    cookieStore,
    sessionOptions
  );

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }
  return session;
}

export async function getPlainSession() {
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

export const saveSession = async (user: User) => {
  const session = await getSession();
  try {
    session.userName = user.username;
    session.email = user.email;
    session.role = user.role ? user.role : "user";
    session.isLoggedIn = true;
    session.image_url = user.image_url;
    try {
      await session.save();
    } catch (error) {
      console.error("Error en el save: ", error);
    }
  } catch (error) {
    console.error("Algo ha ocurrido: ", error);
  }
};
