import { db } from "@vercel/postgres";

const client = await db.connect();

async function seedUsers() {
  try {
    await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        image_url VARCHAR(255) NOT NULL DEFAULT '/default',
        password TEXT NOT NULL
      );
    `;

    console.log("Users table created");
  } catch (error) {
    console.log("An error was detected", error);
  } finally {
    console.log("Closing the connection");
    client.end();
  }
}

await seedUsers();
