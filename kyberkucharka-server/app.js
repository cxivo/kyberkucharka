const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

const cors = require("cors"); // of CORS it didn't work
app.use(cors());

require("dotenv").config();

app.get("/", async (req, res) => {
  const pgp = require("pg-promise")();
  const db = pgp(process.env.DATABAZA);

  const users = await db.any("SELECT * FROM users;");

  return res.json(users);
});

const server = app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);

// no idea where the hell "server" comes from
server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
