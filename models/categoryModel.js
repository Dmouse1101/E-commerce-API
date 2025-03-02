import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      maxlength: 32,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("category", categorySchema);
