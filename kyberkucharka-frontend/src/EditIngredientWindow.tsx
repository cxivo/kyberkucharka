import { useEffect, useState } from "react";
import {
  Ingredient,
  measurement_unit,
  measurement_unit_list,
} from "../../common-interfaces/interfaces";
import {
  getUnitName,
  mustHaveDensity,
  mustHaveMassPerPiece,
} from "./functions/UnitHelper";

interface EditIngredientWindowProps {
  titleText: string;
  defaultIngredient: Ingredient;
  callbackSuccess: (i: Ingredient) => void;
  callbackAny: () => void;
  existingIngredients: Ingredient[];
}

const DEFAULT_DENSITY = 1.0;
const DEFAULT_MASS_PER_PIECE = 50;

export default function EditIngredientWindow({
  titleText,
  defaultIngredient,
  callbackSuccess,
  callbackAny,
  existingIngredients,
}: EditIngredientWindowProps) {
  const [ingredient, setIngredient] = useState<Ingredient>(defaultIngredient);
  const [hasDensity, setHasDensity] = useState<boolean>(
    defaultIngredient.density != null
  );
  const [hasPieces, setHasPieces] = useState<boolean>(
    defaultIngredient.mass_per_piece != null
  );
  const [nameIsDuplicate, setNameIsDuplicate] = useState<boolean>(false);

  function updateFieldFromForm(field: keyof Ingredient, value: any) {
    const newIngredient: Ingredient = { ...ingredient, [field]: value };
    setIngredient(newIngredient);
  }

  // if the user is evil and decided to create another ingredient with the same name
  useEffect(() => {
    setNameIsDuplicate(
      existingIngredients.find((i) => i.name === defaultIngredient.name) != null
    );
  }, []);

  useEffect(() => {
    console.log(ingredient);
  }, [ingredient]);

  function submitIngredient(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const formJSON = Object.fromEntries(formData.entries());
    console.log(formJSON);

    callbackSuccess(ingredient);
    callbackAny();
  }

  return (
    <div className="floatingWindow">
      <div className="floatingWindowContent">
        <img
          src="/x-white.png"
          alt="Zrušiť"
          tabIndex={0}
          className="cancel-x cancel-button"
          onClick={callbackAny}
        />

        <h1>{titleText}</h1>
        <form onSubmit={submitIngredient}>
          <div>
            <div>
              <label htmlFor="ingredient-name">Názov ingrediencie: </label>
              <input
                type="text"
                id="ingredient-name"
                name="ingredient-name"
                defaultValue={defaultIngredient.name}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                  // check whether the name is duplicate
                  setNameIsDuplicate(
                    existingIngredients.find(
                      (i) => i.name === e.target.value
                    ) != null
                  );
                  updateFieldFromForm("name", e.target.value);
                }}
              />
            </div>
          </div>
          <div>
            <div>
              <label
                htmlFor="ingredient-primary-unit"
                title="Najčastejšie používaný spôsob merania (ak je viac možností, uprednostnite gramy)"
              >
                Primárne meraná v:{" "}
              </label>
              <select
                name="ingredient-primary-unit"
                id="ingredient-primary-unit"
                onInput={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  // unit change-related changes
                  const newIngredient: Ingredient = {
                    ...ingredient,
                    primary_unit: e.target.value as measurement_unit,
                  };

                  setHasDensity(
                    hasDensity ||
                      mustHaveDensity(e.target.value as measurement_unit)
                  );
                  if (mustHaveDensity(e.target.value as measurement_unit)) {
                    newIngredient.density ??= DEFAULT_DENSITY;
                  }
                  setHasPieces(
                    hasPieces ||
                      mustHaveMassPerPiece(e.target.value as measurement_unit)
                  );
                  if (
                    mustHaveMassPerPiece(e.target.value as measurement_unit)
                  ) {
                    newIngredient.mass_per_piece ??= DEFAULT_MASS_PER_PIECE;
                  }

                  setIngredient(newIngredient);
                }}
              >
                {measurement_unit_list.map((unit) => (
                  <option key={unit} value={unit}>
                    {getUnitName(unit)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <div className="inliner">
              <input
                type="checkbox"
                id="has-density"
                name="has-density"
                disabled={mustHaveDensity(ingredient.primary_unit)}
                checked={hasDensity || mustHaveDensity(ingredient.primary_unit)}
                onChange={(e) => {
                  setHasDensity(
                    e.target.checked || mustHaveDensity(ingredient.primary_unit)
                  );
                  updateFieldFromForm(
                    "density",
                    e.target.checked ? DEFAULT_DENSITY : undefined
                  );
                }}
              ></input>
              <label
                htmlFor="has-density"
                title="Pri ingredienciách meraných v mililitroch a lyžičkách je tento atribút vyžadovaný."
              >
                Ingrediencia má rozumne merateľný objem
              </label>
            </div>
            {hasDensity && (
              <div>
                <label htmlFor="ingredient-density">Hustota v g/cm³: </label>
                <input
                  type="number"
                  id="ingredient-density"
                  name="ingredient-density"
                  disabled={!hasDensity}
                  value={
                    hasDensity ? ingredient.density ?? DEFAULT_DENSITY : ""
                  }
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    updateFieldFromForm("density", e.target.value);
                  }}
                  onBlur={(e) => {
                    e.currentTarget.value = e.currentTarget.value || "0";
                  }}
                />
              </div>
            )}
          </div>
          <div>
            <div>
              <input
                type="checkbox"
                id="has-pieces"
                name="has-pieces"
                disabled={mustHaveMassPerPiece(ingredient.primary_unit)}
                checked={
                  hasPieces || mustHaveMassPerPiece(ingredient.primary_unit)
                }
                onChange={(e) => {
                  setHasPieces(
                    e.target.checked ||
                      mustHaveMassPerPiece(ingredient.primary_unit)
                  );
                  updateFieldFromForm(
                    "mass_per_piece",
                    e.target.checked ||
                      mustHaveMassPerPiece(ingredient.primary_unit)
                      ? DEFAULT_MASS_PER_PIECE
                      : undefined
                  );
                }}
              ></input>
              <label
                htmlFor="has-pieces"
                title="Pri ingredienciách meraných v kusoch a baleniach je tento atribút vyžadovaný."
              >
                Je možné merať na kusy/balíky
              </label>
            </div>
            {hasPieces && (
              <div>
                <label htmlFor="ingredient-pieces">Gramov na kus/balík: </label>
                <input
                  type="number"
                  id="ingredient-pieces"
                  name="ingredient-pieces"
                  disabled={!hasPieces}
                  value={
                    hasPieces
                      ? ingredient.mass_per_piece ?? DEFAULT_MASS_PER_PIECE
                      : ""
                  }
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    updateFieldFromForm("mass_per_piece", e.target.value);
                  }}
                  onBlur={(e) => {
                    e.currentTarget.value = e.currentTarget.value || "0";
                  }}
                />
              </div>
            )}
          </div>
          <div>
            <label
              htmlFor="alt-names"
              title="Môžete ich oddeľovať čiarkou, bodkočiarkou, hocijak"
            >
              Alternatívne názvy tejto ingrediencie
            </label>
            <textarea
              id="alt-names"
              rows={4}
              cols={80}
              defaultValue={defaultIngredient.alt_names}
              onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                updateFieldFromForm("alt_names", e.target.value);
              }}
            />
          </div>
          {nameIsDuplicate && (
            <p className="form-error">Ingrediencia s týmto názvom už existue</p>
          )}
          <div>
            <input
              className="kyberbutton-send"
              type="submit"
              disabled={nameIsDuplicate}
            ></input>
          </div>
        </form>
      </div>
    </div>
  );
}
