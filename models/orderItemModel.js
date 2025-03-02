import mongoose from "mongoose";

const orderItemSchema = mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    quantity: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("orderItem", orderItemSchema);
