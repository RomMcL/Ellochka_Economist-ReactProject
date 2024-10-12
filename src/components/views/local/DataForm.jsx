import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Input from "../../comps/Input";
import css from "../../../styles/views/local/form.css";

const { FormContainer, FormButton } = css;

const DataForm = (props) => {

    const { actionData } = props;

    const { reportName } = useParams();

    const [ date, setDate ]  = useState('');
    const [ sales, setSales ] = useState('');
    const [ category, setCategory ] = useState('');


    const validation = () => {
        if (date && sales && category) {
            console.log('validation OK');

            const dataLine = [date, sales, category];
            actionData(prev => [ ...prev, dataLine]);

            // очистка полей после записи данных
            setDate('');
            setSales('');
            setCategory('');
        } else console.log('validation не пройдена')
    }

    useEffect(() => {
        console.log('report')
    }, [])

    return (
        
        <React.Fragment>
            {reportName === 'reportname1'
            ? <>
                <FormContainer>
                    <Input inputValue={date} action={setDate} placeholder={"Введите 1.1"}/>
                    <Input inputValue={sales} action={setSales} placeholder={"Введите 1.2"}/>
                    <Input inputValue={category} action={setCategory} placeholder={"Введите 1.3"}/>
                    <FormButton 
                        backgroundcolor={
                            (!date || !sales || !category) ? "rgb(229, 229, 229)" : "rgb(40, 168, 40)"
                        }
                        onClick={validation}
                    >Записать данные</FormButton>
                </FormContainer>
                <span>{ date }</span><br/>
                <span>{ sales }</span><br/>
                <span>{ category }</span>
              </>
            : reportName === 'reportname2'
            ? <>
                <FormContainer>
                    <Input inputValue={date} action={setDate} placeholder={"Введите 2.1"}/>
                    <Input inputValue={sales} action={setSales} placeholder={"Введите 2.2"}/>
                    <Input inputValue={category} action={setCategory} placeholder={"Введите 2.3"}/>
                    <FormButton 
                        backgroundcolor={
                            (!date || !sales || !category) ? "rgb(229, 229, 229)" : "rgb(40, 168, 40)"
                        }
                        onClick={validation}
                    >Записать данные</FormButton>
                </FormContainer>
                <span>{ date }</span><br/>
                <span>{ sales }</span><br/>
                <span>{ category }</span>
              </>
            : <span>3й набор инпутов</span>
            }
                        
        </React.Fragment>
    )
}

export default DataForm;