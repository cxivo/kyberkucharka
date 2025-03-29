import pgPromise from 'pg-promise';
import dotenv from "dotenv";
import { Ingredient, Recipe, User } from "../../common-interfaces/interfaces";
import { ingredients, recipes, users } from "./dummyData";
import { readFileSync } from "fs";

dotenv.config();

const pgp = pgPromise({
  /* Initialization Options */
});

export const db = pgp(process.env.DB_URL ?? "");

export async function printAllUsers() {
  db.any("SELECT * FROM users;").then((x) => console.log(x));
}

// ingredients

export async function getIngredients() {
  const query = `SELECT * FROM ingredients;`;
  const result = await db.any(query);
  return result;
}

export async function getIngredientsByName(name: string) {
  const query = `SELECT * FROM ingredients WHERE name LIKE $1 OR alt_names LIKE $1;`;
  const result = await db.any(query, [`%${name}%`]);
  return result;
}

export async function getIngredientByID(id: number) {
  const query = "SELECT * FROM ingredients WHERE id = $1;";
  const result = await db.one(query, [id]);
  return result;
}

export async function addIngredient(ingredient: Ingredient) {
  // this is ugly as hell, might revisit it later (likely won't)
  const i2 = { ...ingredient };
  i2.density ??= undefined;
  i2.mass_per_piece ??= undefined;

  const query = `INSERT INTO ingredients(name, primary_unit, density, mass_per_piece, alt_names, verified) 
    VALUES ($<name>, $<primary_unit>, $<density>, $<mass_per_piece>, $<alt_names>, $<verified>)
    RETURNING id;`;
  return db.one(query, i2);
}

// recipes

export async function getPartialRecipes() {
  // returns a list of PartialRecipes... or does it? i dont know
  const query = `SELECT id, title, json_build_object(
      'username', u.username,
      'display_name', u.display_name,
      'registered_on', u.registered_on,
      'is_admin', u.is_admin
    ) AS author
    FROM recipes AS r
    JOIN users AS u 
    ON r.author = u.username;`;
  return db.any(query);
}

// query for getting a formatted JSON Recipe object
const getRecipeQuery = `
  SELECT 
  r.id,
  r.title, 
  json_build_object(
    'username', u.username,
    'display_name', u.display_name,
    'registered_on', u.registered_on,
    'is_admin', u.is_admin  
  ) AS author,
  r.created_on,
  r.description,
  r.image_link,
  r.preparation_time,
  r.instructions,
  (
    SELECT json_agg(
      (
        SELECT x FROM (
          SELECT s.id, s.name, s.ordering, json_agg(
            ( 
              SELECT y FROM (
                SELECT ui.id, ui.amount, row_to_json(
                  i
                ) AS ingredient
                FROM ingredients AS i
                WHERE ui.ingredient = i.id
              ) y
            )
          ) AS used_ingredients
          FROM used_ingredients AS ui
          WHERE ui.section = s.id
        ) x
      )
    )
    FROM sections AS s
    WHERE s.recipe = r.id
  ) AS sections
  FROM recipes AS r
  JOIN users AS u ON u.username = r.author
`;

export async function getRecipeByID(id: number): Promise<Recipe> {
  const query = getRecipeQuery + `WHERE r.id = $1;`;
  return db.one(query, [id]);
}

export async function getRecipesByName(name: string): Promise<Recipe[]> {
  const query = getRecipeQuery + `WHERE r.title LIKE $1;`;
  return db.any(query, [`%${name}%`]);
}

export async function addRecipe(recipe: Recipe) {
  // use a transaction, so it either all succeeds or all fails
  await db
    .tx(async (transaction) => {
      // prepare the JS object for the database (still not sure if needed)
      const r2: any = { ...recipe };
      r2.description ??= undefined;
      r2.forked_from ??= undefined;
      r2.image_link ??= undefined;
      r2.author_username = r2.author.username;

      // add into the recipe table and get the ID
      const db_recipe_id = await transaction.one(
        `INSERT INTO recipes(title, author, created_on, forked_from, description, image_link, preparation_time, instructions)
          VALUES ($<title>, $<author_username>, NOW(), $<forked_from>, $<description>, $<image_link>, $<preparation_time>, $<instructions>)
          RETURNING id; `,
        r2
      );

      // add each section of the recipe and its used_ingredients
      await Promise.all(
        recipe.sections.map(async (section, i) => {
          const db_section_id = await transaction.one(
            `INSERT INTO sections(name, recipe, ordering)
          VALUES ($1, $2, $3)
          RETURNING id; `,
            [section.name, db_recipe_id.id, i]
          );

          section.used_ingredients.map((used_ingredient) =>
            transaction.none(
              `INSERT INTO used_ingredients(ingredient, section, amount)
            VALUES ($1, $2, $3);`,
              [
                used_ingredient.ingredient.id,
                db_section_id.id,
                used_ingredient.amount,
              ]
            )
          );
        })
      );

      // I have no idea why this works, but it does and I'm scared

      //return transaction.batch(queries);
    })
    .then(() => {
      console.log("Row inserted successfully!");
    })
    .catch((e) => {
      console.error(e instanceof Error ? e.stack : `Unknown problem: ${e}`);
    });
}

// users
export async function addUser(user: User) {
  const query = `INSERT INTO users(username, display_name, registered_on)
    VALUES ($<username>, $<display_name>, NOW());`;
  return db.none(query, user);
}

// init

export async function initTables() {
  const ingredientsPromises = ingredients.map((i) => addIngredient(i));
  const usersPromises = users.map((u) => addUser(u));

  await Promise.all(ingredientsPromises.concat(usersPromises))
    .then(() => {
      console.log("Rows inserted successfully!");
    })
    .catch((e) => {
      console.error(e instanceof Error ? e.stack : `Unknown problem: ${e}`);
    });

  const recipePromises = recipes.map((r) => addRecipe(r));
  await Promise.all(recipePromises)
    .then(() => {
      console.log("Rows inserted successfully!");
    })
    .catch((e) => {
      console.error(e instanceof Error ? e.stack : `Unknown problem: ${e}`);
    });
}

export async function dropTables() {
  try {
    await db.none(readFileSync("./migrations/schema/dropTables.sql", "utf-8"));
  } catch (e) {
    console.error(e instanceof Error ? e.stack : `Unknown problem: ${e}`);
  }
}

export async function createTables() {
  try {
    await db.none(readFileSync("./migrations/schema/tables.sql", "utf-8"));
  } catch (e) {
    console.error(e instanceof Error ? e.stack : `Unknown problem: ${e}`);
  }
}