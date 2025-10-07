import { useEffect } from 'react';
import { JOB_API_END_POINT } from '@/Components/utils/constant';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setalladminjobs } from '@/Components/redux/jobSlice';

const useGetallAdminjobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAlladminJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`,
          {
            withCredentials:true
          }
        );

        console.log("Fetched jobs:", res.data.jobs);

        if (res.data.success) {
          dispatch(setalladminjobs(res.data.jobs));
        }
      } catch (error) {
        console.error("Failed to fetch all jobs:", error);
      }
    };

    fetchAlladminJobs();
  }, [dispatch]);
};

export default useGetallAdminjobs;
