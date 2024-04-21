import { useState } from "react";
import { serverAddress } from "../App";

export default function Login({ setUser }: any) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [, setCorrect] = useState(false);

  let handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      let res = await fetch(serverAddress + "/login", {
        method: "POST",
        headers: [["Content-Type", "application/json"]],
        body: JSON.stringify({
          id: id,
          password: password,
        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        setId("");
        setPassword("");
        setMessage("Prihlásenie bolo úspešné!");
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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="id">Užíveteľské meno</label>
        <input
          type="text"
          name="id"
          value={id}
          onChange={(e) => setId(e.target.value)}
          id="id"
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

        <input type="submit" value="Prihlásiť sa"></input>

        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
  );
}
