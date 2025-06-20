import express from "express";
import { getWeather } from "../controllers/weather.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// /?lat=24.71&lon=46.68
router.get("/", protectRoute, getWeather)

export default router;