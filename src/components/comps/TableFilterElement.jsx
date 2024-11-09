import React from "react";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const TableFilterElement = (props) => {

    const { itemsArr, filtering } = props;

    const [filter, setFilter] = React.useState('');

    const handleChange = (event) => {
        setFilter(event.target.value);
        filtering(event);
    };

    return (
        <React.Fragment>
            <FormControl variant="standard" sx={{width: "90%"}} size="small">
                <Select
                value={filter}
                onChange={handleChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                >
                <MenuItem value="">
                    <em>все</em>
                </MenuItem>
                { itemsArr.map((item, index) => {
                    return (
                        <MenuItem key={index} value={itemsArr[index]}>{item}</MenuItem>
                    )
                })}
                </Select>
            </FormControl>
        </React.Fragment>
    )
}

export default TableFilterElement;