import { Link } from "react-router";
import { PartialRecipe } from "../../../common-interfaces/interfaces";

interface RecipeCardProps {
    recipe: PartialRecipe;
}

export default function RecipeCard({recipe}: RecipeCardProps) {
    return (
      <Link to={`/recipes/${recipe.id}`} className="card">
        <h3>{recipe.title}</h3>
        {recipe.image_link && (
          <img src={recipe.image_link} alt="obrázok k receput"></img>
        )}
        <p>
          autor: <em>{recipe.author.display_name}</em>
        </p>
        <p>{recipe.description}</p>
      </Link>
    );
}
