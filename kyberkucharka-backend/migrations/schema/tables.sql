CREATE TYPE measurement_unit AS ENUM ('g', 'ml', 'pc', 'tsp', 'pack');

CREATE TABLE IF NOT EXISTS users (
    username varchar(64) PRIMARY KEY,
    display_name varchar(256) NOT NULL,
    password varchar(64) NOT NULL,
    registered_on timestamp,
    is_admin boolean NOT NULL DEFAULT false
);

CREATE TABLE IF NOT EXISTS ingredients (
    id SERIAL PRIMARY KEY,
    name text UNIQUE NOT NULL,
    primary_unit measurement_unit NOT NULL, 
    density real,
    mass_per_piece real,
    alt_names text NOT NULL DEFAULT '',
    verified boolean NOT NULL DEFAULT false,
    created_on timestamp,
    created_by varchar(64),
    CONSTRAINT fk_author
        FOREIGN KEY(created_by)
            REFERENCES users(username)
            ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS ingredient_tags (
    id SERIAL PRIMARY KEY,
    name text UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS recipe_tags (
    id SERIAL PRIMARY KEY,
    name text UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS recipes (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    author varchar(64) NOT NULL,
    created_on TIMESTAMP,
    forked_from INTEGER,
    description TEXT,
    image_link TEXT,
    preparation_time INTEGER NOT NULL,
    instructions TEXT NOT NULL,
    CONSTRAINT fk_author
        FOREIGN KEY(author)
            REFERENCES users(username)
            ON DELETE CASCADE,
    CONSTRAINT fk_fork
        FOREIGN KEY(forked_from)
            REFERENCES recipes(id)
            ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS sections (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    recipe INTEGER NOT NULL,
    ordering INTEGER NOT NULL,
    CONSTRAINT fk_recipe
        FOREIGN KEY(recipe)
            REFERENCES recipes(id)
            ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS used_ingredients (
    id SERIAL PRIMARY KEY,
    ingredient INTEGER NOT NULL,
    section INTEGER NOT NULL,
    amount real NOT NULL,
    CONSTRAINT fk_ingredient
        FOREIGN KEY(ingredient)
            REFERENCES ingredients(id)
            ON DELETE RESTRICT,
    CONSTRAINT fk_section
        FOREIGN KEY(section)
            REFERENCES sections(id)
            ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS used_recipe_tags (
    tag INTEGER NOT NULL,
    recipe INTEGER NOT NULL,
    PRIMARY KEY (tag, recipe),
    CONSTRAINT fk_tag
        FOREIGN KEY(tag)
            REFERENCES recipe_tags(id)
            ON DELETE CASCADE,
    CONSTRAINT fk_recipe
        FOREIGN KEY(recipe)
            REFERENCES recipes(id)
            ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS used_ingredient_tags (
    tag INTEGER NOT NULL,
    ingredient INTEGER NOT NULL,
    PRIMARY KEY (tag, ingredient),
    CONSTRAINT fk_tag
        FOREIGN KEY(tag)
            REFERENCES ingredient_tags(id)
            ON DELETE CASCADE,
    CONSTRAINT fk_ingredient
        FOREIGN KEY(ingredient)
            REFERENCES ingredients(id)
            ON DELETE CASCADE
);

/* 
SELECT row_to_json(
    (
        SELECT x FROM 
        (
            SELECT
            1 AS k1,
            2 AS k2,
            (
                SELECT json_agg( 
                    (
                        SELECT x FROM (
                            SELECT 1 AS a, 2 AS b
                        ) x
                    ) 
                )
                FROM generate_series(1,2) 
            ) AS k3
        ) x
    ),
    true
); */