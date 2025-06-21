// History – per request
import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
  weather: { type: mongoose.Schema.Types.ObjectId, ref: "Weather" },
  lat: Number,
  lon: Number,
  requestedAt: { type: Date, default: Date.now, index: true },
});

const History = mongoose.model("History", historySchema);

export default History;

