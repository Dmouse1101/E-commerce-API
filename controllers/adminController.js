import User from "../models/userModel.js";
import Product from "../models/productModel.js";
import bcrypt from "bcrypt";
import createToken from "../utils/generateToken.js";
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (!existingUser) return res.status(401).json({ message: "user not found" });
  const isValidPassword = await bcrypt.compare(password, existingUser.password);
  if (!isValidPassword)
    return res.status(401).json({ message: "password is not valid" });
  if (!existingUser.isAdmin)
    return res.status(401).json({ message: "not an admin" });
  createToken(existingUser._id, res);
  res.status(200).json({ message: "login Successfully" });
};

export { loginAdmin };
