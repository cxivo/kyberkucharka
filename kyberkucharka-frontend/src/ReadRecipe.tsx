import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DEFAULT_RECIPE, Recipe } from "../../common-interfaces/interfaces";
import { serverURL } from "./main";

export default function ReadRecipe() {
  const [recipeData, setRecipeData] = useState<Recipe>(DEFAULT_RECIPE);
  const [loading, setLoading] = useState<boolean>(true);


  const { slug = "0" } = useParams();

  let navigate = useNavigate();

  const apiCall = () => {
    axios.get(`${serverURL}`).then((data) => {
      //this console.log will be in our frontend console
      console.log(data);
    });
  };

  // each time the slug (which is the recipe ID) gets updated, the site will soft-reload
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${serverURL}/api/recipes/${slug}`);
        const result = (await response.json()) as Recipe;
        setRecipeData(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  useEffect(() => console.log(recipeData), [recipeData]);

  return (
    <div className="recipe">
      <title>
        {(recipeData.title ?? "načítavam recept") + " - Kyberkuchárka"}
      </title>
      {loading ? (
        <p>načítavam...</p>
      ) : (
        <div key={recipeData.id}>
          {recipeData.forked_from != null ? (
            <div>
              Forknuté z{" "}
              <Link to={`/recipes/${recipeData.forked_from.id}`}>
                {recipeData.forked_from.title}
              </Link>
            </div>
          ) : (
            ""
          )}
          <button type="button" onClick={() => navigate(`/edit/${slug}`)}>
            Uprav recept
          </button>
          <button type="button" onClick={() => navigate(`/fork/${slug}`)}>
            Forkni recept
          </button>
          <h2>{recipeData?.title}</h2>
          {recipeData?.image_link ? (
            <img
              src={recipeData?.image_link}
              alt="Obrázok k receptu"
              className="recipe_img"
            />
          ) : (
            <></>
          )}
          <p>autor: {recipeData?.author.display_name}</p>
          <p>{recipeData?.description}</p>
          <h3>Ingrediencie</h3>
          {recipeData?.sections.map((section) => (
            <div key={section.id} className="section">
              <h4>{section.name}</h4>
              <ul>
                {section.used_ingredients.map((used_ingredient) => (
                  <li key={used_ingredient.id}>
                    {used_ingredient.ingredient.name}: {used_ingredient.amount}{" "}
                    {used_ingredient.ingredient.primary_unit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <h3>Postup</h3>
          <p>{recipeData?.instructions}</p>
        </div>
      )}
      <button onClick={apiCall}>apikól</button>
    </div>
  );
}
