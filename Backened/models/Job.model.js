import mongoose from "mongoose"; // ✅ Add this line

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    requirements: [
      {
        type: String
      }
    ],
    salary: {
      type: Number,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    jobtype: {
      type: String,
      
      required: true
    },
    experience: {
      type: Number,
      required: true
    },
    position: {
      type: Number,
      required: true
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application"
      }
    ],

    // ✅ Applicants count field
    applicantsCount: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

export const Job = mongoose.model("Job", jobSchema);
