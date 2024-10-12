import React from "react";
import css from "../../../styles/views/local/dataList.css";

const { DataListContainer, DataListLine, DataListCell } = css;

const DataList = (props) => {

    const { data = [] } = props;

    return (
        <React.Fragment>

            { !data.length ? 
                <span>Данных ещё нет</span> :
                (<DataListContainer>
                    <div>Сюда бы запилить фильтрацию и(или) сортировочку</div>
                    { data.map((item, index) => {
                        return (
                            <DataListLine key={index}>
                                <DataListCell width={"30%"}>{item[0]}</DataListCell>
                                <DataListCell width={"30%"}>{item[1]}</DataListCell>
                                <DataListCell width={"30%"}>{item[2]}</DataListCell>
                            </DataListLine>
                        )
                    })}
                </DataListContainer>) 

            }

            
        </React.Fragment>
    )
}

export default DataList;