import { sql } from "@vercel/postgres";
import { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  const recipes = await sql`SELECT * FROM recipes;`;
  return response.status(200).json({ recipes });
}
