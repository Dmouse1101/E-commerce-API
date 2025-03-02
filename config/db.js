// const mongoose = require("mongoose");
import mongoose from "mongoose";
const connectDb = async () => {
  return await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to database"))
    .catch((error) => console.log(error));
};

export default connectDb;
