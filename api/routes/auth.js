import express from "express";
import { verifyJWT } from "../configs/jwt-token-helpers.js";
import auth from "../controllers/auth.js";

const router = express.Router();

router.post("/login", auth.login);
router.post("/register", auth.register);
router.post("/logout", verifyJWT, auth.logout);

export default router;
