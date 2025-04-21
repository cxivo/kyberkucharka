import pgPromise from 'pg-promise';
import dotenv from "dotenv";
import {
  Ingredient,
  NONEXISTENT,
  PartialRecipe,
  Recipe,
  Section,
  UsedIngredient,
  User,
} from "../../common-interfaces/interfaces";
import { ingredients, recipes, users } from "./dummyData";
import { readFileSync } from "fs";
import bcrypt from "bcryptjs";

dotenv.config();

const pgp = pgPromise({
  /* Initialization Options */
});

export const db = pgp(process.env.DB_URL ?? "");

export async function printAllUsers() {
  db.any("SELECT * FROM users;").then((x) => console.log(x));
}

// ingredients

export async function getIngredients(): Promise<Ingredient[]> {
  const query = `SELECT * FROM ingredients;`;
  const result = await db.any(query);
  return result;
}

export async function getIngredientsByName(
  name: string
): Promise<Ingredient[]> {
  const query = `SELECT * FROM ingredients WHERE name LIKE $1 OR alt_names LIKE $1;`;
  const result = await db.any(query, [`%${name}%`]);
  return result;
}

export async function getIngredientByID(id: number): Promise<Ingredient> {
  const query = "SELECT * FROM ingredients WHERE id = $1;";
  const result = await db.one(query, [id]);
  return result;
}

export async function addIngredient(ingredient: Ingredient): Promise<number> {
  // this is ugly as hell, might revisit it later (likely won't)
  const i2 = { ...ingredient };
  i2.density ??= undefined;
  i2.mass_per_piece ??= undefined;
  i2.created_by ??= undefined;

  const query = `INSERT INTO ingredients(name, primary_unit, density, mass_per_piece, alt_names, verified, created_on, created_by) 
    VALUES ($<name>, $<primary_unit>, $<density>, $<mass_per_piece>, $<alt_names>, $<verified>, NOW(), $<created_by>)
    RETURNING id;`;
  return db.one(query, i2);
}

export async function modifyIngredient(ingredient: Ingredient) {
  const i2 = { ...ingredient };
  i2.density ??= undefined;
  i2.mass_per_piece ??= undefined;
  i2.created_by ??= undefined;

  const query = `UPDATE ingredients
  SET name = $<name>, 
    primary_unit = $<primary_unit>, 
    density = $<density>, 
    mass_per_piece = $<mass_per_piece>, 
    alt_names = $<alt_names>, 
    verified = $<verified>
  WHERE id = $<id>
  RETURNING id;`;

  db.one(query, i2);
}

export async function deleteIngredient(id: number) {
  const query = `DELETE FROM ingredients
    WHERE id = $1;`;
  db.none(query, [id]);
}

export async function deleteIngredientAndRecipes(id: number) {
  const query = `DELETE FROM recipes
    WHERE EXISTS 
    (
      SELECT 1 FROM sections
      WHERE sections.recipe = recipes.id 
      AND EXISTS
      (
        SELECT 1 FROM used_ingredients
        WHERE used_ingredients.section = sections.id
        AND used_ingredients.ingredient = $1
      )
    );`;
  db.none(query, [id]).then(() => deleteIngredient(id));
}

// recipes

const getPartialRecipeQuery = `SELECT 
id, 
title, 
description, 
image_link, 
json_build_object(
  'username', u.username,
  'display_name', u.display_name,
  'registered_on', u.registered_on,
  'is_admin', u.is_admin
) AS author
FROM recipes AS r
JOIN users AS u 
ON r.author = u.username`;

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
  (
    SELECT row_to_json(z) FROM
    (
      SELECT 
      r2.id, 
      r2.title, 
      r2.description, 
      r2.image_link,
      json_build_object(
        'username', u2.username,
        'display_name', u2.display_name,
        'registered_on', u2.registered_on,
        'is_admin', u2.is_admin  
      ) AS author
      FROM recipes AS r2
      JOIN users AS u2 ON r2.author = u2.username
      WHERE r2.id = r.forked_from
    ) z
  ) AS forked_from,
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

export async function getPartialRecipes(): Promise<PartialRecipe[]> {
  const query = getPartialRecipeQuery + ` ORDER BY r.created_on DESC;`;
  return db.any(query);
}

export async function getPartialRecipesByUser(
  username: string
): Promise<PartialRecipe[]> {
  const query =
    getPartialRecipeQuery +
    ` WHERE u.username = $1
    ORDER BY r.created_on DESC;`;
  return db.any(query, [username]);
}

function fixMissingRecipeTags(recipe: Recipe): Recipe {
  recipe.sections ??= [];
  recipe.sections.map((section: Section) => {
    const s2 = { ...section };
    s2.used_ingredients ??= [];
    return s2;
  });
  return recipe;
}

export async function getPartialRecipeByID(id: number): Promise<PartialRecipe> {
  const query = getPartialRecipeQuery + ` WHERE r.id = $1;`;
  return db.one(query, [id]);
}

export async function getRecipeByID(id: number): Promise<Recipe> {
  const query = getRecipeQuery + `WHERE r.id = $1;`;
  return db.one(query, [id]).then(fixMissingRecipeTags);
}

export async function getRecipesByName(name: string): Promise<Recipe[]> {
  const query = getRecipeQuery + ` WHERE r.title LIKE $1;`;
  return db
    .any(query, [`%${name}%`])
    .then((rs) => rs.map(fixMissingRecipeTags));
}

// TODO add recipe validation... maybe using zod
// this works both for adding a new recipe and forking an existing one
export async function addOrUpdateRecipe(
  recipe: Recipe,
  id?: number
): Promise<number> {
  let db_recipe_id: number = -1;
  // use a transaction, so it either all succeeds or all fails
  return await db
    .tx(async (transaction) => {
      // prepare the JS object for the database (still not sure if needed)
      const r2: any = { ...recipe };
      r2.description ??= undefined;
      r2.image_link ??= undefined;
      r2.author_username = r2.author.username;
      r2.forked_from_id =
        r2.forked_from == null ? undefined : r2.forked_from.id;

      // if id is set, then we need to remove the previous recipe
      // also remembers the date of the original creation
      const original_creation: string =
        id == null
          ? undefined
          : (
              await transaction.one(
                `DELETE FROM recipes WHERE id = $1 RETURNING created_on;`,
                [id]
              )
            ).created_on
              .toISOString()
              .slice(0, 19)
              .replace("T", " ");

      // add into the recipe table and get the ID
      db_recipe_id = (
        await transaction.one(
          `INSERT INTO recipes(${
            id == null ? "" : "id, "
          }title, author, created_on, forked_from, description, image_link, preparation_time, instructions)
          VALUES (${id == null ? "" : "$<id>, "}$<title>, $<author_username>, ${
            id == null ? "NOW()" : `'${original_creation}'`
          }, $<forked_from_id>, $<description>, $<image_link>, $<preparation_time>, $<instructions>)
          RETURNING id; `,
          r2
        )
      ).id;

      // add each section of the recipe and its used_ingredients
      await Promise.all(
        recipe.sections.map(async (section: Section, i: number) => {
          const db_section_id = await transaction.one(
            `INSERT INTO sections(name, recipe, ordering)
          VALUES ($1, $2, $3)
          RETURNING id; `,
            [section.name, db_recipe_id, i]
          );

          await Promise.all(
            section.used_ingredients.map(
              async (used_ingredient: UsedIngredient) => {
                let ingredient_id = used_ingredient.ingredient.id;

                // add the ingredient if it was newly created
                if (used_ingredient.ingredient.id === NONEXISTENT) {
                  const newIngredient: Ingredient = {
                    ...used_ingredient.ingredient,
                  };
                  newIngredient.density ??= undefined;
                  newIngredient.mass_per_piece ??= undefined;
                  newIngredient.created_by = recipe.author.username;

                  ingredient_id = (
                    await transaction.one(
                      `INSERT INTO ingredients(name, primary_unit, density, mass_per_piece, alt_names, created_on, created_by)
                VALUES ($<name>, $<primary_unit>, $<density>, $<mass_per_piece>, $<alt_names>, NOW(), $<created_by>) 
                RETURNING id;`,
                      newIngredient
                    )
                  ).id;
                }

                return transaction.none(
                  `INSERT INTO used_ingredients(ingredient, section, amount)
            VALUES ($1, $2, $3);`,
                  [ingredient_id, db_section_id.id, used_ingredient.amount]
                );
              }
            )
          );
        })
      );

      // I have no idea why this works, but it does and I'm scared

      //return transaction.batch(queries);
    })
    .then(() => {
      console.log(`Modified recipe with id ${db_recipe_id}`);
      return db_recipe_id;
    })
    .catch((e) => {
      //console.error(e instanceof Error ? e.stack : `Unknown problem: ${e}`);
      return -1;
    });
}

// deletes a recipe if the person who wants to delete it is the author or an admin
export async function deleteRecipe(id: number, deleterUsername: string) {
  const query = `DELETE FROM recipes
    WHERE id = $1 
    AND 
    (
      recipes.author = $2
      OR 
      EXISTS (SELECT 1 FROM users WHERE is_admin = true AND username = $2)
    )
    RETURNING id;`;
  db.one(query, [id, deleterUsername]);
}

// users
export async function addUser(user: User): Promise<User> {
  // TODO maybe move this somewhere else?
  const hash = bcrypt.hashSync(user.password ?? "");
  user.password = hash;

  const query = `INSERT INTO users(username, display_name, password, registered_on)
    VALUES ($<username>, $<display_name>, $<password>, NOW()) RETURNING username, display_name, registered_on, is_admin;`;
  return db.one(query, user);
}

export async function checkUser(user: User): Promise<User | undefined> {
  const query = `SELECT * FROM users WHERE username = $<username>`;
  const queryResult = await db.oneOrNone(query, user);

  // no user with this name
  if (queryResult == null) {
    return undefined;
  }

  if (bcrypt.compareSync(user.password ?? "", queryResult.password)) {
    queryResult.password = undefined; // delete the password before giving the object to anyone
    return queryResult;
  }

  // password incorrect
  return undefined;
}

export async function usernameExists(name: string): Promise<boolean> {
  const query = `SELECT * FROM users WHERE username = $1;`;
  if ((await db.oneOrNone(query, name)) == null) {
    return false;
  } else {
    return true;
  }
}

export async function getUsers(): Promise<User[]> {
  return await db.any(`SELECT username, display_name, registered_on, is_admin 
    FROM users
    ORDER BY username ASC;`);
}

export async function getUserByUsername(
  username: string
): Promise<User | null> {
  return await db.oneOrNone(
    `SELECT username, display_name, registered_on, is_admin 
    FROM users
    WHERE username = $1;`,
    [username]
  );
}

export async function deleteUser(username: string) {
  const query = `DELETE FROM users WHERE username = $1 RETURNING username;`;
  return db.one(query, username);
}

export async function toggleAdminForUser(
  username: string,
  should_be_admin: boolean
) {
  const query = `UPDATE users SET is_admin = $2 WHERE username = $1 RETURNING username;`;
  return db.one(query, [username, should_be_admin]);
}

// init

export async function initTables() {
  const ingredientsPromises = ingredients.map((i) => addIngredient(i));
  const usersPromises: Promise<any>[] = users.map((u) => addUser(u));

  await Promise.all(ingredientsPromises.concat(usersPromises))
    .then(() => {
      console.log("Rows inserted successfully!");
    })
    .catch((e) => {
      console.error(e instanceof Error ? e.stack : `Unknown problem: ${e}`);
    });

  const recipePromises = recipes.map((r) => addOrUpdateRecipe(r));
  await Promise.all(recipePromises)
    .then(() => {
      console.log("Rows inserted successfully!");
    })
    .catch((e) => {
      console.error(e instanceof Error ? e.stack : `Unknown problem: ${e}`);
    });

  // give admin powers to the, well, admin
  await db.none("UPDATE users SET is_admin = true WHERE username = 'admin';");
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