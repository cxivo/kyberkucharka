import { Ingredient, Tag } from "../../../common-interfaces/interfaces";

export function ingredientAlphabeticalComparator(
  a: Ingredient,
  b: Ingredient
): number {
  return a.name.localeCompare(b.name);
}

export function tagAlphabeticalComparator(a: Tag, b: Tag): number {
  return a.name.localeCompare(b.name);
}

export function tagUsageComparator(a: Tag, b: Tag): number {
  return (b.count ?? 0) - (a.count ?? 0);
}
