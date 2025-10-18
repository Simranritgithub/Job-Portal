import React, { useState } from "react";
import { Button } from "../ui/button";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label"; // Make sure it's lowercase 'label' if your file is lowercase
import { Input } from "../ui/input"; // Same here
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "../redux/CompanySlice";
import axios from "axios";
import { COMPANY_API_END_POINT } from "../utils/constant"; // Removed '@/Components' if path is relative
import { toast } from "sonner";
//import { useNavigate } from "react-router-dom";

const CreateCompany = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const dispatch = useDispatch();

  const registerNewCompany = async () => {
    if (!companyName) {
      toast.error("Please enter a company name!");
      return;
    }

    try {
      console.log("📦 Company name being submitted:", companyName);

      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);

        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      } else {
        toast.error(res?.data?.message || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] min-h-screen py-20">
      <Navbar />
      <div className="max-w-5xl mx-auto bg-slate-800 rounded-xl shadow-2xl p-6 min-h-[70vh] ">
        <div className="  my-10">
          <h1 className="font-bold text-2xl  px-4 py-4 text-white tracking-tighter mt-20">
            REGISTER YOUR OWN DREAM COMPANY
          </h1>
          <p className="px-4 text-red-600 text-xl font-semibold tracking-tighter">
            This company aims to provide jobs to deserving candidates....
          </p>
        </div>

        <Label className="text-white font-semibold text-lg tracking-tighter px-4">
          COMPANY NAME
        </Label>
        <Input
          type="text"
          className="my-2 ml-4 mr-10 placeholder:text-md font-semibold placeholder:text-red-500  border-2 border-red-600 rounded-xl shadow-2xl"
          placeholder="Google, Microsoft etc"
          onChange={(e) => setCompanyName(e.target.value)}
          value={companyName} // controlled input
        />

        <div className="flex items-center gap-4 my-10 px-4 ">
          <Button onClick={()=>navigate(`/admin/companies`)}>
            Cancel
          </Button>
          <Button  className=" bg-red-600 text-sm text-semibold"onClick={registerNewCompany}>Continue</Button>
        </div>
      </div>
    </div>
  );
};

export default CreateCompany;
