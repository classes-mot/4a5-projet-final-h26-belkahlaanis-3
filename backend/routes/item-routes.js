import express from "express";
import { getArmures, getTalisments } from "../controllers/item-controller.js";
import { checkUser, checkBan } from "../middleware/check-auth.js";

const router = express.Router();

router.get("/armures", checkUser, checkBan, getArmures);

router.get("/talisments", checkUser, checkBan, getTalisments);

export default router;
