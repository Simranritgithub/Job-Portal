import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import jobSlice from "./jobSlice"; // make sure the path is correct
import CompanySlice from "./CompanySlice";
import filterSlice from "./filterSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    job: jobSlice, 
    companies:CompanySlice,
    filter:filterSlice
  },
});

export default store;
