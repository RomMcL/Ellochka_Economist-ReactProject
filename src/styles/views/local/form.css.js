import styled from "styled-components";

const cssForm = {
    FormContainer: styled.section`
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: flex-start;        
        column-gap: 1em;
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;  
        padding: 1em;
        border-radius: 0.5em;
        box-shadow: 0px 0px 3px grey;
    `,
    InputsContainer: styled.div`
        width: 70%;
        display: flex;
        flex-flow: row wrap;
        align-items: flex-start;
        justify-content: space-between;
        row-gap: 1em;
        column-gap: 2%;
    `,
    FormButton: styled.span`
        display: block;
        padding: 1em 1.2em;
        border: 2px solid black;
        border-radius: 0.5em;        
        cursor: pointer;
        background-color: ${props => props.backgroundcolor};
        color: ${props => props.color};
        pointer-events: ${props => props.events};    
    `,
    AccountingContainer: styled.div`
        width: 30%;
        height: 100%;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        justify-content: space-between;
        row-gap: 1em;
        background-color: aquamarine;
        p {
            text-align: center;
        }
    `,


}

export default cssForm;