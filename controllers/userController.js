// const User = require("../models/userModel");
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import createToken from "../utils/generateToken.js";
import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";
import OrderItem from "../models/orderItemModel.js";

const createUser = async (req, res) => {
  const { name, email, password, isAdmin } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "please fill all the fields" });
  }
  const userExist = await User.findOne({ email });
  if (userExist) return res.status(401).json({ message: "email is exists" });

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const newUser = new User({
    name,
    email,
    password: hashPassword,
    isAdmin,
  });

  try {
    await newUser.save();
    // createToken(newUser._id, res);
    res.status(200).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    throw new Error("Invalid data user");
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (!existingUser)
    return res.status("401").json({ message: "email not found" });
  const isValidPassword = await bcrypt.compare(password, existingUser.password);
  if (!isValidPassword)
    return res.status(401).json({ message: "password is not valid" });
  createToken(existingUser._id, res);
  res.status(200).json({ message: "login succcessfully" });
};

const logoutUser = async (req, res) => {
  res.cookie("jwt", "", { httpOnly: true, expiresIn: new Date(0) });
  res.status(200).json({ message: "logout Successfully" });
};

const fetchAllProducts = async (req, res) => {
  const response = await Product.find();
  res.status(200).json(response);
};
const getProductDetail = async (req, res) => {
  const response = await Product.findById(req.params.id);
  res.status(200).json({ response });
};

const placeOrder = async (req, res) => {
  try {
    const { products } = req.body; // Array of { productId, quantity }
    if (!products || products.length === 0) {
      return res.status(400).json({ message: "No products selected" });
    }

    let totalAmount = 0;
    let orderItems = [];

    // Check if all products exist and calculate total amount
    for (const item of products) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res
          .status(404)
          .json({ message: `Product not found: ${item.productId}` });
      }

      const itemTotal = product.price * item.quantity;
      totalAmount += itemTotal;

      orderItems.push({
        productId: product._id,
        quantity: item.quantity,
        price: product.price,
      });
    }

    // Create Order
    const order = await Order.create({
      userId: req.user._id,
      totalAmount,
      status: "pending",
    });

    // Create Order Items
    for (const item of orderItems) {
      await OrderItem.create({ ...item, orderId: order._id });
    }

    return res
      .status(201)
      .json({ message: "Order placed successfully", order });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getOrderHistory = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id })
      .populate({
        path: "orderItems",
        populate: {
          path: "productId",
          select: "name price",
        },
      })
      .sort({ createdAt: -1 });

    if (!orders.length) {
      return res.status(404).json({ message: "No orders found" });
    }

    return res.status(200).json({ message: "Order history retrieved", orders });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export {
  createUser,
  loginUser,
  logoutUser,
  fetchAllProducts,
  getProductDetail,
  placeOrder,
  getOrderHistory,
};
