// controllers/inventoryController.js
import Inventory from "../models/Inventory.js";
import Material from "../models/Material.js";

export const addInventory = async (req, res) => {
  const { materialId, type, quantity } = req.body;
  const material = await Material.findById(materialId);

  if (!material) return res.status(404).json({ msg: "Material not found" });

  if (type === "inflow") material.availableQty += quantity;
  else if (type === "outflow") material.availableQty -= quantity;

  await material.save();

  const record = new Inventory({ material: materialId, type, quantity });
  await record.save();

  res.json(record);
};
