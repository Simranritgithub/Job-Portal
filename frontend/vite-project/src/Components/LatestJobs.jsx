import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";

const LatestJobs = () => {
  const { allJobs } = useSelector((state) => state.job) || { allJobs: [] };
  console.log("Redux allJobs:", allJobs);

  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="text-4xl font-bold text-white">
        Latest & Top <span className="text-red-600">Job Openings</span>
      </h1>

      <div className="grid grid-cols-3 gap-4 my-5">
        {Array.isArray(allJobs) && allJobs.length > 0 ? (
          allJobs.slice(0, 6).map((job) => (
            <LatestJobCards
              key={job._id}
              company={job.company?.name || "Unknown Company"}
              location={job.location}
              title={job.title}
              salary={job.salary}
              jobType={job.jobType}
              positions={job.position}
              jobId={job._id}
            />
          ))
        ) : (
          <span>No Job Available</span>
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
