import express from "express";
import {postjob,getAllJobs,getJobById,getAdminJobs} from "../controllers/job.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
const router =express.Router();
router.route("/jobs").post(isAuthenticated,postjob);
router.route("/get").get(getAllJobs);
router.route("/get/:id").get(isAuthenticated,getJobById);
router.route("/getadminjobs").get(isAuthenticated,getAdminJobs);
export default router;
