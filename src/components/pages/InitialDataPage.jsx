import React from "react";
import DataList from "../views/local/DataList";

import css from "../../styles/views/global/main.css";

const { MainContainer, ArticleContainer } = css;

const InitialDataPage = (props) => {

    const { initialData } = props;
    
    return (
        <React.Fragment>
            <MainContainer>
                <ArticleContainer>
                    <DataList data={initialData}></DataList>
                </ArticleContainer>
            </MainContainer>
        </React.Fragment>
    );
}

export default InitialDataPage;