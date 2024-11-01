import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

const initialState = {
    date: null,
    sales: '',
    category: '',
    purchasePrice: '',
    pointOfSale: '',
    typeOfSale: '',
    client: null,
    costDate: null,
    costSum: '',
    expenseItem: '',
}

export const formInputSlice = createSlice({
    name: 'formInputSlice',
    initialState,
    reducers: {
        changeInputDate: (state, action) => {
            state.date = action.payload;
        },
        changeInputSales: (state, action) => {
            state.sales = action.payload;
        },
        changeInputCategory: (state, action) => {
            state.category = action.payload;
        },
        changeInputPurchasePrice: (state, action) => {
            state.purchasePrice = action.payload;
        },
        changeInputPointOfSale: (state, action) => {
            state.pointOfSale = action.payload;
        },
        changeInputTypeOfSale: (state, action) => {
            state.typeOfSale = action.payload;
        },
        changeInputClient: (state, action) => {
            state.client = action.payload;
        },

        changeInputCostDate: (state, action) => {
            state.costDate = action.payload;
        },
        changeInputCostSum: (state, action) => {
            state.costSum = action.payload;
        },
        changeInputExpenseItem: (state, action) => {
            state.expenseItem = action.payload;
        },
        clearInputs: () => initialState
    }
});

export const { changeInputDate, changeInputCategory, changeInputSales, changeInputPurchasePrice, 
               changeInputPointOfSale, changeInputTypeOfSale, changeInputClient, changeInputCostDate, 
               changeInputCostSum, changeInputExpenseItem, clearInputs} = formInputSlice.actions;
export default formInputSlice.reducer;