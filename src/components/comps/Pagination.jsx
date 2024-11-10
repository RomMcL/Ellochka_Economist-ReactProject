import React from "react";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const PaginationRanges = ({ currentPage, totalPage, changePaginate, numberRows, changeNumRows }) => {

    return (
        <React.Fragment>
            <Stack direction="row" spacing={2} sx={{justifyContent: "center", alignItems: "center"}}>
                <span>Показывать по</span>
                <FormControl variant="standard" size="small" sx={{ minWidth: "3.2em"}} >
                    <Select 
                        id="pagination-select-number"
                        value={numberRows}
                        onChange={(event) => changeNumRows(event.target.value)}
                        MenuProps={{
                            disableScrollLock: true,
                        }}                   
                    >
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                        <MenuItem value={100}>100</MenuItem>
                    </Select>
                </FormControl>
                <span>строк</span>
            </Stack>
            <Stack spacing={2}>            
                <Pagination 
                    count={Math.ceil(totalPage / numberRows)} 
                    page={currentPage} 
                    boundaryCount={2}
                    onChange={(event, value) => changePaginate(value)}
                />                
            </Stack>
        </React.Fragment>
        
      );
}

export default PaginationRanges;