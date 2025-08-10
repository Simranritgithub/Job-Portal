import express from "express";
import {
  login,
  logout,
  register,
  updateProfile,
  uploadResume,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

// Register with file upload (if needed)
router.route("/register").post(singleUpload, register);

// Login
router.route("/login").post(login);

// Logout
router.route("/logout").get(logout);

// Update profile (no file)
router.route("/profile/update").put(isAuthenticated, updateProfile);

// ✅ NEW: Upload resume (file upload)
router
  .route("/upload-resume")
  .post(isAuthenticated, singleUpload, uploadResume); // <-- Add this line

export default router;
