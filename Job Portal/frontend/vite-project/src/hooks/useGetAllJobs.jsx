import { useEffect } from 'react';
import { JOB_API_END_POINT } from '@/Components/utils/constant';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAllJobs } from '@/Components/redux/jobSlice';

const useGetAllJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get`);

        console.log("Fetched jobs:", res.data.jobs);

        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.error("Failed to fetch all jobs:", error);
      }
    };

    fetchAllJobs();
  }, [dispatch]);
};

export default useGetAllJobs;
