import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    reportType: 'choiceReport',
}

export const reportTypeSlice = createSlice({
    name: 'reportTypeSlice',
    initialState,
    reducers: {
        changeReportType: (state, action) => {
            state.reportType = action.payload;
        }
    }
});

export const { changeReportType } = reportTypeSlice.actions;
export default reportTypeSlice.reducer;