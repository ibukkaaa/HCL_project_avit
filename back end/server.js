import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { connectDB } from "./config/database.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

app.get("/health", (req,res)=>{
    res.json({
        status:"ok",
        service:"bazar.in api",
        timestamp: Date.now()
    })
})

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Bazar API running on ${PORT}`)
})