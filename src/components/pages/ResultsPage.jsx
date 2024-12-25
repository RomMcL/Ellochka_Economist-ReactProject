import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ChartSalesDynamics from "../views/local/ChartSalesDynamics";
import ChartSalesStructure from "../views/local/ChartSalesStructure";
import reports from "../../services/reports";
import cssMain from "../../styles/views/global/main.css";
import cssBtns from "../../styles/comps/buttons.css";
import cssCharts from "../../styles/views/local/charts.css"

const { MainContainer, ArticleContainer, AsideContainer } = cssMain;
const { AsideButton } = cssBtns;
const { ChartContainer } = cssCharts;

const asideTitle = {
    maxWidth:"11rem",
    wordWrap:"break-word",
    textAlign: "center",
}

const ResultsPage  = () => {

    const reportType = useSelector(state => state.reportTypeSlice.reportType);

    const [resultReport, setResultReport] = useState("");

    const selectResultReport = (reportname) => {
        setResultReport(reportname);
    }

    let reportsNames = [];
    reportType !== "choiceReport" && (reportsNames = reports[reportType].reportsNames);

    

    const showAvailableReports = () => {        
        if (reportType === "choiceReport") {
            return <span style={asideTitle}>нету ни фига</span>            
        } else {
            
            const availableReports = Object.keys(reportsNames);

            return (<>               
                { availableReports.map((report, index) => {
                    return (
                        <AsideButton key={index} onClick={selectResultReport.bind(this, report)}>
                            {reportsNames[report]}                             
                        </AsideButton>
                    )                   
                })}
            </>)
        }
    }

    const showChar = () => {        
        switch (resultReport) {
            case "salesDynamics":
                return (<ChartSalesDynamics />);
            case "salesStructure":
                return (<ChartSalesStructure />);
            case "grossProfit":
                return (<div>{resultReport}</div>);
            case "costStructure":
                return (<div>{resultReport}</div>);
            default:
                return (<div>ШИШ</div>);
        }            
    }


    

    return (
        <React.Fragment>
            <MainContainer>
                <AsideContainer>
                    <h3 style={asideTitle}>Сформированы следующие отчёты:</h3>
                    {showAvailableReports()}
                </AsideContainer>
                <ArticleContainer>
                    <h1>Результаты</h1>
                    <ChartContainer>
                        <h2>{reportsNames[resultReport]}</h2>
                        {showChar()}
                    </ChartContainer>
                </ArticleContainer>
            </MainContainer>
        </React.Fragment>
    );
}

export default ResultsPage;