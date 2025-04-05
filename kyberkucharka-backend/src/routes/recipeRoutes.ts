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
  addOrUpdateRecipe,
  getIngredientByID,
  getIngredients,
  getIngredientsByName,
  getPartialRecipeByID,
  getPartialRecipes,
  getRecipeByID,
} from "../databaseFunctions";
import { authenticateToken } from "../auth";

const router = Router();

// get all recipes
router.get("/recipes", (req: Request, res: Response) => {
  getPartialRecipes()
    .then((result) => {
      res.json(result);
    })
    .catch((e) => {
      res.status(500).json({ message: "Unable to return recipes", error: e });
    });
});

// get recipe by id
router.get("/recipes/:id", (req: Request, res: Response) => {
  const recipeId = parseInt(req.params.id);
  getRecipeByID(recipeId)
    .then((result) => {
      res.json(result);
    })
    .catch((e) => {
      res.status(404).json({ message: "Recipe not found", error: e });
    });
});

// Create a new recipe
router.post("/recipes", authenticateToken, (req: Request, res: Response) => {
  // simply add the author
  req.body.author = res.locals.user.username;

  addOrUpdateRecipe(req.body)
    .then((newID) => {
      res.status(201).json({ newID });
    })
    .catch((e) => {
      res.status(400).json({ message: "Could not add recipe", error: e });
    });
});

// Modify an existing recipe
router.put("/recipes/:id", authenticateToken, (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  getPartialRecipeByID(id).then((r) => {
    if (r.author.username === res.locals.user.username) {
      addOrUpdateRecipe(req.body, id)
        .then((newID) => {
          res.status(200).json({ newID });
        })
        .catch((e) => {
          res.status(400).json({ message: "Could not add recipe", error: e });
        });
    } else {
      // someone tried to edit a recipe they shouldn't have!!
      res.status(403).json({
        message: "Did you just try to edit someone else's recipe??",
        error: "",
      });
    }
  });
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
// we might not even need this one??
/* router.post("/ingredients", (req: Request, res: Response) => {
  const ingredient: Ingredient = req.body;
  addIngredient(ingredient)
    .then((result) => res.status(201).json({ ...ingredient, id: result.id }))
    .catch((e) =>
      res.status(409).json({ message: "could not add ingredient", error: e })
    );
}); */

// Delete a recipe by ID
router.delete(
  "/recipes/:id",
  authenticateToken,
  (req: Request, res: Response) => {
    // TODO
  }
);

export default router;
