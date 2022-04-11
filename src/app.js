// const express = require("express");
import express from 'express';
import productRouter from './routes/product';
import categoryRouter from './routes/category';
import authRouter from './routes/auth'
import postRouter from './routes/post'
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

// middleware
app.use(express.json());
app.use(cors());
// app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJSDocs))
// Routing
app.use("/api/products", productRouter);
app.use("/api", categoryRouter);
app.use("/api", authRouter);
app.use("/api", postRouter);

// connect database
mongoose.connect("mongodb://localhost:27017/assi")
    .then(() => console.log("Connect db thanh cong"))
    .catch((error) => console.log(error))
// Connect
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server đang chạy cổng ${PORT}`);
});
