import { useNavigate, useParams } from "react-router-dom";
import {
  DEFAULT_USER,
  PartialRecipe,
  User,
} from "../../../common-interfaces/interfaces";
import { useEffect, useState } from "react";
import RecipeCard from "../recipeComponents/RecipeCard";
import AreYouSureWindow from "../AreYouSureWindow";
import { useCookies } from "react-cookie";

export default function UserPage() {
  const [user, setUser] = useState<User>(DEFAULT_USER);
  const [recipes, setRecipes] = useState<PartialRecipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [invalid, setInvalid] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [userCookie, _setUserCookie, _removeUserCookie] = useCookies(
    ["userData"],
    {}
  );

  const { slug = "0" } = useParams();
  let navigate = useNavigate();

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
        });
    };

    fetchData();
  }, [slug]);

  function deleteUser() {
    fetch(`/api/users/${user.username}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      credentials: "include",
    }).then(async (response: Response) => {
      if (response.ok) {
        alert("Užívateľ úspešne zmazaný.");
        navigate("/");
      } else {
        alert("Nepodarilo sa zmazať užívateľa.");
        setLoading(false);
      }
    });
  }

  return (
    <>
      {loading ? (
        ""
      ) : invalid ? (
        <div>
          <h1>Užívateľ nenájdený.</h1>
        </div>
      ) : (
        <div className="user-page">
          {(userCookie.userData?.username === user.username ||
            userCookie.userData?.is_admin) && (
            <button
              className="kyberbutton delete-user"
              type="button"
              onClick={() => setIsDeleting(true)}
            >
              Zmazať účet
            </button>
          )}
          <div>
            <h1>{user.display_name}</h1>
            <p>
              Používateľské meno: <em>{user.username}</em>
            </p>
            <p>
              Registrovanô{" "}
              {new Date(user.registered_on ?? "").toLocaleDateString()}
            </p>
            {user.is_admin && (
              <p>
                Tento užívateľ je <em>administrátor</em>.
              </p>
            )}
          </div>
          <h2>
            {recipes.length > 0
              ? `Recepty používateľa`
              : `Užívateľ nevytvoril zatiaľ žiadne recepty.`}
          </h2>
          <div className="card-container">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe}></RecipeCard>
            ))}
          </div>
        </div>
      )}
      {isDeleting && (
        <AreYouSureWindow
          mainText="Naozaj zmazať užívateľa?"
          descriptionText="Touto akciou sa zmažú aj všetky recepty užívateľa. Táto akcia je nenávratná!"
          confirmText="Zmazať!"
          successCallback={deleteUser}
          closeCallback={() => setIsDeleting(false)}
        ></AreYouSureWindow>
      )}
    </>
  );
}
