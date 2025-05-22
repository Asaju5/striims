import express from "express";
import { ProtectRoutes } from "../middleware/auth.middleware.js";
import { getStreamToken } from "../controllers/chatController.js";

const router = express.Router();

router.get("/token", ProtectRoutes, getStreamToken);
export default router;
