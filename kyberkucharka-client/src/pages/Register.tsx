import { useState } from "react";
import { serverAddress } from "../App";

export default function Register({ setUser }: any) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [message, setMessage] = useState("");
  const [correct, setCorrect] = useState(false);

  let handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setCorrect(false);

    if (password !== password2) {
      setMessage(
        "Zadané heslá sú rôzne... nedáva to dobrý precedent, keďže si to heslo chcete zapamätať"
      );
      return;
    }

    try {
      let res = await fetch(serverAddress + "/users", {
        method: "POST",
        headers: [["Content-Type", "application/json"]],
        body: JSON.stringify({
          id: id,
          name: name,
          password: password,
        }),
      });
      let resJson = await res.json();
      if (res.status === 201) {
        setId("");
        setName("");
        setPassword("");
        setPassword2("");
        setMessage("Registrácia bola úspešná!");
        setCorrect(true);

        localStorage.setItem("user", JSON.stringify(resJson.user));
        setUser(resJson.user);
      } else {
        setMessage(resJson.error);
      }
      console.log(resJson);
    } catch (err) {
      console.log(err);
    }
  };

  /*
  if (correct) {
    // navigates to the home page
    useNavigate()("/");
  }
  */

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="id">
          Užíveteľské meno (iba malé písmená, čísla a znaky)
        </label>
        <input
          type="text"
          name="id"
          value={id}
          onChange={(e) => setId(e.target.value)}
          id="id"
        ></input>
        <br />

        <label htmlFor="name">Meno</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name"
        ></input>
        <br />

        <label htmlFor="password">Heslo</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
        ></input>
        <br />

        <label htmlFor="password2">Heslo (ešte raz)</label>
        <input
          type="password"
          name="password2"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          id="password2"
        ></input>
        <br />

        <input type="submit" value="Registruj sa!"></input>

        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
  );
}
