import { createSlice } from "@reduxjs/toolkit";
import content from "../../services/contentSettings";

const initialState = {
    visibility: [true, true, true, true],
    year: new Date().getFullYear(),
    quantityСalls: 0,
    relationLuba: content.relationship[0],
    sliderVal: 0,

}

export const accountCallSlice = createSlice({
    name: 'accountCallSlice',
    initialState,
    reducers: {
        changeVisibility: (state, action) => {
            state.visibility = action.payload;
        },
        changeInputYear: (state, action) => {
            state.year = action.payload;
        },
        changeQuantityСalls: (state, action) => {
            state.quantityСalls = action.payload;
        },
        changeRelationLuba: (state, action) => {
            state.relationLuba = action.payload;
        },
        changeSlider: (state, action) => {
            state.sliderVal = action.payload;
        },
        

        resetAccountCalls: () => initialState
    }
});

export const { changeVisibility, changeInputYear, changeQuantityСalls, changeRelationLuba, changeSlider, resetAccountCalls } = accountCallSlice.actions;
export default accountCallSlice.reducer;