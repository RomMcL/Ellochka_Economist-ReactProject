import styled from "styled-components";

const css = {
    DataListContainer: styled.section`
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        justify-content: flex-start;
        row-gap: 1em;   
        width: 100%;
        max-width: 1200px;
        height: fit-content;
        margin: 0 auto;
        padding: 1em;
        border-radius: 0.5em;
        box-shadow: 0px 0px 3px grey;
    `,
    DataListLine: styled.div`
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    `,
    DataListCell: styled.span`
        display: block;
        width: ${props => props.width};
        font-size: 1em;
        text-align: center;
    `,
    DataListTitle: styled.span`
        display: block;
        width: ${props => props.width};
        font-size: 1em;
        font-weight: bold;
        text-align: center;
    `


}

export default css;