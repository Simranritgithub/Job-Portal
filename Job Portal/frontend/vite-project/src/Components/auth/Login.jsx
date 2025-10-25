import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from '@radix-ui/react-radio-group';
import { Button } from '../ui/button';
import axios from "axios";
import { USER_API_END_POINT } from '../utils/constant';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '../redux/authSlice';

export const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const { loading } = useSelector(store => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, {
        ...input,
        role: input.role.toLowerCase(), // 🔧 normalize role
      }, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      dispatch(setLoading(false));
    }
  }

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-full min-h-screen bg-black text-white px-4 pt-16  sm:px-0 sm:pt-0">
        <form onSubmit={submitHandler} className="w-full max-w-lg border border-red-600 rounded-md p-6 sm:p-10  bg-black shadow-md">
          <h1 className="font-bold  text-base sm:text-3xl text-red-600 mb-6 text-center">Login</h1>

          {/* Email */}
          <div className="mb-4">
            <Label htmlFor="email" className="block text-sm font-medium text-red-600">Email</Label>
            <Input
              id="email"
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="Enter your email"
              className="bg-black border border-red-600 text-white placeholder:text-gray-500"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <Label htmlFor="password" className="block text-sm font-medium text-red-600">Password</Label>
            <Input
              id="password"
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Enter your password"
              className="bg-black border border-red-600 text-white placeholder:text-gray-500"
            />
          </div>

          {/* User Role */}
          <div className="my-5">
            <Label className="block text-sm font-medium text-red-600 mb-2">User Type</Label>
            <RadioGroup className="flex items-center gap-6">
              <div className='flex items-center space-x-2'>
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer accent-red-500"
                />
                <Label htmlFor="student" className="text-red-600">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer accent-red-500"
                />
                <Label htmlFor="recruiter" className="text-red-600">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Submit Button */}
          {loading ? (
            <Button className="w-full my-4 bg-red-600 text-white hover:bg-red-700">
              <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full  text-base my-4 bg-red-600 text-white hover:bg-red-700">
              Login
            </Button>
          )}

          {/* Signup redirect */}
          <span className="text-sm text-gray-300">
            Don't have an account?{" "}
            <a href="/signup" className="text-red-600 hover:text-red-600 underline">
              Sign Up
            </a>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
