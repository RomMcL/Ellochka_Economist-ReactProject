import { configureStore } from '@reduxjs/toolkit';
import companySlice from './reducers/company';
import reportTypeSlice from './reducers/report-type';
import formInputSlice from './reducers/form-imput';
import accountCallSlice from './reducers/account-call';
import dataSlice from './reducers/data';
import paginationSlice from './reducers/pagination-datalist';


export const store = configureStore({
  reducer: {
    companySlice: companySlice,
    reportTypeSlice: reportTypeSlice,
    formInputSlice: formInputSlice,
    accountCallSlice: accountCallSlice,
    dataSlice: dataSlice,
    paginationSlice: paginationSlice,


  },
});