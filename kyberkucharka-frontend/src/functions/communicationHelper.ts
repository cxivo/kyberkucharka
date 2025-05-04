import { Ingredient, Recipe, Tag } from "../../../common-interfaces/interfaces";
import {
  ingredientAlphabeticalComparator,
  tagAlphabeticalComparator,
  tagUsageComparator,
} from "./commonFunctions";

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
  return fetchData(`/api/ingredients`).then((x: Ingredient[]) =>
    x.sort(ingredientAlphabeticalComparator)
  );
}

export function fetchTags(): Promise<Tag[]> {
  return fetchData(`/api/tags`).then((x: Tag[]) =>
    x.sort(tagAlphabeticalComparator)
  );
}

export function fetchTagsDetailed(): Promise<Tag[]> {
  return fetchData(`/api/tags/detailed`).then((x: Tag[]) =>
    x.sort(tagUsageComparator)
  );
}

/* export type FetchingFunction = (
  success: (result: Recipe[]) => void,
  httpError: (status: number, message: string) => void,
  error: (e: Error) => void
) => void; */

const COMMON_RECIPE_THEN = async (response: Response) => {
  const result = await response.json();
  if (response.ok) {
    return result;
  } else {
    console.error(
      "An error has occured in fetchRecipesSimilarTo: ",
      response.status,
      result.message
    );
    return null;
  }
};

const COMMON_RECIPE_CATCH = async (error: Error) => {
  console.error("An error has occured in fetchRecipesSimilarTo: ", error);
  return null;
};


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


export async function fetchAllRecipes(): Promise<Recipe[]> {
  return fetch(`/api/recipes`)
    .then(COMMON_RECIPE_THEN)
    .catch(COMMON_RECIPE_CATCH);
}

export async function fetchLatestRecipes(): Promise<Recipe[]> {
  return fetch(`/api/recipes/latest`)
    .then(COMMON_RECIPE_THEN)
    .catch(COMMON_RECIPE_CATCH);
}

export async function fetchRecipesSimilarTo(
  relatedRecipeID: number
): Promise<Recipe[]> {
  return fetch(`/api/recipes/related/${relatedRecipeID}`)
    .then(COMMON_RECIPE_THEN)
    .catch(COMMON_RECIPE_CATCH);
}

export async function fetchRecipesForkedFrom(
  originalRecipeID: number
): Promise<Recipe[]> {
  return fetch(`/api/recipes/forked-from/${originalRecipeID}`)
    .then(COMMON_RECIPE_THEN)
    .catch(COMMON_RECIPE_CATCH);
}

export async function fetchRecipesSimilarToNotForks(
  relatedRecipeID: number
): Promise<Recipe[]> {
  return fetch(`/api/recipes/related-not-fork/${relatedRecipeID}`)
    .then(COMMON_RECIPE_THEN)
    .catch(COMMON_RECIPE_CATCH);
}

export async function fetchRecipesWithTag(tagID: number): Promise<Recipe[]> {
  return fetch(`/api/recipes/by-tag/${tagID}`)
    .then(COMMON_RECIPE_THEN)
    .catch(COMMON_RECIPE_CATCH);
}

