import {createSlice} from "@reduxjs/toolkit";
const CompanySlice = createSlice({
  name:"company",
  initialState:{
    singleCompany:null,

  },
  reducers:{
    setSingleCompany:(state,action)=>{
      state.singleCompany=action.payload;
    }
  }
});
export const{setSingleCompany}=CompanySlice.actions;
export default CompanySlice.reducer;