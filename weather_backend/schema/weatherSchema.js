import mongoose from "mongoose";

const weatherSchema = new mongoose.Schema({
  city: { type: String, default: "" },
  temperature: { type: String, default: "" },
  sunset: { type: String, default: "" },
  description: { type: String, default: "" },
  feels_like: { type: String, default: "" },
  icon: { type: String, default: "" },
  date: { type: Date, default: Date.now },
});

export default mongoose.model("weather", weatherSchema);
