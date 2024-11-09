import React from "react";
import { changeInputYear } from "../../redux-state/reducers/account-call"; 
import { useSelector, useDispatch } from "react-redux";
import Stack from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone';

const InpYearChoose = () => {

    const inputYear = useSelector(state => state.accountCallSlice.year);
    const dispatch = useDispatch();

    const currentYear = parseInt(new Date().getFullYear());
    const minYear = 2000;

    const changeYear = (event) => {        
        let newValue = event.target.value.replace(/\D/g, "");
        if (newValue > currentYear) newValue = currentYear;
        dispatch(changeInputYear(newValue));
    }
    const changeMinYear = (event) => {                
        if (inputYear < minYear) {
            dispatch(changeInputYear(minYear));
        }
    }

    const deductYear = () => {        
        dispatch(changeInputYear(parseInt(inputYear) - 1));
    }
    const addYear = () => {        
        dispatch(changeInputYear(parseInt(inputYear) + 1));
    }

    return (
        <Stack direction="row" spacing={1}>
            <IconButton onClick={deductYear} disabled={parseInt(inputYear) <= minYear}>
                <RemoveCircleTwoToneIcon/>
            </IconButton>
            <TextField
                label="Период"
                id="outlined-end-adornment"
                sx={{ m: 0, width: "6.0em" }}
                slotProps={{
                    input: {
                        endAdornment: <InputAdornment position="end">год</InputAdornment>,
                    },
                }}
                value={inputYear}
                onChange={changeYear}
                onBlur={changeMinYear}
            />
            <IconButton onClick={addYear} disabled={parseInt(inputYear) >= currentYear}>
                <AddCircleTwoToneIcon/>
            </IconButton>
        </Stack>
        
    )
}

export default InpYearChoose;