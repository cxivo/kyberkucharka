import { User } from "./user";

export interface Ingredient {
  id: string;
  name: string;
  primaryUnit: "g" | "ml" | "ks";
  massPerPiece: number;
  density: number;
  alt: string;
  creator: User;
  approved: boolean;
  vegetarian: boolean;
  vegan: boolean;
}
