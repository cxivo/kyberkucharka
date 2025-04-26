import { useEffect, useState } from "react";
import { DEFAULT_USER, User } from "../../../common-interfaces/interfaces";
import { Link, useNavigate } from "react-router";
import { useCookies } from "react-cookie";

export default function Register() {
  const [user, setUSer] = useState<User>(DEFAULT_USER);
  const [password2, setPassword2] = useState<string>("");
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);
  const [userExists, setUserExists] = useState<boolean>(false);
  const [sendingDisabled, setSendingDisabled] = useState<boolean>(false);
  const [userCookie, _setUserCookie, _removeUserCookie] = useCookies(
    ["userData"],
    {}
  );

  let navigate = useNavigate();

  // if logged in, navigate the user away
  useEffect(() => {
    if (userCookie.userData != null) {
      navigate("/");
    }
  }, []);

  function updateFieldFromForm(
    field: keyof User,
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const newUser: User = { ...user, [field]: e.target.value };
    setUSer(newUser);
  }

  function checkUsernameExists() {
    fetch(`/api/auth/userexists/${user.username}`)
      .then((x) => {
        setUserExists(x.ok);
      })
      .catch(() => {
        setUserExists(false);
      });
  }

  useEffect(() => {
    setPasswordsMatch(password2 === (user.password ?? ""));
  }, [user, password2]);

  function sendRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSendingDisabled(true);

    fetch(`/api/auth/register/`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      credentials: "include", // this is VERY NEEDED, so the server sends us a cookie (we want cookies)
    }).then(async (response: Response) => {
      const json = await response.json();

      if (response.ok) {
        console.log(json);
        navigate("/");
      } else {
        console.error(
          `Error while registering: ${json.message}, ${json.error}`
        );
        // a quick and dirty way
        // but it shouldn't happen anyway, unless the user is being a little beach [sic]
        alert(`Nepodarilo sa registrovať:\n${json.message}`);
        setSendingDisabled(false);
      }
    });
  }

  return (
    <div className="register-window">
      <h1>Registrácia používateľa</h1>
      <form onSubmit={sendRegister}>
        <div>
          <label htmlFor="username-input">
            Prihlasovacie meno (iba text, čísla, pomlčka a podčiarkovník):{" "}
          </label>
          <input
            id="username-input"
            name="username-input"
            type="text"
            onChange={(x) => updateFieldFromForm("username", x)}
            onBlur={checkUsernameExists}
            pattern="[a-zA-Z0-9\-_]{3,}"
            title="Prihlasovacie meno musí mať aspoň 3 znaky, ktoré sú písmená bez diakritiky, číslice, pomlčka alebo podčiarkovník"
            autoComplete="username"
            required
          />
          {userExists ? (
            <p className="form-error">Užívateľ s týmto menom už existuje.</p>
          ) : (
            ""
          )}
        </div>

        <div>
          <label htmlFor="display-name-input">
            Meno, pod ktorým vás ostatní uvidia):{" "}
          </label>
          <input
            id="display-name-input"
            name="display-name-input"
            type="text"
            onChange={(x) => updateFieldFromForm("display_name", x)}
            pattern=".+"
            title="Meno musí obsahovať aspoň 1 znak"
            autoComplete="nickname"
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
            pattern=".{8,}"
            title="Heslo musí mať aspoň 8 znakov"
            autoComplete="new-password"
            required
          />
        </div>

        <div>
          <label htmlFor="password2-input">Opäť heslo: </label>
          <input
            id="password2-input"
            name="password2-input"
            type="password"
            onChange={(x) => setPassword2(x.target.value)}
            pattern=".{8,}"
            title="Heslo musí mať aspoň 8 znakov"
            autoComplete="new-password"
            required
          />
          {passwordsMatch ? (
            ""
          ) : (
            <p className="form-error">Heslá sa nerovnajú!</p>
          )}
        </div>

        <input
          type="submit"
          disabled={!passwordsMatch || userExists || sendingDisabled}
        ></input>
      </form>
      <p>
        Ak už máte účet, <Link to={"/login"}>prihláste sa</Link>.
      </p>
    </div>
  );
}
  