import { useState } from "react";
import { DEFAULT_USER, User } from "../../common-interfaces/interfaces";
import { serverURL } from "./main";
import { Link } from "react-router-dom";

interface LoginProps {
  suggestRegistering: boolean;
}

export default function Login({suggestRegistering} : LoginProps) {
  const [user, setUSer] = useState<User>(DEFAULT_USER);

  function updateFieldFromForm(
    field: keyof User,
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const newUser: User = { ...user, [field]: e.target.value };
    setUSer(newUser);
  }

  function sendLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(user); // TODO DELETE

    fetch(`${serverURL}/auth/login/`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
      .then(async (response: Response) => {
        const json = await response.json();

        if (response.ok) {
          console.log(json);
        } else {
        console.error(
          `Error while logging in: ${json.message}, ${json.error}`
        );
        }  
      })
  }

  return (
    <div className="login-window">
      <h1>Prihlásenie sa</h1>
      <form onSubmit={sendLogin}>
        <div>
        <label htmlFor="username-input">Prihlasovacie meno: </label>
        <input id="username-input" name="username-input" type="text" onChange={x => updateFieldFromForm("username", x)}/>
        </div>

        <div>
        <label htmlFor="password-input">Heslo: </label>
        <input id="password-input" name="password-input" type="password" onChange={x => updateFieldFromForm("password", x)}/>
        </div>

        <input type="submit"></input>
      </form>
      {suggestRegistering ? <p>Alebo sa môžete <Link to={"/register"}>registrovať</Link>.</p> : ""}
    </div>
  );
}
  