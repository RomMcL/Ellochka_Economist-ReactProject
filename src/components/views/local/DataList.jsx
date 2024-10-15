import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import reports from "../../../services/reports";
import css from "../../../styles/views/local/dataList.css";

const { DataListContainer, DataListLine, DataListCell, DataListTitle } = css;

const DataList = (props) => {

    const { data = [] } = props;

    const reportType = useSelector(state => state.reportTypeSlice.reportType);

    const reportInfo = reports[reportType];

    //useEffect(() => {console.log(reportInfo)}, [])

    return (
        <React.Fragment>

            { !data.length
            ? <span>Данных ещё нет</span>
            :   <DataListContainer>
                    <h3>Исходные данные для отчёта - { reportInfo.name }</h3>
                    <DataListLine>
                        { reportInfo.requiredData.map((title, index) => {
                            return (
                                <DataListTitle key={index} width={reportInfo.width[index]}>{title}</DataListTitle>
                            )
                        })}

                    </DataListLine>
                    <div>Сюда бы запилить фильтрацию и(или) сортировочку</div>
                    { data.map((item, index) => {
                        return (
                            <DataListLine key={index}>
                                { data[index].map((cell, idx) => {
                                    return (
                                        <DataListCell key={idx} width={reportInfo.width[idx]}>{cell}</DataListCell>
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