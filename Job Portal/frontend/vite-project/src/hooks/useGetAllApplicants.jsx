

import { useEffect } from 'react';
import { APPLICATION_API_END_POINT } from '@/Components/utils/constant';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAllApplicants } from '@/Components/redux/jobSlice';

const useGetallApplicants = (jobId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/${jobId}/applicants`,
          {
            withCredentials:true
          }
        );

        console.log("Fetched applicants:", res.data.applicants);

        if (res.data.success) {
          dispatch(setAllApplicants(res.data.applicants));
        }
      } catch (error) {
        console.error("Failed to fetch all applicants:", error);
      }
    };

    fetchAllApplicants();
  }, [dispatch,jobId]);
};

export default useGetallApplicants;
