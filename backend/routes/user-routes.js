import express from "express";
import {
  enregistrerUser,
  login,
  getBuilds,
  getBuildId,
  getPublic,
} from "../controllers/user-controller.js";
import { checkUser, checkBan } from "../middleware/check-auth.js";
import { check, oneOf } from "express-validator";

const router = express.Router();

const verificationSignIn = [
  check("nom").isString().trim().isLength({ min: 3, max: 20 }),
  check("email").isEmail(),
  check("password").isString().trim().isLength({ min: 9 }),
];

const verificationLogin = [
  check("email").isEmail(),
  check("password").isString().trim().isLength({ min: 9 }),
];

router.get("/public", getPublic);

router.post("/enregisrer", verificationSignIn, enregistrerUser);

router.post("/login", verificationLogin, login);

router.get("/:userId", checkUser, checkBan, getBuilds);

router.get("/:userId/:buildId", checkUser, checkBan, getBuildId);

export default router;
