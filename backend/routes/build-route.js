import express from "express";
import {
  creerBuild,
  modifierBuild,
  supprimerBuild,
} from "../controllers/build-controller.js";

const router = express.Router();

router.post("/:userid", creerBuild);

router.patch("/:userid/:buildId", modifierBuild);

router.delete("/:userid/:buildId", supprimerBuild);

export default router;
