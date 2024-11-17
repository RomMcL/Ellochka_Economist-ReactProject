import styled from "styled-components";

const cssVariantsDataCreate = {
    VariantContainer: styled.section`
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: flex-start;      
        column-gap: 1em;
        width: 100%;
        max-width: 1200px;
        min-height: 100px;
        margin: 0 auto;  
        padding: 1em;
        border-radius: 0.5em;
        box-shadow: 0px 0px 3px grey;
        &:not(:first-of-type) {
            flex-grow: 1;
        }
    `,
    DescriptionContainer: styled.div`
        flex-grow: 1;
        height: 100%;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        justify-content: flex-start;      
        row-gap: 1em;
        text-align: center;
    `,
    Remark: styled.div`
        flex-grow: 1;
        height: 100%;       
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: center;
        text-align: center;
    `,
    
    
}

export default cssVariantsDataCreate;