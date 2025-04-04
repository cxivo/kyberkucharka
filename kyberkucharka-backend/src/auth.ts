import { sign, verify } from "jsonwebtoken";
import { User } from "../../common-interfaces/interfaces";
import { usernameExists } from "./databaseFunctions";
import { Request, Response, NextFunction } from "express";

type ValidationResult =
  | undefined
  | {
      message: string;
      status: number;
    };

export async function validateUser(user: User): Promise<ValidationResult> {
  // username
  if (!user.username.match(/[a-zA-Z0-9\-_]{3,}/)) {
    return {
      message:
        "Prihlasovacie meno musí mať aspoň 3 znaky, ktoré sú písmená bez diakritiky, číslice, pomlčka alebo podčiarkovník.",
      status: 400,
    };
  }

  if (await usernameExists(user.username)) {
    return { message: "Užívateľ s týmto menom už existuje.", status: 409 };
  }

  // display name
  if (!user.display_name.match(/.+/)) {
    return { message: "Meno musí obsahovať aspoň 1 znak.", status: 400 };
  }

  // password
  if (user.password == null || !user.password.match(/.+/)) {
    return { message: "Heslo musí mať aspoň 8 znakov.", status: 400 };
  }

  // everything looks good
  return undefined;
}

export function generateJWT(user: User) {
  if (process.env.TOKEN_SECRET == null) {
    return undefined;
  }
  return sign(user, process.env.TOKEN_SECRET, { expiresIn: "1800s" });
}

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  console.log(req.headers);
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    res.sendStatus(401);
  } else {
    verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
      console.error(err);

      if (err) {
        res.sendStatus(403);
      } else {
        req.body.author = user;
        next();
      }
    });
  }
}
