import { sql } from "@vercel/postgres";

export default async function Cart({
  params,
}: {
  params: { user: string };
}): Promise<JSX.Element> {
  const { rows } = await sql`SELECT * from USERS`; //where username=${params.user}

  return (
    <div>
      Užívatelia <br /> Počet: {rows.length}
      {rows.map((row) => (
        <div key={row.id}>
          Užívateľ {row.id} - {row.name}
        </div>
      ))}
    </div>
  );
}
