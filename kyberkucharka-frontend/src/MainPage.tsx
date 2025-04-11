import { Link } from "react-router-dom";
import RecipeList from "./RecipeList";
import { getUserFromCookies } from "./functions/cookieHelper";

export default function MainPage() {
  return (
    <>
      <title>Kyberkuchárka!</title>
      <h1>Vitajte na hlavnej stránke!</h1>
      <div className="links">
        <Link to="/about">O projekte</Link>
        {getUserFromCookies() == null ? (
          ""
        ) : (
          <Link to="/create">Vytvor recept</Link>
        )}
      </div>
      <h2>Zoznam všetkých receptov:</h2>
      <RecipeList></RecipeList>
    </>
  );
}
