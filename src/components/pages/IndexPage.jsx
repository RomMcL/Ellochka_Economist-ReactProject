import React from "react";

import css from "../../styles/views/global/main.css";


const { MainContainer, ArticleContainer } = css;


const IndexPage = () => {
    return (
        <React.Fragment>
            <MainContainer>
                <ArticleContainer>
                    <h1>Главная страница</h1>
                </ArticleContainer>
            </MainContainer>
        </React.Fragment>
    );
}

export default IndexPage;