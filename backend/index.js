import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import noteRoutes from "./routes/notes.js";

dotenv.config();

const app = express();
app.use(express.json());

// CORS
app.use(
  cors({
    origin: ["http://localhost:5173", "https://resplendent-arithmetic-69478f.netlify.app"],
    credentials: true,
  })
);

connectDB(process.env.MONGO_URI);

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

app.get("/", (req, res) => res.send("API running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
