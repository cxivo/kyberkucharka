import { useEffect, useState } from "react";
import {
  DEFAULT_RECIPE,
  Ingredient,
  Recipe,
  Section,
} from "../../common-interfaces/interfaces";
import { useNavigate, useParams } from "react-router-dom";
import { serverURL } from "./main";
import EditableSection from "./EditableSection";
import CreateIngredient from "./CreateIngredient";

interface EditRecipeProps {
  submitAction: (slug: string, recipe: Recipe) => Promise<Response>;
  type: "edit" | "create" | "fork";
}

export function editSubmit(slug: string, recipe: Recipe) {
  return fetch(`${serverURL}/api/recipes/${slug}`, {
    method: "PUT",
    body: JSON.stringify(recipe),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    credentials: "include",
  });
}

export function createSubmit(_slug: string, recipe: Recipe) {
  return fetch(`${serverURL}/api/recipes`, {
    method: "POST",
    body: JSON.stringify(recipe),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    credentials: "include",
  });
}

export function forkSubmit(_slug: string, recipe: Recipe) {
  return fetch(`${serverURL}/api/recipes`, {
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
        const response = await fetch(`${serverURL}/api/recipes/${slug}`);
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
          `${serverURL}/api/ingredients`
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
      .then((response: Response) => response.json())
      .then((json) => {
        console.log(json);
        if (json.newID == null) {
          alert(`Nepodarilo sa pridať recept:\n${json.message}`);
          console.error(
            `An error has occured while trying to add the new recipe: ${json.message}, ${json.error}`
          );
        } else {
          navigate(`/recipes/${json.newID}`);
        }
      })
      .then(() => setSendingDisabled(false));
  }

  function updateFieldFromForm(
    field: keyof Recipe,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const newRecipe: Recipe = { ...recipeData, [field]: e.target.value };
    setRecipeData(newRecipe);
  }

  // page title
  const pageTitle =
    type == "create"
      ? "Vytváranie receptu"
      : type == "edit"
      ? `Úprava receptu ${recipeData.title}`
      : `Forkovanie receptu ${recipeData.title}`;

  // form elements
  const titleElement = (
    <input
      type="text"
      id="recipe-title"
      defaultValue={recipeData?.title ?? ""}
      onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
        updateFieldFromForm("title", e);
      }}
    />
  );
  const imageLinkElement = (
    <input
      type="text"
      id="recipe-image"
      defaultValue={recipeData?.image_link ?? ""}
      onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
        updateFieldFromForm("image_link", e);
      }}
    />
  );
  const descriptionElement = (
    <textarea
      name="recipe-description"
      id="recipe-description"
      defaultValue={recipeData?.description ?? ""}
      onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
        updateFieldFromForm("description", e);
      }}
    />
  );
  const instructionsElement = (
    <textarea
      name="recipe-instructions"
      id="recipe-instructions"
      defaultValue={recipeData?.instructions ?? ""}
      onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
        updateFieldFromForm("instructions", e);
      }}
    />
  );

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
    <div className="edit-recipe recipe">
      <title>{pageTitle}</title>
      {loading ? (
        <p>načítavam...</p>
      ) : (
        <>
          <form onSubmit={submitRecipe}>
            <div>
              <label htmlFor="recipe-title">Názov receptu: </label>
              {titleElement}
            </div>

            <div>
              <label htmlFor="recipe-image">Obrázok k receptu: </label>
              {imageLinkElement}
            </div>

            <label htmlFor="recipe-description">Popis: </label>
            {descriptionElement}

            <div id="ingredients">
              <h3>Ingrediencie</h3>
              {recipeData?.sections.map((section, index) => (
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
              <button type="button" onClick={addSection}>
                Pridaj Sekciu
              </button>
            </div>

            <label htmlFor="recipe-instructions">Inštrukcie: </label>
            {instructionsElement}

            <div>
              <input type="submit" disabled={sendingDisabled} value="Hotovo" />
            </div>
          </form>
          {creatingNewIngredient ? (
            <div className="creatingNewIngredient">
              <div className="creatingNewIngredientContent">
                <CreateIngredient
                  possibleName={possibleNewIngredientName}
                  thenCall={newIngredientCallback}
                  afterYouAreDone={doneCreating}
                  existingIngredients={selectableIngredients}
                />
              </div>
            </div>
          ) : (
            ""
          )}
        </>
      )}
    </div>
  );
}
