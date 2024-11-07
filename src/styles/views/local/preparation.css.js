import styled from "styled-components";

const cssPrepor = {
    ReportInfoContainer: styled.section`
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        justify-content: center;
        row-gap: 1em;
        p {
            font-weight: bold;
        }
        ul {
            list-style-type: circle;
            list-style-position: outside;
            line-height: 1.6;
            margin-top: -0.5em;
            text-align: start;
        }
        li {text-align: center}
    `,
    CompanyContainer: styled.section`
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        justify-content: flex-start;
        row-gap: 1em;
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        margin-bottom: 1em;
    `,    
    CompanyCard: styled.div`
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;    
        gap: 1em;
        width: 100%;
        max-width: 640px;
        margin: 0 auto;
        margin-bottom: 1em;
        padding: 1em;
        border-radius: 0.5em;
        box-shadow: 0px 0px 3px grey;
    `,
    CompanyImg: styled.div`
        width: 40%;
        min-width: 250px;
        aspect-ratio: 1 / 1;
        border-radius: 0.8em;
        box-shadow: 0px 0px 3px grey;

        background-image: url(${props => props.logo});
        background-repeat: no-repeat;
        background-size: contain;
    `,
    CompanyDescription: styled.div`
        flex-grow: 1;
        align-self: flex-start;        
        display: flex;
        flex-flow: column nowrap;
        row-gap: 0.5em;
        text-align: center;
        p {
            margin-top: 2em;            
        }
    `,


}

export default cssPrepor;