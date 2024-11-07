import React from "react";
import { changeInputYear } from "../../../redux-state/reducers/account-call";
import { useSelector, useDispatch } from "react-redux";
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import cssForm from "../../../styles/views/local/form.css";


const { AccountingContainer, AccountCallButton, FormButton } = cssForm;

const AccountCall = (props) => {

    const { actionSave, activeBtn, actionCall } = props;

    const inputYear = useSelector(state => state.accountCallSlice.year);
    const dispatch = useDispatch();

    const changeYear = (event) => {
        const currentYear = new Date().getFullYear();
        let newValue = event.target.value.replace(/\D/g, "");
        if (newValue > currentYear) newValue = currentYear;
        dispatch(changeInputYear(newValue));
    }

    return (
        <React.Fragment>
            <AccountingContainer>
                <AccountCallButton onClick={actionCall}>Звонок бухгалтеру</AccountCallButton>
                <p>Звонок в бухгалтерию поможет заполнить форму за указанный год.</p>
                <TextField
                    label="Период"
                    id="outlined-end-adornment"
                    sx={{ m: 0, width: "6.0em" }}
                    slotProps={{
                    input: {
                        endAdornment: <InputAdornment position="end">год</InputAdornment>,
                    },
                    }}
                    value={inputYear}
                    onChange={changeYear}
                />
                <FormButton 
                    backgroundcolor={
                        activeBtn ? "rgb(40, 168, 40)" : "rgb(229, 229, 229)"
                    }
                    events={
                        activeBtn ? "auto" : "none"
                    }
                    color={
                        activeBtn ? "black" : "grey"
                    }
                    onClick={actionSave}
                >Записать данные</FormButton>
            </AccountingContainer>

        </React.Fragment>
    )
}

export default AccountCall;