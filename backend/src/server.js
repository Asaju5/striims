import express from "express";
import cors from "cors";
import CookieParser from "cookie-parser";
import "dotenv/config";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import { connectDB } from "./lib/db.js";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

// ✅ Reconstruct __dirname for ES module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.json());
app.use(CookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

const port = process.env.PORT || 3000;

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

// ✅ Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend", "dist", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDB();
});
