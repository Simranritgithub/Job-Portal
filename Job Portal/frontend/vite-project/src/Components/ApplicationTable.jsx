import React, { use, useEffect } from 'react'
import{Table,TableHeader,TableHead,TableRow,TableCell,TableBody} from "./ui/table"
import {Badge} from "./ui/badge";
import axios from 'axios';
import { APPLICATION_API_END_POINT } from './utils/constant';
import { useState } from 'react';

const ApplicationTable = () => {
  const [appliedjobs,setAppliedjobs]=useState([]);
useEffect(()=>{
  const fetchAppliedJobs=async()=>{
    try { 
      const res=await axios.get(`${APPLICATION_API_END_POINT}/get`,{
      withCredentials:true,
    }); if (res.data.success){
      setAppliedjobs(res.data.applications);
      console.log("Fetched applied jobs:", res.data.applications);
    }} catch (error) {
      console.log("Error fetching applied jobs:", error);
    }}
    fetchAppliedJobs();},[]);
  return (
    <div className='bg-black'>
      <Table className="text-white">
        <TableHeader>
          <TableRow >
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            appliedjobs.map((item,index)=>(
              <TableRow key={index}>
                <TableCell>{new Date(item.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>{item.job?.title}</TableCell>
                <TableCell>{item.job?.company?.name}</TableCell>
                <TableCell className="text-right my-4"><Badge className={ item.status==="pending"?"bg-red-500":item.status==="accepted"?"bg-green-600":"bg-red-400"}>{item.status.toUpperCase()}</Badge></TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  )
}

export default ApplicationTable