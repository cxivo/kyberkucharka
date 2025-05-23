import { Router, Request, Response } from "express";
import {
  getIngredients,
  getIngredientByID,
  getIngredientsByName,
  modifyIngredient,
  deleteIngredientAndRecipes,
  addIngredient,
} from "../databaseFunctions";
import { authenticateToken } from "../auth";
import { Ingredient } from "../../../common-interfaces/interfaces";

const router = Router();

// get all ingredients
router.get("/", (req: Request, res: Response) => {
  getIngredients().then((result) => {
    res.json(result);
  });
});

// get ingredient by id
router.get("/:id", (req: Request, res: Response) => {
  const ingredientId = parseInt(req.params.id);
  getIngredientByID(ingredientId)
    .then((result) => {
      res.json(result);
    })
    .catch(() => {
      res.status(404).json({ message: "Ingredient not found" });
    });
});

// delete ingredient by id
router.delete("/:id", authenticateToken, (req: Request, res: Response) => {
  const ingredientId = parseInt(req.params.id);

  if (res.locals.user.is_admin !== true) {
    res.status(403).json({ message: "Only admins can delete ingredients." });
    return;
  }

  deleteIngredientAndRecipes(ingredientId)
    .then((result) => {
      res.sendStatus(204);
    })
    .catch(() => {
      res.status(404).json({ message: "Ingredient not found" });
    });
});

// edit ingredient by id
router.put("/", authenticateToken, (req: Request, res: Response) => {
  if (res.locals.user.is_admin !== true) {
    res.status(403).json({ message: "Only admins can edit ingredients." });
    return;
  }

  const ingredient: Ingredient = req.body;

  if (ingredient.id < 0) {
    // add new
    addIngredient(ingredient)
      .then(() => {
        res.sendStatus(201);
      })
      .catch((e) => {
        console.error(e);
        res.status(400).json({ message: "An unknown error has occured" });
      });
  } else {
    // modify existing
    modifyIngredient(ingredient)
      .then(() => {
        res.sendStatus(200);
      })
      .catch((e) => {
        console.error(e);
        res.status(400).json({ message: "An unknown error has occured" });
      });
  }
});
  
  // get ingredients by name
  router.get("/name/:name", (req: Request, res: Response) => {
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
  
  export default router;