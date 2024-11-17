import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeVisibility, changeQuantityСalls, changeRelationLuba, changeSlider, resetAccountCalls } from "../../../redux-state/reducers/account-call";
import { changeIncomeData, getAllIncomeData, changeExpenseData, getAllExpenseData, changeDataLoading, resetData } from "../../../redux-state/reducers/data";
import { resetPagination } from "../../../redux-state/reducers/pagination-datalist";
import InpYearChoose from "../../comps/InpYearChoose";
import BtnSimple from "../../comps/BtnSimple";
import BtnCallAccount from "../../comps/BtnCallAccount";
import SliderMinMax from "../../comps/SliderMinMax";
import LoadingData from "./LoadingData";
import company from "../../../services/company";
import content from "../../../services/contentSettings";

import cssVariantsDataCreate from "../../../styles/views/local/randomDataVariant.css";


const { VariantContainer, DescriptionContainer, Remark } = cssVariantsDataCreate;

const settings = {
    maxSingleCall: 100,
    slider: {min: 0, max: 1000000, step: 100},
}

const VariantsDataCreate = (props) => {

    const { singleCall } = props;

    const dispatch = useDispatch();
    const selectedCompany = useSelector(state => state.companySlice.company);
    const inputYear = useSelector(state => state.accountCallSlice.year);
    const visibility = useSelector(state => state.accountCallSlice.visibility);
    const quantityСalls = useSelector(state => state.accountCallSlice.quantityСalls);
    const sliderVal = useSelector(state => state.accountCallSlice.sliderVal);
    const relationLuba = useSelector(state => state.accountCallSlice.relationLuba);
    const incomeData = useSelector(state => state.dataSlice.incomeData);
    const expenseData = useSelector(state => state.dataSlice.expenseData);
    const dataLoading = useSelector(state => state.dataSlice.dataLoading);

    const changeSliderVal = (param) => {
        dispatch(changeSlider(param));      
    }
    
    

    const requestingSingleDataLine = () => {
        dispatch(changeQuantityСalls(quantityСalls + 1));
        switch (quantityСalls) {
            case settings.maxSingleCall*0.25 - 1: 
                dispatch(changeRelationLuba(content.relationship[1]));
                break;
            case settings.maxSingleCall*0.5 - 1: 
                dispatch(changeRelationLuba(content.relationship[2]));
                break;
            case settings.maxSingleCall*0.75 - 1: 
                dispatch(changeRelationLuba(content.relationship[3]));
                break;
            case settings.maxSingleCall - 1: 
                dispatch(changeRelationLuba(content.relationship[4]));
                break;
            default: break;
        }
        dispatch(changeVisibility([false, true, false, false]));
        dispatch(changeIncomeData(singleCall().dataIncome));
        dispatch(changeExpenseData(singleCall().dataExpense));     
    }

    const speedGenerateIncome = useRef(0);
    const speedGenerateExpense = useRef(0);
    const speedSaveData = useRef(0);
    
    const maxSizeExpenseData = useRef(0);

    useEffect(() => {        
        let maxMonth = 12;
        inputYear === new Date().getFullYear() && (maxMonth = new Date().getMonth() + 1);
        maxSizeExpenseData.current = maxMonth * company[selectedCompany].expenses.length;
    }, [inputYear, selectedCompany])

    
    const [progressGenerateIncome, setProgressGenerateIncome] = React.useState(0);
    const [progressGenerateExpense, setProgressGenerateExpense] = React.useState(0);


    const creatingData = async  () => {

        const startGenerateIncome = performance.now();
        let allIncomeData = [];
        for (let i = 0; i < sliderVal; i++) {
            
            allIncomeData.push(singleCall().dataIncome);

            if (i % (sliderVal/4) === 0) {
                setProgressGenerateIncome((prevProgress) => (prevProgress + 25));
                await new Promise(resolve => setTimeout(resolve, 350));                
            }            
        }
        const endGenerateIncome = performance.now();
        speedGenerateIncome.current = ((endGenerateIncome - startGenerateIncome)/1000).toFixed(3);
        
        const startGenerateExpense = performance.now();
        let allExpenseData = [];
        let progresStep = 0;
        for (let i = 0; i < sliderVal; i++) {

            let newExpense = singleCall().dataExpense;
            let exists = allExpenseData.some(expense => (expense[0] === newExpense[0] && 
                                                         expense[2] === newExpense[2]));
            if (!exists) allExpenseData.push(newExpense);

            const sizeExpenseData = allExpenseData.length;

            if ((sizeExpenseData === Math.round(maxSizeExpenseData.current*0.25) && progresStep === 0) ||
                (sizeExpenseData === Math.round(maxSizeExpenseData.current*0.5) && progresStep === 1)  ||
                (sizeExpenseData === Math.round(maxSizeExpenseData.current*0.75) && progresStep === 2)
                ) {
                setProgressGenerateExpense((prevProgress) => (prevProgress + 25));
                progresStep++;
                await new Promise(resolve => setTimeout(resolve, 350));              
            } else if (sizeExpenseData === maxSizeExpenseData.current) {
                setProgressGenerateExpense((prevProgress) => (prevProgress + 25));
                await new Promise(resolve => setTimeout(resolve, 350));
                break;
            }
        }
        const endGenerateExpense = performance.now();
        speedGenerateExpense.current = ((endGenerateExpense - startGenerateExpense)/1000).toFixed(3);

        const startSaveData = performance.now();
        dispatch(getAllIncomeData(allIncomeData));
        dispatch(getAllExpenseData(allExpenseData));
        const endSaveData = performance.now();
        speedSaveData.current = ((endSaveData - startSaveData)/1000).toFixed(3);

        dispatch(changeDataLoading(false));
        setProgressGenerateIncome(0);
        setProgressGenerateExpense(0);       
    }

    const requestingAllDataLine = () => {
        dispatch(changeDataLoading(true));
        dispatch(changeVisibility([false, false, true, false]));
        setTimeout(() => {
            creatingData();
        }, 100)
    }

  

    const requestingDataFile = () => {
        dispatch(changeVisibility([false, false, false, true]));
    }

    const changeVariant = () => {
        dispatch(resetAccountCalls());
        dispatch(resetData());
        dispatch(resetPagination());
    }

    return (
        <React.Fragment>
            <h3>Несколько вариантов получения данных</h3>

            { visibility[0] ?
            <VariantContainer>
                <InpYearChoose/>
                <Remark>
                    При выборе текущего года, данные будут сформированы по сегодняшний день.
                    При выборе предыдущих лет - с 1 января по 31 декабря указанного года.
                </Remark>
            </VariantContainer> :
            <VariantContainer>
                <BtnSimple onClick={changeVariant} disabled={dataLoading}>Выбрать другой вариант</BtnSimple>
                <Remark>
                    При выборе другого способа формирования исходных данных, уже полученные данные будут обнулены.
                </Remark>
            </VariantContainer>}

            { visibility[1] &&
            <VariantContainer>
                <BtnCallAccount onClick={requestingSingleDataLine} disabled={quantityСalls === settings.maxSingleCall}>
                    Разовый звонок бухгалтеру
                </BtnCallAccount>
                <DescriptionContainer>
                    <h3>Совершено звонков: {quantityСalls}</h3>
                    <p style={{color: quantityСalls===settings.maxSingleCall && "red"}}>{relationLuba}</p>
                    { quantityСalls > 0 &&
                        <>
                            <h4>Сформировано:</h4>
                            <p>Таблица доходов - {incomeData.length} строк</p>
                            <p>Таблица расходов - {expenseData.length} строк</p>
                        </>
                    }
                    
                </DescriptionContainer>                
            </VariantContainer>}

            { visibility[2] &&
            <VariantContainer>
                <BtnCallAccount onClick={requestingAllDataLine} disabled={!sliderVal || !visibility[0]}>
                    Запросить выгрузку
                </BtnCallAccount>
                { dataLoading ? 
                    <DescriptionContainer>
                        <LoadingData 
                            progressGenerateIncome={progressGenerateIncome}
                            progressGenerateExpense={progressGenerateExpense}
                        />
                    </DescriptionContainer> :
                    <DescriptionContainer>
                        { visibility[0]
                        ? <h2>Укажите желаемый размер исходных данных и запросите их выгрузку</h2>
                        : <>
                            <h4>Сформировано:</h4>
                            <p>Таблица доходов - {incomeData.length} строк, за {speedGenerateIncome.current} сек</p>
                            <p>Таблица расходов - {expenseData.length} строк, за {speedGenerateExpense.current} сек</p>
                            <p>Сортировка и запись данных - {speedSaveData.current} сек</p>
                        </>
                        }
                        <SliderMinMax val={sliderVal} action={changeSliderVal} 
                                    MIN={settings.slider.min} MAX={settings.slider.max} step={settings.slider.step} 
                                    disabled={!visibility[0]}/>
                    </DescriptionContainer>
                }                                 
            </VariantContainer>}

            { visibility[3] &&
            <VariantContainer>
                <BtnCallAccount onClick={requestingDataFile}>Загрузка 3 вариант</BtnCallAccount>
                <DescriptionContainer>
                    <h2>Пока не готово</h2>
                </DescriptionContainer>                
            </VariantContainer>}

        </React.Fragment>
    )
}

export default VariantsDataCreate;