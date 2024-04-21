import { serverAddress } from "../App";

export async function getRecipes() {
  return await fetch(serverAddress + "/recipes")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error getting recipe list");
      }
      return response;
    })
    .then((data) => data.json())
    .catch((error) => {
      console.log("Error getting recipe list: " + error);
      throw error;
    });
}
