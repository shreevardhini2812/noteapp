import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import noteRoutes from "./routes/notes.js";


dotenv.config();


const app = express();
app.use(express.json());
app.use(cors());


const PORT = process.env.PORT || "https://resplendent-arithmetic-69478f.netlify.app/login"
connectDB(process.env.MONGO_URI);


app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);


app.get("/", (req, res) => res.send("API running"));


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));