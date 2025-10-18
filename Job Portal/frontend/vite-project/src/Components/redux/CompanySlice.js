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
    setallCompanies: (state, action) => {
      state.allcompanies = action.payload; // 👈 match
    }
  }
});

export const { setSingleCompany, setallCompanies } = CompanySlice.actions;
export default CompanySlice.reducer;
