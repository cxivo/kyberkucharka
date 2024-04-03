import { sql } from "@vercel/postgres";
import { unstable_noStore } from "next/cache";
import Link from "next/link";

export default async function Cart({
  params,
}: {
  params: { user: string };
}): Promise<JSX.Element> {
  unstable_noStore();
  const { rows } = await sql`SELECT * from USERS`; //where username=${params.user}

  return (
    <div>
      Užívatelia <br /> Počet: {rows.length}
      {rows.map((row) => (
        <div key={row.id}>
          Užívateľ {row.id} - {row.name}
        </div>
      ))}
      Btw, stránka receptov:
      <Link href="/recept"> tuná </Link>
      <br />A tu sa dá
      <Link href="/registracia"> registrovať</Link>.
    </div>
  );
}
