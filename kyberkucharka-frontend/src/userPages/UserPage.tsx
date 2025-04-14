import { Link, useParams } from "react-router-dom";
import { DEFAULT_USER, PartialRecipe, User } from "../../../common-interfaces/interfaces";
import { useEffect, useState } from "react";

export default function UserPage() {
  const [user, setUser] = useState<User>(DEFAULT_USER);
  const [recipes, setRecipes] = useState<PartialRecipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [invalid, setInvalid] = useState<boolean>(false);


  const { slug = "0" } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`/api/users/page/${slug}`)
        .then(async (response) => {
          if (response.ok) {
            const result = await response.json();
            setUser(result.user);
            setRecipes(result.recipes);
            setLoading(false);
          } else {
            setInvalid(true);
            setLoading(false);
          }
        })
        .catch((e) => {
          console.error("Error fetching data:", e);
          setInvalid(true);
          setLoading(false);
        });};

    fetchData();
  }, [slug]);


  return (
    <>
    {loading ? "" : invalid ? (<div>
      <h1>Užívateľ nenájdený.</h1>
    </div>)
    :
    (
      <div>
        <div>
          <h1>{user.display_name}</h1>
          <p><em>{user.username}</em></p>
          <p>Registrovanô {new Date(user.registered_on ?? "").toLocaleDateString()}</p>
          {user.is_admin ? <p>Administrátor</p> : ""}
        </div>
        <h2>Recepty používateľa</h2>
        <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id} className="recipeCard">
            <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link> (autor:{" "}
            {recipe.author.display_name})
          </li>
        ))}
        </ul>
      </div>
    )}</>
  );
}
  
  