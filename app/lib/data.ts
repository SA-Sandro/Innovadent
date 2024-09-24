import { sql } from "@vercel/postgres";

export async function userRegistration(
  username: string,
  email: string,
  password: string,
  image_url: string
) {
  try {
    const result =
      await sql`INSERT INTO users (username, email, password, image_url)
    VALUES (${username}, ${email}, ${password}, ${image_url})`;
    return result;
  } catch (error) {
    console.error("Error registering user: ", error);
    throw new Error("Error registering user:");
  }
}
