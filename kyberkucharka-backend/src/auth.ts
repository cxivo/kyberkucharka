import { sign, verify } from "jsonwebtoken";
import { User } from "../../common-interfaces/interfaces";
import { usernameExists } from "./databaseFunctions";
import { Request, Response, NextFunction } from "express";

// note - apparently there is no upper limit for expiration for JWT
// and the upper limit for cookies is like 400 days... so, you can set this to a year
// (I now also understand why Wikipedia tells me I have to relog every year, lol)
export const TOKEN_EXPIRES_IN_SECONDS = 60 * 60 * 24 * 365; //1800;

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

  // we don't care about email that much tbh
  if (user.email == null) {
    return { message: "Nebol zadaný email.", status: 400 };
  }

  // everything looks good
  return undefined;
}

export function generateJWT(user: User) {
  if (process.env.TOKEN_SECRET == null) {
    return undefined;
  }
  return sign(user, process.env.TOKEN_SECRET, {
    expiresIn: `${TOKEN_EXPIRES_IN_SECONDS}s`,
  });
}

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.jwtoken;

  if (token == null) {
    res.status(401).json({ message: "No token was provided", error: "" });
  } else {
    verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
      console.error(err);

      if (err) {
        // invalid or expired token => remove the cookies!
        res.clearCookie("jwtoken").clearCookie("userData").sendStatus(403);
      } else {
        res.locals.user = user;
        next();
      }
    });
  }
}

export function checkTokenAndMaybeLogout(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.jwtoken;

  if (token != null) {
    verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
      if (err) {
        // invalid or expired token => remove the cookies!
        res.clearCookie("jwtoken").clearCookie("userData");
      }
    });
  }

  // and then continue
  next();
}

export function sendJWTCookie(res: Response, u: User, status: number) {
  res
    .status(status)
    .cookie("jwtoken", generateJWT(u), {
      secure: process.env.STATUS === "production",
      httpOnly: true,
      sameSite: process.env.STATUS === "production" ? "none" : "lax",
      expires: new Date(Date.now() + TOKEN_EXPIRES_IN_SECONDS * 1000),
    })
    .cookie("userData", JSON.stringify(u), {
      // we want this one to be readable by the client
      expires: new Date(Date.now() + TOKEN_EXPIRES_IN_SECONDS * 1000),
    })
    .json({});
}