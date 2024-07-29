import express from "express";
const router = express.Router();
import {
  authUser,
  logOutUser,
  regUser,
  getUser,
  updateUser
} from "../controller/userControllers.js";

router.post("/", regUser);
router.post("/auth", authUser);
router.post("/logout", logOutUser);
router.get("/profile", getUser);
router.put("/profile", updateUser);

export default router;
