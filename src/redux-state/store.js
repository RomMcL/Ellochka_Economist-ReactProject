import { configureStore } from '@reduxjs/toolkit';
import companySlice from './reducers/company';
import reportTypeSlice from './reducers/report-type';
import formInputSlice from './reducers/form-imput';
import dataSlice from './reducers/data';


export const store = configureStore({
  reducer: {
    companySlice: companySlice,
    reportTypeSlice: reportTypeSlice,
    formInputSlice: formInputSlice,
    dataSlice: dataSlice,

  },
});