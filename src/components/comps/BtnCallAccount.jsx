import Button from '@mui/material/Button';

 const BtnCallAccount = (props) => {

    const { children, onClick, disabled } = props;

    return (
        <Button 
            sx={{ maxWidth: "8em", padding: "1em", color: "black", fontSize: "1.4em", borderRadius: "0.5em", textTransform: "none", lineHeight: "1.1" }}
            variant="contained" 
            color="success" 
            onClick={onClick} 
            disabled={disabled}
        >
            {children}
        </Button>
    );
}

export default BtnCallAccount;