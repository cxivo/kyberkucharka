import { sql } from "@vercel/postgres";
import { unstable_noStore } from "next/cache";
import Link from "next/link";
import { createUser } from "../lib/actions";

export default async function Registration({
  params,
}: {
  params: { user: string };
}) {
  //unstable_noStore();
  const { rows } = await sql`SELECT * from USERS`; //where username=${params.user}

  return (
    <div>
      <form action={createUser}>
        <label htmlFor="username">
          Užíveteľské meno (iba malé písmená, čísla a znaky)
        </label>
        <input type="text" name="username" id="username"></input>
        <br />

        <label htmlFor="name">Meno</label>
        <input type="text" name="name" id="name"></input>
        <br />

        <label htmlFor="password">Heslo</label>
        <input type="password" name="password" id="password"></input>
        <br />

        <label htmlFor="password2">Heslo (ešte raz)</label>
        <input type="password" name="password2" id="password2"></input>
        <br />

        <input type="submit" value="Registruj sa!"></input>
      </form>
    </div>
  );
}
