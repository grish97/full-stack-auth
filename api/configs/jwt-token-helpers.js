import jwt from "jsonwebtoken";

const { ACCESS_TOKEN_SECRET } = process.env;

const tokenExpireTime = "1800s";

export const COOKIE_KEY = "access_token";

export function generateAccessToken(id) {
  return jwt.sign({ _id: id }, ACCESS_TOKEN_SECRET, {
    expiresIn: tokenExpireTime,
  });
}

export function verifyJWT(req, res) {
  const authCookie = req.cookies[COOKIE_KEY];

  jwt.verify(authCookie, ACCESS_TOKEN_SECRET, (error, data) => {
    if (error) {
      return res.sendStatus(403);
    } else if (data.user) {
      req.user = data.user;
      return next();
    }
  });
}
