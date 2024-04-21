import { Ingredient } from "./ingredient";
import { User } from "./user";

export interface Recipe {
  id: string;
  name: string;
  created: string;
  creator: User;
  fork: Recipe | undefined;
  description: string;
  instructions: string;
  preparationTime: number;
  cookTime: number;
  restTime: number;
  difficulty: number;
  section: Section[];
}

export interface Section {
  name: string;
  index: number;
  ingredients: SectionIngredient[];
}

export interface SectionIngredient {
  ingredient: Ingredient;
  amount: number;
}
