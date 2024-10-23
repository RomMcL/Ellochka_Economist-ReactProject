import React from "react";
import { useSelector } from "react-redux";
import reports from "../../../services/reports";
import css from "../../../styles/views/local/dataList.css";

const { DataListContainer, DataListLine, DataListCell, DataListTitle } = css;

const ValidationContainer = (props) => {

    const { inputValues = [] } = props;

    const reportType = useSelector(state => state.reportTypeSlice.reportType);

    const reportInfo = reports[reportType];

    return (
        <React.Fragment>

            <DataListContainer>
                <h3>Проверка вводимых данных</h3>
                <DataListLine>
                    { reportInfo.requiredData.map((title, index) => {
                        return (
                            <DataListTitle key={index} width={reportInfo.width[index]}>{title}</DataListTitle>
                        )
                    })}

                </DataListLine>
                {
                    <DataListLine>
                        { inputValues.map((cell, idx) => {
                            return (
                                <DataListCell key={idx} width={reportInfo.width[idx]}>{cell}</DataListCell>
                            )
                        })}
                    </DataListLine>
                }
            </DataListContainer> 
           
        </React.Fragment>
    )
}

export default ValidationContainer;