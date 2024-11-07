import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    year: new Date().getFullYear(),

}

export const accountCallSlice = createSlice({
    name: 'accountCallSlice',
    initialState,
    reducers: {
        changeInputYear: (state, action) => {
            state.year = action.payload;
        },

    }
});

export const { changeInputYear } = accountCallSlice.actions;
export default accountCallSlice.reducer;