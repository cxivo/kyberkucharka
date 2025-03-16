import { Router, Request, Response } from "express";

const router = Router();

interface Recipe {
  id: number;
  title: string;
  author: string;
}

const recipes: Recipe[] = [
  { id: 1, title: "Obzerance s makom", author: "cxivo" },
  { id: 2, title: "Chlebík s maslom", author: "cimrman" }
];


// get all recipes
router.get("/recipes", (req: Request, res: Response) => {
    res.json(recipes);
});

// get recipe by id
router.get("/recipes/:id", (req: Request, res: Response) => {
    const recipeId = parseInt(req.params.id);
    const recipe = recipes.find(rec => rec.id === recipeId);
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
        author: req.body.author
    };
    recipes.push(newRecipe);
    res.status(201).json(newRecipe);
});

// Update a recipe by ID
router.put("/recipes/:id", (req: Request, res: Response) => {
    const recipeId = parseInt(req.params.id);
    const recipeIndex = recipes.findIndex(b => b.id === recipeId);

    if (recipeIndex !== -1) {
        recipes[recipeIndex] = { id: recipeId, title: req.body.title, author: req.body.author };
        res.json(recipes[recipeIndex]);
    } else {
        res.status(404).json({ message: "Recipe not found" });
    }
});

// Delete a recipe by ID
router.delete("/recipes/:id", (req: Request, res: Response) => {
    const recipeId = parseInt(req.params.id);
    const recipeIndex = recipes.findIndex(b => b.id === recipeId);

    if (recipeIndex !== -1) {
        recipes.splice(recipeIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ message: "Recipe not found" });
    }
});

export default router;