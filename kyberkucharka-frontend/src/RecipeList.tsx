import { useEffect, useState } from "react";
import { PartialRecipe } from "../../common-interfaces/interfaces";
import { Link } from "react-router-dom";
import { serverURL } from "./main";

export default function RecipeList() {
  const [recipesList, setRecipesList] = useState<PartialRecipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${serverURL}/api/recipes`);
        const result = (await response.json()) as PartialRecipe[];
        setRecipesList(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return loading ? (
    <p>načítavam...</p>
  ) : (
    <div>
      <ul>
        {recipesList.map((recipe) => (
          <li className="recipeCard">
            <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link> (autor:{" "}
            {recipe.author.display_name})
          </li>
        ))}
      </ul>
    </div>
  );
}