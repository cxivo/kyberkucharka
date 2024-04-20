import jwt from "jsonwebtoken";
require("dotenv").config();
const accessToken = process.env.SECRET_ACCESS_TOKEN;

export async function verify(req, res, next) {
  try {
    const authHeader = req.headers["cookie"];
    if (!authHeader) return res.sendStatus(401);
    const cookie = authHeader.split("=")[1]; // If there is, split the cookie string to get the actual jwt

    // Verify using jwt to see if token has been tampered with or if it has expired.
    // that's like checking the integrity of the cookie
    jwt.verify(cookie, accessToken, async (err, decoded) => {
      if (err) {
        // if token has been altered or has expired, return an unauthorized error
        return res.status(401).json({
          message: "Platnosť prihlásenia uplynula, prosím prihláste sa znova",
        });
      }
      /*
      const { id } = decoded; // get user id from the decoded token
      const user = await User.findById(id); // find user by that `id`
      const { password, ...data } = user._doc; // return user object without the password
      req.user = data; // put the data object into req.user
      */
      next();
    });
  } catch (err) {
    res.status(500).json({
      error: "Interná chyba serveru pri overovaní platnosti prihlásenia :(",
    });
  }
}
