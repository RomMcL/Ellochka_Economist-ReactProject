import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentPage: 1,
    numberRows: 20,
}

export const paginationSlice = createSlice({
    name: 'paginationSlice',
    initialState,
    reducers: {
        changeCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        changeNumberRows: (state, action) => {
            state.numberRows = action.payload;
            state.currentPage = 1;
        },

        resetPagination: () => initialState
    }
});

export const { changeCurrentPage, changeNumberRows, resetPagination } = paginationSlice.actions;
export default paginationSlice.reducer;