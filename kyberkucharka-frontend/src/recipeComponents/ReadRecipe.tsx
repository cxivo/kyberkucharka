import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  DEFAULT_RECIPE,
  measurement_method,
  measurement_method_list,
  Recipe,
  Section,
} from "../../../common-interfaces/interfaces";
import AreYouSureWindow from "../AreYouSureWindow";
import RecipeList from "../RecipeList";
import RecipeCard from "./RecipeCard";
import { Tooltip } from "react-tooltip";
import { useCookies } from "react-cookie";
import DisplayUsedIngredient from "./DisplayUsedIngredient";
import {
  getMeasurementMethodName,
  roundToAtMostDecimals,
} from "../functions/unitHelper";
import {
  fetchRecipesForkedFrom,
  fetchRecipesSimilarToNotForks,
} from "../functions/communicationHelper";

export default function ReadRecipe() {
  const [recipeData, setRecipeData] = useState<Recipe>(DEFAULT_RECIPE);
  const [loading, setLoading] = useState<boolean>(true);
  const [isInvalidImage, setIsInvalidImage] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("načítavam...");
  const [userCookie, _setUserCookie, _removeUserCookie] = useCookies(
    ["userData"],
    {}
  );
  const [measurementMethod, setMeasurementMethod] =
    useState<measurement_method>("primary");
  const [scale, setScale] = useState<number>(1);

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

  useEffect(() => {
    if (isNaN(scale)) {
      setScale(0);
    }
  }, [scale]);

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

  function individuallyChangedIngredientUnit() {
    setMeasurementMethod("various");
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
          <div className="recipe-top-buttons">
            {
              // can edit own recipe
              (userCookie.userData?.username === recipeData.author.username ||
                userCookie.userData?.is_admin) && (
                <button
                  type="button"
                  className="kyberbutton"
                  onClick={() => navigate(`/edit/${slug}`)}
                >
                  Uprav recept
                </button>
              )
            }

            {
              // can fork anyone's recipe
              userCookie.userData != null && (
                <button
                  type="button"
                  className="kyberbutton"
                  onClick={() => navigate(`/fork/${slug}`)}
                >
                  Forkni recept
                </button>
              )
            }

            {
              // can delete own recipe
              (userCookie.userData?.username === recipeData.author.username ||
                userCookie.userData?.is_admin) && (
                <button
                  type="button"
                  className="kyberbutton"
                  onClick={() => setIsDeleting(true)}
                >
                  Zmaž recept
                </button>
              )
            }
          </div>

          {
            // is a fork?
            recipeData.forked_from != null && (
              <RecipeCard
                recipe={recipeData.forked_from}
                isFork={true}
              ></RecipeCard>
            )
          }
          <div className="main-and-sidebar">
            <main className="recipe-notebook">
              <div className="recipe-title">
                <h1
                  data-tooltip-id="recipe-title-tooltip"
                  data-tooltip-content={recipeData.title}
                >
                  {recipeData?.title}
                </h1>
                <Tooltip id="recipe-title-tooltip" />
              </div>
              <div className="recipe-body">
                <div className="recipe-author">
                  (autor:{" "}
                  <Link to={`/user/${recipeData?.author?.username}`}>
                    {recipeData?.author?.display_name}
                  </Link>
                  )
                </div>

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

                  <div>
                    Merať v:{" "}
                    <select
                      autoFocus
                      className="inconspicuous-select"
                      onInput={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        setMeasurementMethod(
                          e.target.value as measurement_method
                        );
                      }}
                      value={measurementMethod}
                    >
                      {measurement_method_list.map((method) => (
                        <option
                          value={method}
                          key={method}
                          disabled={method == "various"}
                        >
                          {getMeasurementMethodName(method)}
                        </option>
                      ))}
                    </select>
                    <br />
                    Počet porcií:{" "}
                    <input
                      className="p-like"
                      type="number"
                      step={0.1}
                      min={0.1}
                      value={scale > 0 ? scale : ""}
                      onInput={(x) => {
                        setScale(parseFloat(x.currentTarget.value));
                      }}
                      onBlur={(e) => {
                        e.currentTarget.value = e.currentTarget.value || "0";
                      }}
                    />
                  </div>

                  {recipeData?.sections?.map((section) => (
                    <div key={section.id} className="recipe-section">
                      <h3>{section.name}</h3>
                      <ul className="ingredients-list">
                        {section?.used_ingredients?.map((used_ingredient) => (
                          <DisplayUsedIngredient
                            used_ingredient={used_ingredient}
                            measurementMethod={measurementMethod}
                            key={used_ingredient.id}
                            scale={scale}
                            changeUnitCallback={
                              individuallyChangedIngredientUnit
                            }
                          />
                        ))}
                      </ul>
                    </div>
                  ))}
                  <div
                    data-tooltip-id="recipe-mass-tooltip"
                    data-tooltip-content="Hmotnosť spočítaná z hmotností z ingrediencií; nerátajú sa straty"
                  >
                    Celková hmotnosť výsledku:{" "}
                    {roundToAtMostDecimals(
                      scale *
                        recipeData.sections.reduce<number>(
                          (a: number, b: Section) =>
                            a +
                            b.used_ingredients.reduce<number>(
                              (c, d) => c + d.weight,
                              0
                            ),
                          0
                        )
                    )}{" "}
                    g
                    <Tooltip id="recipe-mass-tooltip" />
                  </div>
                  <h2>Postup</h2>
                  <p style={{ whiteSpace: "pre-line" }}>
                    {recipeData?.instructions}
                  </p>
                  <h2>Tagy</h2>
                  {recipeData.tags?.length > 0 ? (
                    <p>
                      {recipeData.tags?.map((tag, index) => (
                        <span key={index}>
                          <Link
                            style={{ display: "inline-block" }}
                            to={
                              `/search?` +
                              new URLSearchParams({
                                requiredTags: `[${tag.id}]`,
                              })
                            }
                          >
                            {tag.name}
                          </Link>
                          {index !== recipeData.tags?.length - 1 && ", "}
                        </span>
                      ))}
                    </p>
                  ) : (
                    <p>
                      <em>Tento recept nemá žiadne tagy.</em>
                    </p>
                  )}

                  <div className="recipe-text-afterspace">&nbsp;</div>
                </div>
              </div>
            </main>
            <aside>
              <RecipeList
                dataSource={fetchRecipesForkedFrom(recipeData.id)}
                flexColumn={true}
                displayText="Forky receptu"
              ></RecipeList>

              <RecipeList
                dataSource={fetchRecipesSimilarToNotForks(recipeData.id)}
                flexColumn={true}
                displayText="Podobné recepty"
              ></RecipeList>
            </aside>
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
