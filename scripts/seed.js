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
          {
            ingredient_id: "c05bd390-55d3-4b42-9b79-48a7f03a5a80",
            amount: 250,
          },
          { ingredient_id: "85aec85e-bb69-4d26-9f49-316ed73f1e98", amount: 1 },
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
        ingredients: [
          {
            ingredient_id: "c05bd390-55d3-4b42-9b79-48a7f03a5a80",
            amount: 250,
          },
        ],
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
      id VARCHAR(64) PRIMARY KEY,
      name VARCHAR(64) NOT NULL,
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
    await client.sql`DROP TABLE recipes;`;
    await client.sql`DROP TABLE sections;`;
    await client.sql`DROP TABLE section_ingredients;`;

    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "recipes" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS recipes (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name TEXT NOT NULL,
      creator VARCHAR(64) NOT NULL,
      fork UUID,
      text TEXT NOT NULL,
      created TIMESTAMP NOT NULL,
      preparation_time INT,
      cook_time INT,
      rest_time INT,
      difficulty INT,
      constraint foreign_key_creator
        foreign key(creator)
          references users(id),
      constraint foreign_key_fork
        foreign key(fork)
          references recipes(id)
    );
    `;

    const createTable2 = await client.sql`
      CREATE TABLE IF NOT EXISTS sections (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        recipe UUID NOT NULL,
        name TEXT,
        index INTEGER,
        constraint foreign_key_recipe
          foreign key(recipe)
            references recipes(id)
      );
    `;

    const createTable3 = await client.sql`
      CREATE TABLE IF NOT EXISTS section_ingredients (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        section UUID NOT NULL,
        ingredient UUID NOT NULL,
        amount REAL,
        constraint foreign_key_section
          foreign key(section)
            references sections(id),
        constraint foreign_key_ingredient
          foreign key(ingredient)
            references ingredients(id)
      );
    `;

    /*
    CONSTRAINT valid_user
          FOREIGN KEY(creator) 
            REFERENCES users(id)
     */

    console.log(`Created all the neccessary tables`);

    // Insert data into the "recipes" table
    const insertedRecipes = await Promise.all(
      recipes.map(async (recipe) => {
        /*
        console.log(`
        WITH recipe_id AS 
          (INSERT INTO recipes (name, creator, fork, text, created, preparation_time)
          VALUES ('${recipe.name}', '${recipe.creator}', '${recipe.fork}', '${
          recipe.text
        }', NOW(), ${recipe.preparation_time})
          RETURNING id), 
          ${recipe.sections
            .map(
              (section) =>
                "section_" +
                section.index +
                " AS (INSERT INTO sections (recipe, name, index) VALUES (recipe_id.id, " +
                section.name +
                ", " +
                section.index +
                ") RETURNING id)"
            )
            .join(", ")} 
          INSERT INTO section_ingredients (section, ingredient, amount) 
            VALUES ${recipe.sections
              .map((section) =>
                section.ingredients
                  .map(
                    (ingredient) =>
                      "(section_" +
                      section.index +
                      ".id, '" +
                      ingredient.ingredient_id +
                      "', " +
                      ingredient.amount +
                      ")"
                  )
                  .join(", ")
              )
              .join(", ")};`);
*/
        return client.sql`
        INSERT INTO recipes (name, creator, fork, text, created, preparation_time)
          VALUES (${recipe.name}, ${recipe.creator}, ${recipe.fork}, ${recipe.text}, NOW(), ${recipe.preparation_time})
          RETURNING id;`;
      })
    );

    const insertedSections = await Promise.all(
      recipes.map(async (recipe, index) => {
        return Promise.all(
          recipe.sections.map(async (section, index2) => {
            return client.sql`
            INSERT INTO sections (recipe, name, index) 
            VALUES (${insertedRecipes[index].rows[0].id}, ${recipe.sections[index2].title}, ${recipe.sections[index2].index})
            RETURNING id;`;
          })
        );
      })
    );

    const insertedIngredients = await Promise.all(
      recipes.map(async (recipe, index) => {
        return Promise.all(
          recipe.sections.map(async (section, index2) => {
            return Promise.all(
              section.ingredients.map(
                async (ing, index3) => client.sql`
              INSERT INTO section_ingredients (section, ingredient, amount) 
              VALUES (${insertedSections[index][index2].rows[0].id}, 
                ${section.ingredients[index3].ingredient_id}, 
                ${section.ingredients[index3].amount});`
              )
            );
          })
        );
      })
    );

    console.log(`Seeded ${insertedRecipes.length} recipes`);
    console.log(insertedSections[0][0].rows[0].id);

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
        creator VARCHAR(64) NOT NULL,
        approved BOOLEAN NOT NULL,
        vegetarian BOOLEAN NOT NULL,
        vegan BOOLEAN NOT NULL,
        constraint foreign_key_creator
          foreign key(creator)
            references users(id)
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

  //await seedUsers(client);
  //await seedIngredients(client);
  await seedRecipes(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});
