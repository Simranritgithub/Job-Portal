
import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filters",
  initialState: {
    searchText: "",
    company: "",
    location: "",
    title: "",
    Salary:""
    // Add more filters as needed
  },
  reducers: {
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    setCompany: (state, action) => {
      state.company = action.payload;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    settitle: (state, action) => {
      state.title = action.payload;
    },
    setSalary: (state, action) => {
      state.Salary = action.payload;
    },
    resetFilters: (state) => {
      state.searchText = "";
      state.company = "";
      state.location = "";
      state.title = "";
      state.Salary=""
    },
  },
});

export const {
  setSearchText,
  setCompany,
  setLocation,
  settitle,
  resetFilters,
  setSalary
} = filterSlice.actions;

export default filterSlice.reducer;
