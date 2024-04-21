//import { useEffect, useState } from "react";
import { User } from "../user.ts";
import { useState } from "react";
import { getUsers } from "../api/getUsers.ts";

export default function UserList() {
  //const users = useLoaderData() as User[];
  const [users, setUsers] = useState([]) as [User[], any];
  const [finished, setFinished] = useState(false) as [boolean, any];

  getUsers().then((u) => {
    setUsers(u);
    setFinished(true);
  });

  return (
    <div>
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      ) : finished ? (
        <em>Žiadni užívatelia</em>
      ) : (
        <em>Načítanie...</em>
      )}
    </div>
  );
}
