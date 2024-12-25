import React, { useState, useMemo } from "react";

import { useSelector } from "react-redux";

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import PieChart from "../../charts/PieChart";

import company from "../../../services/company";


const ChartSalesStructure = () => {

    const selectedCompany = useSelector(state => state.companySlice.company);
    const productCategories = company[selectedCompany].productCategories;

    const incomeData = useSelector(state => state.dataSlice.incomeData);

    /* const dataRetail = incomeData.filter(dataLine => dataLine[4] === "розница"); */
    /* const dataWholesale = incomeData.filter(dataLine => dataLine[4] === "опт"); */

    const dataRetail = useMemo(() => incomeData.filter(dataLine => dataLine[4] === "розница"), [incomeData]);
    const dataWholesale = useMemo(() => incomeData.filter(dataLine => dataLine[4] === "опт"), [incomeData]);
    /* const dataByMonth = useMemo(() => filteringData(), []); */

    const createDataChart = (typeChartData) => {
        const data = [];

        let totalSum = 0;
        typeChartData.forEach((dataLine) => {
            totalSum += dataLine[2];
        });

        for(let category of productCategories) {

            const filteredDataByСategory = typeChartData.filter(dataLine => dataLine[1] === category);

            let sum = 0;
            filteredDataByСategory.forEach((dataLine) => {
                sum += dataLine[2];
            });

            const percent = parseFloat(((sum*100)/totalSum).toFixed(2));

            data.push((() => {
                return {"id": category, "label": category, "value": sum, "color": "hsl(237, 70%, 50%)", "percent": percent}
            })());            
        }        
        return data;
    }

    const [data, setData] = useState(createDataChart(incomeData));

    const [typeChart, setTypeChart] = useState("all");

    const changeTypeChart = (event, newTypeData) => {
        setTypeChart(newTypeData);

        switch (newTypeData) {
            case "all":
                setData(createDataChart(incomeData));
                break;
            case "retail":
                setData(createDataChart(dataRetail));
                break;
            case "wholesale":
                setData(createDataChart(dataWholesale));
                break;
            default:
                break;
        }        
    };
    
    return (
        <>
            <ToggleButtonGroup
                sx={{ marginTop: "1em" }}
                color="primary"
                value={typeChart}
                exclusive
                onChange={changeTypeChart}
                aria-label="TypeChart"
                size="small"
            >
                <ToggleButton value="all" disabled={typeChart === "all"}>общая структура</ToggleButton>
                <ToggleButton value="retail" disabled={typeChart === "retail"}>розничные продажи</ToggleButton>
                <ToggleButton value="wholesale" disabled={typeChart === "wholesale"}>оптовые продажи</ToggleButton>
            </ToggleButtonGroup>

            <PieChart data={data} />
        </>
    )
}

export default ChartSalesStructure;