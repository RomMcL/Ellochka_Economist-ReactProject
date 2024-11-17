import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    incomeData: [],
    expenseData: [],
    dataLoading: false,
}

export const dataSlice = createSlice({
    name: 'dataSlice',
    initialState,
    reducers: {
        changeIncomeData: (state, action) => {
            state.incomeData.push(action.payload);
            state.incomeData.sort((a, b) => a[0] > b[0] ? 1 : -1);
        },
        getAllIncomeData: (state, action) => {
            state.incomeData = action.payload;
            state.incomeData.sort((a, b) => a[0] > b[0] ? 1 : -1);
        },
        changeExpenseData: (state, action) => {
            let newExpense = action.payload;
            let exists = state.expenseData.some(expense => (expense[0] === newExpense[0] && 
                                                            expense[2] === newExpense[2]));
            if (!exists) {
                state.expenseData.push(newExpense);
                state.expenseData.sort((a, b) => a[0] > b[0] ? 1 : -1);
            };
        },
        getAllExpenseData: (state, action) => {
            state.expenseData = action.payload;
            state.expenseData.sort((a, b) => a[0] > b[0] ? 1 : -1);
        },
        changeDataLoading: (state, action) => {
            state.dataLoading = action.payload;
        },

        resetData: () => initialState
    }
});

export const { changeIncomeData, getAllIncomeData, changeExpenseData, getAllExpenseData, changeDataLoading, resetData } = dataSlice.actions;
export default dataSlice.reducer;