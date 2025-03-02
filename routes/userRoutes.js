import express from "express";
import {
  createUser,
  loginUser,
  logoutUser,
  fetchAllProducts,
  getProductDetail,
  placeOrder,
  getOrderHistory,
} from "../controllers/userController.js";
import { authenticate } from "../middleware/authMiddleware.js";
// const router = require("express").Router();
// const { getUserdetails } = require("../controllers/userController");

const router = express.Router();
router.post("/registration", createUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/products", fetchAllProducts);
router.get("/product/:id", getProductDetail);
router.post("/place", authenticate, placeOrder);
router.post("/history", authenticate, getOrderHistory);
export default router;
