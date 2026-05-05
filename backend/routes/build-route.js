import express from "express";
import {
  creerBuild,
  modifierBuild,
  supprimerBuild,
} from "../controllers/build-controller.js";
import { checkUser, checkBan } from "../middleware/check-auth.js";
import { check } from "express-validator";

const router = express.Router();

router.post("/:userId", checkUser, checkBan, creerBuild);

router.patch("/:userId/:buildId", checkUser, checkBan, modifierBuild);

router.delete("/:userId/:buildId", checkUser, checkBan, supprimerBuild);

export default router;
