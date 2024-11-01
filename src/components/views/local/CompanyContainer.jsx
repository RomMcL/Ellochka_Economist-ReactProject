import React from "react";
import { changeRadioCompany } from "../../../redux-state/reducers/company";
import { useSelector, useDispatch } from "react-redux";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import css from "../../../styles/views/local/preparation.css";

import company from "../../../services/company";

const { CompanyContainer, CompanyCard, CompanyImg, CompanyDescription } = css;

const companyArr = Object.keys(company);

const ChoosingCompany = () => {

    const dispatch = useDispatch();
    const selectedCompany = useSelector(state => state.companySlice.company);

    const changeCompany = (event) => {
        dispatch(changeRadioCompany(event.target.value))
    }

    return (
        <CompanyContainer>

            <CompanyCard>
                <CompanyImg logo={company[selectedCompany].logo}/>
                <CompanyDescription>
                    <h3>{company[selectedCompany].type}</h3>
                    <h2>{company[selectedCompany].name}</h2> 
                    <p>{company[selectedCompany].description}</p>
                </CompanyDescription>
            </CompanyCard>

            <FormControl>
                <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={selectedCompany}
                onChange={changeCompany}
                >
                {companyArr.map((comp, index) => {
                    return (
                        <FormControlLabel key={index} value={comp} 
                        label={`${company[comp].orgForm} "${company[comp].name}"`}
                        labelPlacement="bottom"
                        control={<Radio sx={{'& .MuiSvgIcon-root': {fontSize: 32,},}}/>} />
                    )
                })} 
                </RadioGroup>
            </FormControl>
            
        </CompanyContainer>
    );
}

export default ChoosingCompany;