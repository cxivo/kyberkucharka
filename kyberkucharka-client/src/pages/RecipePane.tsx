import { useState } from "react";
import { Recipe } from "../interfaces/recipe.ts";
import getRecipeById from "../api/getRecipeById.ts";

export default function RecipePane(id: string) {
  const [recipe, setRecipe] = useState({}) as [Recipe, any];
  const [finished, setFinished] = useState(false) as [boolean, any];

  getRecipeById(id).then((u: Recipe) => {
    setRecipe(u);
    setFinished(true);
  });

  let preparationTime = <></>;
  if (recipe.preparationTime > 0) {
    preparationTime = <>Čas prípravy: {recipe.preparationTime}</>;
  }

  let cookTime = <></>;
  if (recipe.cookTime > 0) {
    cookTime = <>Čas pečenia: {recipe.cookTime}</>;
  }

  let restTime = <></>;
  if (recipe.restTime > 0) {
    restTime = <>Čas odpočívania: {recipe.restTime}</>;
  }

  return (
    <div className="recipe-pane">
      {finished ? (
        <>
          <h1>{recipe.name}</h1>
          <div className="times">
            {preparationTime}, {cookTime}, {restTime}
          </div>
          <div className="totaltime">
            Celkový čas:{" "}
            {recipe.preparationTime + recipe.cookTime + recipe.restTime}
          </div>
          <p>{recipe.description}</p>
          <p>{recipe.instructions}</p>
        </>
      ) : (
        <em>Načítanie...</em>
      )}
    </div>
  );
}
