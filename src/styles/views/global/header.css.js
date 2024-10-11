import styled from "styled-components";

const css = {
    HeaderContainer: styled.header`
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        column-gap: 1em;
        width: 100%;
        height: 80px;
        background-color: black;
        padding: 0 2em;
    `,
    HeaderElements: {
        Logo: styled.div`
            font-size: 30px;
            color: yellow;
        `,
        NavigationContainer: styled.nav`
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            align-items: center;
            column-gap: 1em;
        `
    }

}

export default css;