import { useEffect, useState } from "react";
import {
  User,
} from "../../../common-interfaces/interfaces";
import { Link } from "react-router-dom";
import AreYouSureWindow from "../AreYouSureWindow";

export default function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [selectedUsername, setSelectedUsername] = useState<string>("");

  async function fetchData() {
    fetch(`/api/users/`)
      .then(async (response) => {
        const result = await response.json();

        if (response.ok) {
          setUsers(result);
        } else {
          alert(
            `Nepodarilo sa získať používateľov: HTTP status kód ${response.status}, ${result.message}`
          );
        }
      })
      .catch((error) => {
        alert(`Nepodarilo sa získať používateľov: ${error}`);
        console.error("Error fetching data:", error);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);


  function deleteUser(username: string) {
    fetch(`/api/users/${username}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      credentials: "include",
    }).then(async (response: Response) => {
      if (response.ok) {
        alert("Užívateľ úspešne zmazaný.");
      } else {
        alert("Nepodarilo sa zmazať užívateľa.");
      }
    }).catch(error => {
      alert(`Nepodarilo sa zmazať užívateľa: ${error}`);
    });
  }

  function modifyAdminStatus(username: string, should_be_admin: boolean) {
    fetch(`/api/users/modify-admin/${username}`, {
      method: "PUT",
      body: JSON.stringify({should_be_admin: should_be_admin}),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      credentials: "include",
    }).then(async (response: Response) => {
      if (!response.ok) {
        alert(`Nepodarilo sa upraviť práva, HTTP status ${response.status}: ${(await response.json())?.message}`);
      }
    }).catch(error => {
      alert(`Nepodarilo sa upraviť práva: ${error}`);
    });
  }

  return (
    <>
      <title>Správa užívateľov</title>
      <h1>Zoznam užívateľov</h1>
      <table className="ingredients-table">
        <thead>
          <tr>
            <th scope="col">Prezývka</th>
            <th scope="col">Meno</th>
            <th scope="col">Čas registrácie</th>
            <th scope="col">Administrátor</th>
            <th scope="col">Zmazať</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.username}
            >
              <td><Link to={`/user/${user.username}`}>{user.username}</Link></td>
              <td>
                {user.display_name}
              </td>
              
              <td>
                {new Date(user.registered_on ?? "")
                  .toISOString()
                  .replace("T", " ")}
              </td>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={user.is_admin}
                  onChange={(e) =>
                    modifyAdminStatus(user.username, e.target.checked)
                  }
                ></input>
              </td>
              <td>
                <img
                  src="/x.png"
                  alt="Zrušiť"
                  tabIndex={0}
                  className="cancel-x cancel-button"
                  onClick={() => {
                    setSelectedUsername(user.username);
                    setIsDeleting(true);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isDeleting && (
        <AreYouSureWindow
          mainText={`Zmazať užívateľa ${selectedUsername}?`}
          descriptionText="Touto akciou sa zmažú aj všetky recepty užívateľa. Táto akcia je nenávratná!"
          confirmText="Zmazať!"
          closeCallback={() => setIsDeleting(false)}
          successCallback={() =>
            deleteUser(selectedUsername)
          }
        ></AreYouSureWindow>
      )}
    </>
  );
}
