import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DEFAULT_RECIPE, Recipe } from "../../../common-interfaces/interfaces";
import { formatAmount, gramsToAmountUsed } from "../functions/UnitHelper";
import { getUserFromCookies } from "../functions/cookieHelper";
import ForkCard from "./ForkCard";
import AreYouSureWindow from "../AreYouSureWindow";

export default function ReadRecipe() {
  const [recipeData, setRecipeData] = useState<Recipe>(DEFAULT_RECIPE);
  const [loading, setLoading] = useState<boolean>(true);
  const [isInvalidImage, setIsInvalidImage] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("načítavam...");

  const { slug = "0" } = useParams();

  let navigate = useNavigate();

  // each time the slug (which is the recipe ID) gets updated, the site will soft-reload
  useEffect(() => {
    const fetchData = async () => {
      fetch(`/api/recipes/${slug}`)
        .then(async (response) => {
          const result = await response.json();

          if (response.ok) {
            setRecipeData(result);
            setLoading(false);
          } else {
            console.error(result.message);
            if (response.status === 404) {
              setMessage(`Recept nenájdený.`);
              navigate("/");
            } else {
              setMessage(`Nepodarilo sa načítať recept: ${result.message}`);
            }
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setMessage(`Nastala neznáma chyba: ${error}`);
        });
    };

    fetchData();
  }, [slug]);

  useEffect(() => console.log(recipeData), [recipeData]);

  function deleteRecipe() {
    setLoading(true);
    setIsDeleting(false);
    fetch(`/api/recipes/${recipeData.id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      credentials: "include",
    }).then(async (response: Response) => {
      if (response.ok) {
        alert("Recept úspešne zmazaný.");
        navigate("/");
      } else {
        alert("Nepodarilo sa zmazať recept.");
        setLoading(false);
      }
    });
  }

  return (
    <div>
      <title>
        {(recipeData.title ?? "načítavam recept") + " - Kyberkuchárka"}
      </title>
      {loading ? (
        <p>{message}</p>
      ) : (
        <div className="recipe" key={recipeData.id}>
          {recipeData.forked_from != null && (
            <ForkCard recipe={recipeData.forked_from}></ForkCard>
          )}
          {
            // can edit own recipe
            getUserFromCookies()?.username === recipeData.author.username && (
              <button type="button" onClick={() => navigate(`/edit/${slug}`)}>
                Uprav recept
              </button>
            )
          }

          {
            // can fork anyone's recipe
            getUserFromCookies() != null && (
              <button type="button" onClick={() => navigate(`/fork/${slug}`)}>
                Forkni recept
              </button>
            )
          }

          {
            // can delete own recipe
            (getUserFromCookies()?.username === recipeData.author.username ||
              getUserFromCookies()?.is_admin) && (
              <button type="button" onClick={() => setIsDeleting(true)}>
                Zmaž recept
              </button>
            )
          }
          <div className="recipe-title">
            <h1>{recipeData?.title}</h1>
          </div>
          <div className="recipe-body">
            <p className="recipe-author">
              (autor:{" "}
              <Link to={`/user/${recipeData?.author?.username}`}>
                {recipeData?.author?.display_name}
              </Link>
              )
            </p>

            {recipeData?.image_link && (
              <img
                src={recipeData?.image_link}
                alt="Obrázok k receptu"
                className="recipe-image"
                style={{ display: isInvalidImage ? "none" : "inline" }}
                onError={() => setIsInvalidImage(true)}
              />
            )}

            <div className="recipe-text">
              <p>{recipeData?.description}</p>
              <h2>Ingrediencie</h2>
              {recipeData?.sections?.map((section) => (
                <div key={section.id} className="recipe-section">
                  <h3>{section.name}</h3>
                  <ul className="ingredients-list">
                    {section?.used_ingredients?.map((used_ingredient) => (
                      <li key={used_ingredient.id}>
                        {gramsToAmountUsed(used_ingredient)}&nbsp;
                        {formatAmount(used_ingredient)}
                        {" - "}
                        {used_ingredient.ingredient.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <h2>Postup</h2>
              <p className="inlined" style={{ whiteSpace: "pre-line" }}>
                {recipeData?.instructions}
              </p>
              <div className="recipe-text-afterspace">&nbsp;</div>
            </div>
          </div>
        </div>
      )}
      {isDeleting && (
        <AreYouSureWindow
          mainText="Naozaj zmazať tento recept?"
          confirmText="Zmazať!"
          successCallback={deleteRecipe}
          closeCallback={() => setIsDeleting(false)}
        ></AreYouSureWindow>
      )}
    </div>
  );
}
