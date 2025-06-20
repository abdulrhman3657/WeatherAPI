import express from "express";
import { getWeather } from "../controllers/weather.controller.js";

const router = express.Router();

// /?lat=24.71&lon=46.68
router.get("/", getWeather)

export default router;