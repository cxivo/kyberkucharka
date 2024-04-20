export async function getUsers() {
  return await fetch("http://localhost:3001/users")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error getting user list");
      }
      return response;
    })
    .then((data) => data.json())
    .catch((error) => {
      console.log("Error getting user list: " + error);
      throw error;
    });
}
