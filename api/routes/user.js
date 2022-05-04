import express from "express";
import * as user from "../controllers/user.js";

const router = express.Router();

router.get("/", user.getUsers);

export default router;