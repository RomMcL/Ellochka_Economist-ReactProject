import React from "react";
import Footer from "../views/global/Footer";
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
    
    return (
        <React.Fragment>
            <MainContainer>
                <AsideContainer>
                    <button style={reportBtnCSS}>Отчёт № 1</button>
                    <button style={reportBtnCSS}>Отчёт № 2</button>
                    <button style={reportBtnCSS}>Отчёт № 3</button>
                </AsideContainer>
                <ArticleContainer>
                    <DataForm actionData={actionData}></DataForm>
                </ArticleContainer>
            </MainContainer>
            <Footer></Footer>
        </React.Fragment>
    );
}

export default PreparationPage;