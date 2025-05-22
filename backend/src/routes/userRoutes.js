import express from "express";
import { ProtectRoutes } from "../middleware/auth.middleware.js";
import {
  acceptFriendRequest,
  getFriendRequests,
  getFriends,
  outgoingFriendRequests,
  recommendedUsers,
  sendFriendRequest,
} from "../controllers/userController.js";
import { send } from "vite";

const router = express.Router();

//apply middleware to all routes
router.use(ProtectRoutes);

router.get("/", recommendedUsers);
router.get("/friends", getFriends);

router.post("/friend-request/:id", sendFriendRequest);
router.put("/friend-request/:id/accept", acceptFriendRequest);

router.get("/friend-requests", getFriendRequests);
router.get("/outgoing-requests", outgoingFriendRequests);

export default router;
