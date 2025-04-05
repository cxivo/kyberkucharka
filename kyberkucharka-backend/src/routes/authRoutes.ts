import { Router, Request, Response } from "express";
import { addUser, checkUser, usernameExists } from "../databaseFunctions";
import { User } from "../../../common-interfaces/interfaces";
import {
  authenticateToken,
  generateJWT,
  TOKEN_EXPIRES_IN_SECONDS,
  validateUser,
} from "../auth";

const router = Router();

router.post("/register", async (req: Request, res: Response) => {
  const user: User = req.body;
  const validity = await validateUser(user);

  if (validity != null) {
    res.status(validity.status).json({ message: validity.message, error: "" });
    return;
  }

  addUser(user)
    .then((x) => {
      res.status(201).json({ username: x.username });
    })
    .catch((e) => {
      res.status(409).json({
        message: "An account with this name already exists",
        error: e,
      });
    });
});

router.post("/login", (req: Request, res: Response) => {
  const user: User = req.body;
  checkUser(user)
    .then((u) => {
      if (u != null) {
        //res.status(200).json({ token: generateJWT(user), user: user });
        res
          .status(200)
          .cookie("jwtoken", generateJWT(user), {
            httpOnly: true,
            expires: new Date(Date.now() + TOKEN_EXPIRES_IN_SECONDS * 1000),
          })
          .cookie("userData", JSON.stringify(u), {
            // we want this one to be readable by the client
            expires: new Date(Date.now() + TOKEN_EXPIRES_IN_SECONDS * 1000),
          })
          .json({});
      } else {
        res.status(401).json({ message: "Incorrect password", error: "" });
      }
    })
    .catch((e) => {
      res.status(400).json({ message: "User does not exist", error: e });
    });
});

router.post("/logout", (req: Request, res: Response) => {
  res.status(200).clearCookie("jwtoken").clearCookie("userData").json({});
});

router.get("/userexists/:username", async (req: Request, res: Response) => {
  const username = req.params.username;
  if (await usernameExists(username)) {
    res.status(200).json({});
  } else {
    res.status(404).json({});
  }
});



export default router;