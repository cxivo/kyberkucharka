export interface User {
  username: string;
  display_name: string;
  registered_on?: Date;
  is_admin: boolean;
}

export interface Tag {
    id: number;
    name: string;
}

export type measurement_unit = "g" | "ml" | "tsp" | "pc" | "pack";

export const measurement_unit_list: measurement_unit[] = [
  "g",
  "ml",
  "tsp",
  "pc",
  "pack",
];

export interface Ingredient {
  id: number;
  name: string;
  primary_unit: measurement_unit;
  density?: number; // grams per cm^3, undefined in things with unreliable volume, like bread
  mass_per_piece?: number; // in grams, undefined in things not (practically) measurable in pieces
  alt_names: string;
  verified: boolean;
}

export interface UsedIngredient {
  id: number;
  ingredient: Ingredient;
  amount: number; // in grams
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
}

export interface Recipe extends PartialRecipe {
  created_on?: Date;
  forked_from?: PartialRecipe;
  description?: string;
  image_link?: string;
  preparation_time: number; // in minutes
  instructions: string;
  tags: Tag[];
  sections: Section[];
}

export const DEFAULT_RECIPE: Recipe = {
  id: 0,
  author: {
    username: "",
    display_name: "",
    registered_on: new Date(),
    is_admin: false,
  },
  title: "",
  preparation_time: 0,
  description: "",
  instructions: "",
  tags: [],
  sections: [],
};

export const DEFAULT_INGREDIENT: Ingredient = {
  id: -1,
  name: "",
  primary_unit: "g",
  alt_names: "",
  verified: false,
};