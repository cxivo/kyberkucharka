import { useEffect, useState } from "react";
import {
  Ingredient,
  measurement_method,
  measurement_unit,
  measurement_unit_expanded,
  UsedIngredient,
} from "../../../common-interfaces/interfaces";
import {
  allowedUnits,
  allowedUnitsExpanded,
  formatAmount,
  gramsToAmount,
  roundToAtMostDecimals,
} from "../functions/unitHelper";
import { useCookies } from "react-cookie";

interface DisplayUsedIngredientProps {
  used_ingredient: UsedIngredient;
  measurementMethod: measurement_method;
  scale?: number;
  changeUnitCallback: () => void;
}

export default function DisplayUsedIngredient({
  used_ingredient,
  measurementMethod,
  scale,
  changeUnitCallback,
}: DisplayUsedIngredientProps) {
  const [usedUnit, setUsedUnit] = useState<measurement_unit>(
    used_ingredient.ingredient.primary_unit
  );
  const [userCookie, _setUserCookie, _removeUserCookie] = useCookies(
    ["userData"],
    {}
  );
  const [allowedFunction, setAllowedFunction] = useState<(i: Ingredient) => measurement_unit_expanded[]>(() => allowedUnits);

  useEffect(() => {
    if (userCookie.userData?.is_premium) {
      setAllowedFunction(() => allowedUnitsExpanded);
    } else {
      setAllowedFunction(() => allowedUnits);
    }
    
  }, [userCookie])

  useEffect(() => {
    switch (measurementMethod) {
      case "primary":
        // use
        if (
          used_ingredient.ingredient.primary_unit === "g" &&
          allowedUnits(used_ingredient.ingredient).includes("tsp") &&
          gramsToAmount(
            used_ingredient.weight * (scale ?? 1),
            used_ingredient.ingredient,
            "tsp"
          ) < 3
        ) {
          setUsedUnit("tsp");
        } else {
          setUsedUnit(used_ingredient.ingredient.primary_unit);
        }
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
            used_ingredient.weight * (scale ?? 1),
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
            used_ingredient.weight * (scale ?? 1),
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
      {used_ingredient.weight === 0 ? (
        ""
      ) : (
        <>
          {roundToAtMostDecimals(
            gramsToAmount(
              used_ingredient.weight * (scale ?? 1),
              used_ingredient.ingredient,
              usedUnit
            )
          )}
          &nbsp;
          {allowedFunction(used_ingredient.ingredient).length > 1 ? (
            <select
              className="inconspicuous-select"
              onInput={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setUsedUnit(e.currentTarget.value as measurement_unit);
                changeUnitCallback();
              }}
              value={usedUnit}
            >
              {allowedFunction(used_ingredient.ingredient).map((u) => (
                <option value={u} key={u}>
                  {formatAmount(
                    used_ingredient.ingredient,
                    used_ingredient.weight * (scale ?? 1),
                    u
                  )}
                </option>
              ))}
            </select>
          ) : (
            // only grams are available, don't display a select
            formatAmount(
              used_ingredient.ingredient,
              used_ingredient.weight * (scale ?? 1),
              "g"
            )
          )}
          {" - "}
        </>
      )}
      {used_ingredient.ingredient.name}
    </li>
  );
}
