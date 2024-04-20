import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

interface User {
  id: string;
  name: string;
  created: string;
  admin: boolean;
}
export default function UserList() {
  const users = useLoaderData() as User[];

  return (
    <div>
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      ) : (
        <em>No users found</em>
      )}
    </div>
  );
}
