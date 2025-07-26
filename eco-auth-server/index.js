import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS for frontend on port 3000
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/metamask-login", (req, res) => {
  res.send("MetaMask Auth Server is running 🚀");
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));