import express from "express";
const router = express.Router();

// Sample in-memory inventory data (replace with DB later)
let inventory = [
  { id: 1, name: "Cement", category: "Construction", unitPrice: 320, quantity: 100, supplier: "ABC Suppliers" },
  { id: 2, name: "Steel Rod", category: "Construction", unitPrice: 550, quantity: 50, supplier: "XYZ Steels" },
];

// 📌 GET all inventory items
router.get("/", (req, res) => {
  res.json(inventory);
});

// 📌 GET a single inventory item
router.get("/:id", (req, res) => {
  const item = inventory.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ message: "Item not found" });
  res.json(item);
});

// 📌 ADD a new inventory item
router.post("/", (req, res) => {
  const newItem = {
    id: inventory.length + 1,
    name: req.body.name,
    category: req.body.category,
    unitPrice: req.body.unitPrice,
    quantity: req.body.quantity,
    supplier: req.body.supplier
  };
  inventory.push(newItem);
  res.status(201).json(newItem);
});

// 📌 UPDATE inventory item
router.put("/:id", (req, res) => {
  const item = inventory.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ message: "Item not found" });

  item.name = req.body.name ?? item.name;
  item.category = req.body.category ?? item.category;
  item.unitPrice = req.body.unitPrice ?? item.unitPrice;
  item.quantity = req.body.quantity ?? item.quantity;
  item.supplier = req.body.supplier ?? item.supplier;

  res.json(item);
});

// 📌 DELETE inventory item
router.delete("/:id", (req, res) => {
  inventory = inventory.filter(i => i.id !== parseInt(req.params.id));
  res.json({ message: "Item deleted successfully" });
});

export default router;
