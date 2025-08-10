import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  getApplicants,
  applyjob,
  uploadResume,
  updateApplicationStatus,
  usersApplication
} from "../controllers/Application.controller.js";

const router = express.Router();

// ✅ Must match the frontend route exactly
router.post("/apply/:id", isAuthenticated, uploadResume, applyjob);

// For recruiters/admin to fetch applicants
router.get("/job/:id/applicants", isAuthenticated, getApplicants);
// routes/application.js or job.js
router.put("/application/:id/status", updateApplicationStatus);
router.get("/application/:userId",usersApplication);


export default router;
