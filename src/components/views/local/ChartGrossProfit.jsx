import React, { useState, useRef, useEffect, useMemo } from "react";

import { useSelector } from "react-redux";

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Stack from '@mui/material/Stack';

import BarChart from "../../charts/BarChart";
import SelectForCharts from "../../charts/SelectForCharts";

import company from "../../../services/company";
import content from "../../../services/contentSettings";


const months = content.months;

const keys=['Валовая прибыль', 'Цена закупки'];

const parameters = {
  layout: "vertical",
  marginLeft: 60,
  marginTop: 50,
  enableGridX: false,
  enableGridY: true,
  label: "formattedValue",
  labelPosition: "middle",
  labelOffset: 0,
  axisLeft: {
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    legendOffset: -40,
    truncateTickAt: 0
  },
}



const ChartGrossProfit = () => {

    const selectedCompany = useSelector(state => state.companySlice.company);
    const productCategories = company[selectedCompany].productCategories;

    const inputYear = useSelector(state => state.accountCallSlice.year);
    const incomeData = useSelector(state => state.dataSlice.incomeData);

    const byMonthData = () => {
        const data = {};
        const chartLength = inputYear !== new Date().getFullYear() ? 12 : new Date().getMonth();
        for(let i = 1; i <= chartLength; i++) {
            const numMonth = String(i).padStart(2, '0');
            data[months[i-1]] = incomeData.filter(dataLine => {
                return dataLine[0].slice(5, 7) === numMonth;
             });
        }
        return data;
    }

    const allDataByMonth = useMemo(() => byMonthData(), []);

    const byCategoriesData = () => {
        const data = {};
        for(let category of productCategories) {
          data[category] = incomeData.filter(dataLine => {
            return dataLine[1] === category;
          });
        }      
        return data;
    }

    const allDataByCategories = useMemo(() => byCategoriesData(), []);


    const filteringDataByCategories = (category) => {
        const dataByCategories = {};
        for(let month in allDataByMonth) {
          dataByCategories[month] = allDataByMonth[month].filter(dataLine => {
            return dataLine.includes(category);
          })
        }
        return dataByCategories;
    }

    const filteringDataByMonth = (month) => {
      const dataByMonth = {};
      const numMonth = String(months.indexOf(month) + 1).padStart(2, '0');
      for(let category in allDataByCategories) {
        dataByMonth[category] = allDataByCategories[category].filter(dataLine => {
          return dataLine[0].slice(5, 7) === numMonth;
        })
      }
      return dataByMonth;
    }

    
    const createGrossProfitData = (usedData) => {
        const allGrossProfitData = [];
        for(let criteria in usedData) {
          allGrossProfitData.push((() => {
                let sumPurchasePrice = 0;
                let sumCostPrice = 0;
                usedData[criteria].forEach((lineData) => {
                    sumPurchasePrice += lineData[2];
                    sumCostPrice += lineData[6];
                });

                return {
                    "criteria": criteria, 
                    "Цена закупки": sumCostPrice,                    
                    "Валовая прибыль": sumPurchasePrice - sumCostPrice,
                    }
            })());
        }
        return allGrossProfitData;
    }

    const [typeChart, setTypeChart] = useState("По всем категориям");

    const changeTypeChart = (param) => {
      setTypeChart(param)
    }

    let selectParameters = useRef({
      label: "Категории товаров",
      itemsArr: ["По всем категориям", ...productCategories],
    })

    const [typeCriteria, setTypeCriteria] = useState("byMonth");

    const changeTypeCriteria = (event) => {
      setTypeCriteria(event.target.value);

      if (event.target.value === "byMonth") setTypeChart("По всем категориям");
      else if (event.target.value === "byCategory") setTypeChart("За весь период");
    }

    const [data, setData] = useState([]);

    useEffect(() => {     
      if (typeCriteria === "byMonth") {

        selectParameters.current.label = "Категории товаров";
        selectParameters.current.itemsArr = ["По всем категориям", ...productCategories];

        typeChart === "По всем категориям" ? 
        setData(createGrossProfitData(allDataByMonth)) : 
        setData(createGrossProfitData(filteringDataByCategories(typeChart)));
      } else if (typeCriteria === "byCategory") {
        
        selectParameters.current.label = "Выбор месяца";
        selectParameters.current.itemsArr = ["За весь период", ...months];

        typeChart === "За весь период" ? 
        setData(createGrossProfitData(allDataByCategories)) : 
        setData(createGrossProfitData(filteringDataByMonth(typeChart)));
      }
    }, [typeChart, typeCriteria]);

    
    return (
        <>  
          <Stack direction="row" spacing={2} sx={{ marginTop: "1em", textAlign: "center", alignItems: "center"}}>
            <ToggleButtonGroup
              color="primary"
              value={typeCriteria}
              exclusive
              onChange={changeTypeCriteria}
              aria-label="TypeCriteria"
              size="small"
            >
              <ToggleButton value="byMonth" disabled={typeCriteria === "byMonth"}>по месяцам</ToggleButton>
              <ToggleButton value="byCategory" disabled={typeCriteria === "byCategory"}>по категориям</ToggleButton>
            </ToggleButtonGroup>

            <SelectForCharts 
              label={selectParameters.current.label} 
              itemsArr={selectParameters.current.itemsArr}
              inputChoice={typeChart}
              action={changeTypeChart}
            />
          </Stack>
            
          <BarChart data={data} keys={keys} parameters={parameters}/>

        </>
    )
}

export default ChartGrossProfit;