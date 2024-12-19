import React, { useState, useEffect, useRef } from "react";
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
import AccountCall from "./AccountCall";
import ValidationContainer from "./ValidationContainer";
import VariantsDataCreate from "./VariantsDataCreate";
import company from "../../../services/company";
import reports from "../../../services/reports";
import accountCall from "../../../services/accountCall";
import cssForm from "../../../styles/views/local/form.css";


const { FormContainer, InputsContainer } = cssForm;

const reportsNames = Object.keys(reports);


const DataForm = (props) => {

    const { changeData } = props;

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

    const inputYear = useSelector(state => state.accountCallSlice.year);

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
        switch (reportType) {
            case reportsNames[0]:                
                const dataIncome = [inputDate, inputCategory, inputSales, inputPointOfSale, 
                      inputTypeOfSale, inputClient, inputPurchasePrice];
                changeData.incomeData(dataIncome);
                break;
            case reportsNames[1]:                
                const dataExpense = [inputCostDate, inputCostSum, inputExpenseItem];
                changeData.expenseData(dataExpense);
                break;
            default:                
                break;
        } 
        // очистка полей после записи данных
        dispatch(clearInputs());           
    }

    

    const callAccount = () => {

        const dataIncome = accountCall(selectedCompany, reportType, inputYear).dataIncome;
        const dataExpense = accountCall(selectedCompany, reportType, inputYear).dataExpense;

        switch (reportType) {
            case reportsNames[0]:
                changeDate(dataIncome[0]);
                changeCategory(dataIncome[1]);
                changeSales(dataIncome[2]);
                changePointOfSale(dataIncome[3]);
                dispatch(changeInputTypeOfSale(dataIncome[4]));
                dataIncome[4] === "розница"
                ? changeClient('Физ.лицо')
                : changeClient(dataIncome[5]);
                changePurchasePrice(dataIncome[6]);
                break;
            case reportsNames[1]:                
                changeCostDate(dataExpense[0]);
                changeCostSum(dataExpense[1]);
                changeExpenseItem(dataExpense[2]);
                break;
            default:
                return {dataIncome: dataIncome, dataExpense: dataExpense};
        }           
    }


    const [isActiveBtn, setIsActiveBtn] = useState(false);
    
    useEffect(() => {
        switch (reportType) {
            case reportsNames[0]:
                if(inputDate && inputCategory && inputSales && inputPointOfSale
                    && inputPurchasePrice && inputTypeOfSale && inputClient
                ) setIsActiveBtn(true)
                else setIsActiveBtn(false)
                break;
            case reportsNames[1]:
                if(inputCostDate && inputCostSum && inputExpenseItem) setIsActiveBtn(true)
                else setIsActiveBtn(false)
                break;
            default:
                break;
        }
    }, [reportType, inputDate, inputCategory, inputSales, inputPurchasePrice, inputPointOfSale, inputTypeOfSale, inputClient, inputCostDate, inputCostSum, inputExpenseItem])


    const validation = () => {
        if (true) {
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
                        <InputsContainer>
                            <InpDate label="Дата" inputValue={inputDate} action={changeDate} width={"40%"}/>
                            <InpSelect label={"Категория"} itemsArr={categories} inputValue={inputCategory} action={changeCategory} width={"58%"}/>
                            <InpNumber label={"Сумму продаж"} inputValue={inputSales} action={changeSales} width={"40%"}/>
                            <InpSelect label={"Точку продажи"} itemsArr={points} inputValue={inputPointOfSale} action={changePointOfSale} width={"58%"}/>
                            <FormControl sx={{width: "40%"}}>
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
                                    label="Контрагент"
                                    itemsArr={clients}
                                    inputValue={inputClient}
                                    action={changeClient}
                                    width={"58%"}
                                />
                            }
                            <InpNumber label={"Цену закупки"} inputValue={inputPurchasePrice} action={changePurchasePrice} width={"100%"}/>
                        </InputsContainer>
                        <AccountCall actionSave={validation} activeBtn={isActiveBtn}
                                     actionCall={callAccount}/>
                    </FormContainer>
                    <ValidationContainer inputValues={[inputDate, inputCategory, inputSales, inputPointOfSale, inputTypeOfSale, inputClient, inputPurchasePrice]}/>
                    </>
                )
            case reportsNames[1]:
                return (
                    <>
                    <FormContainer>
                        <InputsContainer>
                            <InpDate label="Дата" inputValue={inputCostDate} action={changeCostDate} width={"100%"}/>
                            <InpNumber label={"Сумма расходов"} inputValue={inputCostSum} action={changeCostSum} width={"100%"}/>
                            <InpSelect label={"Статья расходов"} itemsArr={expenses} inputValue={inputExpenseItem} action={changeExpenseItem} width={"100%"}/>
                        </InputsContainer>
                        <AccountCall actionSave={validation} activeBtn={isActiveBtn} 
                                     actionCall={callAccount}/>
                    </FormContainer>
                    <ValidationContainer inputValues={[inputCostDate, inputCostSum, inputExpenseItem]}/>
                    </>
                )
            case reportsNames[2]:
                return (
                    <VariantsDataCreate 
                        singleCall={callAccount}
                        /* maxSizeExpenseData={maxSizeExpenseData.current} */
                    />                
                )
            default:
                return <FormContainer>Не удалось создать набор инпутов.</FormContainer>
        }
    }
 
    return (
        
        inputsSet()
    )
}

export default DataForm;