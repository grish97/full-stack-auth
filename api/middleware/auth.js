import jwt from "jsonwebtoken";
import { COOKIE_JWT_KEY } from "./helpers.js";

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

/**
 * Verify access token
 * @param {Request} req
 * @param {Response} res
 */
export function verfiyAccessToken(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    const accessToken = authHeader.split(" ")[1];

    jwt.verify(accessToken, ACCESS_TOKEN_SECRET, (error, data) => {
      if (error) {
        return res.status(403).json({
          success: false,
          message: "A token is required for authentication",
        });
      } else if (data._id) {
        req._id = data._id;
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: error,
    });
  }
}

/**
 * Verfy refresh token
 * @param {string} refreshToken
 */
export async function verifyRefreshToken(refreshToken) {
  return await jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
}
