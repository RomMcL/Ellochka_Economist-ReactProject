import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { changeCurrentPage, changeNumberRows, resetPagination } from "../../../redux-state/reducers/pagination-datalist";
import ToggleBtnData from "../../comps/ToggleBtnData";
import TableSortElement from "../../comps/TableSortElement";
import TableFilterElement from "../../comps/TableFilterElement";
import TableSumElement from "../../comps/TableSumElement";
import Pagination from "../../comps/Pagination";
import company from "../../../services/company";
import reports from "../../../services/reports";
import css from "../../../styles/views/local/dataList.css";

const { DataListContainer, DataListLine, DataListCell, DataListTitle } = css;



const DataList = (props) => {

    const { data = {
        incomeStatement: [], 
        expenseReport: [],
    } } = props;

    const navigate = useNavigate(); 

    const dispatch = useDispatch();
    const selectedCompany = useSelector(state => state.companySlice.company);

    const reportType = useSelector(state => state.reportTypeSlice.reportType);


    let defaultTypeData = "incomeStatement";
    reportType !== "generalReport" && (defaultTypeData = reportType);

    let isEmptyData = false;
    if (!data.incomeStatement.length && !data.expenseReport.length) isEmptyData=true;
    

    const [typeData, setTypeData] = useState(defaultTypeData);

    const changeTypeData = (event, newTypeData) => {
        setTypeData(newTypeData); 
        setShowData([...data[newTypeData]]);
        setSort('increasing');
        dispatch(resetPagination())
        navigate(`/initialData/page_1`);
    };

    const [showData, setShowData] = useState(data[typeData]);
   
    const [sort, setSort] = useState('increasing');

    const changeSort = (event) => {
        setSort(event.target.value);
        setShowData([...showData].reverse());
    };


    const currentPage = useSelector(state => state.paginationSlice.currentPage);
    const numberRows = useSelector(state => state.paginationSlice.numberRows);
    const lastDataIndex = currentPage * numberRows;
    const firstDataIndex = lastDataIndex - numberRows;
    const paginationData = !isEmptyData && showData.slice(firstDataIndex, lastDataIndex);

    const changePaginate = (pageNumber) => {
        dispatch(changeCurrentPage(pageNumber));
        navigate(`/initialData/page_${pageNumber}`);
    }

    const changeNumRows = (numberRows) => {
        dispatch(changeNumberRows(numberRows));
        navigate(`/initialData/page_1`);
    }


    const titleList = reports[typeData]?.requiredData;

    const tableSortElement = () => {
        return <TableSortElement sort={sort} action={changeSort}/>
    }


    
    let filters = useRef({});

    useEffect(() => {
        filters.current = {};
    },[typeData])


    const tableFilterElement = (company, title) => {
        let arr = [];

        switch (title) {
            case "Категория":
                arr = [...company.productCategories];
                break;                
            case "Точка":
                arr = [...company.points];
                break;
            case "Тип продажи":
                arr = ["розница", "опт"];
                break;
            case "Статья расходов":
                arr = [...company.expenses];
                break;
            default:
                break;
        }


        const filtering = (event) => {
                      
            event.target.value ? filters.current[title] = event.target.value : delete filters.current[title];
            
            setShowData((sort === "increasing" ? data[typeData] : [...data[typeData]].reverse())
                .filter(dataLine => {
                    return Object.keys(filters.current).every(filter => {
                        return dataLine.includes(filters.current[filter])
                    })
                })
            )
        }    
        return <TableFilterElement itemsArr={arr} filtering={filtering}/>
    }



    const tableSumElement = (prefix, column) => {

        const columnSum = () => {
            let sum = 0;
            showData.forEach((lineData) => {
                sum += lineData[column];
            });
            return sum;
        }

        return <TableSumElement prefix={prefix} sum={columnSum()}/>
    }
    


    const tableToolsList = () => {

        let elements = [];

        titleList.map((title, index) => {
            let element = null;
            switch (title) {
                case "Дата":                
                    element = tableSortElement();
                    break;
                case "Сумма продаж":
                case "Цена закупки":                
                case "Сумма":                                  
                    element = tableSumElement("Σ=", index);
                    break;
                case "Категория":                
                case "Точка":
                case "Тип продажи":
                case "Статья расходов":
                    element = tableFilterElement(company[selectedCompany], title);
                    break;
                default:
                    element = null;
                    break;
            }
            return elements.push(element);
        })

        return elements
    }

    
    

    return (
        <React.Fragment>

            { isEmptyData
            ? <span>Данных ещё нет</span>
            : <>  
                <DataListContainer>
                    <h3>{ reports[reportType].name } (исходные данные)</h3>
                    {reportType === "generalReport"
                    && <ToggleBtnData typeData={typeData} onChange={changeTypeData}></ToggleBtnData>
                    }                   
                    <DataListLine>
                        { titleList.map((title, index) => {
                            return (
                                <DataListTitle key={index} width={reports[typeData].width[index]}>{title}</DataListTitle>
                            )
                        })}
                    </DataListLine>

                    <DataListLine>
                        { tableToolsList().map((element, index) => {
                            return (
                                <DataListCell key={index} width={reports[typeData].width[index]}>{element}</DataListCell>
                            )
                        })}
                    </DataListLine>

                    { paginationData.map((item, index) => {
                        return (
                            <DataListLine key={index}>
                                { paginationData[index].map((cell, idx) => {
                                    return (
                                        <DataListCell key={idx} width={reports[typeData].width[idx]}>{cell}</DataListCell>
                                    )
                                })}
                            </DataListLine>
                        )
                    })}
                    
                </DataListContainer>
                <Pagination 
                    currentPage={currentPage} totalPage={showData.length} 
                    changePaginate={changePaginate} numberRows={numberRows} changeNumRows={changeNumRows} 
                />
              </>     
            }
           
        </React.Fragment>
    )
}

export default DataList;