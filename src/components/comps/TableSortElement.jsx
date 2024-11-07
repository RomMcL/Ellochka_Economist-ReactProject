import React from "react";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const TableSortElement = (props) => {

    const { sort, action } = props;

    return (
        <React.Fragment>
            <FormControl variant="standard" sx={{width: "90%"}} size="small">
                <Select
                value={sort}
                onChange={action}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                >
                <MenuItem value={"decreasing"}>по убыванию</MenuItem>
                <MenuItem value={"increasing"}>по возрастанию</MenuItem>
                </Select>
            </FormControl>
        </React.Fragment>
    )
}

export default TableSortElement;