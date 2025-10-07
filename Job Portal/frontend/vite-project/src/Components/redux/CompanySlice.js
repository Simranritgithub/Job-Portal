import { createSlice } from "@reduxjs/toolkit";
const CompanySlice = createSlice({
  name: "company",
  initialState: {
    singleCompany: null,
    allcompanies: []   // 👈 match what component uses
  },
  reducers: {
    setSingleCompany: (state, action) => {
      state.singleCompany = action.payload;
    },
    setCompanies: (state, action) => {
      state.allcompanies = action.payload; // 👈 match
    }
  }
});

export const { setSingleCompany, setCompanies } = CompanySlice.actions;
export default CompanySlice.reducer;
