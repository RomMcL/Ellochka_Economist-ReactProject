import styled from "styled-components";

const css = {
    FormContainer: styled.div`
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        justify-content: flex-start;
        row-gap: 1em;

        width: 600px;
        height: fit-content;
        min-height: 60px;
        margin: 0 auto;
        margin-bottom: 1em;

        padding: 1em;

        border-radius: 0.5em;
        box-shadow: 0px 0px 3px grey;
    `,
    FormInput: styled.input`
        display: block;
        width: 100%;
        height: 40px;
        outline: none;
        border: none;
        border-radius: 0.4em;
        background-color: rgb(229, 229, 229);
        padding-left: 1em;

    `,
    FormButton: styled.span`
        display: block;
        padding: 1em 1.2em;
        border: 2px solid black;
        border-radius: 0.5em;        
        cursor: pointer;
        background-color: ${props => props.backgroundcolor};
    
    `

}

export default css;