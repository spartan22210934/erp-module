// models/Inventory.js
import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
  material: { type: mongoose.Schema.Types.ObjectId, ref: "Material" },
  type: { type: String, enum: ["inflow", "outflow"], required: true },
  quantity: Number,
  date: { type: Date, default: Date.now }
});

export default mongoose.model("Inventory", inventorySchema);
