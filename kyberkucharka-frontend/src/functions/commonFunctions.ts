import { FilterOptionOption } from "react-select";
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

export function withoutDiacritics(s: string): string {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function capitalizeFirstLetter(val: string): string {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

// for React-Select
export function ingredientFilter(availableIngredients: Ingredient[]) {
  return (option: FilterOptionOption<{ value: number; label: string; }>, inputValue: string) => {
    const searchIn = withoutDiacritics((option.label + availableIngredients.find(i => i.id === parseInt(option.value))?.alt_names).toLowerCase())
  
    return searchIn.includes(withoutDiacritics(inputValue.toLowerCase()));
  };
}
