import React from "react";
import Navbar from "./shared/Navbar"; 

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A]
 ">
      <Navbar />

   <div className="max-w-5xl mx-auto px-6 py-24 sm:px-4 sm:py-12">


        <h1 className=" text-base sm:text-4xl font-bold mt-4 pt-16  sm:mb-6 text-center text-red-600">About DreamJob Portal</h1>

        <p className=" text-base sm:text-lg mb-6 text-center text-gray-300">
          DreamJob Portal is your ultimate career platform connecting job seekers with top employers.
          Whether you're looking to start your journey or hire the right talent, we've built the tools you need.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mt-10">
          {/* For Job Seekers */}
          <div className="bg-zinc-900 p-3 sm:p-6 rounded-xl shadow-md border border-red-600">
            <h2 className=" text-base sm:text-2xl font-semibold mb-4 text-red-600">For Job Seekers</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
              <li>Create your profile and upload your resume.</li>
              <li>Search and apply for jobs with ease.</li>
              <li>Track your applications in real time.</li>
              <li>Get matched to jobs that fit your skills.</li>
            </ul>
          </div>

          {/* For Employers */}
          <div className="bg-zinc-900 p-3 sm:p-6  rounded-xl shadow-md border border-red-600">
            <h2 className="text-base sm:text-2xl font-semibold mb-4 text-red-600">For Employers</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
              <li>Register your company and post job listings.</li>
              <li>Access a wide pool of qualified candidates.</li>
              <li>Filter, shortlist, and manage applications.</li>
              <li>Hire quickly and build your dream team.</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h3 className=" text-base sm:text-xl font-semibold mb-2 text-red-600">Why Choose DreamJob?</h3>
          <p className=" text-base sm:text-md max-w-2xl mx-auto text-gray-400">
            We blend technology, speed, and simplicity to connect job seekers with the right opportunities and recruiters with the right talent.
            At DreamJob, your career or hiring goal is just a click away.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
