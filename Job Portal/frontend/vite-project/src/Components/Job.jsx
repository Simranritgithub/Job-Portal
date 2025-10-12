import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { Badge } from "./ui/badge";

const Job = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div className="p-5 rounded-md shadow-xl bg-black border border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-white mt-8">2 days ago</p>
        <Button variant="outline" className="rounded-full mt-8" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-3 my-4">
        <img
  src={job.company?.logo || "https://c8.alamy.com/comp/2RDNN08/bucharest-romania-july-10-2023-the-logo-of-the-indian-multinational-wipro-technologies-is-seen-on-top-of-a-building-in-bucharest-this-image-is-f-2RDNN08.jpg"}
  alt={job.company?.name || "Company Logo"}
  className="w-12 h-12 rounded-full object-cover border border-gray-200"
/>
        {/*
         <AvatarPrimitive.Root className="w-12 h-12 rounded-full overflow-hidden border border-white">
          <AvatarPrimitive.Image
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29tcGFueSUyMGxvZ298ZW58MHx8MHx8fDA%3D&w=1000&q=80"
            alt="Company Logo"
          />
          <AvatarPrimitive.Fallback className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500 text-sm">
            CN
          </AvatarPrimitive.Fallback>
        </AvatarPrimitive.Root> */}

        <div>
          <h1 className="font-medium text-lg text-red-600">{job.company?.name}</h1>
          <p className="text-white text-sm">{job.location}</p>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-lg text-red-600 my-2">{job.title}</h1>
        <p className="text-sm text-white">{job.description}</p>
      </div>

      <div className="flex items-center mt-4 gap-4">
        <Badge className="text-white font-bold" variant="ghost">
          {job.position} Position
        </Badge>
        <Badge className="text-white font-bold" variant="ghost">
          {job.jobType}
        </Badge>
        <Badge className="text-white font-bold" variant="ghost">
          {job.salary}
        </Badge>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <Button
          onClick={() => navigate(`/description/${job._id}`)}
          variant="outline"
        >
          Details
        </Button>
        <Button className="bg-red-600">Save For Later</Button>
      </div>
    </div>
  );
};

export default Job;
