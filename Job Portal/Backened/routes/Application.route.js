import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { applyjob, getAppliedJobs, updateStatus,getApplicants } from "../controllers/Application.controller.js";
const router =express.Router();
router.route("/create/:id").get(isAuthenticated,applyjob);
router.route("/get").get(isAuthenticated,getAppliedJobs);
router.route("/:id/applicants").get(isAuthenticated,getApplicants);
router.route("/status/:id/update").put(isAuthenticated,updateStatus);

export default router;
