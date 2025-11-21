import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import noteRoutes from "./routes/notes.js";


dotenv.config();


const app = express();
app.use(express.json());
app.use(cors({
  origin: "https://resplendent-arithmetic-69478f.netlify.app",
  credentials: true
}));

const PORT = process.env.PORT || 5000
connectDB(process.env.MONGO_URI);


app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);


app.get("/", (req, res) => res.send("API running"));


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));