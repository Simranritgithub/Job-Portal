import React from 'react'
import { Popover } from '../ui/popover'
import { PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { MoreHorizontal } from 'lucide-react'
import { TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, Table } from '../ui/Table';
import useGetallApplicants from '@/hooks/useGetAllApplicants';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { APPLICATION_API_END_POINT } from '../utils/constant';
import axios from 'axios';
import { toast } from 'sonner';

const ApplicantsTable = () => {
  const shortlistingStatus = ["accepted", "rejected"];
  const { id: jobId } = useParams();
 const handleOnStatus=async(applicationId,status)=>{
  try {
  const res = await axios.put(
    `${APPLICATION_API_END_POINT}/application/${applicationId}/status`,
    { status },
    {
      withCredentials: true,
    }
  );

  if (res.data.success){
     toast.success(res.data.message)
    console.log("Status updated successfully", res.data.message);}
    
} catch (error) {
  console.log("Error in updating status", error);
}}


  useGetallApplicants(jobId);
  const { allapplicants = [] } = useSelector(store => store.job);

  return (
    <div>
      <Table>
        <TableCaption>A list of applicants</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>FULL NAME</TableHead>
            <TableHead>EMAIL</TableHead>
            <TableHead>CONTACT</TableHead>
            <TableHead>RESUME</TableHead>
            <TableHead>DATE</TableHead>
            <TableHead>ACTION</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {allapplicants.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No applicants applied to your company
              </TableCell>
            </TableRow>
          ) : (
            allapplicants.map((application, index) => (
              <TableRow key={index}>
                <TableCell>{application?.applicant?.fullname || 'N/A'}</TableCell>
                <TableCell>{application?.applicant?.email || 'N/A'}</TableCell>
                <TableCell>{application?.applicant?.mobileno || 'N/A'}</TableCell>
                <TableCell>
                  {application?.applicant?.resume ? (
                    <a
                      href={application.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      View Resume
                    </a>
                  ) : 'N/A'}
                </TableCell>
                <TableCell>
                  {new Date(application?.createdAt).toLocaleDateString() || 'N/A'}
                </TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent>
                      {shortlistingStatus.map((status, i) => (
                        <div key={i} onClick={() => handleOnStatus(application._id,status)}className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded">
                          <span>{status}</span>
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default ApplicantsTable;
