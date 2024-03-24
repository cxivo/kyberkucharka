const { db } = require("@vercel/postgres");
const bcrypt = require("bcrypt");

const users = [
  {
    id: "410544b2-4001-4271-9855-fec4b6a6442a",
    username: "admin",
    name: "admin",
    password: "admin",
    admin: true,
  },
  {
    id: "510544b2-4001-4271-9855-fec4b6a6442a",
    username: "cxivo",
    name: "Cxivo",
    password: "heslo",
    admin: true,
  },
];

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        name TEXT NOT NULL,
        password TEXT NOT NULL,
        created TIMESTAMP NOT NULL,
        admin BOOLEAN NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (id, username, name, password, created, admin)
        VALUES (${user.id}, ${user.username}, ${user.name}, ${hashedPassword}, NOW() , ${user.admin})
        ON CONFLICT (id) DO NOTHING;
      `;
      })
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedUsers(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});
