import { useState } from "react";
import { Recipe } from "../interfaces/recipe.ts";
import { getRecipes } from "../api/getRecipes.ts";
import { Link } from "react-router-dom";

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]) as [Recipe[], any];
  const [finished, setFinished] = useState(false) as [boolean, any];

  getRecipes().then((u) => {
    setRecipes(u);
    setFinished(true);
  });

  return (
    <div>
      {recipes.length > 0 ? (
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.id}>
              <Link to={"/recipe/" + recipe.id}>{recipe.name}</Link>
            </li>
          ))}
        </ul>
      ) : finished ? (
        <em>Žiadne recepty</em>
      ) : (
        <em>Načítanie...</em>
      )}
    </div>
  );
}
