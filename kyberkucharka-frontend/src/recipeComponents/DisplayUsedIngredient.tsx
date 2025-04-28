import { useState } from "react";
import {
  measurement_unit,
  UsedIngredient,
} from "../../../common-interfaces/interfaces";
import {
  allowedUnits,
  formatAmount,
  gramsToAmount,
  roundToAtMostDecimals,
} from "../functions/unitHelper";

interface DisplayUsedIngredientProps {
  used_ingredient: UsedIngredient;
}

export default function DisplayUsedIngredient({
  used_ingredient,
}: DisplayUsedIngredientProps) {
  const [usedUnit, setUsedUnit] = useState<measurement_unit>(
    used_ingredient.ingredient.primary_unit
  );

  return (
    <li key={used_ingredient.id}>
      {roundToAtMostDecimals(
        gramsToAmount(
          used_ingredient.weight,
          used_ingredient.ingredient,
          usedUnit
        )
      )}
      &nbsp;
      <select
        className="inconspicuous-select"
        onInput={(e: React.ChangeEvent<HTMLSelectElement>) => {
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
    </li>
  );
}
