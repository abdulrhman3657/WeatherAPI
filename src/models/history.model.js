// History – per request
import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
  user: { type: String, ref: "User", index: true },
  weather: { type: String, ref: "Weather" },
  lat: Number,
  lon: Number,
  requestedAt: { type: Date, default: Date.now, index: true },
});

const History = mongoose.model("History", historySchema);

export default History;

