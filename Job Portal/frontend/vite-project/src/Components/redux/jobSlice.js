import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setalladminjobs: (state, action) => {
      state.allJobs = action.payload;
    }
  }
});

export const { setAllJobs, setalladminjobs } = jobSlice.actions;
export default jobSlice.reducer;
