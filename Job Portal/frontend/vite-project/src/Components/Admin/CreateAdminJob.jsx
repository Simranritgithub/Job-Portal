import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/Label";
import { Input } from "../ui/Input";
import {JOB_API_END_POINT} from "@/Components/utils/constant";
import  axios  from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateAdminJob = () => {
  const[selectedCompany,setselectedCompany] =useState("");
  const navigate = useNavigate()
  
  
  const{allcompanies=[]}=useSelector(store=>store.companies)
  const [input, setInput] = useState({
    title: "",
    jobtype: "",
    role: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    experience: "",
    position: 0,
    companyId: "",
  });
  const handleOnChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleOnSelect=(value)=>{
    setselectedCompany(value);
    setInput(prev=>({...prev,companyId:value}));
  }
  useEffect(() => {
  console.log("Updated input:", input);
}, [input]);

  const submitHandler= async(e)=>{
    e.preventDefault();
    console.log(input);
    try {
      const res =  axios.post (`${JOB_API_END_POINT}/jobs`,input,{
    withCredentials:true
  })
    if( res.data.success){
      toast.success(res.data.message)
      navigate('/admin/jobs');

    }
   
    } catch (error) {
      console.log(error)
    }
  }
  
  
  return (
    <div>
      <Navbar />
      <div className="mx-auto max-w-2xl">
        <div className="my-10">
          <p className="text-gray-600">
            This company aims to provide jobs to deserving candidates....
          </p>
        </div>
         <form>
        <div className="grid grid-cols-2 gap-1">
          
          <div>
            <Label>TITLE</Label>
            <Input
              type="text"
              className="focus-visible:ring-offset-1"
              name="title"
              value={input.title}
              onChange={handleOnChange}
            />
          </div>
          <div>
            <Label>ROLE</Label>
            <Input
              type="text"
              className="my-2"
              name="role"
              value={input.role}
              onChange={handleOnChange}
            />
          </div>
          <div>
            <Label>REQUIREMENTS</Label>
            <Input
              type="text"
              className="my-2"
              name="requirements"
              value={input.requirements}
              onChange={handleOnChange}
            />
          </div>
          <div>
            <Label>LOCATION</Label>
            <Input
              type="text"
              className="my-2"
              name="location"
              value={input.location}
              onChange={handleOnChange}
            />
          </div>
          <div>
            <Label>DESCRIPTION</Label>
            <Input
              type="text"
              className="my-2"
              name="description"
              value={input.description}
              onChange={handleOnChange}
            />
          </div>
          <div>
          
            <Label>JOBTYPE</Label>
            <Input
              type="text"
              className="my-2"
              name="jobtype"
              value={input.jobtype}
              onChange={handleOnChange}
            />
          </div>
        <div>
       
          <Label>SALARY</Label>
          <Input
            type="text"
            className="my-2"
            name="salary"
            value={input.salary}
            onChange={handleOnChange}
          />
        </div>
        <div>
          <Label>EXPERIENCE LEVEL</Label>
          <Input
            type="text"
            className="my-2"
            name="experience"
            value={input.experience}
            onChange={handleOnChange}
          />
        </div>
        <div>
          
          <Label>NO. OF OPENINGS</Label>
          <Input
            type="number"
            className="my-2"
            name="position"
            value={input.position}
            onChange={handleOnChange}
          />
        </div>
      <Select value={selectedCompany} onValueChange={handleOnSelect}>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="SELECT COMPANY" />
  </SelectTrigger>
  <SelectContent side="bottom" position="popper" avoidCollisions={false} portalled={false}>
    {
      allcompanies.map((company)=>(
         <SelectItem key={company._id} value={company._id} >{company.name}</SelectItem>
      ))
    }
  </SelectContent>
</Select>

      <div className="flex items-center gap-2 my-10">
        <Button  className='text-black font-bold bg-green-500'variant="outline" onClick={submitHandler} >
          POST
        </Button>
        
        
      </div></div>
      </form></div>
    </div>
    
  );
};

export default CreateAdminJob;
