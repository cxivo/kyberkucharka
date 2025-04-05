import { Router, Request, Response } from "express";
import { getIngredients, getIngredientByID, getIngredientsByName } from "../databaseFunctions";

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