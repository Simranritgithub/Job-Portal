import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { USER_API_END_POINT } from "../utils/constant";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux"; // <-- Added useSelector
import { setLoading } from "../redux/authSlice";
import { Loader2 } from "lucide-react"; // Optional, assuming you use this icon for loading

export const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    mobileno: "",
    password: "",
    role: "",
    file: null,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading); // <-- Using loading from Redux

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files.length > 0 ? e.target.files[0] : null;
    setInput((prev) => ({ ...prev, file }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("mobileno", input.mobileno);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Signup failed. Check console for details.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-full min-h-screen bg-gray-900">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-lg border border-gray-700 rounded-md p-6 shadow-lg bg-black"
        >
          <h1 className="font-bold text-2xl mb-4 text-center text-[#F83008]">Sign Up</h1>

          {/* Full Name */}
          <div className="mb-4">
            <Label htmlFor="fullname" className="block text-sm text-red-600 font-bold">
              Full Name
            </Label>
            <Input
              id="fullname"
              type="text"
              name="fullname"
              value={input.fullname}
              onChange={changeEventHandler}
              placeholder="Enter your name"
              required
              className="border border-gray-300  bg-black text-gray-200 rounded-md px-3 py-2 w-full"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <Label htmlFor="email" className="block text-sm font-bold text-red-600">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="Enter your email"
              required
              className="border border-gray-300  bg-black text-gray-200 rounded-md px-3 py-2 w-full"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <Label htmlFor="password" className="block text-sm font-bold text-red-600">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="Enter your password"
              required
              className="border border-gray-300 bg-black text-gray-200  rounded-md px-3 py-2 w-full"
            />
          </div>

          {/* Mobile Number */}
          <div className="mb-4">
            <Label htmlFor="mobileno" className="block text-sm font-bold text-red-600">
              Mobile Number
            </Label>
            <Input
              id="mobileno"
              type="text"
              name="mobileno"
              value={input.mobileno}
              onChange={changeEventHandler}
              placeholder="Enter your mobile number"
              required
              className="border border-gray-300 bg-black text-gray-200  rounded-md px-3 py-2 w-full"
            />
          </div>

          {/* Radio Group for Role */}
          <div className="my-5">
            <Label className="block text-sm font-bold text-red-600 mb-2">User Type</Label>
            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  id="student"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  required
                  className="cursor-pointer accent-red-600"
                />
                <Label htmlFor="student" className="text-red-600">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  id="recruiter"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  required
                  className="cursor-pointer accent-red-600"
                />
                <Label htmlFor="recruiter" className="text-red-600" >Recruiter</Label>
              </div>
            </div>
          </div>

          {/* File Upload */}
          <div className="mb-4">
            <Label htmlFor="profile" className="block text-sm font-bold text-red-600">
              Profile Picture
            </Label>
            <Input
              id="profile"
              type="file"
              accept="image/*"
              onChange={changeFileHandler}
              className="cursor-pointer file:text-white file:bg-red-600 bg-black text-white"
            />
          </div>

          {/* Submit Button */}
          {loading ? (
            <Button className="w-full my-4" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4 text-white bg-red-600 font-bold">
              Sign Up
            </Button>
          )}

          <span>
            Already have an account?{" "}
            <a href="/login" className="text-red-600 items-center">
              LOGIN
            </a>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
