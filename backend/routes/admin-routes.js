import express from "express";
import { getUsers, banUser } from "../controllers/admin-controller.js";

const router = express.Router();

router.get("/users", getUsers);

router.patch("/:id", banUser);

export default router;
