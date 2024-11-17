import * as React from 'react';
import Button from '@mui/material/Button';

const BtnSimple = (props) => {

  const { children, onClick, disabled } = props;

  return (
      <Button 
        variant="contained"
        color="secondary"
        size="large"
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </Button>    
  );
}

export default BtnSimple;