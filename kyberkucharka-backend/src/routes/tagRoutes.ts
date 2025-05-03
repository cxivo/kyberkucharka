import { Router, Request, Response } from "express";
import { addTag, deleteTag, getTags } from "../databaseFunctions";
import { authenticateToken } from "../auth";

const router = Router();

// get all tags
router.get("/", (req: Request, res: Response) => {
  getTags().then((result) => {
    res.json(result);
  });
});

router.post("/", authenticateToken, (req: Request, res: Response) => {
  if (!res.locals.user.is_admin) {
    res.status(403).json({
      message: `Only admins can create new tags.`,
    });
  } else {
    addTag(req.body.name ?? "")
      .then(() => {
        res.status(201).json({});
      })
      .catch((e) => {
        console.error(e);
        res
          .status(409)
          .json({ message: "A tag with this name already exists." });
      });
  }
});

router.delete("/:id", authenticateToken, (req: Request, res: Response) => {
  if (!res.locals.user.is_admin) {
    res.status(403).json({
      message: `Only admins can delete new tags.`,
    });
  } else {
    deleteTag(parseInt(req.params.id) ?? 0)
      .then(() => {
        res.status(200).json({});
      })
      .catch((e) => {
        console.error(e);
        res.status(404).json({ message: "Could not find this tag." });
      });
  }
});

export default router;