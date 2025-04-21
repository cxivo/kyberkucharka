import { Router, Request, Response } from "express";
import {
  deleteUser,
  getIngredientsByName,
  getPartialRecipesByUser,
  getUserByUsername,
  getUsers,
} from "../databaseFunctions";
import { authenticateToken } from "../auth";

const router = Router();

// get all users
router.get("/", (req: Request, res: Response) => {
  getUsers().then((result) => {
    res.json(result);
  });
});

// get user by username
router.get("/:username", (req: Request, res: Response) => {
  getUserByUsername(req.params.username ?? "").then((result) => {
    if (result == null) {
      res.status(404).json({
        message: `No user with username "${req.params.username}" was found.`,
        error: "",
      });
    } else {
      res.json(result);
    }
  });
});

// delete user by username
router.delete(
  "/:username",
  authenticateToken,
  (req: Request, res: Response) => {
    const username = req.params.username;

    if (res.locals.user.username === username || res.locals.user.is_admin) {
      deleteUser(req.params.username ?? "")
        .then(() => {
          res
            .clearCookie("jwtoken")
            .clearCookie("userData")
            .status(204)
            .json({});
        })
        .catch(() => {
          res.status(404).json({ message: "User not found" });
        });
    } else {
      res.status(403).json({
        message: "You don't have the permission to delete this user.",
      });
    }
  }
);

// get user by username
router.get("/page/:username", async (req: Request, res: Response) => {
  const userPromise = getUserByUsername(req.params.username ?? "");
  const recipesPromise = getPartialRecipesByUser(req.params.username ?? "");

  await Promise.all([userPromise, recipesPromise]).then(
    ([user, recipes]) => {
      if (user == null) {
        res.status(404).json({message: `No user with username "${req.params.username}" was found.`, error: ""});
      } else {
        res.status(200).json({user: user, recipes: recipes});
      }
    }
  ).catch(e => {
    console.error(e);
    res.status(500).json({ message: "An unknown error has occured", error: e });
  });

});


export default router;