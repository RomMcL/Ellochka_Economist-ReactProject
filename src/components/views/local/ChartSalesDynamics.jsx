import React, { useState, useEffect, useMemo } from "react";

import { useSelector } from "react-redux";

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Stack from '@mui/material/Stack';

import LineChart from "../../charts/LineChart";

import company from "../../../services/company";
import content from "../../../services/contentSettings";

const months = content.months;

const ChartSalesDynamics = () => {


    const selectedCompany = useSelector(state => state.companySlice.company);
    const productCategories = company[selectedCompany].productCategories;

    const inputYear = useSelector(state => state.accountCallSlice.year);
    const incomeData = useSelector(state => state.dataSlice.incomeData);


   
    const filteringData = () => {
        const dataByMonth = {};
        const chartLength = inputYear !== new Date().getFullYear() ? 12 : new Date().getMonth();
        for(let i = 1; i <= chartLength; i++) {
            const numMonth = String(i).padStart(2, '0');
            dataByMonth[months[i-1]] = incomeData.filter(dataLine => {
                return dataLine[0].slice(5, 7) === numMonth;
             });
        }
        return dataByMonth;
    }

    const dataByMonth = useMemo(() => filteringData(), []);
    

    const createAllSalesData = () => {
        const allSales = [];
        for(let month in dataByMonth) {
            allSales.push((() => {
                let sum = 0;
                dataByMonth[month].forEach((lineData) => {
                    sum += lineData[2];
                });
                return {"x": month, "y": sum}
            })());
        }
        return {
            "id": "Все продажи",
            "color": "hsl(340, 70%, 50%)",
            "data": allSales
        };
    }

    const createCategorySalesData = () => {

        let categorySalesData = [];

        const chart = (category) => {
            const categorySales = [];
            
            for(let month in dataByMonth) {
                categorySales.push((() => {
                    let sum = 0;
                    dataByMonth[month]
                        .filter(dataLine => {
                            return dataLine.includes(category);
                        }) 
                        .forEach((lineData) => {
                            sum += lineData[2];
                        });
                        
                    return {"x": month, "y": sum}
                })());
            }
            return {
                "id": category,
                "color": "hsl(340, 70%, 50%)",
                "data": categorySales
            };
        }

        categories.map((category, index) => {
            categorySalesData.push(chart(category))
        })

        return categorySalesData;
    }
 

    

    const [typeChart, setTypeChart] = useState("all");

    const changeTypeChart = (event, newTypeData) => {
        setTypeChart(newTypeData);
    };

    const [categories, setCategory] = useState(() => [...productCategories]);

    const handleCategories = (event, categories) => {
        if (categories.length) {
            setCategory(categories);
        }
      };


    const [data, setData] = useState(); 

    useEffect(() => {        
        typeChart === "all" ? setData([createAllSalesData()]) : setData(createCategorySalesData());
    }, [typeChart, categories]);

    

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
                <ToggleButton value="all" disabled={typeChart === "all"}>все продажи</ToggleButton>
                <ToggleButton value="byCategory" disabled={typeChart === "byCategory"}>по категориям</ToggleButton>
            </ToggleButtonGroup>

            <LineChart data={data} />

            {typeChart === "byCategory" && (
                <Stack direction="column" spacing={1} sx={{textAlign: "center"}}>
                    <p>Отображать на графике:</p>
                    <ToggleButtonGroup
                        value={categories}
                        onChange={handleCategories}
                        aria-label="device"
                        size="small"
                    >
                        { productCategories.map((category, index) => {
                            return (
                                <ToggleButton key={index} value={category} aria-label={category}>
                                    {productCategories[index]}                             
                                </ToggleButton>
                            )                   
                        })}
                    </ToggleButtonGroup>
                </Stack>
            )}
           
                        
        </>
    )
}

export default ChartSalesDynamics;