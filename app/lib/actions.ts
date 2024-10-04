"use server";

import {
  defaultSession,
  SessionData,
  stateType,
  User,
} from "@/lib/definitions";
import { sessionOptions } from "@/lib/definitions";
import { sql } from "@vercel/postgres";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { z } from "zod";
import bcrypt from "bcryptjs";

export async function getSession() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }
  console.log(session)
  return session;
}

export async function logoutAction() {
  const session = await getSession();
  session.destroy();
}

export async function loginAction(
  prevState: stateType,
  formData: FormData
): Promise<{ session: SessionData | null; error?: string }> {
  
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const session = await getSession();
  const parsedCredentials = z
    .object({ email: z.string().email(), password: z.string().min(6) })
    .safeParse(data);

  if (parsedCredentials.success) {
    const { email, password } = parsedCredentials.data;
    const user = await getUser(email);
    if (!user) return { session: null, error: "Credenciales incorrectas" };

    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (passwordsMatch) {
      session.userId = user.id;
      session.email = user.email;
      session.role = user.role;
      session.isLoggedIn = true;
      session.image_url = user.image_url;
      await session.save();
      return { session };
    }
  }

  return { session: null, error: "El usuario o la contraseña es incorrecto" };
}

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user =
      await sql<User>`SELECT id, email, image_url, password, role FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}
