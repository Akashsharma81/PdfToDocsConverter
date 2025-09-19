import mongoose from "mongoose";

const conversionSchema = new mongoose.Schema({
  originalName: { type: String, required: true },
  convertedName: { type: String, required: true },
  fromType: { type: String, required: true },
  toType: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("conversion", conversionSchema);
