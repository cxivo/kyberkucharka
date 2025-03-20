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
    primary_unit: "gram" | "liter" | "piece" | "teaspoon" ;
    density: number;  // grams per cm^3
    mass_per_piece: number | undefined;  // in grams
    alt_names: string;
    verified: boolean;
}

export interface UsedIngredient {
    ingredient: Ingredient;
    amount: number;
}

export interface Section {
    name: string;
    used_ingredients: UsedIngredient[];
}

export interface PartialRecipe {
    id: number;
    title: string;
    author: User;
}

export interface Recipe extends PartialRecipe {
    created_on: Date;
    forked_from: PartialRecipe | undefined;
    description: string;
    image_link: string | undefined;
    preparation_time: number;  // in minutes
    instructions: string;
    tags: Tag[];
    sections: Section[];
}
