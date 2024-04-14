const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

require("dotenv").config();

const pgp = require("pg-promise")();
const db = pgp(process.env.DATABAZA);

app.get("/", async (req, res) => {
  const users = await db.any("SELECT * FROM users;");

  return res.json(users);
});

const server = app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);

// no idea where the hell "server" comes from
server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
