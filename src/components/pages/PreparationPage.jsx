import React from "react";
import { useNavigate } from "react-router-dom";
import { changeReportType } from "../../redux-state/reducers/report-type";
import { clearInputs } from "../../redux-state/reducers/form-imput";
import { resetData } from "../../redux-state/reducers/data";
import { resetPagination } from "../../redux-state/reducers/pagination-datalist";
import { resetAccountCalls } from "../../redux-state/reducers/account-call";
import { useSelector, useDispatch } from "react-redux";
import ChoosingCompany from "../views/local/CompanyContainer";
import DataForm from "../views/local/DataForm";
import reports from "../../services/reports";
import cssMain from "../../styles/views/global/main.css";
import cssPrepor from "../../styles/views/local/preparation.css";
import cssBtns from "../../styles/comps/buttons.css";



const { MainContainer, ArticleContainer, AsideContainer} = cssMain;
const { ReportInfoContainer } = cssPrepor;
const { AsideButton } = cssBtns;

const reportsNames = Object.keys(reports);


const PreparationPage  = (props) => {
      
    const { changeData } = props;

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const reportType = useSelector(state => state.reportTypeSlice.reportType);

    const selectReport = (reportname) => {
        navigate(`/preparation/${reportname}`);
        dispatch(changeReportType(reportname));
        dispatch(resetData());
        dispatch(resetPagination())
        
        reportType === 'generalReport' ? 
        dispatch(resetAccountCalls())  :
        dispatch(clearInputs());
    }

    
    return (
        <React.Fragment>
            <MainContainer>
                <AsideContainer>
                    
                    {reportType === 'choiceReport'
                    ? (<>
                        <h3>Выбор отчёта</h3>
                        {reportsNames.map((name, index) => {
                            return (
                                <AsideButton key={index} onClick={selectReport.bind(this, name)}>
                                    { reports[reportsNames[index]].name }
                                </AsideButton>
                            )
                        })}
                      </>)
                    : <>
                        <h4>Выбранный отчёт:</h4>
                        <ReportInfoContainer>
                            <h3>{reports[reportType].name}</h3>
                            <p>Состав отчёта:</p>
                            <ul>
                                {Object.values(reports[reportType].reportsNames).map((reportName, index) =>{
                                    return (
                                        <li key={index}>{ reportName }</li>
                                    )
                                })}
                            </ul>
                        </ReportInfoContainer>
                        <AsideButton onClick={selectReport.bind(this, 'choiceReport')}>Выбрать другой отчёт</AsideButton>
                      </>
                    }                                      
                </AsideContainer>
                <ArticleContainer>
                    
                    {reportType === 'choiceReport'
                    ? (<>
                        <h1>Выбор компании</h1>
                        <ChoosingCompany />
                      </>)
                    : (<>
                        <h1>Ввод данных</h1>
                        <DataForm changeData={changeData} />
                      </>)
                    }                    
                </ArticleContainer>
            </MainContainer>
        </React.Fragment>
    );
}

export default PreparationPage;