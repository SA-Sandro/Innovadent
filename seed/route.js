import { db } from "@vercel/postgres";

const client = await db.connect();

async function createTables() {
  try {
    await client.sql`
      DO $$
      BEGIN
        CREATE TYPE user_role AS ENUM ('user', 'admin');
      EXCEPTION
        WHEN duplicate_object THEN
          RAISE NOTICE 'El tipo ya existe, no se crea uno nuevo.';
      END $$;
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

    await client.sql`
      CREATE TABLE IF NOT EXISTS appointments (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_email TEXT NOT NULL UNIQUE,
        appointment_reason TEXT NOT NULL,
        date DATE NOT NULL,
        hour TIME NOT NULL
      );
    `;

    console.log("Tables were created");
  } catch (error) {
    console.log("An error was detected", error);
  } finally {
    console.log("Closing the connection");
    client.end();
  }
}

await createTables();
