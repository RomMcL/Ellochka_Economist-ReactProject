import { createSlice } from "@reduxjs/toolkit";
import company from "../../services/company";

const initialState = {
    company: Object.keys(company)[0],
}

export const companySlice = createSlice({
    name: 'companySlice',
    initialState,
    reducers: {
        changeRadioCompany: (state, action) => {
            state.company = action.payload;
        },
        
    }
});

export const { changeRadioCompany } = companySlice.actions;
export default companySlice.reducer;