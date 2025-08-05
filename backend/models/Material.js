// models/Material.js
import mongoose from "mongoose";

const materialSchema = new mongoose.Schema({
  materialId: String,
  name: String,
  category: String, // Cement, Steel, Bricks
  unitPrice: Number,
  availableQty: Number,
  supplier: String
}, { timestamps: true });

export default mongoose.model("Material", materialSchema);
