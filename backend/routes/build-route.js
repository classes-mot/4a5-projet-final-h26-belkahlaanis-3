import express from "express";
import {
  creerBuild,
  modifierBuild,
  supprimerBuild,
} from "../controllers/build-controller.js";

const router = express.Router();

router.post("/user:id", creerBuild);

router.patch("/user:id/:id", modifierBuild);

router.delete("/user:id/:id", supprimerBuild);

export default router;
