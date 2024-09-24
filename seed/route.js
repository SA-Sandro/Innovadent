import { db } from "@vercel/postgres";

const client = await db.connect();

async function seedUsers() {
  try {
    await client.sql`
    CREATE TYPE user_role AS ENUM ('user', 'admin');
    `;

    await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        image_url VARCHAR(255) NOT NULL,
        role user_role DEFAULT 'user'
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
