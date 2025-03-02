import dotenv from "dotenv";
import express, { urlencoded } from "express";
// const express = require("express");
import cookieParser from "cookie-parser";
import connectDb from "./config/db.js";
// const { connectDb } = require("./db/config.js");
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
// const userRoutes = require("./routes/userRoutes.js");

dotenv.config();

const app = express();

connectDb();
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/user", userRoutes);
app.use("/admin", adminRoutes);

const port = process.env.PORT || "8000";
app.listen(port, () => {
  console.log("Server started at : " + port);
});
