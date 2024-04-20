export default async function getUserById(id: string) {
  return await fetch(`http://localhost:3001/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error getting user ${id}`);
      }

      return response;
    })
    .then((data) => data.json())
    .catch((err) => console.error(err));
}
