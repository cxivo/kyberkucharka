const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString:
    "postgres://default:Fi17dhGnQcsM@ep-nameless-sun-a46c6mdh-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require",
});

pool.connect((err) => {
  if (err) throw err;
  console.log("ide to!");
});

module.exports = pool;
