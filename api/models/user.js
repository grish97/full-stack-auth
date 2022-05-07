import mongoose from "mongoose";
import { signAccessToken, signRefreshToken } from "../middleware/helpers.js";

const User = new mongoose.Schema(
  {
    username: String,
    email: String,
    password: String,
    refreshToken: String,
    accessToken: String,
  },
  { timestamps: true }
);

/**
 * Generate refresh token for user
 */
User.methods.generateRefreshToken = function () {
  const User = this;

  const refreshToken = signRefreshToken(User._id);
  User.refreshToken = refreshToken;
};

/**
 * Generate access token for user
 */
User.methods.generateAccessToken = function () {
  const User = this;

  const accessToken = signAccessToken(User._id);
  User.accessToken = accessToken;
};

User.methods.getPublicFields = function () {
  const User = this;

  return {
    id: User.id,
    username: User.username,
    email: User.email,
    accessToken: User.accessToken,
  };
};

export default mongoose.model("user", User);
