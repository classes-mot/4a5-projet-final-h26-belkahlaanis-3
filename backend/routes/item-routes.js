import express from "express";
import { getArmures, getTalisments } from "../controllers/item-controller.js";
import { checkUser, checkBan } from "../middleware/check-auth.js";

const router = express.Router();

router.get("/armures", getArmures);

router.get("/talisments", getTalisments);

export default router;
//checkUser, checkBan,