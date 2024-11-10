import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeVisibility, changeQuantityСalls, changeSlider, resetAccountCalls } from "../../../redux-state/reducers/account-call";
import { resetData } from "../../../redux-state/reducers/data";
import { resetPagination } from "../../../redux-state/reducers/pagination-datalist";
import InpYearChoose from "../../comps/InpYearChoose";
import BtnCallAccount from "../../comps/BtnCallAccount";
import SliderMinMax from "../../comps/SliderMinMax";

import cssVariantsDataCreate from "../../../styles/views/local/randomDataVariant.css";


const { VariantContainer, DescriptionContainer } = cssVariantsDataCreate;


const VariantsDataCreate = (props) => {

    const { singleCall } = props;

    const dispatch = useDispatch();
    const visibility = useSelector(state => state.accountCallSlice.visibility);
    const quantityСalls = useSelector(state => state.accountCallSlice.quantityСalls);
    const sliderVal = useSelector(state => state.accountCallSlice.sliderVal);
    const incomeData = useSelector(state => state.dataSlice.incomeData);
    const expenseData = useSelector(state => state.dataSlice.expenseData);

    const changeSliderVal = (param) => {
        dispatch(changeSlider(param));      
    }
    

    const requestingDataLine = () => {
        dispatch(changeQuantityСalls(quantityСalls + 1));
        dispatch(changeVisibility([false, true, false, false]));
        singleCall();       
    }

    const requestingAllData = () => {

        dispatch(changeVisibility([false, false, true, false]));

        for (let i = 0; i < sliderVal; i++) {
            singleCall();
        }
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
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam assumenda quos obcaecati, fugit, laboriosam deleniti consequuntur velit sit libero suscipit dolore debitis architecto quibusdam numquam adipisci harum laborum ut aperiam.</p>
            </VariantContainer> :
            <VariantContainer>
                <button onClick={changeVariant}>Выбрать другой вариант</button>
            </VariantContainer>}

            { visibility[1] &&
            <VariantContainer>
                <BtnCallAccount onClick={requestingDataLine}>
                    Разовый звонок бухгалтеру
                </BtnCallAccount>
                <DescriptionContainer>
                    <h3>Совершено звонков: {quantityСalls}</h3>
                    <p>Любочка дружит с Эллочкой</p>
                    { quantityСalls > 0 &&
                        <>
                            <h4>Сформировано:</h4>
                            <p>Таблица доходов - {incomeData.length} строк, Таблица расходов - {expenseData.length} строк</p>
                        </>
                    }
                    
                </DescriptionContainer>                
            </VariantContainer>}

            { visibility[2] &&
            <VariantContainer>
                <BtnCallAccount onClick={requestingAllData} disabled={!sliderVal || !visibility[0]}>
                    Запросить выгрузку
                </BtnCallAccount>
                <DescriptionContainer>
                    { visibility[0]
                    ? <h2>Укажите желаемый размер исходных данных и запросите их выгрузку</h2>
                    : <>
                        <h4>Сформировано:</h4>
                        <p>Таблица доходов - {incomeData.length} строк, Таблица расходов - {expenseData.length} строк</p>
                      </>
                    }
                    <SliderMinMax val={sliderVal} action={changeSliderVal} 
                                  MIN={0} MAX={10000} step={100} 
                                  disabled={!visibility[0]}/>
                </DescriptionContainer>                
            </VariantContainer>}

            { visibility[3] &&
            <VariantContainer>
                <BtnCallAccount onClick={requestingDataFile}>Загрузка Файлом</BtnCallAccount>
                <DescriptionContainer>
                    <h2>Пока не готово</h2>
                </DescriptionContainer>                
            </VariantContainer>}

        </React.Fragment>
    )
}

export default VariantsDataCreate;