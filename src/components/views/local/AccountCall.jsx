import React from "react";
import BtnCallAccount from "../../comps/BtnCallAccount";
import InpYearChoose from "../../comps/InpYearChoose";
import cssForm from "../../../styles/views/local/form.css";


const { AccountingContainer, FormButton } = cssForm;

const AccountCall = (props) => {

    const { actionSave, activeBtn, actionCall } = props;

    return (
        <React.Fragment>
            <AccountingContainer>
                <BtnCallAccount onClick={actionCall}>
                    Звонок бухгалтеру
                </BtnCallAccount>
                <p>Звонок в бухгалтерию поможет заполнить форму за указанный год.</p>
                <InpYearChoose/>
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