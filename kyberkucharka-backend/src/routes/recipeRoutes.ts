import { Router, Request, Response } from "express";
import {
  Ingredient,
  PartialRecipe,
  Recipe,
  User,
} from "../../../common-interfaces/interfaces";
import { ingredients, recipes } from "../dummyData";
import {
  addIngredient,
  getIngredientByID,
  getIngredients,
  getIngredientsByName,
} from "../databaseFunctions";

const router = Router();

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
  const newRecipe: Recipe = { ...req.body };
  newRecipe.id = recipes.length;
  newRecipe.author.registered_on = new Date();

  recipes.push(newRecipe);
  res.status(201).json(newRecipe);
});

// get all ingredients
router.get("/ingredients", (req: Request, res: Response) => {
  getIngredients().then((result) => {
    res.json(result);
  });
});

// get ingredient by id
router.get("/ingredients/:id", (req: Request, res: Response) => {
  const ingredientId = parseInt(req.params.id);
  getIngredientByID(ingredientId)
    .then((result) => {
      res.json(result);
    })
    .catch(() => {
      res.status(404).json({ message: "Ingredient not found" });
    });
});

// get ingredients by name
router.get("/ingredients/name/:name", (req: Request, res: Response) => {
  getIngredientsByName(req.params.name ?? "").then((result) => {
    res.json(result);
  });
});

// Create a new ingredient
router.post("/ingredients", (req: Request, res: Response) => {
  const ingredient: Ingredient = req.body;
  addIngredient(ingredient)
    .then((result) => res.status(201).json({ ...ingredient, id: result.id }))
    .catch((e) =>
      res.status(409).json({ message: "could not add ingredient", error: e })
    );
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
