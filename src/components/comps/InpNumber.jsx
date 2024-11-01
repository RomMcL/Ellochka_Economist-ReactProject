import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

const InpNumber = (props) => {

    const { label, inputValue, action } = props;

    const handleChange = (event) => {
        const newValue = event.target.value.replace(/\D/g, "");
        action(newValue);
    };

    return (
        <TextField
            label={label}
            id="outlined-end-adornment"
            sx={{ m: 0, width: 420 }}
            slotProps={{
            input: {
                endAdornment: <InputAdornment position="end">руб.</InputAdornment>,
            },
            }}
            value={inputValue}
            onChange={handleChange}
        />        
      );
}

export default InpNumber;