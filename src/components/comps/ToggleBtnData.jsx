import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function ToggleBtnData(props) {

  const { typeData, onChange } = props; 


  return (
    <ToggleButtonGroup
      color="primary"
      value={typeData}
      exclusive
      onChange={onChange}
      aria-label="Platform"
      size="small"
    >
      <ToggleButton value="incomeStatement" disabled={typeData === "incomeStatement"}>по доходам</ToggleButton>
      <ToggleButton value="expenseReport" disabled={typeData === "expenseReport"}>по расходам</ToggleButton>
    </ToggleButtonGroup>
  );
}