import { serverAddress } from "../App";

export default async function getRecipeById(id: string) {
  return await fetch(serverAddress + `/recipe/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error getting recipe ${id}`);
      }

      return response;
    })
    .then((data) => data.json())
    .catch((err) => console.error(err));
}
