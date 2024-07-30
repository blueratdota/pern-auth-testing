import express from "express";
const router = express.Router();
import {
  authUser,
  logOutUser,
  regUser,
  getUser,
  updateUser
} from "../controller/userControllers.js";
import { protect } from "../middleware/authMiddleware.js";

router.post("/", regUser);
router.post("/auth", authUser);
router.post("/logout", logOutUser);
router.get("/profile", protect, getUser);
router.put("/profile", protect, updateUser);
// router.route("/profile").get(protect, getUser).put(protect, updateUser);

export default router;
