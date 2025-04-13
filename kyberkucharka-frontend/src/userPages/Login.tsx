import { useState } from "react";
import { DEFAULT_USER, User } from "../../../common-interfaces/interfaces";
import { serverURL } from "../main";
import { Link } from "react-router-dom";

interface LoginProps {
  suggestRegistering: boolean;
  customMessage?: string;
  closeCallback: () => void;
}

export default function Login({
  suggestRegistering,
  customMessage,
  closeCallback,
}: LoginProps) {
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
        closeCallback();
        //navigate(`/`);
      } else {
        alert(`Nepodarilo sa prihlásiť:\n${json.message}`);
        console.error(`Error while logging in: ${json.message}, ${json.error}`);
      }
    });
  }

  return (
    <div className="floatingWindow">
      <div className="floatingWindowContent">
        <img
          src="/src/assets/x-white.png"
          alt="Zrušiť"
          tabIndex={0}
          className="cancel-x cancel-button"
          onClick={closeCallback}
        />
        <h1>Prihlásenie sa</h1>
        {customMessage != null ? <p>{customMessage}</p> : ""}
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

          <div className="submit-button">
            <input type="submit" value="Prihlásiť sa"></input>
          </div>
        </form>
        {suggestRegistering ? (
          <p>
            Alebo sa môžete{" "}
            <Link to={"/register"} onClick={closeCallback}>
              registrovať
            </Link>
            .
          </p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
  