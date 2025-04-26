import { Ingredient, Recipe, Tag } from "../../../common-interfaces/interfaces";

async function fetchData(path: string): Promise<any> {
  return await fetch(path)
    .then(async (response) => {
      const result = await response.json();

      if (response.ok) {
        return result;
      } else {
        console.error(
          `A problem (HTTPS status code ${response.status}) has occured when from path ${path}: ${result.message}`
        );

        return [];
      }
    
    })
    .catch((error) => {
      console.error(`Error fetching from ${path}`, error);
      return [];
    });
}

export function fetchIngredients(): Promise<Ingredient[]> {
  return fetchData(`/api/ingredients`);
}

export function fetchTags(): Promise<Tag[]> {
  return fetchData(`/api/tags`);
}

export async function fetchRecipe(
  id: string,
  success: (result: Recipe) => void,
  httpError: (status: number, message: string) => void,
  error: (e: Error) => void
): Promise<void> {
  fetch(`/api/recipes/${id}`)
    .then(async (response) => {
      const result = await response.json();
      if (response.ok) {
        success(result);
      } else {
        httpError(response.status, result.message);
      }
    })
    .catch(error);
}
