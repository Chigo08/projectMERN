import express from "express";
import dotenv from "dotenv";
import orderRoutes from "./routes/orderRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import { connectDB } from "../config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use("/api/orders", orderRoutes);
app.use("/api/menus", menuRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
