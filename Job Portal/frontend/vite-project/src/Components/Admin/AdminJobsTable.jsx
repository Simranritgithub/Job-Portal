import React from 'react'
import { TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, Table } from '../ui/Table';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useGetallAdminjobs from '@/hooks/useGetallAdminjobs';
import { Eye } from 'lucide-react';
//import { useGetallCompanies } from '@/hooks/useGetallCompanies';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '../utils/constant';

const AdminJobsTable = () => {
  useGetallAdminjobs();

  const navigate = useNavigate();
  const { allJobs= [] } = useSelector(store => store.job|| {});
  const { allJobs: job } = useSelector((store) => store.job);
  const [companyMap, setCompanyMap] = useState({});

  const { user } = useSelector((store) => store.auth);
  //const [company, setCompany] = useState({});
  //
  const {searchText} =useSelector(store =>store.filter);
  const filteredJobs = searchText 
  ? allJobs.filter(job => job.company?.name?.toLowerCase().includes(searchText.toLowerCase()))
  : allJobs;

  console.log("All Jobs from Redux:", allJobs);
 useEffect(() => {
  const fetchCompanies = async () => {
    const newMap = {};

    await Promise.all(
      allJobs.map(async (job) => {
        if (job.company && !companyMap[job.company]) {
          try {
            const res = await axios.get(`${COMPANY_API_END_POINT}/get/${job.company}`, {
              withCredentials: true,
            });
            newMap[job.company] = res.data.company.name; // make sure backend sends `company.name`
          } catch (error) {
            console.error("Failed to fetch company:", error);
          }
        }
      })
    );

    setCompanyMap(prev => ({ ...prev, ...newMap }));
  };

  if (allJobs.length > 0) fetchCompanies();
}, [allJobs]);

  
  return (
    <div>
     
      <Table>
        <TableCaption>A list of your recent posted jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>COMPANY NAME</TableHead>
            <TableHead>ROLE</TableHead>
            <TableHead>DATE</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {
            allJobs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  You have not registered any JOB
                </TableCell>
              </TableRow>
            ) : (
              filteredJobs.map((job) => (
                <TableRow key={job._id}>
                  
                 <TableCell>{companyMap[job.company] || "Loading..."}</TableCell>

                  <TableCell>{job.title}</TableCell>
                  <TableCell>{new Date(job.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <button  onClick={()=>navigate(`/admin/job/setup`)}className="text-blue-600 hover:underline">Edit</button>
                    <div onClick={()=>navigate(`/admin/jobs/${job._id}/applicants`)}className='flex items-center'>
                      <Eye className='w-4'/>
                      <span>Applicants</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )
          }
        </TableBody>
      </Table>
    </div>
  );
}

export default AdminJobsTable;
