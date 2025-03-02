import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.ObjectId, ref: "user", required: true },
    totalAmount: { type: Number, required: true, default: 0 },
    status: {
      type: String,
      required: true,
      enum: ["pending", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    orderItems: [{ type: mongoose.Schema.ObjectId, ref: "orderItem" }],
  },
  { timestamps: true }
);

export default mongoose.model("order", orderSchema);
