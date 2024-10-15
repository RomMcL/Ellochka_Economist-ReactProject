import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    date: '',
    sales: '',
    category: '',
    purchasePrice: '',
    pointOfSale: '',
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
    }
});

export const { changeInputDate, changeInputSales, changeInputCategory, 
               changeInputPurchasePrice, changeInputPointOfSale } = formInputSlice.actions;
export default formInputSlice.reducer;