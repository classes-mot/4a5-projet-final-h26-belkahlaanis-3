import express from "express";
import { getUsers, banUser } from "../controllers/admin-controller.js";
import { checkUser, checkAdmin } from "../middleware/check-auth.js";
import { check } from "express-validator";

const router = express.Router();

const validationBan = [
  check("raisonBan").isString().trim().isLength({ min: 10, max: 100 }),
];

router.get("/users", checkUser, checkAdmin, getUsers);

router.patch("/:id", checkUser, checkAdmin, validationBan, banUser);

export default router;
