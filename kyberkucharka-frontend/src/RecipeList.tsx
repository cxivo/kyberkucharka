import { useEffect, useState } from "react";
import { PartialRecipe } from "../../common-interfaces/interfaces";
import RecipeCard from "./recipeComponents/RecipeCard";

interface RecipeListProps {
  dataSource: Promise<PartialRecipe[]>;
  flexColumn: boolean;
  displayText?: string;
}

export default function RecipeList({
  dataSource,
  flexColumn,
  displayText,
}: RecipeListProps) {
  const [recipesList, setRecipesList] = useState<PartialRecipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [invalid, setInvalid] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const recipes: PartialRecipe[] = await dataSource;
      if (recipes !== null) {
        setRecipesList(recipes);
        setLoading(false);
      } else {
        setInvalid(true);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return loading ? (
    <p>načítavam...</p>
  ) : invalid ? (
    <p>Nastala neznáma chyba</p>
  ) : recipesList.length == 0 ? (
    <></>
  ) : (
    <>
      <h2>{displayText}</h2>
      <div className={`card-container ${flexColumn && "flex-column"}`}>
        {recipesList.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            isFork={false}
          ></RecipeCard>
        ))}
      </div>
    </>
  );
}
