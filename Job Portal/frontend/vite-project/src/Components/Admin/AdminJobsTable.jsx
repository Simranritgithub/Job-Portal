import React from 'react'
import { TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, Table } from '../ui/Table';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useGetallAdminjobs from '@/hooks/useGetallAdminjobs';
import { Eye } from 'lucide-react';

const AdminJobsTable = () => {
  useGetallAdminjobs();

  const navigate = useNavigate();
  const { alladminjobs= [] } = useSelector(store => store.job|| {});
  const {searchText} =useSelector(store =>store.filter);
  const filteredJobs = alladminjobs.filter(job =>
    job.company?.name?.toLowerCase().includes(searchText.toLowerCase())
  );;
  
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
            alladminjobs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  You have not registered any JOB
                </TableCell>
              </TableRow>
            ) : (
              filteredJobs.map((job) => (
                <TableRow key={job._id}>
                  
                  <TableCell>{job?.company?.name}</TableCell>
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
