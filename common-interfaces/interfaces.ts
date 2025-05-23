export interface User {
  username: string;
  display_name: string;
  password?: string;
  registered_on?: Date;
  email?: string;
  is_admin: boolean;
  is_premium: boolean;
}

export interface Tag {
  id: number;
  name: string;
  count?: number;
}

export type measurement_unit =
  | "g"
  | "ml"
  | "tsp"
  | "tbsp"
  | "pc"
  | "pack"
  | "cup";

export const measurement_unit_list: measurement_unit[] = [
  "g",
  "ml",
  "tsp",
  "tbsp",
  "pc",
  "pack",
  "cup",
];

export type measurement_unit_expanded =
  | measurement_unit
  | "us_cup"
  | "oz"
  | "lb"
  | "fl_oz"
  | "liquid_pt"
  | "qt"
  | "imp_gal";

export type measurement_method =
  | "primary"
  | "grams"
  | "cups"
  | "spoons"
  | "various";
export const measurement_method_list: measurement_method[] = [
  "primary",
  "grams",
  "cups",
  "spoons",
  "various",
];

export interface Ingredient {
  id: number;
  name: string;
  primary_unit: measurement_unit;
  density?: number; // grams per cm^3, undefined in things with unreliable volume, like bread
  mass_per_piece?: number; // in grams, undefined in things not (practically) measurable in pieces
  mass_per_tablespoon?: number; // in grams, undefined in things not (practically) measurable in teaspoons
  alt_names: string;
  verified: boolean;
  created_on: Date;
  created_by?: string;
}

export interface UsedIngredient {
  id: number;
  ingredient: Ingredient;
  weight: number; // in grams
  ordering?: number;
}

export interface Section {
  id: number;
  name: string;
  used_ingredients: UsedIngredient[];
}

export interface PartialRecipe {
  id: number;
  title: string;
  author: User;
  description?: string;
  image_link?: string;
}

export interface Recipe extends PartialRecipe {
  created_on?: Date;
  forked_from?: PartialRecipe;
  preparation_time: number; // in minutes
  instructions: string;
  tags: Tag[];
  sections: Section[];
}

////////////////////////////////////////////

export type OptionsList = {
  value: number;
  label: string;
  isFixed?: boolean;
};

export type RecipesOfTag = {
  partialRecipes: PartialRecipe[];
  tag: Tag;
};

////////////////////////////////////////////

export const NONEXISTENT = -1;

export const DEFAULT_RECIPE: Recipe = {
  id: NONEXISTENT,
  author: {
    username: "",
    display_name: "",
    registered_on: new Date(),
    is_admin: false,
    is_premium: false,
  },
  title: "",
  preparation_time: 0,
  description: "",
  instructions: "",
  tags: [],
  sections: [],
};

export const DEFAULT_INGREDIENT: Ingredient = {
  id: NONEXISTENT,
  name: "",
  primary_unit: "g",
  alt_names: "",
  verified: false,
  created_on: new Date(),
};

export const DEFAULT_USER: User = {
  username: "",
  display_name: "",
  is_admin: false,
  is_premium: false
};

export const TEASPOON_ML = 5;
export const TABLESPOON_ML = 15;
export const TEASPOONS_PER_TABLESPOON = 3;
export const CUP_ML = 250;
