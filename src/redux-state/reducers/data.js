import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    incomeData: [],
    expenseData: [],
}

export const dataSlice = createSlice({
    name: 'dataSlice',
    initialState,
    reducers: {
        changeIncomeData: (state, action) => {
            state.incomeData.push(action.payload);
        },
        changeExpenseData: (state, action) => {
            state.expenseData.push(action.payload);
        },
        resetData: () => initialState
    }
});

export const { changeIncomeData, changeExpenseData, resetData } = dataSlice.actions;
export default dataSlice.reducer;