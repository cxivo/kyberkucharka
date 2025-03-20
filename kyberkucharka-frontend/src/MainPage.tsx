import "./App.css";
import { Link } from "react-router-dom";
import RecipeList from "./RecipeList";

export default function MainPage() {
  return (
    <>
      <h1>Vitajte na hlavnej stránke!</h1>
      <Link to="/about">O projekte</Link>
      <h2>Zoznam všetkých receptov:</h2>
      <RecipeList></RecipeList>
    </>
  );
}
