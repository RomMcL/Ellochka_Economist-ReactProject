import React, { useState, useEffect } from "react";
import { changeInputDate, changeInputSales, changeInputCategory, changeInputPurchasePrice, 
         changeInputPointOfSale, changeInputTypeOfSale, changeInputClient, changeInputCostDate,
         changeInputCostSum, changeInputExpenseItem, clearInputs } from "../../../redux-state/reducers/form-imput";
import { useSelector, useDispatch } from "react-redux";
import Input from "../../comps/Input";
import ValidationContainer from "./ValidationContainer";
import reports from "../../../services/reports";
import css from "../../../styles/views/local/form.css";


const { FormContainer, FormButton } = css;

const DataForm = (props) => {

    const { actionData } = props;

    const dispatch = useDispatch();
    const reportType = useSelector(state => state.reportTypeSlice.reportType);
    const inputDate = useSelector(state => state.formInputSlice.date);   
    const inputCategory = useSelector(state => state.formInputSlice.category);
    const inputSales = useSelector(state => state.formInputSlice.sales);
    const inputPurchasePrice = useSelector(state => state.formInputSlice.purchasePrice);
    const inputPointOfSale = useSelector(state => state.formInputSlice.pointOfSale);
    const inputTypeOfSale = useSelector(state => state.formInputSlice.typeOfSale);
    const inputClient = useSelector(state => state.formInputSlice.client);
    const inputCostDate = useSelector(state => state.formInputSlice.costDate);
    const inputCostSum = useSelector(state => state.formInputSlice.costSum);
    const inputExpenseItem = useSelector(state => state.formInputSlice.expenseItem);
    
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
    const changeTypeOfSale = (param) => {
        dispatch(changeInputTypeOfSale(param))
    }
    const changeClient = (param) => {
        dispatch(changeInputClient(param))
    }
    const changeCostDate = (param) => {
        dispatch(changeInputCostDate(param))
    }
    const changeCostSum = (param) => {
        dispatch(changeInputCostSum(param))
    }
    const changeExpenseItem = (param) => {
        dispatch(changeInputExpenseItem(param))
    }


    const saveData = () => {
        const dataLine = [inputDate, inputCategory, inputSales, inputPurchasePrice, inputPointOfSale,
                          inputTypeOfSale, inputClient, inputCostDate, inputCostSum, inputExpenseItem];
        //actionData(prev => [ ...prev, dataLine.filter(Boolean)]);
        actionData(dataLine.filter(Boolean));

        // очистка полей после записи данных
        dispatch(clearInputs());
            
    }


    const validation = () => {
        if (true || (inputDate && inputSales && inputCategory) || (inputPurchasePrice && inputPointOfSale)) {
            console.log('validation OK');

            saveData();

        } else console.log('validation не пройдена')
    }

    const inputsSet = () => {
        switch (reportType) {
            case reportsNames[0]:
                return (
                    <>
                    <FormContainer>
                        <Input inputValue={inputDate} action={changeDate} placeholder={"Введите date"}/>
                        <Input inputValue={inputCategory} action={changeCategory} placeholder={"Введите category"}/>
                        <Input inputValue={inputSales} action={changeSales} placeholder={"Введите sales"}/>
                        <FormButton 
                            backgroundcolor={
                                (!inputDate || !inputSales || !inputCategory) ? "rgb(229, 229, 229)" : "rgb(40, 168, 40)"
                            }
                            onClick={validation}
                        >Записать данные</FormButton>
                    </FormContainer>
                    <ValidationContainer inputValues={[inputDate, inputCategory, inputSales]}/>
                    </>
                )                
            case reportsNames[1]:
                return (
                    <>
                    <FormContainer>
                        <Input inputValue={inputDate} action={changeDate} placeholder={"Введите date"}/>
                        <Input inputValue={inputCategory} action={changeCategory} placeholder={"Введите category"}/>
                        <Input inputValue={inputSales} action={changeSales} placeholder={"Введите sales"}/>
                        <Input inputValue={inputPointOfSale} action={changePointOfSale} placeholder={"Введите PointOfSale"}/>
                        <Input inputValue={inputTypeOfSale} action={changeTypeOfSale} placeholder={"Введите TypeOfSale"}/>
                        <Input inputValue={inputClient} action={changeClient} placeholder={"Введите Client"}/>
                        <FormButton 
                            backgroundcolor={
                                (!inputDate || !inputSales || !inputCategory || !inputPointOfSale || !inputTypeOfSale || !inputClient) ? "rgb(229, 229, 229)" : "rgb(40, 168, 40)"
                            }
                            onClick={validation}
                        >Записать данные</FormButton>
                    </FormContainer>
                    <ValidationContainer inputValues={[inputDate, inputCategory, inputSales, inputPointOfSale, inputTypeOfSale, inputClient]}/>
                    </>
                )
            case reportsNames[2]:
                return (
                    <>
                    <FormContainer>
                        <Input inputValue={inputDate} action={changeDate} placeholder={"Введите date"}/>
                        <Input inputValue={inputCategory} action={changeCategory} placeholder={"Введите category"}/>
                        <Input inputValue={inputSales} action={changeSales} placeholder={"Введите sales"}/>
                        <Input inputValue={inputPurchasePrice} action={changePurchasePrice} placeholder={"Введите purchasePrice"}/>
                        <FormButton 
                            backgroundcolor={
                                (!inputDate || !inputSales || !inputCategory || !inputPurchasePrice) ? "rgb(229, 229, 229)" : "rgb(40, 168, 40)"
                            }
                            onClick={validation}
                        >Записать данные</FormButton>
                    </FormContainer>
                    <ValidationContainer inputValues={[inputDate, inputCategory, inputSales, inputPurchasePrice]}/>
                    </>
                )
            case reportsNames[3]:
                return (
                    <>
                    <FormContainer>
                        <Input inputValue={inputCostDate} action={changeCostDate} placeholder={"Введите CostDate"}/>
                        <Input inputValue={inputCostSum} action={changeCostSum} placeholder={"Введите CostSum"}/>
                        <Input inputValue={inputExpenseItem} action={changeExpenseItem} placeholder={"Введите ExpenseItem"}/>
                        <FormButton 
                            backgroundcolor={
                                (!inputCostDate || !inputCostSum || !inputExpenseItem) ? "rgb(229, 229, 229)" : "rgb(40, 168, 40)"
                            }
                            onClick={validation}
                        >Записать данные</FormButton>
                    </FormContainer>
                    <ValidationContainer inputValues={[inputCostDate, inputCostSum, inputExpenseItem]}/>
                    </>
                )
            default:
                return <FormContainer>Не удалось создать набор инпутов.</FormContainer>
        }
    }
 
    

   // useEffect(() => {console.log(reportInfo)}, [reportName])

    return (
        
        inputsSet()
    )
}

export default DataForm;