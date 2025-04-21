import { useEffect, useState } from "react";
import {
  DEFAULT_INGREDIENT,
  Ingredient,
} from "../../../common-interfaces/interfaces";
import { Link } from "react-router-dom";
import EditIngredientWindow from "../EditIngredientWindow";
import AreYouSureWindow from "../AreYouSureWindow";

export default function IngredientsList() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [configuring, setConfiguring] = useState<boolean>(false);
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient>();
  const [deletingIngredient, setDeletingIngredient] = useState<boolean>(false);
  const [configuringTitle, setConfiguringTitle] = useState<string>(
    "Úprava ingrediencie"
  );

  async function fetchData() {
    fetch(`/api/ingredients/`)
      .then(async (response) => {
        const result = await response.json();

        if (response.ok) {
          const ingredients = result as Ingredient[];
          ingredients.sort(
            (a, b) =>
              new Date(b.created_on).getTime() -
              new Date(a.created_on).getTime()
          );
          setIngredients(ingredients);
        } else {
          alert(
            `Nepodarilo sa získať ingrediencie: HTTP status kód ${response.status}, ${result.message}`
          );
        }
      })
      .catch((error) => {
        alert(`Nepodarilo sa získať ingrediencie: ${error}`);
        console.error("Error fetching data:", error);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  function configIngredient(ingredient: Ingredient) {
    setSelectedIngredient(ingredient);
    setConfiguringTitle("Úprava ingrediencie");
    setConfiguring(true);
  }

  function createIngredient() {
    setSelectedIngredient(DEFAULT_INGREDIENT);
    setConfiguringTitle("Vytvoriť novú ingredienciu");
    setConfiguring(true);
  }

  function sendIngredient(ingredient: Ingredient) {
    fetch(`/api/ingredients/`, {
      method: "PUT",
      body: JSON.stringify(ingredient),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      credentials: "include",
    })
      .then(async (response: Response) => {
        if (!response.ok) {
          const json = await response.json();

          // not an admin
          if (response.status === 403) {
            alert("Na úpravu ingrediencií potrebujete administrátorské práva");
          } else if (response.status === 401) {
            alert(
              "Na úpravu ingrediencií potrebujete administrátorské práva (a vy nie ste ani prihlásení)"
            );
          } else {
            alert(`Nastala chyba: ${json.message}`);
          }
        }
      })
      .then(fetchData);
  }

  function deleteIngredient(id: number) {
    fetch(`/api/ingredients/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      credentials: "include",
    })
      .then(async (response: Response) => {
        if (!response.ok) {
          const json = await response.json();

          // not an admin
          if (response.status === 403) {
            alert(
              "Na zmazanie ingrediencií potrebujete administrátorské práva"
            );
          } else if (response.status === 401) {
            alert(
              "Na zmazanie ingrediencií potrebujete administrátorské práva (a vy nie ste ani prihlásení)"
            );
          } else {
            alert(`Nastala chyba: ${json.message}`);
          }
        }
      })
      .then(fetchData);
  }

  return (
    <>
      <title>Správa ingrediencií</title>
      <h1>Zoznam ingrediencií</h1>
      <img
        src="/plus.png"
        alt="Pridať ingredienciu"
        className="plus"
        height="50px"
        onClick={createIngredient}
      ></img>
      <table className="ingredients-table">
        <thead>
          <tr>
            <th scope="col">Názov</th>
            <th scope="col">ID</th>
            <th scope="col">Čas vytvorenia</th>
            <th scope="col">Vytvorené kým</th>
            <th scope="col">Overené</th>
            <th scope="col">Zmazať</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map((ingredient) => (
            <tr
              className={ingredient.verified ? "tr-verified" : "tr-unverified"}
              key={ingredient.id}
            >
              <td
                onClick={() => configIngredient(ingredient)}
                className="td-clickable"
              >
                {ingredient.name}
              </td>
              <td>{ingredient.id}</td>
              <td>
                {new Date(ingredient.created_on ?? "")
                  .toISOString()
                  .replace("T", " ")}
              </td>
              <td>
                {ingredient.created_by && (
                  <Link to={`/user/${ingredient.created_by}`}>
                    {ingredient.created_by}
                  </Link>
                )}
              </td>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={ingredient.verified}
                  onChange={(e) =>
                    sendIngredient({
                      ...ingredient,
                      verified: e.target.checked,
                    })
                  }
                ></input>
              </td>
              <td>
                <img
                  src="/x.png"
                  alt="Zrušiť"
                  tabIndex={0}
                  className="cancel-x cancel-button"
                  onClick={() => {
                    setSelectedIngredient(ingredient);
                    setDeletingIngredient(true);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {configuring && (
        <EditIngredientWindow
          titleText={configuringTitle}
          defaultIngredient={selectedIngredient!}
          callbackSuccess={sendIngredient}
          callbackAny={() => setConfiguring(false)}
          existingIngredients={ingredients.filter(
            (i) => i.id !== selectedIngredient?.id
          )}
        ></EditIngredientWindow>
      )}
      {deletingIngredient && (
        <AreYouSureWindow
          mainText={`Zmazať ingredienciu ${selectedIngredient?.name}?`}
          descriptionText="Spolu s ňou budú zmazané aj všetky recepty, ktoré ju používajú!"
          confirmText="Zmazať!"
          closeCallback={() => setDeletingIngredient(false)}
          successCallback={() =>
            selectedIngredient && deleteIngredient(selectedIngredient.id)
          }
        ></AreYouSureWindow>
      )}
    </>
  );
}
