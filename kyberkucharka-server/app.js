const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const pgp = require("pg-promise")();

const cors = require("cors"); // of CORS it didn't work
const bcrypt = require("bcrypt");
const { PreparedStatement } = require("pg-promise");

const {
  check,
  validationResult,
  body,
  ExpressValidator,
} = require("express-validator");
const jsonwebtoken = require("jsonwebtoken");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

require("dotenv").config();
const db = pgp(process.env.DATABAZA);
const accessToken = process.env.SECRET_ACCESS_TOKEN;

app.get("/users", async (req, res) => {
  const users = await db.any("SELECT * FROM users;");

  res.json(users);
});

app.get("/users/:userId", async (req, res) => {
  try {
    const user = await db.one(
      new PreparedStatement({
        name: "get-user-password",
        text: "SELECT * FROM users WHERE id = $1;",
        values: [req.params.userId],
      })
    );

    res.json(user);
  } catch (e) {
    res.status(404).json([]);
  }
});

app.post(
  "/users",
  [
    [
      check("id")
        .isLength({ min: 3, max: 32 })
        .withMessage("Jedinečné meno musí mať dĺžku 3-32 znakov"),
      check("id")
        .matches(/^[a-zA-Z0-9-_]+$/)
        .withMessage(
          "Jedinečné meno môže obsahovať iba písmená bez diakritiky, čísla, pomlčku a podčiarkovník"
        ),
      check("name")
        .isLength({ min: 3, max: 64 })
        .withMessage("Meno musí mať dĺžku 3-64 znakov"),
      check("password")
        .isLength({ min: 8, max: 64 })
        .withMessage("Heslo musí mať dĺžku 8-64 znakov"),
    ],
  ],
  async (req, res) => {
    // returns errors if validation failed
    const errors = validationResult(req);

    const { id, name, password } = req.body;
    if (!errors.isEmpty()) {
      res
        .status(400)
        .json({ id: id, name: name, error: errors.array()[0].msg });
      return;
    }

    // test for duplicates
    const possibleDuplicate = await db.any(
      `SELECT 1 FROM users WHERE id = '${id}';`
    );
    if (possibleDuplicate.length !== 0) {
      res.status(409).json({
        id: id,
        name: name,
        error:
          'Užívateľ s týmto jedinečným menom už existuje, a ako už prívlastok "jedinečné" naznačuje, mali by ste si zvoliť iné.',
      });
      return;
    }

    // insert user
    const hashedPassword = await bcrypt.hash(password, 10);
    await db
      .none(
        new PreparedStatement({
          name: "insert-user",
          text: "INSERT INTO users(id,name,password,created) VALUES($1, $2, $3, NOW())",
          values: [id, name, hashedPassword],
        })
      )
      .catch((error) => {
        res.status(500).json({
          id: id,
          name: name,
          error: "Nastala chyba pri vkladaní užívateľa: " + error,
        });
        return;
      });

    // everything went well
    const user = { id: id, name: name, admin: false };
    res.status(201).json({ user: user });
  }
);

app.post("/login", async (req, res) => {
  const { id, password } = req.body;

  // did the user even send them
  if (id == undefined || password == undefined) {
    res.status(401).json({
      id: id,
      error: "Je potrebné zadať jedinečné meno aj heslo",
    });
    return;
  }

  let userInfo;
  try {
    userInfo = await db.one(
      new PreparedStatement({
        name: "get-user-password",
        text: "SELECT * FROM users WHERE id = $1;",
        values: [id],
      })
    );
  } catch (error) {
    res.status(401).json({
      id: id,
      error: "Užívateľ s týmto menom nejestvuje.",
    });
    return;
  }

  // check password
  const isPasswordCorrect = await bcrypt.compare(password, userInfo.password);

  if (!isPasswordCorrect) {
    res.status(401).json({
      id: id,
      error: "Nesprávne heslo.",
    });
    return;
  }

  // token
  const user = { id: id, name: userInfo.name, admin: userInfo.admin };
  const token = jsonwebtoken.sign({ user: user }, accessToken, {
    expiresIn: "60m",
  });

  let options = {
    maxAge: 60 * 60 * 1000,
    httpOnly: true, // The cookie is only accessible by the web server
    secure: true,
    sameSite: "None",
  };

  res.cookie("SessionID", token, options);

  res.status(200).json({
    user: user,
    message: "Úspešne vstránkovanô",
  });
});

app.post("/logout", async (req, res) => {
  // apparently this is not 100% secure, buuuut... I'm okay with that
  let options = {
    maxAge: 5 * 1000,
    httpOnly: true, // The cookie is only accessible by the web server
    secure: true,
    sameSite: "None",
  };

  res.cookie("SessionID", "none", options);

  res.status(200).json({
    message: "Odhlásenie úspešné",
  });
});

app.post("/init", async (req, res) => {
  db.none(`
    DROP TABLE section_ingredients;
    DROP TABLE sections;
    DROP TABLE recipes;
    DROP TABLE ingredients;
    DROP TABLE users;

    CREATE TABLE IF NOT EXISTS users (
      id VARCHAR(64) PRIMARY KEY,
      name VARCHAR(64) NOT NULL,
      password TEXT NOT NULL,
      created TIMESTAMP NOT NULL,
      admin BOOLEAN NOT NULL DEFAULT FALSE
    );

    CREATE TABLE IF NOT EXISTS ingredients (
      id SERIAL PRIMARY KEY,
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

    CREATE TABLE IF NOT EXISTS recipes (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      creator VARCHAR(64) NOT NULL,
      fork INTEGER,
      description TEXT,
      instructions TEXT NOT NULL,
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

    CREATE TABLE IF NOT EXISTS sections (
      id SERIAL PRIMARY KEY,
      recipe INTEGER NOT NULL,
      name TEXT,
      index INTEGER,
      constraint foreign_key_recipe
        foreign key(recipe)
          references recipes(id)
    );

    CREATE TABLE IF NOT EXISTS section_ingredients (
      id SERIAL PRIMARY KEY,
      section INTEGER NOT NULL,
      ingredient INTEGER NOT NULL,
      amount REAL,
      constraint foreign_key_section
        foreign key(section)
          references sections(id),
      constraint foreign_key_ingredient
        foreign key(ingredient)
          references ingredients(id)
    );
  `);

  res.json({ message: "Zen reset performed, master" });
});

app.get("/recipe/:recipeId", async (req, res) => {
  try {
    const recipe = await db.any(
      new PreparedStatement({
        name: "get-recipe",
        text: `SELECT json_build_object(
          'id', recipes.id,
          'name', recipes.name,
          'created', recipes.created,
          'fork', recipes.fork,
          'description', recipes.description,
          'instructions', recipes.instructions,
          'preparationTime', recipes.preparation_time,
          'cookTime', recipes.cook_time,
          'restTime', recipes.rest_time,
          'difficulty', recipes.difficulty,
          'sections', json_build_array(json_build_object(
            'name', sections.name,
            'index', sections.index,
            'ingredients', json_build_array(json_build_object(
              'amount', section_ingredients.amount,
              'ingredient', json_build_object(
                'name', ingredients.name,
                'primaryUnit', ingredients.primary_unit
              )
            ))
          ))

        )
          FROM recipes
          LEFT JOIN sections ON sections.recipe = recipes.id 
          LEFT JOIN section_ingredients ON section_ingredients.section = sections.id
          JOIN ingredients ON section_ingredients.ingredient = ingredients.id
          WHERE recipes.id = $1
          ORDER BY sections.index ASC;`,
        values: [req.params.recipeId],
      })
    );

    res.json(recipe);
  } catch (e) {
    res.status(404).json({});
  }
});

const server = app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);
