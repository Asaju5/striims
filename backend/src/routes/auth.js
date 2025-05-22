import express from "express";
import { login, logout, signup } from "../controllers/authController.js";
import { onboarding } from "../controllers/onboarding.js";
import { ProtectRoutes } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.post("/onboarding", ProtectRoutes, onboarding);

router.get("/me", ProtectRoutes, async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

export default router;
