import "./App.css";
import { Link } from "react-router-dom";
import RecipeList from "./RecipeList";

export default function MainPage() {
  return (
    <>
      <h1>Vitajte na hlavnej stránke!</h1>
      <div className="links">
        <Link to="/about">O projekte</Link>
        <Link to="/edit">Vytvor recept</Link>
      </div>
      <h2>Zoznam všetkých receptov:</h2>
      <RecipeList></RecipeList>
    </>
  );
}
