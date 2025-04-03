import {
  Ingredient,
  measurement_unit,
  TEASPOON_ML,
  UsedIngredient,
} from "../../../common-interfaces/interfaces";

export function getUnitName(unit: measurement_unit) {
  switch (unit) {
    case "g":
      return "gramy";
    case "ml":
      return "mililitre";
    case "pack":
      return "balenia";
    case "tsp":
      return "lyžičky";
    case "pc":
      return "kusy";
    default:
      return "<neznáme>";
  }
}

export function mustHaveDensity(unit: measurement_unit) {
  if (unit === "ml" || unit === "tsp") {
    return true;
  } else {
    return false;
  }
}

export function mustHaveMassPerPiece(unit: measurement_unit) {
  if (unit === "pack" || unit === "pc") {
    return true;
  } else {
    return false;
  }
}

export function isValidIngredient(ingredient: Ingredient): boolean {
  if (ingredient.primary_unit === "ml" || ingredient.primary_unit === "tsp") {
    return ingredient.density != null;
  } else if (
    ingredient.primary_unit === "pack" ||
    ingredient.primary_unit === "pc"
  ) {
    return ingredient.mass_per_piece != null;
  }
  return true;
}

export function amountToGrams(amount: number, ingredient: Ingredient): number {
  if (ingredient.primary_unit === "ml") {
    return amount * (ingredient.density ?? 1);
  } else if (ingredient.primary_unit === "tsp") {
    return amount * TEASPOON_ML * (ingredient.density ?? 1);
  } else if (
    ingredient.primary_unit === "pc" ||
    ingredient.primary_unit === "pack"
  ) {
    return amount * (ingredient.mass_per_piece ?? 1);
  } else {
    // just grams
    return amount;
  }
}

export function gramsToAmountUsed(used_ingredient: UsedIngredient) {
  return gramsToAmountInPrimaryIngredient(
    used_ingredient.amount,
    used_ingredient.ingredient
  );
}

export function gramsToAmountInPrimaryIngredient(
  grams: number,
  ingredient: Ingredient
): number {
  if (ingredient.primary_unit === "ml") {
    return grams / (ingredient.density ?? 1);
  } else if (ingredient.primary_unit === "tsp") {
    return grams / (TEASPOON_ML * (ingredient.density ?? 1));
  } else if (
    ingredient.primary_unit === "pc" ||
    ingredient.primary_unit === "pack"
  ) {
    return grams / (ingredient.mass_per_piece ?? 1);
  } else {
    // just grams
    return grams;
  }
}

const declensions_g = ["gram", "gramy", "gramov"];
const declensions_ml = ["mililiter", "mililitre", "mililitrov"];
const declensions_tsp = ["lyžička", "lyžičky", "lyžičiek"];
const declensions_pc = ["kus", "kusy", "kusov"];
const declensions_pack = ["balenie", "balenia", "balení"];

export function formatAmount(used_ingredient: UsedIngredient) {
  const amount = gramsToAmountUsed(used_ingredient);
  const declension =
    amount === 1 ? 0 : amount === 2 || amount === 3 || amount === 4 ? 1 : 2;

  switch (used_ingredient.ingredient.primary_unit) {
    case "ml":
      return declensions_ml[declension];
    case "pack":
      return declensions_pack[declension];
    case "tsp":
      return declensions_tsp[declension];
    case "pc":
      return declensions_pc[declension];
    default:
      return declensions_g[declension];
  }
}
