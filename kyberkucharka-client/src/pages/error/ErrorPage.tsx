import { useRouteError } from "react-router-dom";

export function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <img
        src="https://media1.giphy.com/media/Q8Zs9xIPTpmZq/200w.gif?cid=6c09b952rpbizykzztobzgm3o6y0pwutmrfhpsihdut20w4g&ep=v1_gifs_search&rid=200w.gif&ct=g"
        alt="SpongeBob Crying"
      />
      <p>Something terrible happened.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
