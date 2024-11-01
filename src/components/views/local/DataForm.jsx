import React, { useState, useEffect } from "react";
import { changeInputDate, changeInputSales, changeInputCategory, changeInputPurchasePrice, 
         changeInputPointOfSale, changeInputTypeOfSale, changeInputClient, changeInputCostDate,
         changeInputCostSum, changeInputExpenseItem, clearInputs } from "../../../redux-state/reducers/form-imput";
import { useSelector, useDispatch } from "react-redux";
import InpDate from "../../comps/InpDate";
import InpNumber from "../../comps/InpNumber";
import InpSelect from "../../comps/InpSelect";
import InpSelectSearch from "../../comps/InpSelectSearch";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import ValidationContainer from "./ValidationContainer";
import company from "../../../services/company";
import reports from "../../../services/reports";
import css from "../../../styles/views/local/form.css";


const { FormContainer, FormButton } = css;

const reportsNames = Object.keys(reports);


const DataForm = (props) => {

    const { actionData } = props;

    const dispatch = useDispatch();
    const selectedCompany = useSelector(state => state.companySlice.company);
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
    

    const categories = company[selectedCompany].productCategories;
    const expenses = company[selectedCompany].expenses;
    const points = company[selectedCompany].points;
    const clients = company[selectedCompany].clients;

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
    const changeTypeOfSale = (event) => {
        dispatch(changeInputTypeOfSale(event.target.value))
        event.target.value === "розница"
        ? changeClient('Физ.лицо')
        : changeClient(null)
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
        const dataIncome = [inputDate, inputCategory, inputSales, inputPointOfSale, inputTypeOfSale,
                          inputClient, inputPurchasePrice];
        const dataExpense = [inputCostDate, inputCostSum, inputExpenseItem];

        actionData.incomeData(dataIncome);
        actionData.expenseData(dataExpense);


        // очистка полей после записи данных
        dispatch(clearInputs());            
    }

    const testSaveData = () => {
        const dataIncome = ["inputDate", "inputCategory", "inputSales", "inputPointOfSale", "inputTypeOfSale",
                          "inputClient", "inputPurchasePrice"];
        const dataExpense = ["inputCostDate", "inputCostSum", "inputExpenseItem"];

        actionData.incomeData(dataIncome);
        actionData.expenseData(dataExpense);
           
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
                        <InpDate label="Введите дату" inputValue={inputDate} action={changeDate}/>
                        <InpSelect label={"Категория"} itemsArr={categories} inputValue={inputCategory} action={changeCategory}/>
                        <InpNumber label={"Введите сумму продаж"} inputValue={inputSales} action={changeSales}/>
                        <InpSelect label={"Укажите точку продажи"} itemsArr={points} inputValue={inputPointOfSale} action={changePointOfSale}/>
                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">Тип продажи</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={inputTypeOfSale}
                                onChange={changeTypeOfSale}
                            >
                                <FormControlLabel value="розница" control={<Radio />} label="Розничная" />
                                <FormControlLabel value="опт" control={<Radio />} label="Оптовая" />
                            </RadioGroup>
                        </FormControl> 
                        {inputTypeOfSale === "опт" &&
                            <InpSelectSearch 
                                label="Введите контрагента"
                                itemsArr={clients}
                                inputValue={inputClient}
                                action={changeClient}
                            />
                        }
                        <InpNumber label={"Введите цену закупки"} inputValue={inputPurchasePrice} action={changePurchasePrice}/>
                        <FormButton 
                            backgroundcolor={
                                (!inputDate || !inputSales || !inputCategory || !inputPointOfSale || (inputTypeOfSale === "опт" && !inputClient)) ? "rgb(229, 229, 229)" : "rgb(40, 168, 40)"
                            }
                            onClick={validation}
                        >Записать данные</FormButton>
                    </FormContainer>
                    <ValidationContainer inputValues={[inputDate, inputCategory, inputSales, inputPointOfSale, inputTypeOfSale, inputClient, inputPurchasePrice]}/>
                    </>
                )
            case reportsNames[1]:
                return (
                    <>
                    <FormContainer>
                        <InpDate label="Введите дату" inputValue={inputCostDate} action={changeCostDate}/>
                        <InpNumber label={"Введите сумму расхода"} inputValue={inputCostSum} action={changeCostSum}/>
                        <InpSelect label={"Статья расходов"} itemsArr={expenses} inputValue={inputExpenseItem} action={changeExpenseItem}/>
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
            case reportsNames[2]:
                return (
                    <>
                    <h1>Загрузить все данные разом</h1>  
                    <br/>
                    <br/>
                    <FormButton 
                        backgroundcolor={
                            (false) ? "rgb(229, 229, 229)" : "rgb(40, 168, 40)"
                        }
                        onClick={testSaveData}
                    >Записать данные</FormButton>
                    <br/>
                    <br/>
                    <h2>Пока тестово</h2> 
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