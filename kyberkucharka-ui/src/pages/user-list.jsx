import { getUsers } from "../recipe/communication";
import { useEffect, useState } from "react";

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUsers();
      setUsers(data);
    };

    fetchData();
  }, []);

  const listUsers = () => {
    return (
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    );
  };

  return <div className="App">{listUsers()}</div>;
}
