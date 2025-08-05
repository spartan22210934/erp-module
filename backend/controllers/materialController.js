// controllers/materialController.js
import Material from "../models/Material.js";

export const createMaterial = async (req, res) => {
  const material = new Material(req.body);
  await material.save();
  res.status(201).json(material);
};

export const getMaterials = async (req, res) => {
  const materials = await Material.find();
  res.json(materials);
};
