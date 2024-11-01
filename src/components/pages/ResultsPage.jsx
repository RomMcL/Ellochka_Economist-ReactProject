import React from "react";
import { useSelector } from "react-redux";
import reports from "../../services/reports";
import cssMain from "../../styles/views/global/main.css";
import cssBtns from "../../styles/comps/buttons.css";

const { MainContainer, ArticleContainer, AsideContainer } = cssMain;
const { AsideButton } = cssBtns;

const asideTitle = {
    maxWidth:"11rem",
    wordWrap:"break-word",
    textAlign: "center",
}

const ResultsPage  = () => {

    const reportType = useSelector(state => state.reportTypeSlice.reportType);


    const showAvailableReports = () => {        
        if (reportType === "choiceReport") {
            return <span>нету ни фига</span>            
        } else {
            const reportsNames = reports[reportType].reportsNames;
            const availableReports = Object.keys(reportsNames);
            
            return (<>               
                { availableReports.map((report, index) => {
                    return (
                        <AsideButton key={index}>{reportsNames[report]}</AsideButton>
                    )                   
                })}
            </>)
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
                </ArticleContainer>
            </MainContainer>
        </React.Fragment>
    );
}

export default ResultsPage;