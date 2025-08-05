// routes/materialRoutes.js
import express from "express";
import { createMaterial, getMaterials } from "../controllers/materialController.js";

const router = express.Router();

router.post("/", createMaterial);
router.get("/", getMaterials);

export default router;
