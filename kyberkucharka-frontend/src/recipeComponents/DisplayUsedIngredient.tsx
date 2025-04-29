import { useEffect, useState } from "react";
import {
  measurement_method,
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
  measurementMethod: measurement_method;
  changeUnitCallback: () => void;
}

export default function DisplayUsedIngredient({
  used_ingredient,
  measurementMethod,
  changeUnitCallback,
}: DisplayUsedIngredientProps) {
  const [usedUnit, setUsedUnit] = useState<measurement_unit>(
    used_ingredient.ingredient.primary_unit
  );

  useEffect(() => {
    switch (measurementMethod) {
      case "primary":
        setUsedUnit(used_ingredient.ingredient.primary_unit);
        break;
      case "grams":
        setUsedUnit("g");
        break;
      case "cups":
        if (allowedUnits(used_ingredient.ingredient).includes("cup")) {
          setUsedUnit("cup");
        } else if (
          allowedUnits(used_ingredient.ingredient).includes("tbsp") &&
          gramsToAmount(
            used_ingredient.weight,
            used_ingredient.ingredient,
            "tbsp"
          ) >= 1
        ) {
          setUsedUnit("tbsp");
        } else if (allowedUnits(used_ingredient.ingredient).includes("tsp")) {
          setUsedUnit("tsp");
        } else if (allowedUnits(used_ingredient.ingredient).includes("pc")) {
          setUsedUnit("pc");
        } else {
          setUsedUnit(used_ingredient.ingredient.primary_unit);
        }
        break;
      case "spoons":
        // only use tablespoons for ingredients of which there is at least one tablespoon, otherwise use teaspoons
        if (
          allowedUnits(used_ingredient.ingredient).includes("tbsp") &&
          gramsToAmount(
            used_ingredient.weight,
            used_ingredient.ingredient,
            "tbsp"
          ) >= 1
        ) {
          setUsedUnit("tbsp");
        } else if (allowedUnits(used_ingredient.ingredient).includes("tsp")) {
          setUsedUnit("tsp");
        } else if (allowedUnits(used_ingredient.ingredient).includes("cup")) {
          setUsedUnit("cup");
        } else if (allowedUnits(used_ingredient.ingredient).includes("pc")) {
          setUsedUnit("pc");
        } else {
          setUsedUnit(used_ingredient.ingredient.primary_unit);
        }
        break;
    }
  }, [measurementMethod]);

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
      {allowedUnits(used_ingredient.ingredient).length > 1 ? (
        <select
          className="inconspicuous-select"
          onInput={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setUsedUnit(e.currentTarget.value as measurement_unit);
            changeUnitCallback();
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
      ) : (
        // only grams are available, don't display a select
        formatAmount(used_ingredient.ingredient, used_ingredient.weight, "g")
      )}
      {" - "}
      {used_ingredient.ingredient.name}
    </li>
  );
}
