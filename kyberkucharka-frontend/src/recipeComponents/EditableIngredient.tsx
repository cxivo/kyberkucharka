import { useState } from "react";
import {
  Ingredient,
  measurement_unit,
  NONEXISTENT,
  UsedIngredient,
} from "../../../common-interfaces/interfaces";
import {
  allowedUnits,
  amountToGrams,
  formatAmount,
  gramsToAmount,
} from "../functions/unitHelper";

interface EditableIngredientProps {
  index: number;
  used_ingredient: UsedIngredient;
  setAmount: (index: number, amount: number) => void;
  deleteIngredient: (index: number) => void;
  editUserAddedIngredient: (originalIngredient: Ingredient) => void;
}

export default function EditableIngredient({
  index,
  used_ingredient,
  setAmount,
  deleteIngredient,
  editUserAddedIngredient,
}: EditableIngredientProps) {
  const [usedUnit, setUsedUnit] = useState<measurement_unit>(
    used_ingredient.ingredient.primary_unit
  );

  return (
    <li>
      <span>
        <input
          className="p-like"
          type="number"
          step={0.05}
          min={0}
          autoFocus
          value={used_ingredient.weight === 0? "" : gramsToAmount(
            used_ingredient.weight,
            used_ingredient.ingredient,
            usedUnit
          )}
          onInput={(x) => {
            setAmount(
              index,
              amountToGrams(
                +x.currentTarget.value,
                used_ingredient.ingredient,
                usedUnit
              )
            );
          }}
          onBlur={(e) => {
            e.currentTarget.value = e.currentTarget.value || "0";
          }}
        />
        <select
          className="inconspicuous-select"
          onInput={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setAmount(
              index,
              amountToGrams(
                gramsToAmount(
                  used_ingredient.weight,
                  used_ingredient.ingredient,
                  usedUnit
                ),
                used_ingredient.ingredient,
                e.currentTarget.value as measurement_unit
              )
            );

            setUsedUnit(e.currentTarget.value as measurement_unit);
          }}
          value={usedUnit}
        >
          {allowedUnits(used_ingredient.ingredient).map((u) => (
            <option value={u} key={u}>
              {formatAmount(
                used_ingredient.ingredient,
                used_ingredient.weight,
                u
              )}
            </option>
          ))}
        </select>
        {" - "}
        {used_ingredient.ingredient.id === NONEXISTENT ? (
          <span
            className="highlighted-link"
            onClick={() => {
              editUserAddedIngredient(used_ingredient.ingredient);
            }}
          >
            {used_ingredient.ingredient.name}
          </span>
        ) : (
          <span>{used_ingredient.ingredient.name}</span>
        )}
      </span>
      <img
        src="/x.png"
        alt="Zmazať ingredienciu"
        tabIndex={0}
        className="cancel-x delete-ingredient"
        onClick={() => {
          deleteIngredient(index);
        }}
      />
    </li>
  );
}
