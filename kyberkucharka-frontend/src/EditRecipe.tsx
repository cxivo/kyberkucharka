import { useEffect, useState } from "react";
import { DEFAULT_RECIPE, Recipe, Section } from "../../common-interfaces/interfaces";
import { useParams } from "react-router-dom";
import { serverURL } from "./main";
import EditableSection from "./EditableSection";


export default function EditRecipe() {
  const [recipeData, setRecipeData] = useState<Recipe>(DEFAULT_RECIPE);
  const [loading, setLoading] = useState<boolean>(true);
  const [nextSectionID, setNextSectionID] = useState<number>(0);

  const { slug = "" } = useParams();

  useEffect(() => {
      const fetchData = async () => {
        try {
          // Simulating a delay to show loading state
          setTimeout(async () => {
            const response = await fetch(
              `${serverURL}/api/recipes/${slug}`
            );
            const result = (await response.json()) as Recipe;
            
            // what the next section ID will be
            setNextSectionID(result.sections.reduce((x, y) => x && x.id > y.id ? x : y, {id: 0}).id + 1);
            
            setRecipeData(result);
            setLoading(false);
          }, 1000);
        } catch (error) {
          console.error("Error fetching data:", error);
          setLoading(false);
        }
      };
  
      if (slug !== "") {
        fetchData();
      } else {
        setLoading(false);
      }
    }, []);


    function submitRecipe(event: React.SyntheticEvent<HTMLFormElement>) {
      event.preventDefault();
      console.log(event.currentTarget.elements);
    }

    function updateFieldFromForm(field: keyof Recipe, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
      const newRecipe: Recipe = { ...recipeData, [field]: e.target.value};
      setRecipeData(newRecipe);
    }

    // form elements
    const titleElement = <input type="text" id="recipe-title" defaultValue={recipeData?.title ?? ""} 
      onInput={(e: React.ChangeEvent<HTMLInputElement>) => {updateFieldFromForm("title", e)}}/>;
    const imageLinkElement = <input type="text" id="recipe-image" defaultValue={recipeData?.image_link ?? ""} 
      onInput={(e: React.ChangeEvent<HTMLInputElement>) => {updateFieldFromForm("image_link", e)}}/>;
    const descriptionElement = <textarea name="recipe-description" id="recipe-description" defaultValue={recipeData?.description ?? ""} 
      onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) => {updateFieldFromForm("description", e)}}/>;
    const instructionsElement = <textarea name="recipe-instructions" id="recipe-instructions" defaultValue={recipeData?.instructions ?? ""} 
      onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) => {updateFieldFromForm("instructions", e)}}/>;

    function addSection() {
      const newRecipe: Recipe = { ...recipeData};
      newRecipe.sections.push({id: nextSectionID, name: "", used_ingredients: []});
      setNextSectionID(nextSectionID + 1);
      setRecipeData(newRecipe);
    }

    function deleteSection(index: number) {
      const newRecipe: Recipe = { ...recipeData};
      newRecipe.sections.splice(index, 1);
      setRecipeData(newRecipe);
    }

    function setSection(index: number, section: Section) {
      const newRecipe: Recipe = { ...recipeData};
      newRecipe.sections[index] = section;
      setRecipeData(newRecipe);
    }

    useEffect(() => {
      console.log(recipeData); // This will log the updated state
    }, [recipeData]); 


    return (
      <div className="edit-recipe">
        {loading ? (
          <p>načítavam...</p>
        ) : (
          <form onSubmit={submitRecipe}>
            <div>
              <label htmlFor="recipe-title">Názov receptu: </label>
              {titleElement}
            </div>

            <div>
              <label htmlFor="recipe-image">Obrázok k receptu: </label>
              {imageLinkElement}
            </div>

            <p>autor: {recipeData?.author.display_name}</p>

            <label htmlFor="recipe-description">Popis: </label>
            {descriptionElement}

            <div id="ingredients">
              <h3>Ingrediencie</h3>
              {recipeData?.sections.map((section, index) => (
                <EditableSection key={section.id} section={section} index={index} deleteSection={() => {deleteSection(index)}} 
                  setSection={setSection} />
              ))}
              <button type="button" onClick={addSection}>Pridaj Sekciu</button>
            </div>

            <label htmlFor="recipe-instructions">Inštrukcie: </label>
            {instructionsElement}

            <div>
              <input type="submit" value="Hotovo" />
              <input type="button" onClick={() => {console.log(recipeData)}} value="recipeData"/>
            </div>
          </form>
        )}
      </div>
    );
}
