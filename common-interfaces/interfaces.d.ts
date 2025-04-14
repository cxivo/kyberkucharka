export interface User {
    username: string;
    display_name: string;
    password?: string;
    registered_on?: Date;
    is_admin: boolean;
}
export interface Tag {
    id: number;
    name: string;
}
export declare type measurement_unit = "g" | "ml" | "tsp" | "pc" | "pack";
export declare const measurement_unit_list: measurement_unit[];
export interface Ingredient {
    id: number;
    name: string;
    primary_unit: measurement_unit;
    density?: number;
    mass_per_piece?: number;
    alt_names: string;
    verified: boolean;
    created_on: Date;
    created_by?: string;
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
    preparation_time: number;
    instructions: string;
    tags: Tag[];
    sections: Section[];
}
export declare const NONEXISTENT = -1;
export declare const DEFAULT_RECIPE: Recipe;
export declare const DEFAULT_INGREDIENT: Ingredient;
export declare const DEFAULT_USER: User;
export declare const TEASPOON_ML = 5;
export declare const TABLESPOON_ML = 15;
export declare const CUP_ML = 250;
//# sourceMappingURL=interfaces.d.ts.map