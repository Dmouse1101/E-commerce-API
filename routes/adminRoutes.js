import express from "express";
import salesRoutes from "./salesRoutes.js";
import { loginAdmin } from "../controllers/adminController.js";
import { authenticate, authorizeAdmin } from "../middleware/authMiddleware.js";
import {
  createCategory,
  deleteCategory,
  fetchCategory,
  updateCategory,
} from "../controllers/categoryController.js";
import {
  deleteProduct,
  createProduct,
  fetchProduct,
  updateProduct,
} from "../controllers/productController.js";
import { logoutUser } from "../controllers/userController.js";

const route = express.Router();

route.post("/login", loginAdmin);
route.post("/logout", logoutUser);
route
  .route("/categories")
  .post(authenticate, authorizeAdmin, createCategory)
  .get(authenticate, authorizeAdmin, fetchCategory);
route
  .route("/categories/:id")
  .delete(authenticate, authorizeAdmin, deleteCategory)
  .put(authenticate, authorizeAdmin, updateCategory);

route
  .route("/products")
  .post(authenticate, authorizeAdmin, createProduct)
  .get(authenticate, authorizeAdmin, fetchProduct);
route
  .route("/products/:id")
  .put(authenticate, authorizeAdmin, updateProduct)
  .delete(authenticate, authorizeAdmin, deleteProduct);

route.use("/sales", salesRoutes);

export default route;
