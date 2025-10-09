import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    singleJob: null,
    
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
    }
  }
});

export const { setAllJobs, setalladminjobs ,setsingleJob} = jobSlice.actions;
export default jobSlice.reducer;
