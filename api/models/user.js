import mongoose from "mongoose";
import { signAccessToken, signRefreshToken } from "../middleware/helpers.js";

const User = new mongoose.Schema(
  {
    username: String,
    email: String,
    password: String,
    refreshToken: String,
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

export default mongoose.model("user", User);
