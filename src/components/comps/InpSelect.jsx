import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const InpSelect = (props) => {
    const { label, itemsArr, inputValue, action, width } = props;

    const [open, setOpen] = useState(false);

    const handleChange = (event) => {
        const newValue = event.target.value;
        action(newValue);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (                
        <FormControl sx={{ m: 0, width: width }}>
            <InputLabel id="demo-controlled-open-select-label">{label}</InputLabel>
            <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            MenuProps={{ disableScrollLock: true }}
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={inputValue}
            label={label}
            onChange={handleChange}
            >
            { itemsArr.map((category, index) => {
                return (
                    <MenuItem key={index} value={category}>{category}</MenuItem>
                )                
            })}
            </Select>
        </FormControl>
    );
}

export default InpSelect;