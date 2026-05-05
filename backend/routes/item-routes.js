import express from "express";
import { getItems } from "../controllers/item-controller.js";
import { checkUser, checkBan } from "../middleware/check-auth.js";

const router = express.Router();

router.get("/:page", getItems);

export default router;
