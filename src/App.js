import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { changeIncomeData, changeExpenseData } from './redux-state/reducers/data';
import Header from './components/views/global/Header';
import IndexPage from './components/pages/IndexPage';
import PreparationPage from './components/pages/PreparationPage';
import InitialDataPage from './components/pages/InitialDataPage';
import ResultsPage from './components/pages/ResultsPage';
import Footer from './components/views/global/Footer';


function App() {

  const data = {
    incomeStatement: useSelector(state => state.dataSlice.incomeData),
    expenseReport: useSelector(state => state.dataSlice.expenseData),
  }
  /* const incomeData = useSelector(state => state.dataSlice.incomeData); */
  /* const expenseData = useSelector(state => state.dataSlice.expenseData); */
  const dispatch = useDispatch();

  const setData = {
    incomeData: (param) => dispatch(changeIncomeData(param)),
    expenseData: (param) => dispatch(changeExpenseData(param)),
  }
  /* const setIncomeData = (param) => dispatch(changeIncomeData(param)); */
  /* const setExpenseData = (param) => dispatch(changeExpenseData(param)); */
  

  return (
    <React.Fragment>
      <Header/>
      <Routes>
        <Route
          path={'/main'}
          element={<IndexPage/>}
        />
        <Route
          path={'/preparation/:reportName'}
          element={<PreparationPage changeData={setData}/>}
        />
        <Route
          path={'/initialData/:paginationPage'}
          element={<InitialDataPage initialData={data}/>}
        />
        <Route
          path={'/result'}
          element={<ResultsPage/>}
        />
        <Route
          path={'*'}
          element={<IndexPage/>}
        />
      </Routes>
      <Footer/>
    </React.Fragment>
  );
}

export default App;
