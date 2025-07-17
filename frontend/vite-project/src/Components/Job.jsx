import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { Badge } from "./ui/badge";

const Job = ({ job, isApplied }) => {
  const navigate = useNavigate();

  if (!job) {
    console.warn("Job data is undefined");
    return null;
  }

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime.getTime() - createdAt.getTime();
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  const daysAgo = job.createdAt ? daysAgoFunction(job.createdAt) : "N/A";

  const companyInitials = job?.companyName
    ? job.companyName.slice(0, 2).toUpperCase()
    : "CN";

  return (
    <div className="p-5 rounded-md shadow-xl bg-black border border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-white">{daysAgo} days ago</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-3 my-4">
        <AvatarPrimitive.Root className="w-12 h-12 rounded-full overflow-hidden border border-white">
          <AvatarPrimitive.Image
            className="w-full h-full object-cover"
            src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg"
            alt="Company Logo"
          />
          <AvatarPrimitive.Fallback className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500 text-sm">
            {companyInitials}
          </AvatarPrimitive.Fallback>
        </AvatarPrimitive.Root>

        <div>
          <h1 className="font-medium text-lg text-red-600">
            {job?.companyName || "Company Name"}
          </h1>
          <p className="text-white text-sm">{job?.location || "Location"}</p>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-lg text-red-600 my-2">{job?.title || "Job Title"}</h1>
        <p className="text-sm text-white">
          {job?.description || "No description available."}
        </p>
      </div>

      <div className="flex items-center mt-4 gap-4">
        <Badge className="text-white font-bold" variant="ghost">
          {job?.positions ? `${job.positions} POSITIONS` : "Positions"}
        </Badge>
        <Badge className="text-white font-bold" variant="ghost">
          {job?.jobType || "Type"}
        </Badge>
        <Badge className="text-white font-bold" variant="ghost">
          {job?.salary || "Salary"}
        </Badge>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
        >
          Details
        </Button>
        {isApplied ? (
          <Button disabled className="bg-gray-500 cursor-not-allowed">
            Already Applied
          </Button>
        ) : (
          <Button className="bg-red-600 hover:bg-red-700">
            Save For Later
          </Button>
        )}
      </div>
    </div>
  );
};

export default Job;
