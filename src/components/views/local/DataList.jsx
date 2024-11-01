import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ToggleBtnData from "../../comps/ToggleBtnData";
import reports from "../../../services/reports";
import css from "../../../styles/views/local/dataList.css";

const { DataListContainer, DataListLine, DataListCell, DataListTitle } = css;

const DataList = (props) => {

    const { data = {
        incomeStatement: [], 
        expenseReport: [],
    } } = props;

    const reportType = useSelector(state => state.reportTypeSlice.reportType);

    let defaultTypeData = "incomeStatement";
    reportType !== "generalReport" && (defaultTypeData = reportType);

    const [typeData, setTypeData] = useState(defaultTypeData);

    const onClick = (event, newTypeData) => {
        setTypeData(newTypeData);                
    };


    return (
        <React.Fragment>

            { !data.incomeStatement.length && !data.expenseReport.length
            ? <span>Данных ещё нет</span>
            :   <DataListContainer>
                    <h3>{ reports[reportType].name } (исходные данные)</h3>
                    {reportType === "generalReport"
                    && <ToggleBtnData typeData={typeData} onChange={onClick}></ToggleBtnData>
                    }                   
                    <DataListLine>
                        { reports[typeData].requiredData.map((title, index) => {
                            return (
                                <DataListTitle key={index} width={reports[typeData].width[index]}>{title}</DataListTitle>
                            )
                        })}
                    </DataListLine>

                    <div>Сюда бы запилить фильтрацию и(или) сортировочку</div>

                    { data[typeData].map((item, index) => {
                        return (
                            <DataListLine key={index}>
                                { data[typeData][index].map((cell, idx) => {
                                    return (
                                        <DataListCell key={idx} width={reports[typeData].width[idx]}>{cell}</DataListCell>
                                    )
                                })}
                            </DataListLine>
                        )
                    })}


                </DataListContainer> 
            }
           
        </React.Fragment>
    )
}

export default DataList;