import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { changeReportType } from "../../redux-state/reducers/report-type";
import { clearInputs } from "../../redux-state/reducers/form-imput";
import { resetData } from "../../redux-state/reducers/data";
import { useSelector, useDispatch } from "react-redux";
import DataForm from "../views/local/DataForm";
import reports from "../../services/reports";
import css from "../../styles/views/global/main.css";


const { MainContainer, ArticleContainer, AsideContainer} = css;

const reportBtnCSS = {
    display: "block",
    padding: "1em 1.2em",
    borderRadius: "0.5em",
    backgroundColor: 'greenyellow',
    cursor: 'pointer'
}

const PreparationPage  = (props) => {
      
    const { actionData } = props;

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const reportType = useSelector(state => state.reportTypeSlice.reportType);

    const reportsNames = Object.keys(reports);


    const selectReport = (reportname) => {
        navigate(`/preparation/${reportname}`);
        dispatch(changeReportType(reportname));
        //actionData([]);
        dispatch(resetData());
        dispatch(clearInputs());

    }

    // useEffect(() => { console.log(actionData([])) }, [reportType]);
    
    return (
        <React.Fragment>
            <MainContainer>
                <AsideContainer>
                    {reportType === 'choiceReport'
                    ? reportsNames.map((name, index) => {
                        return (
                            <button key={index} style={reportBtnCSS} onClick={selectReport.bind(this, name)}>
                                { reports[reportsNames[index]].name }
                            </button>
                        )
                      })
                    : <div>
                        <div>Выбранный отчёт</div>
                        <button style={reportBtnCSS} onClick={selectReport.bind(this, 'choiceReport')}>Выбрать другой отчёт</button>
                      </div>
                    }                                      
                </AsideContainer>
                <ArticleContainer>
                    {reportType === 'choiceReport'
                    ? <span>Выбор отчёта</span>
                    :<DataForm actionData={actionData} ></DataForm>
                    }
                    
                </ArticleContainer>
            </MainContainer>
        </React.Fragment>
    );
}

export default PreparationPage;