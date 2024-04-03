"use server";

import { sql } from "@vercel/postgres";
const bcrypt = require("bcrypt");

export async function createUser(formData: FormData) {
  console.log(formData.get("name"));

  const user = {
    username: formData.get("username"),
    name: formData.get("name"),
    password: formData.get("password"),
    admin: false,
  };

  const hashedPassword = await bcrypt.hash(user.password, 10);

  await sql`
  INSERT INTO users (username, name, password, created, admin)
  VALUES (${user.username}, ${user.name}, ${hashedPassword}, NOW() , false)`;
}
