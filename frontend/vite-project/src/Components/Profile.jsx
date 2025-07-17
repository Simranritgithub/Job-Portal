import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Button } from "./ui/button";
import { Mail, Contact } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "@radix-ui/react-label";
import ApplicationTable from "./ApplicationTable";
import UpdatedProfileDialogue from './UpdatedProfileDialogue'; // Correct path to the component
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useSelector } from "react-redux";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  return (
    <div className="bg-black min-h-screen">
      <Navbar />

      {/* Profile Container */}
      <div className="max-w-4xl mx-auto rounded-2xl my-8 p-8 border border-red-500 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24 rounded-full border-2 border-red-500 shadow-md">
              <AvatarImage
                src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg"
                alt="profile"
              />
            </Avatar>
            <div className="flex flex-col text-white">
              <h1 className="font-bold text-2xl text-red-500">{user?.fullname || "No Name"}</h1>
              <p className="text-gray-400 text-sm mt-2 max-w-lg">
                {user?.profile?.bio || "Passionate job seeker looking to connect with top companies."}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            className="border-red-500 text-red-500 hover:bg-red-600 hover:text-white"
            onClick={() => setOpen(true)}
          >
            Edit Profile
          </Button>
        </div>

        {/* Contact Info */}
        <div className="my-6 text-white">
          <h2 className="text-lg font-semibold text-red-400 mb-2">Contact Information</h2>
          <div className="flex items-center gap-3 my-2 text-gray-300">
            <Mail className="text-red-500" />
            <span>{user?.email || "NA"}</span>
          </div>
          <div className="flex items-center gap-3 my-2 text-gray-300">
            <Contact className="text-red-500" />
            <span>{user?.mobileno|| "NA"}</span>
          </div>
        </div>

        {/* Skills */}
        <div className="my-6 text-white">
          <h2 className="text-lg font-semibold text-red-400 mb-2">skills</h2>
          <div className="flex items-center gap-2 flex-wrap">
            {user?.profile?.skills?.length ? (
              user.profile.skills.map((item, index) => (
                <Badge key={index} className="bg-red-600 text-white font-semibold px-3 py-1 rounded-full">
                  {item}
                </Badge>
              ))
            ) : (
              <span className="text-gray-400">{user?.skills||"NA"}</span>
            )}
          </div>
        </div>

        {/* Resume */}
        <div className="mt-6 text-white">
          <Label className="text-md font-bold text-red-400">Resume</Label>
          <div className="mt-1">
            {user?.profile?.resumeOriginalName ? (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={user.profile.resume || "#"}
                className="text-red-400 underline hover:text-red-300"
              >
                {user.profile.resumeOriginalName}
              </a>
            ) : (
              <span className="text-gray-400">{user?.resumeOriginalName||"NA"}</span>
            )}
          </div>
        </div>
      </div>

      {/* Applied Jobs */}
      <div className="max-w-4xl mx-auto font-bold text-white rounded-2xl px-8 pb-8">
        <h1 className="text-xl mb-4 text-red-500">Applied Jobs</h1>
        <ApplicationTable />
      </div>

      {/* Update Dialog */}
      <UpdatedProfileDialogue open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
