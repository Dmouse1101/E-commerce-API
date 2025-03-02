import OrderItem from "../models/orderItemModel.js";

const categoryWiseSales = async (req, res) => {
  try {
    const sales = await OrderItem.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      { $unwind: "$productDetails" },
      {
        $lookup: {
          from: "categories",
          localField: "productDetails.categoryId",
          foreignField: "_id",
          as: "categoryDetails",
        },
      },
      { $unwind: "$categoryDetails" },
      {
        $group: {
          _id: "$categoryDetails.name",
          totalSales: { $sum: { $multiply: ["$quantity", "$price"] } },
        },
      },
      { $sort: { totalSales: -1 } },
    ]);

    res.status(200).json({ message: "Sales Report by Category", sales });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const topSellingProducts = async (req, res) => {
  try {
    const topProducts = await OrderItem.aggregate([
      {
        $group: {
          _id: "$productId",
          totalSold: { $sum: "$quantity" },
          totalRevenue: { $sum: { $multiply: ["$quantity", "$price"] } },
        },
      },
      { $sort: { totalSold: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      { $unwind: "$productDetails" },
      {
        $project: {
          _id: 0,
          productId: "$productDetails._id",
          name: "$productDetails.name",
          totalSold: 1,
          totalRevenue: 1,
        },
      },
    ]);

    res.status(200).json({ message: "Top-Selling Products", topProducts });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const worstSellingProducts = async (req, res) => {
  try {
    const worstProducts = await OrderItem.aggregate([
      {
        $group: {
          _id: "$productId",
          totalSold: { $sum: "$quantity" },
          totalRevenue: { $sum: { $multiply: ["$quantity", "$price"] } },
        },
      },
      { $sort: { totalSold: 1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      { $unwind: "$productDetails" },
      {
        $project: {
          _id: 0,
          productId: "$productDetails._id",
          name: "$productDetails.name",
          totalSold: 1,
          totalRevenue: 1,
        },
      },
    ]);

    res.status(200).json({ message: "Worst-Selling Products", worstProducts });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export { categoryWiseSales, topSellingProducts, worstSellingProducts };
