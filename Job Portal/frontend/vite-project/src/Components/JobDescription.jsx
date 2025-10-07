import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAllJobs } from "./redux/jobSlice";
import { JOB_API_END_POINT } from "./utils/constant";

const JobDescription = () => {
  const { id: jobId } = useParams();
  const dispatch = useDispatch();

  const { setAllJobs: job } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.error("Failed to fetch job:", error);
      }
    };

    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  if (!job) {
    return <div className="text-center mt-8 text-gray-500">Loading job details...</div>;
  }

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md max-w-3xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-2">{job.title}</h2>
      <p className="text-gray-700 mb-1"><strong>Company:</strong> {job.company}</p>
      <p className="text-gray-700 mb-1"><strong>Location:</strong> {job.location}</p>
      <p className="text-gray-700 mb-1"><strong>Type:</strong> {job.type}</p>
      <p className="text-gray-700 mb-4"><strong>Salary:</strong> {job.salary}</p>
      <p className="text-gray-600 mb-4"><strong>Posted on:</strong> {job.postedDate}</p>

      <h3 className="text-xl font-semibold mb-1">Job Description</h3>
      <p className="mb-4">{job.description}</p>

      <h3 className="text-xl font-semibold mb-1">Responsibilities</h3>
      <ul className="list-disc list-inside mb-4">
        {job.responsibilities?.map((res, index) => (
          <li key={index}>{res}</li>
        ))}
      </ul>

      <h3 className="text-xl font-semibold mb-1">Requirements</h3>
      <ul className="list-disc list-inside mb-4">
        {job.requirements?.map((req, index) => (
          <li key={index}>{req}</li>
        ))}
      </ul>

      <h3 className="text-xl font-semibold mb-1">Benefits</h3>
      <ul className="list-disc list-inside mb-4">
        {job.benefits?.map((benefit, index) => (
          <li key={index}>{benefit}</li>
        ))}
      </ul>

      <p className="text-gray-700">
        <strong>How to Apply:</strong>{" "}
        <a href={`mailto:${job.email}`} className="text-blue-500 underline">
          {job.email}
        </a>
      </p>
    </div>
  );
};

export default JobDescription;
