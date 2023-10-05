import { configureStore } from '@reduxjs/toolkit';


import userDataSlice from './Slices/userDataSlice';
import userAuthSlice from './Slices/userAuthSlice';
import appSlice from './Slices/appSlice';
import productSlice from './Slices/productData';
export const store = configureStore({
    reducer: {
      productData : productSlice, 
      appData : appSlice,
      userData : userDataSlice,
      authData : userAuthSlice,
    },
  })