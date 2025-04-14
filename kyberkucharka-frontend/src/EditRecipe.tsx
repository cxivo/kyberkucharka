import { useEffect, useState } from "react";
import {
  DEFAULT_INGREDIENT,
  DEFAULT_RECIPE,
  Ingredient,
  Recipe,
  Section,
} from "../../common-interfaces/interfaces";
import { useNavigate, useParams } from "react-router-dom";
import EditableSection from "./EditableSection";
import Login from "./userPages/Login";
import EditIngredientWindow from "./EditIngredientWindow";

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
  const [recipeData, setRecipeData] = useState<Recipe>(DEFAULT_RECIPE);
  const [loading, setLoading] = useState<boolean>(true);
  const [nextSectionID, setNextSectionID] = useState<number>(0);
  const [sendingDisabled, setSendingDisabled] = useState<boolean>(true);
  const [creatingNewIngredient, setCreatingNewIngredient] =
    useState<boolean>(false);
  const [loginNeeded, setLoginNeeded] = useState<boolean>(false);
  const [possibleNewIngredientName, setPossibleNewIngredientName] =
    useState<string>("");
  const [newIngredientCallback, setNewIngredientCallback] = useState<
    (i: Ingredient) => void
  >(() => {}); // maybe it can be done in a different way, you are free to DM me somehow and voice your opinion
  const [selectableIngredients, setSelectableIngredients] = useState<
    Ingredient[]
  >([]);

  const { slug = "" } = useParams();

  let navigate = useNavigate();

  // fetch the recipe
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/recipes/${slug}`);
        const result = (await response.json()) as Recipe;

        // what the next section ID will be
        setNextSectionID(
          result.sections.reduce((x, y) => (x && x.id > y.id ? x : y), {
            id: 0,
          }).id + 1
        );

        const newRecipe = { ...result };

        // this will make sure that the new recipe will have the old one as the reference
        if (type == "fork") {
          newRecipe.forked_from = result;
        }

        setRecipeData(newRecipe);
        setLoading(false);
        setSendingDisabled(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
        setSendingDisabled(false);
      }
    };

    // if creating a new recipe, no data will be loaded
    if (slug !== "") {
      fetchData();
    } else {
      setRecipeData(DEFAULT_RECIPE);
      setLoading(false);
      setSendingDisabled(false);
    }
  }, []);

  // fetch all ingredients
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          //`${serverURL}/api/ingredients/name/${debouncedText}`
          `/api/ingredients`
        );
        const result = (await response.json()) as Ingredient[];

        setSelectableIngredients(result);
        console.log(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  function submitRecipe(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
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

  useEffect(() => console.log(recipeData), [recipeData]);

  function updateFieldFromForm(field: keyof Recipe, val: any) {
    const newRecipe: Recipe = { ...recipeData, [field]: val };
    setRecipeData(newRecipe);
  }

  // page title
  const pageTitle =
    type == "create"
      ? "Vytváranie receptu"
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
  }

  function createNewIngredient(
    possibleName: string,
    thenCall: (i: Ingredient) => void
  ) {
    setCreatingNewIngredient(true);
    setPossibleNewIngredientName(possibleName);
    setNewIngredientCallback(() => thenCall); // WHY do I have to write it like this?? why the hell is React calling my functions??
    // this is the programming equivalent of unsolicited catcalling
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
          <p>načítavam...</p>
        ) : (
          <>
            <form className="recipe" onSubmit={submitRecipe}>
              <div className="recipe-title">
                <h1
                  id="recipe-title"
                  contentEditable="plaintext-only"
                  suppressContentEditableWarning={true}
                  onBlur={(e) => {
                    updateFieldFromForm("title", e.target.innerText.trim());
                  }}
                >
                  {recipeData?.title || "<Sem vložte názov receptu>"}
                </h1>
              </div>

              <div className="recipe-body recipe-text recipe-edit-margin">
                <div className="inliner">
                  <label htmlFor="recipe-image">Obrázok k receptu: </label>
                  <p
                    id="recipe-image"
                    contentEditable="plaintext-only"
                    suppressContentEditableWarning={true}
                    onBlur={(e) => {
                      updateFieldFromForm(
                        "image_link",
                        e.target.innerText.trim()
                      );
                    }}
                  >
                    {recipeData?.image_link ||
                      "<Sem môžete vložiť URL obrázku k receptu>"}
                  </p>
                </div>

                <div className="inliner">
                  <label htmlFor="recipe-description">Popis: </label>
                  <p
                    id="recipe-description"
                    contentEditable="plaintext-only"
                    suppressContentEditableWarning={true}
                    onBlur={(e) => {
                      updateFieldFromForm(
                        "description",
                        e.target.innerText.trim()
                      );
                    }}
                  >
                    {recipeData?.description || "<Sem vložte popis receptu>"}
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
                    />
                  ))}
                  <button
                    className="kyberbutton"
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
                    onBlur={(e) => {
                      updateFieldFromForm(
                        "instructions",
                        e.target.innerText.trim()
                      );
                    }}
                  >
                    {recipeData?.instructions ||
                      "<Sem vložte inštrukcie k receptu>"}
                  </p>
                </div>

                <div>
                  <input
                    type="submit"
                    disabled={sendingDisabled}
                    value="Hotovo"
                  />
                </div>

                {/*   <Select
              className="select-thing"
              isLoading={loading}
              options={optionsList}
              onChange={selectChange}
              loadingMessage={() => `Načítavam...`}
              noOptionsMessage={() => "...žiadne tagy s takýmto názvom"}
              placeholder="Pridaj tagy k receptu..."
              value={
                selectedOption
                  ? {
                      value: selectedOption?.id ?? 0,
                      label: selectedOption?.name ?? "",
                    }
                  : null
              }
            /> */}
              </div>
            </form>
          </>
        )}
      </div>
      {creatingNewIngredient && (
        <EditIngredientWindow
          titleText="Vytvorenie novej ingrediencie"
          defaultIngredient={{
            ...DEFAULT_INGREDIENT,
            name: possibleNewIngredientName,
          }}
          callbackSuccess={newIngredientCallback}
          callbackAny={doneCreating}
          existingIngredients={selectableIngredients}
        />
      )}
      {loginNeeded && (
        <Login
          suggestRegistering={false}
          customMessage="Vaše prihlásenie vypršalo; prosím prihláste sa znova"
          closeCallback={() => {
            setLoginNeeded(false);
          }}
        ></Login>
      )}
    </>
  );
}
