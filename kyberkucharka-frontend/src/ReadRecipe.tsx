import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DEFAULT_RECIPE, Recipe } from "../../common-interfaces/interfaces";
import { serverURL } from "./main";

export default function ReadRecipe() {
  const [recipeData, setRecipeData] = useState<Recipe>(DEFAULT_RECIPE);
  const [loading, setLoading] = useState<boolean>(true);

  const { slug = "0" } = useParams();

  const apiCall = () => {
    axios.get(`${serverURL}`).then((data) => {
      //this console.log will be in our frontend console
      console.log(data);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulating a delay to show loading state
        setTimeout(async () => {
          const response = await fetch(`${serverURL}/api/recipes/${slug}`);
          const result = (await response.json()) as Recipe;
          setRecipeData(result);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="recipe">
      {loading ? (
        <p>načítavam...</p>
      ) : (
        <>
          <h2>{recipeData?.title}</h2>
          {recipeData?.image_link ? (
            <img src={recipeData?.image_link} alt="Obrázok k receptu" />
          ) : (
            <></>
          )}
          <p>autor: {recipeData?.author.display_name}</p>
          <p>{recipeData?.description}</p>
          <h3>Ingrediencie</h3>
          {recipeData?.sections.map((section) => (
            <div className="section">
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
        </>
      )}
      <button onClick={apiCall}>apikól</button>
    </div>
  );
}
