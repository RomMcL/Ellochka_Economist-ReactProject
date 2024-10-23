import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
}

export const dataSlice = createSlice({
    name: 'dataSlice',
    initialState,
    reducers: {
        changeData: (state, action) => {
            state.data.push(action.payload);
        },
        resetData: () => initialState
    }
});

export const { changeData, resetData } = dataSlice.actions;
export default dataSlice.reducer;