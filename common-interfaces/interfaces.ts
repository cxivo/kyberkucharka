export interface User {
    username: string;
    display_name: string;
    registered_on: Date;
    is_admin: boolean;
}

export interface Tag {
    id: number;
    name: string;
}

export interface Ingredient {
  id: number;
  name: string;
  primary_unit: "gram" | "liter" | "piece" | "teaspoon";
  density?: number; // grams per cm^3, undefined in things with unreliable volume, like bread
  mass_per_piece?: number; // in grams, undefined in things not (practically) measurable in pieces
  alt_names: string;
  verified: boolean;
}

export interface UsedIngredient {
  id: number;
  ingredient: Ingredient;
  amount: number;
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

///////////////////////////////
// what the client sends to the server when creating a new recipe or editing an existing one

export interface CreatedUsedIngredient {
  ingredient_id: number;
  amount: number;
}

export interface CreatedSection {
  name: string;
  used_ingredients: CreatedUsedIngredient[];
}

export interface CreatedRecipe {
  //id: number;
  title: string;
  //author: User;
  author_username: string; // do we actually need this??
  //created_on: Date;
  //forked_from?: PartialRecipe;
  forked_from_id?: number;
  description?: string;
  image_link?: string;
  preparation_time: number; // in minutes
  instructions: string;
  //tags: Tag[];
  tag_ids: number[];
  sections: CreatedSection[];
}