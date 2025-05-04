import { Router, Request, Response } from "express";
import {
  addOrUpdateRecipe,
  deleteRecipe,
  getForkedRecipesLimited,
  getPartialRecipeByID,
  getPartialRecipes,
  getPartialRecipesByTagLimited,
  getPartialRecipesByUser,
  getPartialRecipesLimited,
  getRecipeByID,
  getRecipesSearch,
  getRelatedRecipesLimited,
  getRelatedRecipesNotForksLimited,
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

// get recipes similar to this one
router.get("/related/:id", (req: Request, res: Response) => {
  const recipeId = parseInt(req.params.id);

  getRelatedRecipesLimited(recipeId)
    .then((result) => {
      res.json(result);
    })
    .catch((e) => {
      console.error(e);
      res.status(500).json({ message: "Unable to return recipes", error: e });
    });
});

// get recipes forked from this one
router.get("/forked-from/:id", (req: Request, res: Response) => {
  const recipeId = parseInt(req.params.id);

  getForkedRecipesLimited(recipeId)
    .then((result) => {
      res.json(result);
    })
    .catch((e) => {
      console.error(e);
      res.status(500).json({ message: "Unable to return recipes", error: e });
    });
});

// get recipes similar to this one, but not forks
router.get("/related-not-fork/:id", (req: Request, res: Response) => {
  const recipeId = parseInt(req.params.id);

  getRelatedRecipesNotForksLimited(recipeId)
    .then((result) => {
      res.json(result);
    })
    .catch((e) => {
      console.error(e);
      res.status(500).json({ message: "Unable to return recipes", error: e });
    });
});

// get a couple of latest recipes
router.get("/latest/", (req: Request, res: Response) => {
  getPartialRecipesLimited()
    .then((result) => {
      res.json(result);
    })
    .catch((e) => {
      console.error(e);
      res.status(500).json({ message: "Unable to return recipes", error: e });
    });
});

// get recipes by tag
router.get("/by-tag/:id", (req: Request, res: Response) => {
  const tagId = parseInt(req.params.id);

  getPartialRecipesByTagLimited(tagId)
    .then((result) => {
      res.json(result);
    })
    .catch((e) => {
      console.error(e);
      res.status(500).json({ message: "Unable to return recipes", error: e });
    });
});

// search for recipes
router.get("/search", (req: Request, res: Response) => {
  const queryString = (req.query.query as string) ?? "";
  const requiredTags = JSON.parse(
    (req.query.requiredTags as string) ?? "[]"
  ) as number[];
  const unwantedTags = JSON.parse(
    (req.query.unwantedTags as string) ?? "[]"
  ) as number[];
  const requiredIngredients = JSON.parse(
    (req.query.requiredIngredients as string) ?? "[]"
  ) as number[];
  const unwantedIngredients = JSON.parse(
    (req.query.unwantedIngredients as string) ?? "[]"
  ) as number[];
  const onlyFromIngredients = JSON.parse(
    (req.query.onlyFromIngredients as string) ?? "[]"
  ) as number[];
  console.log(queryString);

  getRecipesSearch(
    queryString,
    requiredTags,
    unwantedTags,
    requiredIngredients,
    unwantedIngredients,
    onlyFromIngredients
  )
    .then((result) => {
      console.log(result.length);
      res.json(result);
    })
    .catch((e) => {
      console.error(e);
      res.status(400).json({ message: "An error has occured", error: e });
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
    if (
      r.author.username === res.locals.user.username ||
      res.locals.user.is_admin
    ) {
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
  const id = parseInt(req.params.id);

  deleteRecipe(id, res.locals.user.username)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((e) => {
      res.status(403).json({
        message: "You are not permitted to delete this recipe.",
        error: "",
      });
    });
});



export default router;
