import express from "express";
import { getHistory } from "../controllers/history.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, getHistory)

export default router;