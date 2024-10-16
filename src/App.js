import React, { useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { changeData } from './redux-state/reducers/data';
import Header from './components/views/global/Header';
import IndexPage from './components/pages/IndexPage';
import PreparationPage from './components/pages/PreparationPage';
import InitialDataPage from './components/pages/InitialDataPage';
import ResultsPage from './components/pages/ResultsPage';
import Footer from './components/views/global/Footer';


function App() {

  
  const data = useSelector(state => state.dataSlice.data);
  const dispatch = useDispatch();

  const setData = (param) => dispatch(changeData(param));

  
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
          element={<PreparationPage actionData={setData}/>}
        />
        <Route
          path={'/initialData'}
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
