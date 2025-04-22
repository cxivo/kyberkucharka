import { Router, Request, Response } from "express";
import { getTags } from "../databaseFunctions";

const router = Router();

// get all ingredients
router.get("/", (req: Request, res: Response) => {
  getTags().then((result) => {
    res.json(result);
  });
});

export default router;