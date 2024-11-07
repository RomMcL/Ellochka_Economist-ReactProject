import React from "react";
import Input from '@mui/material/Input';

const TableSumElement = (props) => {

    const { prefix, sum } = props;

    return (
        <Input
            /* disabled */
            value={`${prefix} ${sum}`}
            size="small" 
            slotProps={{
                input: {
                    readOnly: true,
                },
            }}
            inputProps={{ 
                style: {
                    textAlign: 'center',
                },
            }}
        />  
    )
}

export default TableSumElement;