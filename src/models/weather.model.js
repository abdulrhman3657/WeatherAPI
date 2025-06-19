// Weather – cached current conditions
import mongoose from "mongoose";

const weatherSchema = new mongoose.Schema({
  _id: ObjectId,
  lat: Number, // rounded(2)
  lon: Number,
  data: mongoose.Schema.Types.Mixed, // raw OpenWeather JSON
  fetchedAt: Date, // TTL-indexed
});

const Weather = mongoose.model("Weather", weatherSchema);

export default Weather;
