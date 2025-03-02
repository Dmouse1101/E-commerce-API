import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const authenticate = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password"); // req.user is created with data excluding password
      next();
    } catch (error) {
      res.status(401);
      throw new Error("not authorized token failed");
    }
  } else {
    res.status(401);
    throw new Error("no token found ");
  }
};

const authorizeAdmin = async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: "not authorized as admin" });
  }
};

export { authenticate, authorizeAdmin };
