import express from "express";
import {
  postjob,
  getAllJobs,
  getJobById,
  getAdminJobs,
  
} from "../controllers/job.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

// ✅ Authenticated: Post a job
router.route("/jobs").post(isAuthenticated, postjob);

// ✅ Public: Get all jobs
router.route("/all").get(getAllJobs);

// ✅ 🔓 Public: Get single job by ID — FIXED
router.route("/get/:id").get(getJobById);

// ✅ Authenticated: Get admin jobs
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);

export default router;
