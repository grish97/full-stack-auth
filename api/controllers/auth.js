import bcrypt from "bcryptjs";
import Joi from "@hapi/joi";
import User from "../models/user.js";
import {
  COOKIE_ACCESS_TOKEN_KEY,
  signAccessToken,
} from "../middleware/helpers.js";
import { verifyRefreshToken } from "../middleware/auth.js";

// validate user info
const reqisterSchema = Joi.object({
  username: Joi.string().min(3).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});

/**
 * Login user
 * @param {Request} req
 * @param {Response} res
 */
export async function login(req, res) {
  const body = req.body;
  const user = await User.findOne({ email: body.email });

  const isValidPassword = await bcrypt.compare(
    body.password,
    user?.password || ""
  );

  if (!isValidPassword || !user) {
    res
      .status(400)
      .send({ success: false, message: "Email or password incorrect" });
    return;
  }

  try {
    const { error } = await loginSchema.validateAsync(body);

    if (error) {
      return res.json({ success: false, message: error.details[0].message });
    } else {
      const accessToken = signAccessToken(user.id);
      await user.generateRefreshToken();

      await user.save();

      return res
        .cookie(COOKIE_ACCESS_TOKEN_KEY, accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        })
        .status(200)
        .json({
          success: true,
          data: user,
        });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: JSON.stringify(error) });
  }
}

/**
 * Update user refresh/access tokens
 * @param {Request} req
 * @param {Response} res
 */
export async function refreshToken(req, res) {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        success: true,
        error: "No refresh token provided",
      });
    }

    const payload = await verifyRefreshToken(refreshToken);

    const user = await User.findOne({ _id: payload._id }).exec();
    console.log(payload._id, user.refreshToken);

    if (!user) {
      return res.status(401).json({
        status: false,
        message: "User not found",
      });
    } else if (user.refreshToken !== refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Old token. Not valid anymore",
      });
    }

    const accessToken = signAccessToken(user.id);
    await user.generateRefreshToken();
    await user.save();

    return res
      .status(200)
      .cookie(COOKIE_ACCESS_TOKEN_KEY, accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .json({
        success: true,
        data: {
          accessToken: accessToken,
          refreshToken: user.refreshToken,
        },
      });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      error: error,
    });
  }
}

/**
 * Register user
 * @param {Request} req
 * @param {Response} res
 */
export async function logout(req, res) {
  try {
    const user = await User.findOne({ id: req.params.id });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    user.refreshToken = "";

    await user.save();

    return res.status(200).clearCookie(COOKIE_ACCESS_TOKEN_KEY).json({
      success: true,
      message: "Successfully logged out",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error,
    });
  }
}

export async function register(req, res) {
  const body = req.body;
  // check user by email is exist
  const existUser = await User.findOne({ email: body.email });

  if (existUser) {
    res.status(400).json({
      success: false,
      message: "User with this email already exists",
    });
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(body.password, salt);

  const user = new User({
    username: body.username,
    email: body.email,
    password: hashedPassword,
  });

  try {
    const { error } = reqisterSchema.validateAsync(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    } else {
      const savedUser = await user.save();
      res.status(200).json({
        success: true,
        data: savedUser,
      });
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
}
