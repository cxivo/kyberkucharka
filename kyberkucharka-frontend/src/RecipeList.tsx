import { useEffect, useState } from "react";
import { PartialRecipe } from "../../common-interfaces/interfaces";
import RecipeCard from "./recipeComponents/RecipeCard";

interface RecipeListProps {
  flexColumn?: boolean;
}

export default function RecipeList({ flexColumn }: RecipeListProps) {
  const [recipesList, setRecipesList] = useState<PartialRecipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [invalid, setInvalid] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`/api/recipes`)
        .then(async (response) => {
          if (response.ok) {
            const result = await response.json();
            setRecipesList(result);
            setLoading(false);
          } else {
            setInvalid(true);
            setLoading(false);
          }
        })
        .catch((e) => {
          console.error("Error fetching data:", e);
          setInvalid(true);
          setLoading(false);
        });
    };

    fetchData();
  }, []);

  return loading ? (
    <p>načítavam...</p>
  ) : invalid ? (
    <p>Nastala neznáma chyba</p>
  ) : (
    <div className={`card-container ${flexColumn && "flex-column"}`}>
      {recipesList.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} isFork={false}></RecipeCard>
      ))}
    </div>
  );
}