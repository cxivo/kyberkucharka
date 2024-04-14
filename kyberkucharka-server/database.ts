const pgp = require("pg-promise");
const db = pgp(process.env.DATABAZA);

export function insertUser() {
  db.none(
    "INSERT INTO users (username, name, password, created, admin) VALUES ('ferko', 'Ferkoo', 'frk123', NOW(), false)"
  );
}

/*
db.none(
  `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  name TEXT NOT NULL,
  password TEXT NOT NULL,
  created TIMESTAMP NOT NULL,
  admin BOOLEAN NOT NULL
);
`
);*/
