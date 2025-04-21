import { useState } from "react";
import { DEFAULT_USER, User } from "../../../common-interfaces/interfaces";
import { Link, useNavigate } from "react-router-dom";

interface LoginProps {
  suggestRegistering: boolean;
  customMessage?: string;
  closeCallback?: () => void;
  successCallback?: () => void;
}

export default function Login({
  suggestRegistering,
  customMessage,
  closeCallback,
  successCallback,
}: LoginProps) {
  const [user, setUSer] = useState<User>(DEFAULT_USER);

  let navigate = useNavigate();

  function updateFieldFromForm(
    field: keyof User,
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const newUser: User = { ...user, [field]: e.target.value };
    setUSer(newUser);
  }

  function close() {
    if (closeCallback != null) {
      closeCallback();
    } else {
      navigate(`/`);
    }
  }

  function sendLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    fetch(`/api/auth/login/`, {
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
        if (successCallback) {
          successCallback();
        }
        close();
      } else {
        alert(`Nepodarilo sa prihlásiť:\n${json.message}`);
        console.error(`Error while logging in: ${json.message}, ${json.error}`);
      }
    });
  }

  return (
    <div className="floating-window">
      <div className="floating-window-content">
        <img
          src="/x-white.png"
          alt="Zrušiť"
          tabIndex={0}
          className="cancel-x cancel-button"
          onClick={close}
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

          <button className="kyberbutton-white" type="submit">
            <span>Prihlásiť sa</span>
          </button>
        </form>
        {suggestRegistering && (
          <p>
            Alebo sa môžete{" "}
            <Link to={"/register"} onClick={close}>
              registrovať
            </Link>
            .
          </p>
        )}
      </div>
    </div>
  );
}
  