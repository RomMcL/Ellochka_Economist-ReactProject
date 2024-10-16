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
        }
    }
});

export const { changeData } = dataSlice.actions;
export default dataSlice.reducer;