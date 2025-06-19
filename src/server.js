import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRouter from "./routes/auth.routes.js"
import weatherRouter from "./routes/weather.routes.js"
import historyRouter from "./routes/history.routes.js"

dotenv.config();

const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json());
app.use("/auth", authRouter)
app.use("/weather", weatherRouter)
app.use("/history", historyRouter)

app.get("/", (req, res) => {
    res.send("main API path")
})

app.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  // connectDB();
});