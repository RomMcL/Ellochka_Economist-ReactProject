import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import css from "../../../styles/views/global/header.css";

const { HeaderContainer, HeaderElements } = css;

const navButtonCSS = {
    display: "block",
    padding: "1em 1.2em",
    borderRadius: "0.5em",
    backgroundColor: 'greenyellow',
    cursor: 'pointer'
}

const Header = () => {

    const navigate = useNavigate();

    const reportType = useSelector(state => state.reportTypeSlice.reportType);
    const incomeData = useSelector(state => state.dataSlice.incomeData);
    const expenseData = useSelector(state => state.dataSlice.expenseData);
    const currentPage = useSelector(state => state.paginationSlice.currentPage);
    
    const emptyPage = (!incomeData.length && !expenseData.length);    
   

    return (
        <React.Fragment>
            <HeaderContainer>
                <HeaderElements.Logo>ЭЛЛОЧКА</HeaderElements.Logo>
                <HeaderElements.NavigationContainer>
                    <span onClick={() => navigate('/main')} style={navButtonCSS}>Главная</span>
                    <span onClick={() => navigate(`/preparation/${reportType}`)} style={navButtonCSS}>Подготовка</span>
                    <span onClick={() => navigate(`/initialData/page_${emptyPage ? 'emptyPage' : currentPage}`)} style={navButtonCSS}>Входные данные</span>
                    <span onClick={() => navigate('/result')} style={navButtonCSS}>Результаты</span>
                </HeaderElements.NavigationContainer>
            </HeaderContainer>
        </React.Fragment>
    );
}

export default Header;