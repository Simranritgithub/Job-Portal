import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import jobReducer from "./jobSlice"; // make sure the path is correct
import CompanySlice from "./CompanySlice";
import filterSlice from "./filterSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    job: jobReducer, 
    companies:CompanySlice,
    filter:filterSlice
  },
});

export default store;
