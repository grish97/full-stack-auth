import jwt from "jsonwebtoken";

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

export const ACCESS_TOKEN_EXP_TIME = "2m";
export const REFRESH_TOKEN_EXP_TIME = "10m";
export const REFRESH_TOKEN_EXP_AGE = 10 * 60 * 1000;

export const COOKIE_JWT_KEY = "jwt";

/**
 * Sign token by options
 * @param {string} userId
 * @param {string} secret
 * @param {string} expireIn
 */
function signToken(userId, secret, expireIn) {
  return jwt.sign({ _id: userId }, secret, {
    expiresIn: expireIn,
  });
}

/**
 * Generate access token
 * @param {string} userId
 */
export function signAccessToken(userId) {
  return signToken(userId, ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXP_TIME);
}

/**
 * Generate refresh token
 * @param {string} userId
 */
export function signRefreshToken(userId) {
  return signToken(userId, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_EXP_TIME);
}
