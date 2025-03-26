import pgPromise from 'pg-promise';
import dotenv from "dotenv";
import { Ingredient } from '../../common-interfaces/interfaces';
import { ingredients } from './dummyData';

dotenv.config();

const pgp = pgPromise({/* Initialization Options */});

export const db = pgp(process.env.DB_URL ?? "");

export async function printAllUsers() {
    db.any("SELECT * FROM users;").then(x => console.log(x));
}

// ingredients

export async function getIngredients() {
    const query = `SELECT * FROM ingredients;`;
    const result = await db.any(query);
    return result
}

export async function getIngredientsByName(name: string) {
    const query = `SELECT * FROM ingredients WHERE name LIKE $1 OR alt_names LIKE $1;`;
    const result = await db.any(query, [`%${name}%`]);
    return result
}

export async function getIngredientByID(id: number) {
    const query = 'SELECT * FROM ingredients WHERE id = $1;';
    const result = await db.one(query, [id]);
    return result;
}

export async function addIngredient(ingredient: Ingredient) {
    // this is ugly as hell, might revisit it later (likely won't)
    const i2 = {...ingredient};            
    i2.density ??= undefined;
    i2.mass_per_piece ??= undefined;

    const query = `INSERT INTO ingredients(name, primary_unit, density, mass_per_piece, alt_names, verified) 
    VALUES ($<name>, $<primary_unit>, $<density>, $<mass_per_piece>, $<alt_names>, $<verified>)
    RETURNING id;`;
    return db.one(query, i2);
}

// init

export async function initTables() {
    const ingredientsPromises = ingredients.map((i) => addIngredient(i));
    await Promise.all(ingredientsPromises)
    .then(() => {
        console.log('Rows inserted successfully!');
    }).catch((e)=>{
        console.error(e instanceof Error ? e.stack : `Unknown problem: ${e}`);
    });

    /*
    await db.tx(transaction => {
        // ingredients
        const queries = ingredients.map(ingredient => {
            const i2 = {...ingredient};            
            i2.density ??= undefined;
            i2.mass_per_piece ??= undefined;

            const query = `INSERT INTO ingredients(id, name, primary_unit, density, mass_per_piece, alt_names, verified) 
            VALUES ($<id>, $<name>, $<primary_unit>, $<density>, $<mass_per_piece>, $<alt_names>, $<verified>);`;
            return transaction.none(query, i2);
        });
        return transaction.batch(queries);
    }).then(() => {
        console.log('Row inserted successfully!');
    }).catch((e)=>{
        console.error(e instanceof Error ? e.stack : `Unknown problem: ${e}`);
    });
    */
}

export async function dropTables() {
    try {
        const dropTablesQuery = {
            text: `
                DROP TABLE IF EXISTS users;
                DROP TABLE IF EXISTS ingredients;    
            `
        };
        await db.none(dropTablesQuery);

    } catch (e) {
        console.error(e instanceof Error ? e.stack : `Unknown problem: ${e}`);
    }
}

export async function createTables () {
    try {
        const create_type_units = {
            text: `CREATE TYPE measurement_unit 
            AS ENUM ('gram', 'liter', 'piece', 'teaspoon');`
        };
        //await db.query(create_type_units);

        const create_users = {
            text: `CREATE TABLE IF NOT EXISTS users (
                username varchar(64) PRIMARY KEY,
                display_name varchar(256) NOT NULL,
                registered_on timestamp,
                is_admin boolean NOT NULL DEFAULT false
            );`
        };
        await db.none(create_users);

        const create_ingredients = {
            text: `CREATE TABLE IF NOT EXISTS ingredients (
                id SERIAL PRIMARY KEY,
                name text UNIQUE NOT NULL,
                primary_unit measurement_unit NOT NULL, 
                density real,
                mass_per_piece real,
                alt_names text NOT NULL DEFAULT '',
                verified boolean NOT NULL DEFAULT false
            );`
        };
        await db.none(create_ingredients);

    } catch (e) {
        console.error(e instanceof Error ? e.stack : `Unknown problem: ${e}`);
    }
}