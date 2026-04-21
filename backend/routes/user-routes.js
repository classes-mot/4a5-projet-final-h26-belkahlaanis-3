import express from "express";
import {
  enregistrerUser,
  login,
  getBuilds,
  getBuildId,
} from "../controllers/user-controller.js";

const router = express.Router();

router.post("/enregisrer", enregistrerUser);

router.post("/login", login);

router.get("/:userId", getBuilds);

router.delete("/:userId/:buildId", getBuildId);

export default router;
