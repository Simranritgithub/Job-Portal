import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import jobReducer from "./jobSlice"; // make sure the path is correct
import CompanySlice from "./CompanySlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    job: jobReducer, 
    company:CompanySlice// ✅ Add this line
  },
});

export default store;
