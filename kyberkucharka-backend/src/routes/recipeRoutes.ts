import { Router, Request, Response } from "express";
import {
  addOrUpdateRecipe,
  getPartialRecipeByID,
  getPartialRecipes,
  getPartialRecipesByUser,
  getRecipeByID,
} from "../databaseFunctions";
import { authenticateToken } from "../auth";
import { Recipe } from "../../../common-interfaces/interfaces";

const router = Router();

// get all recipes
router.get("/", (req: Request, res: Response) => {
  getPartialRecipes()
    .then((result) => {
      res.json(result);
    })
    .catch((e) => {
      console.error(e);
      res.status(500).json({ message: "Unable to return recipes", error: e });
    });
});

// get recipe by id
router.get("/:id", (req: Request, res: Response) => {
  const recipeId = parseInt(req.params.id);
  getRecipeByID(recipeId)
    .then((result) => {
      res.json(result);
    })
    .catch((e) => {
      console.error(e);
      res.status(404).json({ message: "Recipe not found", error: e });
    });
});

// get recipe by author
router.get("/by/:username", (req: Request, res: Response) => {
  const recipeId = req.params.username;
  getPartialRecipesByUser(recipeId)
    .then((result) => {
      res.json(result);
    })
    .catch((e) => {
      console.error(e);
      res
        .status(500)
        .json({ message: "An unknown error has occured", error: e });
    });
});

// Create a new recipe
router.post("/", authenticateToken, (req: Request, res: Response) => {
  // simply add the author
  const recipe: Recipe = req.body;
  recipe.author.username = res.locals.user.username;

  addOrUpdateRecipe(recipe)
    .then((newID) => {
      res.status(201).json({ newID });
    })
    .catch((e) => {
      res.status(400).json({ message: "Could not add recipe", error: e });
    });
});

// Modify an existing recipe
router.put("/:id", authenticateToken, (req: Request, res: Response) => {
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

// Delete a recipe by ID
router.delete("/:id", authenticateToken, (req: Request, res: Response) => {
  // TODO
});

export default router;
