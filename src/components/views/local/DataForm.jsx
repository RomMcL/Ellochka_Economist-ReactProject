import React, { useState, useEffect } from "react";
import { changeInputDate, changeInputSales, changeInputCategory, changeInputPurchasePrice, 
         changeInputPointOfSale } from "../../../redux-state/reducers/form-imput";
import { useSelector, useDispatch } from "react-redux";
import Input from "../../comps/Input";
import reports from "../../../services/reports";
import css from "../../../styles/views/local/form.css";


const { FormContainer, FormButton } = css;

const DataForm = (props) => {

    const { actionData } = props;

    const dispatch = useDispatch();
    const reportType = useSelector(state => state.reportTypeSlice.reportType);
    const inputDate = useSelector(state => state.formInputSlice.date);
    const inputSales = useSelector(state => state.formInputSlice.sales);
    const inputCategory = useSelector(state => state.formInputSlice.category);
    const inputPurchasePrice = useSelector(state => state.formInputSlice.purchasePrice);
    const inputPointOfSale = useSelector(state => state.formInputSlice.pointOfSale);
    
    const reportsNames = Object.keys(reports);


    const changeDate = (param) => {
        dispatch(changeInputDate(param))
    }
    const changeSales = (param) => {
        dispatch(changeInputSales(param))
    }
    const changeCategory = (param) => {
        dispatch(changeInputCategory(param))
    }
    const changePurchasePrice = (param) => {
        dispatch(changeInputPurchasePrice(param))
    }
    const changePointOfSale = (param) => {
        dispatch(changeInputPointOfSale(param))
    }

    const validation = () => {
        if ((inputDate && inputSales && inputCategory) || (inputPurchasePrice && inputPointOfSale)) {
            console.log('validation OK');

            const dataLine = [inputDate, inputSales, inputCategory, inputPurchasePrice, inputPointOfSale];
            //actionData(prev => [ ...prev, dataLine.filter(Boolean)]);
            actionData(dataLine.filter(Boolean));

            // очистка полей после записи данных
            dispatch(changeInputDate(''))
            dispatch(changeInputSales(''))
            dispatch(changeInputCategory(''))
            dispatch(changeInputPurchasePrice(''))
            dispatch(changeInputPointOfSale(''))

        } else console.log('validation не пройдена')
    }

   // useEffect(() => {console.log(reportInfo)}, [reportName])

    return (
        
        <React.Fragment>
            {reportType === reportsNames[0]
            ? <>
                <FormContainer>
                    <Input inputValue={inputDate} action={changeDate} placeholder={"Введите date"}/>
                    <Input inputValue={inputSales} action={changeSales} placeholder={"Введите sales"}/>
                    <Input inputValue={inputCategory} action={changeCategory} placeholder={"Введите category"}/>
                    <FormButton 
                        backgroundcolor={
                            (!inputDate || !inputSales || !inputCategory) ? "rgb(229, 229, 229)" : "rgb(40, 168, 40)"
                        }
                        onClick={validation}
                    >Записать данные</FormButton>
                </FormContainer>
                <span>{ inputDate }</span><br/>
                <span>{ inputSales }</span><br/>
                <span>{ inputCategory }</span>
              </>
            : reportType === reportsNames[1]
            ? <>
                <FormContainer>
                    <Input inputValue={inputPurchasePrice} action={changePurchasePrice} placeholder={"Введите purchasePrice"}/>
                    <Input inputValue={inputPointOfSale} action={changePointOfSale} placeholder={"Введите pointOfSale"}/>
                    <FormButton 
                        backgroundcolor={
                            (!inputPurchasePrice || !inputPointOfSale) ? "rgb(229, 229, 229)" : "rgb(40, 168, 40)"
                        }
                        onClick={validation}
                    >Записать данные</FormButton>
                </FormContainer>
                <span>{ inputPurchasePrice }</span><br/>
                <span>{ inputPointOfSale }</span><br/>
              </>
            : <span>3й набор инпутов</span>
            }
                        
        </React.Fragment>
    )
}

export default DataForm;