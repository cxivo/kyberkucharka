import { Link } from "react-router";
import { PartialRecipe } from "../../../common-interfaces/interfaces";
import { useState } from "react";

interface RecipeCardProps {
  recipe: PartialRecipe;
  isFork?: boolean;
}

export default function RecipeCard({ recipe, isFork }: RecipeCardProps) {
  const [isInvalidImage, setIsInvalidImage] = useState<boolean>(false);

  return (
    <Link to={`/recipes/${recipe.id}`} className={isFork ? "fork" : "card"}>
      <div className={isFork ? "fork-card" : ""}>
        <h3>{recipe.title}</h3>
        {recipe.image_link && (
          <img
            src={recipe.image_link}
            alt="obrázok k receput"
            style={{ display: isInvalidImage ? "none" : "inline" }}
            onError={() => setIsInvalidImage(true)}
          ></img>
        )}
        <p>
          autor: <em>{recipe.author.display_name}</em>
        </p>
        <p>{recipe.description}</p>
      </div>
    </Link>
  );
}
