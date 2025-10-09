import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setsingleJob } from "./redux/jobSlice";
import { JOB_API_END_POINT, COMPANY_API_END_POINT } from "./utils/constant";
import Navbar from "./shared/Navbar";

const JobDescription = () => {
  const { id: jobId } = useParams();
  const dispatch = useDispatch();

  const { singleJob: job } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const [companyName, setCompanyName] = useState("");

  // Fetch single job
  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setsingleJob(res.data.job));
        }
      } catch (error) {
        console.error("Failed to fetch job:", error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  // Fetch company name
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get/${job.company}`, {
          withCredentials: true,
        });
        setCompanyName(res.data.company.name);
      } catch (error) {
        console.error("Failed to fetch company:", error);
      }
    };
    if (job?.company) fetchCompany();
  }, [job]);

  if (!job) {
    return <div className="text-center mt-8 text-gray-400">Loading job details...</div>;
  }

  return (
    <div>
      <Navbar />
       <div className="min-h-screen  bg-[#0A0A0A]  ">
      <div className="max-w-4xl mx-auto px-6 py-10 bg-gradient-to-b from-[#111827] to-[#1F1F1F] rounded-2xl shadow-xl border-gray-200 border-2  ">
        
        <h2 className="text-3xl font-bold text-red-500 mb-4">{job.title}</h2>
        <p className="text-lg font-semibold text-white tracking tighter mb-2"><strong>Company:</strong> {companyName || "Loading..."}</p>
        <p className="text-lg font-semibold text-white mb-2 tracking tighter"><strong>Location:</strong> {job.location}</p>
        <p className="text-lg font-semibold text-white mb-2 tracking tighter"><strong>Type:</strong> {job.jobtype}</p>
        <p className="text-lg font-semibold text-white mb-2 tracking tighter"><strong>Salary:</strong> {job.salary}</p>
        <p className="text-medium text-gray-400 mb-6 tracking tighter"><strong>Posted on:</strong> {new Date(job.createdAt).toLocaleDateString()}</p>

        <section className="mb-6">
          <h3 className="text-xl font-semibold text-red-500 mb-2">Job Description</h3>
          <p className="text-white">{job.description}</p>
        </section>

        <section className="mb-6">
          <h3 className="text-xl font-semibold text-red-500 mb-2">Responsibilities</h3>
          <ul className="list-disc list-inside text-white">
            {job.responsibilities?.map((res, index) => (
              <li key={index}>{res}</li>
            ))}
          </ul>
        </section>

        <section className="mb-6">
          <h3 className="text-xl font-semibold text-red-500 mb-2">Requirements</h3>
          <ul className="list-disc list-inside text-white">
            {job.requirements?.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </section>

        <section className="mb-6">
          <h3 className="text-xl font-semibold text-red-500 mb-2">Benefits</h3>
          <ul className="list-disc list-inside text-white">
            {job.benefits?.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </section>

        <p className="text-white text-lg">
          <strong>How to Apply:</strong>{" "}
          <a href={`mailto:${job.email}`} className="text-red-500 underline">
            {job.email}
          </a>
        </p>
      </div>
    </div></div>
  );
};

export default JobDescription;
