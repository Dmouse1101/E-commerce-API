import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js";

const fetchProduct = async (req, res) => {
  const result = await Product.find();
  res.json(result);
};
const createProduct = async (req, res) => {
  const { name, price, description, categoryId } = req.body;
  if (!name || !price || !description || !categoryId)
    return res.status(400).json({ message: "please fill all the fields" });
  const checkCategory = await Category.findById(categoryId);
  if (!checkCategory) return res.json({ message: "category not found" });
  const existingProduct = await Product.findOne({ name });
  if (existingProduct)
    return res.status(400).json({ message: "already exists" });
  try {
    const response = new Product({
      name,
      price,
      description,
      categoryId,
    });
    await response.save();
    res.status(200).json({ response });
  } catch (error) {
    return res.status(401).json({ error });
  }
};

const updateProduct = async (req, res) => {
  const { name, price, description, categoryId } = req.body;
  if (!name || !price || !description || !categoryId)
    return res.status(400).json({ message: "please fill all the fields" });
  const checkCategory = await Category.findById(categoryId);
  if (!checkCategory) return res.json({ message: "category not found" });
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        price,
        description,
        categoryId,
      },
      { new: true }
    );
    await product.save();
    res.json(product);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const response = await Product.findByIdAndDelete(id);
  res.json({ message: "Successfully deleted" });
};
export { fetchProduct, createProduct, updateProduct, deleteProduct };
