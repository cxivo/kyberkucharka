import {
  CUP_ML,
  Ingredient,
  measurement_method,
  measurement_unit,
  measurement_unit_expanded,
  TEASPOONS_PER_TABLESPOON,
  UsedIngredient,
} from "../../../common-interfaces/interfaces";

export function getUnitName(unit: measurement_unit_expanded) {
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
    case "fl_oz":
      return "tekutá unca";
    case "imp_gal":
      return "galóny";
    case "lb":
      return "libry";
    case "liquid_pt":
      return "pint";
    case "oz":
      return "unca";
    case "qt":
      return "quart";
    case "us_cup":
      return "americká šálka";
    default:
      return "<neznáme>";
  }
}

export function getMeasurementMethodName(method: measurement_method): string {
  switch (method) {
    case "primary":
      return "najrozumnejšie jednotky";
    case "grams":
      return "všetko v gramoch";
    case "cups":
      return "hrnčekový recept";
    case "spoons":
      return "lyžice a lyžičky";
    case "various":
      return "rôzne";
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

export function amountToGramsUsed(
  amount: number,
  ingredient: Ingredient
): number {
  return amountToGrams(amount, ingredient, ingredient.primary_unit);
}

export function amountToGrams(
  amount: number,
  ingredient: Ingredient,
  unit: measurement_unit_expanded
): number {
  switch (unit) {
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
    // imperial whackery
    case "fl_oz":
      return amount * (ingredient.density ?? 1) * 29.5735;
    case "imp_gal":
      return amount * (ingredient.density ?? 1) * 4546;
    case "lb":
      return amount * 453.5924;
    case "liquid_pt":
      return amount * (ingredient.density ?? 1) * 473;
    case "oz":
      return amount * 28.3495;
    case "qt":
      return amount * (ingredient.density ?? 1) * 946.3529;
    case "us_cup":
      return amount * (ingredient.density ?? 1) * 236.5882;
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
  return gramsToAmount(grams, ingredient, ingredient.primary_unit);
}

export function gramsToAmount(
  grams: number,
  ingredient: Ingredient,
  unit: measurement_unit_expanded
): number {
  switch (unit) {
    case "g":
      return grams;
    case "ml":
      return grams / (ingredient.density ?? 1);
    case "pack":
      return grams / (ingredient.mass_per_piece ?? 1);
    case "tsp":
      return (
        (TEASPOONS_PER_TABLESPOON * grams) /
        (ingredient.mass_per_tablespoon ?? 1)
      );
    case "tbsp":
      return grams / (ingredient.mass_per_tablespoon ?? 1);
    case "pc":
      return grams / (ingredient.mass_per_piece ?? 1);
    case "cup":
      return grams / (CUP_ML * (ingredient.density ?? 1));
    // imperial whackery
    case "fl_oz":
      return grams / ((ingredient.density ?? 1) * 29.5735);
    case "imp_gal":
      return grams / ((ingredient.density ?? 1) * 4546);
    case "lb":
      return grams / 453.5924;
    case "liquid_pt":
      return grams / ((ingredient.density ?? 1) * 473);
    case "oz":
      return grams / 28.3495;
    case "qt":
      return grams / ((ingredient.density ?? 1) * 946.3529);
    case "us_cup":
      return grams / ((ingredient.density ?? 1) * 236.5882);
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
const declensions_fl_oz = ["tekutá unca", "tekuté unce", "tekutých uncí"];
const declensions_imp_gal = ["galón", "galóny", "galónov"];
const declensions_lb =  ["libra", "libry", "libier"];
const declensions_liquid_pt = ["pinta", "pinty", "pint"];
const declensions_oz = ["unca", "unce", "uncí"];
const declensions_qt = ["quart", "quarty", "quartov"];
const declensions_us_cup = ["americká šálka", "americké šálky", "amerických šálok"];

export function formatAmount(
  ingredient: Ingredient,
  grams: number,
  unit: measurement_unit_expanded
): string {
  const amount = roundToAtMostDecimals(gramsToAmount(grams, ingredient, unit));
  const declension =
    amount === 1 ? 0 : amount === 2 || amount === 3 || amount === 4 ? 1 : 2;

  switch (unit) {
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
    // imperial whackery 
    case "fl_oz":
      return declensions_fl_oz[declension]
    case "imp_gal":
      return declensions_imp_gal[declension]
    case "lb":
      return declensions_lb[declension]
    case "liquid_pt":
      return declensions_liquid_pt[declension]
    case "oz":
      return declensions_oz[declension]
    case "qt":
      return declensions_qt[declension]
    case "us_cup":
        return declensions_us_cup[declension]
    default:
      return declensions_g[declension];
  }
}

export function formatAmountUsed(used_ingredient: UsedIngredient): string {
  return formatAmount(
    used_ingredient.ingredient,
    used_ingredient.weight,
    used_ingredient.ingredient.primary_unit
  );
}

export function roundToAtMostDecimals(x: number): number {
  return Math.round(100 * x) / 100;
}

export function allowedUnits(ingredient: Ingredient): measurement_unit[] {
  const units: measurement_unit[] = ["g"];

  if (ingredient.density != null) {
    units.push("ml", "cup");
  }

  if (ingredient.mass_per_piece != null) {
    units.push("pc", "pack");
  }

  if (ingredient.mass_per_tablespoon != null) {
    units.push("tsp", "tbsp");
  }

  return units;
}

export function allowedUnitsExpanded(ingredient: Ingredient): measurement_unit_expanded[] {
  const units: measurement_unit_expanded[] = ["g"];

  if (ingredient.mass_per_piece != null) {
    units.push("pc", "pack");
  }

  if (ingredient.mass_per_tablespoon != null) {
    units.push("tsp", "tbsp");
  }

  if (ingredient.density != null) {
    units.push("ml", "cup", "imp_gal", "qt", "liquid_pt", "us_cup", "fl_oz");
  }

  units.push("oz", "lb");

  return units;
}

