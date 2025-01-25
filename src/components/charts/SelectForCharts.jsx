import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SelectForCharts = (props) => {

    const { label, itemsArr, inputChoice, action } = props;

    const handleChange = (event) => {
        const newValue = event.target.value;
        action(newValue);
    };

    return (
        
        <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
            <InputLabel id="select-for-charts-label">{label}</InputLabel>
            <Select
            labelId="select-for-charts-label"
            id="select-for-charts"
            value={inputChoice}
            onChange={handleChange}
            autoWidth
            label={label}
            >
            { itemsArr.map((choice, index) => {
                return (
                    <MenuItem key={index} value={choice}>{choice}</MenuItem>
                )                
            })}
            </Select>
        </FormControl>
        
    );
}

export default SelectForCharts;