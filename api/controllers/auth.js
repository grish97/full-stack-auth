import bcrypt from "bcryptjs";
import Joi from "@hapi/joi";
import User from "../models/user.js";
import {
  generateAccessToken,
  COOKIE_KEY,
} from "../configs/jwt-token-helpers.js";

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

async function login(req, res) {
  const body = req.body;
  console.log(body);
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
      const token = generateAccessToken(user.id);

      return res
        .cookie(COOKIE_KEY, token, {
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
    res.status(400).json({ success: false, message: error });
  }
}

function logout(req, res) {
  return res.clearCookie(COOKIE_KEY).status(200).json({
    success: true,
    message: "Successfully logged out",
  });
}

async function register(req, res) {
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

export default {
  login,
  register,
  logout,
};
