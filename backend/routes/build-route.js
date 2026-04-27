import express from "express";
import {
  creerBuild,
  modifierBuild,
  supprimerBuild,
} from "../controllers/build-controller.js";
import { checkUser, checkBan } from "../middleware/check-auth.js";
import { check } from "express-validator";

const router = express.Router();
const validation = [
  check("titre").optional().isString().trim().isLength({ min: 2, max: 100 }),
  check("isPublic").optional().isBoolean(),
  check("classe").isIn([
    "Vagabond",
    "Warrior",
    "Hero",
    "Bandit",
    "Samurai",
    "Prisoner",
    "Astrologer",
    "Confessor",
    "Prophet",
    "Wretch",
  ]),
  check("equipement.casque").optional().isString(),
  check("equipement.plastron").optional().isString(),
  check("equipement.pantalon").optional().isString(),
  check("equipement.botte").optional().isString(),
  check("artefacts.artefact1").optional().isString(),
  check("artefacts.artefact2").optional().isString(),
  check("artefacts.artefact3").optional().isString(),
  check("artefacts.artefact4").optional().isString(),
  check("stats.hp").isInt({ min: 1, max: 99 }),
  check("stats.fp").isInt({ min: 1, max: 99 }),
  check("stats.end").isInt({ min: 1, max: 99 }),
  check("stats.str").isInt({ min: 1, max: 99 }),
  check("stats.dex").isInt({ min: 1, max: 99 }),
  check("stats.int").isInt({ min: 1, max: 99 }),
  check("stats.faith").isInt({ min: 1, max: 99 }),
  check("stats.arc").isInt({ min: 1, max: 99 }),
  check("stats.lvl").isInt({ min: 1, max: 713 }),
  check("description").optional().isString().trim().isLength({ max: 500 }),
];

router.post("/:userId", checkUser, checkBan, validation, creerBuild);

router.patch("/:userId/:buildId", checkUser, checkBan, modifierBuild);

router.delete("/:userId/:buildId", checkUser, checkBan, supprimerBuild);

export default router;
