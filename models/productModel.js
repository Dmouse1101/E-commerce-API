import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    description: { type: String, required: true },
    categoryId: {
      type: mongoose.Schema.ObjectId,
      ref: "category",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("product", productSchema);
