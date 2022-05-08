import User from "../models/user.js";
import { handleError } from "../configs/handleError.js";

export async function getUsers(req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    handleError(error);
  }
}
