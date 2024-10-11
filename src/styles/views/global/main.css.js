import styled from "styled-components";

const css = {
    MainContainer: styled.main`
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: flex-start;
        width: 100%;
    `,
    ArticleContainer: styled.article`

        flex-grow: 1;
        height: 100%;
        padding: 1em; 
        background-color: aliceblue;

    `,
    AsideContainer: styled.aside`

        width: fit-content;
        height: 100%;

        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        justify-content: flex-start;
        row-gap: 1em;

        padding: 1em 1em 1em 2em; 

        background-color: aqua;

    `
    
}

export default css;