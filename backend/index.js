import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import noteRoutes from "./routes/notes.js";


dotenv.config();


const app = express();
app.use(express.json());
const allowedOrigin = process.env.FRONTEND_URL || "https://resplendent-arithmetic-69478f.netlify.app/login";

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || origin.startsWith(allowedOrigin)) {
      callback(null, true); // allow requests
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // allow Authorization headers
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 5000
connectDB(process.env.MONGO_URI);


app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);


app.get("/", (req, res) => res.send("API running"));


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));