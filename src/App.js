import React, { useState} from 'react';
import Header from './components/views/global/Header';
import PreparationPage from './components/pages/PreparationPage';
import InitialDataPage from './components/pages/InitialDataPage';


function App() {

  const [ showPage, setShowPage ] = useState('preparation');
  const [ data, setData ] = useState([]);
  
  return (
    <React.Fragment>
      <Header actionPage={setShowPage}></Header>
      { showPage === 'preparation' 
        ? <PreparationPage actionData={setData}></PreparationPage> 
        : <InitialDataPage initialData={data}></InitialDataPage>
      }
    </React.Fragment>
  );
}

export default App;
