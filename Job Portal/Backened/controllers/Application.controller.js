import { Application } from "../models/Application.model.js";
import { Job } from "../models/Job.model.js"; // ✅ Ensure correct import
import multer from 'multer';

// Setup multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to store uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique file name
  }
});

const upload = multer({ storage });

export const applyjob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;

    console.log("User ID:", userId);
    console.log("Job ID:", jobId);

    if (!jobId) {
      return res.status(400).json({
        message: "Job ID is required",
        success: false,
      });
    }

    // Check if user has already applied
    const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
    console.log("Existing Application:", existingApplication);

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job",
        success: false,
      });
    }

    // Fetch Job details
    const job = await Job.findById(jobId);
    console.log("Job found:", job);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    // Ensure applications array exists before pushing
    if (!Array.isArray(job.applications)) {
      job.applications = [];
    }

    // Handle file upload
    const filePath = req.file ? req.file.path : null;

    // Create new application
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
      resume: filePath, // Save file path if uploaded
    });

    console.log("New Application Created:", newApplication);

    // Add application ID to the job's applications array
    job.applications.push(newApplication._id);
    console.log("Updated Job Applications List:", job.applications);

    await job.save();

    return res.status(201).json({
      message: "Job applied successfully",
      success: true,
    });

  } catch (error) {
    console.error("Error in applyjob:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

// GET Applied Jobs (for user)
export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const applications = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
      path: 'job',
      options: { sort: { createdAt: -1 } },
      populate: {
        path: 'company',
        options: { sort: { createdAt: -1 } },
      }
    });

    if (!applications || applications.length === 0) {
      return res.status(404).json({
        message: "No applications found",
        success: false
      });
    }

    return res.status(200).json({
      applications,
      success: true
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

// GET Applicants (for job)
export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: 'applications',
      options: { sort: { createdAt: -1 } },
      populate: {
        path: 'applicant',
      }
    });

    if (!job) {
      return res.status(404).json({
        message: 'Job not found',
        success: false
      });
    }

    return res.status(200).json({
      job,
      count: job.applications.length,
      applicants: job.applications,
      success: true
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

// Update Application Status
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;

    if (!status) {
      return res.status(400).json({
        message: "Status is required",
        success: false
      });
    }

    const application = await Application.findById(applicationId);

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
        success: false
      });
    }

    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      message: "Status updated successfully",
      success: true
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};
