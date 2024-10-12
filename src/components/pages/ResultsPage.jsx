import React from "react";

import css from "../../styles/views/global/main.css";


const { MainContainer, ArticleContainer, AsideContainer } = css;

const ResultsPage  = () => {
    return (
        <React.Fragment>
            <MainContainer>
                <AsideContainer>
                    <p>Отчёт № 1</p>
                    <p>Отчёт № 2</p>
                    <p>Отчёт № 3</p>
                </AsideContainer>
                <ArticleContainer>
                    <h1>Результаты</h1>
                </ArticleContainer>
            </MainContainer>
        </React.Fragment>
    );
}

export default ResultsPage;