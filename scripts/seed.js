const { db } = require("@vercel/postgres");
const bcrypt = require("bcrypt");

const users = [
  {
    username: "admin",
    name: "admin",
    password: "admin",
    admin: true,
  },
  {
    username: "cxivo",
    name: "ĉivo",
    password: "heslo",
    admin: true,
  },
];

const ingredients = [
  {
    name: "mlieko",
    primary_unit: "ml",
    mass_per_piece: 0,
    density: 1.0,
    alt: "polotučné mlieko",
    creator: "7a0b2f07-2192-420f-9f64-d052c7c8e5fd",
    approved: true,
    vegetarian: true,
    vegan: false,
  },
  {
    name: "rožok",
    primary_unit: "ml",
    mass_per_piece: 40,
    density: 1.0, // netreba
    alt: "rohlík",
    creator: "7a0b2f07-2192-420f-9f64-d052c7c8e5fd",
    approved: true,
    vegetarian: true,
    vegan: false, // vraj fakt! zdroj: https://zena-in.cz/clanek/ktere-potraviny-nejsou-veganske-a-mozna-jste-to-netusili
  },
];

const recipes = [
  {
    name: "Mlieko s rožkom",
    creator: "57820ff3-8fe8-4641-814f-86c7a5ad54fe",
    fork: null,
    text: "Rožok potrháme na kusy a vložíme do misky s mliekom.",
    preparation_time: 2,
    cook_time: 0,
    rest_time: 0,
    difficulty: 0,
    sections: [
      {
        title: "všetko",
        index: 0,
        ingredients: [
          { ingredient_id: "TODO", amount: 250 },
          { ingredient_id: "TODO", amount: 1 },
        ],
      },
    ],
  },
  {
    name: "Mlieko bez rožka",
    creator: "57820ff3-8fe8-4641-814f-86c7a5ad54fe",
    fork: null,
    text: "Predstavíme si ako chutí rožok, potom vypijeme pohár mlieka.",
    preparation_time: 1,
    cook_time: 0,
    rest_time: 3,
    difficulty: 0,
    sections: [
      {
        title: "MLJEKO!",
        index: 0,
        ingredients: [{ ingredient_id: "TODO", amount: 250 }],
      },
    ],
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
        INSERT INTO users (username, name, password, created, admin)
        VALUES (${user.username}, ${user.name}, ${hashedPassword}, NOW() , ${user.admin})
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

async function seedRecipes(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "recipes" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS recipes (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name TEXT NOT NULL,
        creator UUID NOT NULL,
        fork UUID,
        text TEXT NOT NULL,
        created TIMESTAMP NOT NULL,
        preparation_time INT,
        cook_time INT,
        rest_time INT,
        difficulty INT
      );
    `;

    const createTable2 = await client.sql`
      CREATE TABLE IF NOT EXISTS sections (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        recipe UUID NOT NULL,
        name TEXT,
        index INTEGER
      );
    `;

    const createTable3 = await client.sql`
      CREATE TABLE IF NOT EXISTS section_ingredients (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        section UUID NOT NULL,
        ingredient UUID NOT NULL,
        amount REAL
      );
    `;

    /*
    CONSTRAINT valid_user
          FOREIGN KEY(creator) 
            REFERENCES users(id)
     */

    console.log(`Created "recipes" table`);

    // Insert data into the "recipes" table
    const insertedRecipes = await Promise.all(
      recipes.map(async (recipe) => {
        return client.sql`
        INSERT INTO recipes (name, creator, fork, text, created, preparation_time)
        VALUES (${recipe.name}, ${recipe.creator}, ${recipe.fork}, ${recipe.text}, NOW(), ${recipe.preparation_time})
        RETURNING id;
      `;
      })
    );

    const insertedSections = await Promise.all(
      insertedRecipes.map(async (recipe, index) => {
        return client.sql`
        INSERT INTO recipes (name, creator, fork, text, created, preparation_time)
        VALUES (${recipe.name}, ${recipe.creator}, ${recipe.fork}, ${recipe.text}, NOW(), ${recipe.preparation_time})
        RETURNING id;
      `;
      })
    );

    console.log(`Seeded ${insertedRecipes.length} recipes`);
    console.log(insertedRecipes[0].rows[0].id);

    return {
      createTable,
      recipes: insertedRecipes,
    };
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
}

async function seedIngredients(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "ingredients" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS ingredients (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name TEXT NOT NULL,
        primary_unit TEXT NOT NULL,
        mass_per_piece REAL NOT NULL,
        density REAL NOT NULL,
        alt TEXT,
        creator UUID NOT NULL,
        approved BOOLEAN NOT NULL,
        vegetarian BOOLEAN NOT NULL,
        vegan BOOLEAN NOT NULL
      );
    `;

    console.log(`Created "ingredients" table`);

    // Insert data into the "ingredients" table
    const insertedIngredients = await Promise.all(
      ingredients.map(async (ingredient) => {
        return client.sql`
        INSERT INTO ingredients (name, primary_unit, mass_per_piece, density, alt, creator, approved, vegetarian, vegan)
        VALUES (${ingredient.name}, ${ingredient.primary_unit},${ingredient.mass_per_piece},
          ${ingredient.density},${ingredient.alt},${ingredient.creator},${ingredient.approved},
          ${ingredient.vegetarian},${ingredient.vegan})
        ON CONFLICT (id) DO NOTHING;
      `;
      })
    );

    console.log(`Seeded ${insertedIngredients.length} ingredients`);

    return {
      createTable,
      ingredients: insertedIngredients,
    };
  } catch (error) {
    console.error("Error seeding ingredients:", error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await seedRecipes(client);
  await seedIngredients(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});
