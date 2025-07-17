import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedJob } from "./redux/jobSlice";
import { JOB_API_END_POINT } from "./utils/constant";

const JobDescription = () => {
  const { id: jobId } = useParams();
  const dispatch = useDispatch();
  const job = useSelector((store) => store.job.selectedJob);

  const [loadingApply, setLoadingApply] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // ✅ Fetch job details
  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true, // optional, depending on cookies/token
        });

        if (res.data.success) {
          dispatch(setSelectedJob(res.data.job));
        } else {
          setErrorMsg("Failed to load job details");
        }
      } catch (error) {
        setErrorMsg("Error fetching job");
      }
    };

    if (jobId) fetchSingleJob();
  }, [jobId, dispatch]);

  // ✅ Apply to job
  const handleApply = async () => {
    try {
      setLoadingApply(true);
      setErrorMsg("");
      setSuccessMsg("");

      const formData = new FormData();
      formData.append("resume", new Blob(), "empty.txt"); // dummy resume

       const res = await axios.post(`http://localhost:5000/api/v1/application/apply/${jobId}`, formData, {
 withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        setSuccessMsg("You have successfully applied to this job.");
      } else {
        setErrorMsg(res.data.message || "Apply failed");
      }
    } catch (error) {
      setErrorMsg(
        error?.response?.data?.message || "Something went wrong while applying."
      );
    } finally {
      setLoadingApply(false);
    }
  };

  if (errorMsg) return <div className="text-red-600 text-center mt-6">{errorMsg}</div>;
  if (!job) return <div className="text-center mt-8 text-gray-500">Loading job details...</div>;

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md max-w-3xl mx-auto mt-6 relative">
      {/* Apply Button */}
      <button
        onClick={handleApply}
        disabled={loadingApply}
        className="absolute top-4 right-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loadingApply ? "Applying..." : "Apply"}
      </button>

      {/* Feedback */}
      {successMsg && <div className="text-green-600 font-semibold mb-4">{successMsg}</div>}
      {errorMsg && <div className="text-red-600 font-semibold mb-4">{errorMsg}</div>}

      {/* Job Info */}
      <h2 className="text-2xl font-bold mb-2">{job.title}</h2>
      <p className="text-gray-700 mb-1"><strong>Company:</strong> {job.company?.name || job.company}</p>
      <p className="text-gray-700 mb-1"><strong>Location:</strong> {job.location}</p>
      <p className="text-gray-700 mb-1"><strong>Type:</strong> {job.jobType}</p>
      <p className="text-gray-700 mb-4"><strong>Salary:</strong> ₹{job.salary}</p>
      <p className="text-gray-600 mb-4"><strong>Posted on:</strong> {new Date(job.createdAt).toLocaleDateString()}</p>
      <p className="text-gray-700 mb-4"><strong>Total Applicants:</strong> {job.applicantsCount || 0}</p>

      <h3 className="text-xl font-semibold mb-1">Job Description</h3>
      <p className="mb-4">{job.description}</p>

      <h3 className="text-xl font-semibold mb-1">Requirements</h3>
      <ul className="list-disc list-inside mb-4">
        {job.requirements?.map((req, index) => (
          <li key={index}>{req}</li>
        ))}
      </ul>

      {job.benefits?.length > 0 && (
        <>
          <h3 className="text-xl font-semibold mb-1">Benefits</h3>
          <ul className="list-disc list-inside mb-4">
            {job.benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </>
      )}

      {job.email && (
        <p className="text-gray-700">
          <strong>Contact:</strong>{" "}
          <a href={`mailto:${job.email}`} className="text-blue-500 underline">
            {job.email}
          </a>
        </p>
      )}
    </div>
  );
};

export default JobDescription;
