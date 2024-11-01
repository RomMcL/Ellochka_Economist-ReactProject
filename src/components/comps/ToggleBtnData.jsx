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
    >
      <ToggleButton value="incomeStatement">по доходам</ToggleButton>
      <ToggleButton value="expenseReport">по расходам</ToggleButton>
    </ToggleButtonGroup>
  );
}