import React from "react";
import css from "../../../styles/views/global/header.css";

const { HeaderContainer, HeaderElements } = css;

const navButtonCSS = {
    display: "block",
    padding: "1em 1.2em",
    borderRadius: "0.5em",
    backgroundColor: 'greenyellow',
    cursor: 'pointer'
}

const Header = (props) => {

    const { actionPage } = props;

    return (
        <React.Fragment>
            <HeaderContainer>
                <HeaderElements.Logo>ЭЛЛОЧКА</HeaderElements.Logo>
                <HeaderElements.NavigationContainer>
                    <span style={navButtonCSS}>Главная</span>
                    <span onClick={() => actionPage('preparation')} style={navButtonCSS}>Подготовка</span>
                    <span onClick={() => actionPage('initialData')} style={navButtonCSS}>Входные данные</span>
                    <span style={navButtonCSS}>Результаты</span>
                </HeaderElements.NavigationContainer>
            </HeaderContainer>
        </React.Fragment>
    );
}

export default Header;