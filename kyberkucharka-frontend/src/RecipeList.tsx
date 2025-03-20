import { useEffect, useState } from "react";
import { PartialRecipe, Recipe } from "../../common-interfaces/interfaces";
import { Link } from "react-router-dom";

export default function RecipeList() {
    const [recipesList, setRecipesList] = useState<PartialRecipe[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
            const response = await fetch(
              `http://localhost:3000/api/recipes`
            );
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

    return <div>
        <ul>
            {recipesList.map(recipe => <li className="recipeCard"><Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link> (autor: {recipe.author.display_name})</li>)}
        </ul>
    </div>
}