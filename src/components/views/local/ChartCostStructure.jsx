import React, { useState, useRef, useEffect, useMemo } from "react";

import { useSelector } from "react-redux";

import BarChart from "../../charts/BarChart";
import SelectForCharts from "../../charts/SelectForCharts";

import company from "../../../services/company";
import content from "../../../services/contentSettings";


const months = content.months;

const keys=['Затраты по категории'];

const parameters = {
    layout: "horizontal",
    marginLeft: 10,
    marginTop: 0,
    enableGridX: true,
    enableGridY: false,
    label: d => `${d.indexValue}`,
    labelPosition: "start",
    labelOffset: 10,
    axisLeft: null,
}

const ChartCostStructure = () => {

    const selectedCompany = useSelector(state => state.companySlice.company);
    const expenses = company[selectedCompany].expenses;

    const expenseData = useSelector(state => state.dataSlice.expenseData);

    
    const byExpensesData = () => {
        const data = {};
        for(let expense of expenses) {
          data[expense] = expenseData.filter(dataLine => {
            return dataLine[2] === expense;
          });
        }      
        return data;
    }

    const allDataByExpenses = useMemo(() => byExpensesData(), []);

    const createCostStructureData = (usedData) => {
        const allCostStructureData = [];

        for(let criteria in usedData) {
          allCostStructureData.push((() => {
                let sumExpenses = 0;
                usedData[criteria].forEach((lineData) => {
                    sumExpenses += lineData[1];
                });

                return {
                    "criteria": criteria, 
                    "Затраты по категории": sumExpenses,                    
                    }
            })());
        }

        return allCostStructureData.sort((a, b) => a["Затраты по категории"] - b["Затраты по категории"]);
    }
    
    const filteringDataByMonth = (month) => {
        const dataByMonth = {};
        const numMonth = String(months.indexOf(month) + 1).padStart(2, '0');
        for(let expense in allDataByExpenses) {
          dataByMonth[expense] = allDataByExpenses[expense].filter(dataLine => {
            return dataLine[0].slice(5, 7) === numMonth;
          })
        }
        return dataByMonth;
    }

    const [data, setData] = useState([]);

    const [typeChart, setTypeChart] = useState("За весь период");

    const changeTypeChart = (param) => {
      setTypeChart(param)
    }

    useEffect(() => {     
        typeChart === "За весь период" ? 
          setData(createCostStructureData(allDataByExpenses)) : 
          setData(createCostStructureData(filteringDataByMonth(typeChart)));
      }, [typeChart]);

    return (
        <>
            <div style={{marginTop: "1em"}}>
                <SelectForCharts 
                label="Выбор месяца" 
                itemsArr={["За весь период", ...months]}
                inputChoice={typeChart}
                action={changeTypeChart}
                />
            </div>
            
            <BarChart data={data} keys={keys} parameters={parameters}  />
        </>
    )
}

export default ChartCostStructure;

