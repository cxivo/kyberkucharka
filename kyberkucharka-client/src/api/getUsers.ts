import { serverAddress } from "../App";

export async function getUsers() {
  return await fetch(serverAddress + "/users")
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
