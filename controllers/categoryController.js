import Category from "../models/categoryModel.js";

const fetchCategory = async (req, res) => {
  const response = await Category.find();
  res.status(200).json(response);
};
const createCategory = async (req, res) => {
  const { name } = req.body;
  if (!name) return res.json({ message: "Name is not defined" });
  const existCategory = await Category.findOne({ name });
  if (existCategory) return res.status(401).json({ message: "already exist" });
  const response = await Category.create({ name });
  await response.save();
  res.json(response);
};
const updateCategory = async (req, res) => {
  const { name } = req.body;
  const category = await Category.findById({ _id: req.params.id });
  if (!category) return res.json({ message: "category not found" });
  category.name = name;
  const updatedCategory = await category.save();
  res.json(updatedCategory);
};
const deleteCategory = async (req, res) => {
  const { id } = req.params;
  const response = await Category.findByIdAndDelete({ _id: id });
  res.json(response);
};

export { fetchCategory, createCategory, updateCategory, deleteCategory };
