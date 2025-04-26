import {
  CUP_ML,
  Ingredient,
  measurement_unit,
  TEASPOONS_PER_TABLESPOON,
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
    case "tbsp":
      return "lyžice";
    case "pc":
      return "kusy";
    case "cup":
      return "šálky";
    default:
      return "<neznáme>";
  }
}

export function mustHaveDensity(unit: measurement_unit) {
  if (unit === "ml" || unit == "cup") {
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

export function mustHaveMassPerSpoon(unit: measurement_unit) {
  if (unit === "tsp" || unit === "tbsp") {
    return true;
  } else {
    return false;
  }
}

export function isValidIngredient(ingredient: Ingredient): boolean {
  if (ingredient.primary_unit === "ml" || ingredient.primary_unit === "cup") {
    return ingredient.density != null;
  } else if (
    ingredient.primary_unit === "pack" ||
    ingredient.primary_unit === "pc"
  ) {
    return ingredient.mass_per_piece != null;
  } else if (
    ingredient.primary_unit === "tsp" ||
    ingredient.primary_unit === "tbsp"
  ) {
    return ingredient.mass_per_tablespoon != null;
  }
  return true;
}

export function amountToGrams(amount: number, ingredient: Ingredient): number {
  switch (ingredient.primary_unit) {
    case "g":
      return amount;
    case "ml":
      return amount * (ingredient.density ?? 1);
    case "pack":
      return amount * (ingredient.mass_per_piece ?? 1);
    case "tsp":
      return (
        (amount * (ingredient.mass_per_tablespoon ?? 1)) /
        TEASPOONS_PER_TABLESPOON
      );
    case "tbsp":
      return amount * (ingredient.mass_per_tablespoon ?? 1);
    case "pc":
      return amount * (ingredient.mass_per_piece ?? 1);
    case "cup":
      return amount * CUP_ML * (ingredient.density ?? 1);
    default:
      return 0;
  }
}

export function gramsToAmountUsed(used_ingredient: UsedIngredient) {
  return gramsToAmountInPrimaryIngredient(
    used_ingredient.weight,
    used_ingredient.ingredient
  );
}

export function gramsToAmountInPrimaryIngredient(
  grams: number,
  ingredient: Ingredient
): number {
  switch (ingredient.primary_unit) {
    case "g":
      return grams;
    case "ml":
      return grams / (ingredient.density ?? 1);
    case "pack":
      return grams / (ingredient.mass_per_piece ?? 1);
    case "tsp":
      return (
        grams /
        (TEASPOONS_PER_TABLESPOON * (ingredient.mass_per_tablespoon ?? 1))
      );
    case "tbsp":
      return grams / (ingredient.mass_per_tablespoon ?? 1);
    case "pc":
      return grams / (ingredient.mass_per_piece ?? 1);
    case "cup":
      return grams / (CUP_ML * (ingredient.density ?? 1));
    default:
      return grams;
  }
}

const declensions_g = ["gram", "gramy", "gramov"];
const declensions_ml = ["mililiter", "mililitre", "mililitrov"];
const declensions_tsp = ["lyžička", "lyžičky", "lyžičiek"];
const declensions_tbsp = ["lyžica", "lyžice", "lyžíc"];
const declensions_pc = ["kus", "kusy", "kusov"];
const declensions_pack = ["balenie", "balenia", "balení"];
const declensions_cup = ["šálka", "šálky", "šálok"];

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
    case "tbsp":
      return declensions_tbsp[declension];
    case "pc":
      return declensions_pc[declension];
    case "cup":
      return declensions_cup[declension];
    default:
      return declensions_g[declension];
  }
}
