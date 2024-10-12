import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import DataForm from "../views/local/DataForm";
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

    const { reportName } = useParams();
    const navigate = useNavigate();


    const selectReport = (reportname) => {
        navigate(`/preparation/${reportname}`);
        //actionData([]);
    }
    
    return (
        <React.Fragment>
            <MainContainer>
                <AsideContainer>
                    <button style={reportBtnCSS} onClick={selectReport.bind(this, 'reportname1')}>Отчёт № 1</button>
                    <button style={reportBtnCSS} onClick={selectReport.bind(this, 'reportname2')}>Отчёт № 2</button>
                    <button style={reportBtnCSS} onClick={selectReport.bind(this, 'reportname3')}>Отчёт № 3</button>
                </AsideContainer>
                <ArticleContainer>
                    {reportName === 'choiceReport'
                    ? <span>Выбор отчёта</span>
                    :<DataForm actionData={actionData} ></DataForm>
                    }
                    
                </ArticleContainer>
            </MainContainer>
        </React.Fragment>
    );
}

export default PreparationPage;