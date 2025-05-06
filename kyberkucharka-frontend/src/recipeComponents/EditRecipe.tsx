import { useEffect, useState } from "react";
import {
  DEFAULT_INGREDIENT,
  DEFAULT_RECIPE,
  Ingredient,
  OptionsList,
  Recipe,
  Section,
  Tag,
} from "../../../common-interfaces/interfaces";
import { useNavigate, useParams } from "react-router-dom";
import EditableSection from "./EditableSection";
import Login from "../userPages/Login";
import EditIngredientWindow from "../EditIngredientWindow";
import Select from "react-select";
import {
  fetchIngredients,
  fetchRecipe,
  fetchTags,
} from "../functions/communicationHelper";
import { ingredientAlphabeticalComparator } from "../functions/commonFunctions";

interface EditRecipeProps {
  submitAction: (slug: string, recipe: Recipe) => Promise<Response>;
  type: "edit" | "create" | "fork";
}

export function editSubmit(slug: string, recipe: Recipe) {
  return fetch(`/api/recipes/${slug}`, {
    method: "PUT",
    body: JSON.stringify(recipe),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    credentials: "include",
  });
}

export function createSubmit(_slug: string, recipe: Recipe) {
  return fetch(`/api/recipes`, {
    method: "POST",
    body: JSON.stringify(recipe),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    credentials: "include",
  });
}

export function forkSubmit(_slug: string, recipe: Recipe) {
  return fetch(`/api/recipes`, {
    method: "POST",
    body: JSON.stringify(recipe),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    credentials: "include",
  });
}

export default function EditRecipe({ submitAction, type }: EditRecipeProps) {
  const [recipeData, setRecipeData] = useState<Recipe>(structuredClone(DEFAULT_RECIPE));
  const [availableTags, setAvailableTags] = useState<OptionsList[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("načítavam...");
  const [nextSectionID, setNextSectionID] = useState<number>(0);
  const [sendingDisabled, setSendingDisabled] = useState<boolean>(true);
  const [creatingNewIngredient, setCreatingNewIngredient] =
    useState<boolean>(false);
  const [loginNeeded, setLoginNeeded] = useState<boolean>(false);
  const [possibleNewIngredient, setPossibleNewIngredient] =
    useState<Ingredient>(DEFAULT_INGREDIENT);
  const [newIngredientCallback, setNewIngredientCallback] = useState<
    (i: Ingredient) => void
  >(() => {}); // maybe it can be done in a different way, you are free to DM me somehow and voice your opinion
  const [selectableIngredients, setSelectableIngredients] = useState<
    Ingredient[]
  >([]);

  const { slug = "" } = useParams();

  let navigate = useNavigate();

  // fetch the recipe
  function init() {
    setLoading(true);

    const fetchData = async () => {
      fetchRecipe(
        slug,
        // success
        (result) => {
          // what the next section ID will be
          setNextSectionID(
            result.sections.reduce((x, y) => (x && x.id > y.id ? x : y), {
              id: 0,
            }).id + 1
          );

          // this will make sure that the new recipe will have the old one as the reference
          if (type == "fork") {
            const forkedFrom: Recipe = { ...result };
            result.forked_from = forkedFrom;
          }

          setRecipeData(result);
        },
        // http error
        (status, message) =>
          status === 404
            ? setMessage(`Recept nenájdený.`)
            : setMessage(`Nepodarilo sa načítať recept: ${message}`),

        // other error
        (error) =>
          setMessage(
            `Úprava receptu je aktuálne nedostupná, skúste to neskôr.\nNastala neznáma chyba: ${error}`
          )
      );
    };

    // if creating a new recipe, no data will be loaded
    if (slug !== "") {
      fetchData();
    } else {
      setRecipeData(structuredClone(DEFAULT_RECIPE));
    }
  }

  useEffect(() => {
    init();

    // fetch all ingredients
    fetchIngredients().then((result) => {
      setSelectableIngredients(result.sort(ingredientAlphabeticalComparator));
    });

    // fetch all tags
    fetchTags().then((result) =>
      setAvailableTags(
        result?.map((tag: Tag) => {
          return { value: tag.id, label: tag.name };
        })
      )
    );
  }, []);

  function submitRecipe(event?: React.SyntheticEvent<HTMLFormElement>) {
    event?.preventDefault();
    console.log("submitting:");
    console.log(recipeData);
    setSendingDisabled(true);

    // either create a new recipe or modify the existing one
    submitAction(slug, recipeData)
      .then(async (response: Response) => {
        const json = await response.json();

        console.log(json);
        if (json.newID == null) {
          // auth failed => login needed
          if (response.status === 401) {
            setLoginNeeded(true);
          } else {
            alert(`Nepodarilo sa pridať recept:\n${json.message}`);
          }

          console.error(
            `An error has occured while trying to add the new recipe: ${json.message}, ${json.error}`
          );
        } else {
          navigate(`/recipes/${json.newID}`);
        }
      })
      .then(() => setSendingDisabled(false));
  }

  useEffect(() => {
    console.log(recipeData);

    setLoading(false);

    // soft prevent sending recipe with empty title
    setSendingDisabled(recipeData.title == "");
  }, [recipeData]);

  function updateFieldFromForm(field: keyof Recipe, val: any) {
    const newRecipe: Recipe = { ...recipeData, [field]: val };
    setRecipeData(newRecipe);
  }

  // page title
  const pageTitle =
    type == "create"
      ? "Vytváranie nového receptu"
      : type == "edit"
      ? `Úprava receptu ${recipeData.title}`
      : `Forkovanie receptu ${recipeData.title}`;

  function addSection() {
    const newRecipe: Recipe = { ...recipeData };
    newRecipe.sections.push({
      id: nextSectionID,
      name: "",
      used_ingredients: [],
    });
    setNextSectionID(nextSectionID + 1);
    setRecipeData(newRecipe);
  }

  function deleteSection(index: number) {
    const newRecipe: Recipe = { ...recipeData };
    newRecipe.sections.splice(index, 1);
    setRecipeData(newRecipe);
  }

  function setSection(index: number, section: Section) {
    const newRecipe: Recipe = { ...recipeData };
    newRecipe.sections[index] = section;
    setRecipeData(newRecipe);
    console.log(`section update: ${section}`)
  }

  function createNewIngredient(
    possibleName: string,
    thenCall: (i: Ingredient) => void
  ) {
    setCreatingNewIngredient(true);
    setPossibleNewIngredient({ ...DEFAULT_INGREDIENT, name: possibleName });
    setNewIngredientCallback(() => (i: Ingredient) => {
      // add to the list of available ingredients
      setSelectableIngredients(
        [...selectableIngredients, i].sort(ingredientAlphabeticalComparator)
      );
      thenCall(i);
    }); // WHY do I have to write it like this?? why the hell is React calling my functions??
    // this is the programming equivalent of unsolicited catcalling
  }

  function editUserAddedIngredient(originalIngredient: Ingredient) {
    setCreatingNewIngredient(true);
    setPossibleNewIngredient({ ...originalIngredient });

    // replace the original with this new one
    setNewIngredientCallback(() => (editedIngredient: Ingredient) => {
      // in the list of available ingredients
      setSelectableIngredients(
        selectableIngredients
          .map((i) => (i === originalIngredient ? editedIngredient : i))
          .sort(ingredientAlphabeticalComparator)
      );

      // and in all sections
      const newRecipe: Recipe = { ...recipeData };
      newRecipe.sections = newRecipe.sections.map((s) => {
        s.used_ingredients = s.used_ingredients.map((ui) =>
          ui.ingredient === originalIngredient
            ? { id: ui.id, ingredient: editedIngredient, weight: ui.weight }
            : ui
        );
        return s;
      });
    });
  }

  // this literally just closes the "window", nothing else
  function doneCreating() {
    setCreatingNewIngredient(false);
  }

  return (
    <>
      <div className="edit-recipe recipe">
        <title>{pageTitle}</title>
        {loading ? (
          <p>{message}</p>
        ) : (
          <>
            <form className="recipe" onSubmit={submitRecipe}>
              <div className="recipe-title">
                <h1
                  id="recipe-title"
                  contentEditable="plaintext-only"
                  className="contenteditable-title"
                  suppressContentEditableWarning={true}
                  onBlur={(e) => {
                    updateFieldFromForm(
                      "title",
                      e.target.innerText.trim().replaceAll("\n", " ")
                    );
                  }}
                >
                  {recipeData?.title}
                </h1>
              </div>

              <div className="recipe-body recipe-text recipe-edit-margin">
                <div className="inliner">
                  <label htmlFor="recipe-image">Obrázok k receptu: </label>
                  <p
                    id="recipe-image"
                    contentEditable="plaintext-only"
                    className="contenteditable-image"
                    suppressContentEditableWarning={true}
                    onBlur={(e) => {
                      updateFieldFromForm(
                        "image_link",
                        e.target.innerText.trim()
                      );
                    }}
                  >
                    {recipeData?.image_link}
                  </p>
                </div>

                <div className="inliner">
                  <label htmlFor="recipe-description">Popis: </label>
                  <p
                    id="recipe-description"
                    contentEditable="plaintext-only"
                    suppressContentEditableWarning={true}
                    className="contenteditable-description"
                    onBlur={(e) => {
                      updateFieldFromForm(
                        "description",
                        e.target.innerText.trim()
                      );
                    }}
                  >
                    {recipeData?.description}
                  </p>
                </div>

                <div className="nothing-doer">
                  <h2 className="ingredients-title">Ingrediencie</h2>
                  {recipeData?.sections?.map((section, index) => (
                    <EditableSection
                      key={section.id}
                      section={section}
                      index={index}
                      deleteSection={() => {
                        deleteSection(index);
                      }}
                      setSection={setSection}
                      selectableIngredients={selectableIngredients}
                      createNewIngredient={createNewIngredient}
                      editUserAddedIngredient={editUserAddedIngredient}
                    />
                  ))}
                  <button
                    className="kyberbutton-scaled add-section-button"
                    type="button"
                    onClick={addSection}
                  >
                    Pridaj Sekciu
                  </button>
                </div>

                <div className="inliner">
                  <label htmlFor="recipe-instructions">Inštrukcie: </label>
                  <p
                    id="recipe-instructions"
                    contentEditable="plaintext-only"
                    suppressContentEditableWarning={true}
                    className="contenteditable-instructions"
                    onBlur={(e) => {
                      updateFieldFromForm(
                        "instructions",
                        e.target.innerText.trim()
                      );
                    }}
                  >
                    {recipeData?.instructions}
                  </p>
                </div>

                <h2>Tagy</h2>
                <Select
                  className="select-thing"
                  isLoading={loading}
                  options={availableTags}
                  isMulti
                  loadingMessage={() => `Načítavam...`}
                  noOptionsMessage={() => "...žiadne tagy s takýmto názvom"}
                  placeholder="Pridaj tagy k receptu..."
                  value={recipeData.tags?.map((tag) => {
                    return { value: tag.id, label: tag.name };
                  })}
                  onChange={(e) => {
                    const newRecipe: Recipe = { ...recipeData };
                    newRecipe.tags = e?.map((x) => {
                      return { id: x.value, name: x.label };
                    });
                    setRecipeData(newRecipe);
                  }}
                />

                <div>
                  <button
                    className="kyberbutton"
                    type="submit"
                    disabled={sendingDisabled}
                  >
                    Hotovo
                  </button>
                </div>
              </div>
            </form>
          </>
        )}
      </div>
      {creatingNewIngredient && (
        <EditIngredientWindow
          titleText="Vytvorenie novej ingrediencie"
          defaultIngredient={{
            ...possibleNewIngredient,
          }}
          callbackSuccess={newIngredientCallback}
          callbackAny={doneCreating}
          existingIngredients={selectableIngredients.filter(
            (i) => i.name !== possibleNewIngredient.name
          )}
        />
      )}
      {loginNeeded && (
        <Login
          suggestRegistering={false}
          customMessage="Vaše prihlásenie vypršalo; prosím prihláste sa znova"
          closeCallback={() => {
            setLoginNeeded(false);
          }}
          successCallback={submitRecipe}
        ></Login>
      )}
    </>
  );
}
