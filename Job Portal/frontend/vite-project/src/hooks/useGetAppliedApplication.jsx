

import { useEffect } from 'react';
import { APPLICATION_API_END_POINT } from '@/Components/utils/constant';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAllApplications } from '@/Components/redux/jobSlice';

const useGetallApplicantions = (applicant) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllApplications = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/application/${applicant}`,
          {
            withCredentials:true
          }
        );

        console.log("Fetched applicantions:", res.data.applications);

        if (res.data.success) {
          console.log(setAllApplications);
          dispatch(setAllApplications(res.data.applications));
        }
      } catch (error) {
        console.error("Failed to fetch all applicantions:", error);
      }
    };

    fetchAllApplications();
  }, [dispatch,applicant]);
};

export default useGetallApplicantions;
