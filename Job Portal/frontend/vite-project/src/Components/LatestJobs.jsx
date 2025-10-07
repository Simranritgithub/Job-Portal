import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";

const LatestJobs = () => {
  const { allJobs } = useSelector((state) => state.job);

  console.log("Redux allJobs:", allJobs); // Check shape of data

  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="text-4xl font-bold text-white">
        Latest & Top <span className="text-red-600">Job Openings</span>
      </h1>

      <div className="grid grid-cols-3 gap-4 my-5">
        {Array.isArray(allJobs) && allJobs.length > 0 ? (
          allJobs.slice(0, 6).map((item) => {
            const companyName = item.company?.name || "Unknown Company";
            const location = item.location || "Unknown Location";
            const title = item.title || "No Title";

            return (
              <div key={item._id}>
                <LatestJobCards
                  company={companyName}
                  location={location}
                  title={title}
                />
              </div>
            );
          })
        ) : (
          <span className="text-red-600 font-bold ">No Job Available</span>
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
