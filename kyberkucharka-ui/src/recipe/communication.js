export async function getRecipes() {
  return fetch("https://kyberkucharka-server.vercel.app/api/hello")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error getting recipe list");
      }
      return response.json().recipes.rows;
    })
    .catch((error) => {
      // Better way would be to throw error here and let the client handle (e.g. show error message)
      // Returning empty array for simplicity only!
      console.log("Error getting messages");
      return [];
    });
}
