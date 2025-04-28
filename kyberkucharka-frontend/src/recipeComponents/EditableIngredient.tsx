import { useState } from "react";
import {
  measurement_unit,
  UsedIngredient,
} from "../../../common-interfaces/interfaces";
import {
  allowedUnits,
  amountToGrams,
  amountToGramsUsed,
  formatAmount,
  gramsToAmount,
  gramsToAmountUsed,
} from "../functions/unitHelper";

interface EditableIngredientProps {
  index: number;
  used_ingredient: UsedIngredient;
  setAmount: (index: number, amount: number) => void;
  deleteIngredient: (index: number) => void;
}

export default function EditableIngredient({
  index,
  used_ingredient,
  setAmount,
  deleteIngredient,
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
          value={gramsToAmount(
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
        >
          {allowedUnits(used_ingredient.ingredient).map((u) => (
            <option
              value={u}
              key={u}
              selected={u == used_ingredient.ingredient.primary_unit}
            >
              {formatAmount(
                used_ingredient.ingredient,
                used_ingredient.weight,
                u
              )}
            </option>
          ))}
        </select>
        {" - "}
        {used_ingredient.ingredient.name}
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
