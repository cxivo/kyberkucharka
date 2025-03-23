import { Router, Request, Response } from "express";
import {
  Ingredient,
  PartialRecipe,
  Recipe,
  User,
} from "../../../common-interfaces/interfaces";

const router = Router();

const users: User[] = [
  {
    username: "cxivo",
    display_name: "ĉivo",
    registered_on: new Date(Date.UTC(2025, 3, 20, 19, 8, 20)),
    is_admin: true,
  },
  {
    username: "cimrman",
    display_name: "Jára Cimrman",
    registered_on: new Date(Date.UTC(1970, 1, 1, 0, 0, 0)),
    is_admin: false,
  },
];

const ingredients: Ingredient[] = [
  {
    id: 0,
    name: "mak",
    alt_names: "",
    primary_unit: "gram",
    density: 1,
    mass_per_piece: 0.0001,
    verified: true,
  },
  {
    id: 1,
    name: "rožok",
    alt_names: "rohlík",
    primary_unit: "piece",
    mass_per_piece: 50,
    verified: true,
  },
  {
    id: 2,
    name: "mlieko",
    alt_names: "",
    primary_unit: "liter",
    density: 1,
    verified: true,
  },
];

const recipes: Recipe[] = [
  {
    id: 0,
    title: "Nulový koláč",
    author: users[1],
    created_on: new Date(Date.UTC(2025, 3, 20, 19, 8, 20)),
    forked_from: undefined,
    description: "nič. vôbec nič.",
    image_link: undefined,
    instructions: "nerob nič.",
    preparation_time: 0,
    tags: [],
    sections: [],
  },
  {
    id: 1,
    title: "Obzerance s makom",
    author: users[0],
    created_on: new Date(Date.UTC(2025, 1, 20, 19, 8, 20)),
    forked_from: undefined,
    description: "Ideálne pre najedených ľudí",
    image_link:
      "https://paleodobroty.wordpress.com/wp-content/uploads/2015/04/img_8669.jpg",
    instructions: "pozeraj sa do taniera. Pridaj mak.",
    preparation_time: 1,
    tags: [],
    sections: [
      {
        id: 0,
        name: "maková sekcia",
        used_ingredients: [
          {
            id: 0,
            amount: 5,
            ingredient: ingredients[0],
          },
        ],
      },
    ],
  },
  //{ id: 2, title: "Chlebík s maslom", author: "cimrman" },
];

// get all recipes
router.get("/recipes", (req: Request, res: Response) => {
  res.json(recipes as PartialRecipe[]);
});

// get recipe by id
router.get("/recipes/:id", (req: Request, res: Response) => {
  const recipeId = parseInt(req.params.id);
  const recipe = recipes.find((x) => x.id === recipeId);
  if (recipe) {
    res.json(recipe);
  } else {
    res.status(404).json({ message: "Recipe not found" });
  }
});

// Create a new recipe
router.post("/recipes", (req: Request, res: Response) => {
  const newRecipe: Recipe = {
    id: recipes.length + 1,
    title: req.body.title,
    author: req.body.author,
    created_on: new Date(),
    forked_from: undefined,
    description: req.body.description,
    image_link: req.body.image_link,
    instructions: req.body.instructions,
    preparation_time: req.body.preparation_time,
    tags: [],
    sections: [],
  };
  recipes.push(newRecipe);
  res.status(201).json(newRecipe);
});

// get ingredient by id
router.get("/ingredients/:id", (req: Request, res: Response) => {
  const ingredientId = parseInt(req.params.id);

  const ingredient = ingredients.find((x) => x.id === ingredientId);
  if (ingredient) {
    res.json(ingredient);
  } else {
    res.status(404).json({ message: "Ingredient not found" });
  }
});

// get ingredients by name
router.get("/ingredients/name/:name", (req: Request, res: Response) => {
  const name = req.params.name;

  const found_ingredients = ingredients.filter(
    (x) => x.name.match(name) || x.alt_names.match(name)
  );

  res.json(found_ingredients);
});

// Create a new ingredient
router.post("/ingredients", (req: Request, res: Response) => {
  const newIngredient: Ingredient = {
    id: ingredients.length + 1,
    name: req.body.name,
    alt_names: req.body.alt_names,
    primary_unit: req.body.primary_unit,
    density: req.body.density ?? 1,
    mass_per_piece: req.body.density,
    verified: false,
  };
  ingredients.push(newIngredient);
  res.status(201).json(newIngredient);
});

// Update a recipe by ID
/* router.put("/recipes/:id", (req: Request, res: Response) => {
    const recipeId = parseInt(req.params.id);
    const recipeIndex = recipes.findIndex(b => b.id === recipeId);

    if (recipeIndex !== -1) {
        recipes[recipeIndex] = { id: recipeId, title: req.body.title, author: req.body.author };
        res.json(recipes[recipeIndex]);
    } else {
        res.status(404).json({ message: "Recipe not found" });
    }
}); */

// Delete a recipe by ID
router.delete("/recipes/:id", (req: Request, res: Response) => {
  const recipeId = parseInt(req.params.id);
  const recipeIndex = recipes.findIndex((b) => b.id === recipeId);

  if (recipeIndex !== -1) {
    recipes.splice(recipeIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: "Recipe not found" });
  }
});

export default router;
