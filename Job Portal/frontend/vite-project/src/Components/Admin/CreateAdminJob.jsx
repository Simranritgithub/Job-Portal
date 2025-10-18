import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/Label";
import { Input } from "../ui/Input";
import { JOB_API_END_POINT } from "@/Components/utils/constant";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { toast } from "sonner";

const CreateAdminJob = () => {
  const [selectedCompany, setSelectedCompany] = useState("");
  const navigate = useNavigate();
  useGetAllCompanies();

  const { allcompanies } = useSelector((state) => state.companies);
  const sortedCompanies = [...allcompanies].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const [input, setInput] = useState({
    title: "",
    jobtype: "",
    role: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    experienceLevel: "",
    position: 0,
    companyId: "",
  });

  const handleOnChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleOnSelect = (value) => {
    setSelectedCompany(value);
    setInput((prev) => ({ ...prev, companyId: value }));
    console.log(selectedCompany)
    console.log("Selected Company ID:", value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("Submitting Job with data:");
    const payload = { ...input, experienceLevel: Number(input.experienceLevel), salary: Number(input.salary), position: Number(input.position) };
    try {
      const res = await axios.post(`${JOB_API_END_POINT}/jobs`, payload, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to post job. Try again.");
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] min-h-screen py-20">
      <Navbar />

      <div className="mx-auto max-w-6xl bg-gray-900 rounded-2xl shadow-2xl p-10 min-h-[75vh]">
        <h1 className="text-3xl font-bold text-red-500 mb-6 text-center tracking-wide">
          Post Dream Jobs, Empower Careers!
        </h1>

        <form className="space-y-6" onSubmit={submitHandler}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "TITLE", name: "title", type: "text" },
              { label: "ROLE", name: "role", type: "text" },
              { label: "REQUIREMENTS", name: "requirements", type: "text" },
              { label: "LOCATION", name: "location", type: "text" },
              { label: "JOB TYPE", name: "jobtype", type: "text" },
              { label: "SALARY", name: "salary", type: "text" },
              { label: "EXPERIENCE LEVEL", name: "experienceLevel", type: "text" },
              { label: "NO. OF OPENINGS", name: "position", type: "number" },
            ].map((field) => (
              <div key={field.name}>
                <Label className="text-red-500 font-bold text-lg tracking-tight mb-2">
                  {field.label}
                </Label>
                <Input
                  type={field.type}
                  name={field.name}
                  value={input[field.name]}
                  onChange={handleOnChange}
                  className="bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-red-500 w-full rounded-lg px-4 py-3"
                  placeholder={field.label}
                />
              </div>
            ))}

            {/* Description */}
            <div className="md:col-span-2">
              <Label className="text-red-500 font-bold text-lg tracking-tight mb-2">
                DESCRIPTION
              </Label>
              <textarea
                name="description"
                value={input.description}
                onChange={handleOnChange}
                rows={5}
                className="bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-red-500 w-full rounded-lg px-4 py-3 resize-none"
                placeholder="Enter job description..."
              />
            </div>

            {/* Company Select */}
            <div className="md:col-span-2">
              <Label className="text-red-500 font-bold text-lg tracking-tight mb-2">
                SELECT COMPANY
              </Label>
              <Select value={selectedCompany} onValueChange={handleOnSelect}>
                <SelectTrigger className="w-full bg-gray-800 text-white border-2 border-red-500 rounded-lg shadow-lg px-4 py-3 focus:ring-2 focus:ring-red-500">
                  <SelectValue placeholder="SELECT COMPANY" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 text-3xl font-semibold text-white rounded-xl shadow-2xl border-2 border-red-600" side="bottom" position="popper" avoidCollisions={false}  >
                  {sortedCompanies.map((company) => (
                    <SelectItem key={company._id} value={company._id}>
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <Button
              type="submit"
              
              className="bg-red-500 hover:bg-white hover:text-red-500 text-white font-bold py-3 px-10 rounded-xl shadow-2xl transition-colors"
            >
              POST JOB
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAdminJob;
