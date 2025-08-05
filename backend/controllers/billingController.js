// controllers/billingController.js
import Invoice from "../models/Invoice.js";
import Material from "../models/Material.js";

export   const   createInvoice = async (req, res) => {
  let total = 0;
  const items = [];

  for (let { materialId, quantity } of req.body.materials) {
    const material = await Material.findById(materialId);
    const price = material.unitPrice * quantity;
    total += price;
    items.push({ material: materialId, quantity, price });
    material.availableQty -= quantity;
    await material.save();
  }

  const invoice = new Invoice({ materials: items, totalAmount: total });
  await invoice.save();

  res.status(201).json(invoice);
};
