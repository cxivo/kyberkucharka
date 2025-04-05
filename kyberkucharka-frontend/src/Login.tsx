import { useState } from "react";
import { DEFAULT_USER, User } from "../../common-interfaces/interfaces";
import { serverURL } from "./main";
import { Link, useNavigate } from "react-router-dom";

interface LoginProps {
  suggestRegistering: boolean;
}

export default function Login({ suggestRegistering }: LoginProps) {
  const [user, setUSer] = useState<User>(DEFAULT_USER);

  let navigate = useNavigate();

  function updateFieldFromForm(
    field: keyof User,
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const newUser: User = { ...user, [field]: e.target.value };
    setUSer(newUser);
  }

  function sendLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    fetch(`${serverURL}/auth/login/`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      credentials: "include", // this is VERY NEEDED, so the server sends us a cookie (we want cookies)
    }).then(async (response: Response) => {
      console.log(response.headers.getSetCookie());
      const json = await response.json();

      if (response.ok) {
        console.log(json);
        navigate(`/`);
      } else {
        console.error(`Error while logging in: ${json.message}, ${json.error}`);
      }
    });
  }

  return (
    <div className="login-window">
      <h1>Prihlásenie sa</h1>
      <form onSubmit={sendLogin}>
        <div>
          <label htmlFor="username-input">Prihlasovacie meno: </label>
          <input
            id="username-input"
            name="username-input"
            type="text"
            onChange={(x) => updateFieldFromForm("username", x)}
            autoComplete="username"
            required
          />
        </div>

        <div>
          <label htmlFor="password-input">Heslo: </label>
          <input
            id="password-input"
            name="password-input"
            type="password"
            onChange={(x) => updateFieldFromForm("password", x)}
            autoComplete="current-password"
            required
          />
        </div>

        <input type="submit"></input>
      </form>
      {suggestRegistering ? (
        <p>
          Alebo sa môžete <Link to={"/register"}>registrovať</Link>.
        </p>
      ) : (
        ""
      )}
    </div>
  );
}
  