import { SessionData, User } from "@/lib/definitions";
import { defaultSession, sessionOptions } from "@/lib/definitions";
import { sql } from "@vercel/postgres";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import bcrypt from "bcryptjs";

export async function getSession() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }
  return session;
}

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user =
      await sql<User>`SELECT id, email, password, role FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export async function login(formData: FormData) {
  const session = await getSession();

  const parsedCredentials = z
    .object({ email: z.string().email(), password: z.string().min(6) })
    .safeParse(formData);

  if (parsedCredentials.success) {
    const { email, password } = parsedCredentials.data;
    const user = await getUser(email);
    if (!user) return { error: "Credenciales incorrectas" };

    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (passwordsMatch) {
      session.userId = user.id;
      session.email = user.email;
      session.role = user.role;
      session.isLoggedIn = true;

      await session.save();
      redirect("/");
    }
  }

  return { error: "Algunos de los campos es incorrecto" };
}
