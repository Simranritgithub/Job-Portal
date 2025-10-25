import { createSlice } from "@reduxjs/toolkit";
import { all } from "axios";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    singleJob: null,
    allapplicants:[],
    
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setalladminjobs: (state, action) => {
      state.allJobs = action.payload;
    },
     setsingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setAllApplicants:(state,action)=>{
      state.allapplicants=action.payload;
    }
  }
});

export const { setAllJobs, setalladminjobs ,setsingleJob,setAllApplicants} = jobSlice.actions;
export default jobSlice.reducer;
