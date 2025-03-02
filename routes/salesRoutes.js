import express from "express";
import {
  categoryWiseSales,
  topSellingProducts,
  worstSellingProducts,
} from "../controllers/salesController.js";
import { authenticate, authorizeAdmin } from "../middleware/authMiddleware.js";
const router = express.Router();

// Protect all routes with authenticate and adminAuth middleware
router.get("/category-wise", authenticate, authorizeAdmin, categoryWiseSales);
router.get("/top-selling", authenticate, authorizeAdmin, topSellingProducts);
router.get(
  "/worst-selling",
  authenticate,
  authorizeAdmin,
  worstSellingProducts
);

export default router;
