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
            let newExpense = action.payload;
            let exists = state.expenseData.some(expense => (expense[0] === newExpense[0] && 
                                                            expense[2] === newExpense[2]));
            /* if (exists) console.log("совпадение даты и статьи расходов"); */
            if (!exists) state.expenseData.push(newExpense);
        },

        resetData: () => initialState
    }
});

export const { changeIncomeData, changeExpenseData, resetData } = dataSlice.actions;
export default dataSlice.reducer;