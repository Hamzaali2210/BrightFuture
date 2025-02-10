import {createSlice} from '@reduxjs/toolkit';
import { apiData} from '../state/initialState';

export const apiSlice = createSlice({
  name: 'apiCode',
  initialState: {
    ...apiData,
  },
  reducers: {
    cartCallData: (state, {payload}) => {
      state.cartCall=payload.cartCall
    },
    wishCallData: (state, {payload}) => {
      state.wishCall=payload.wishCall
    },
    paymentCallData: (state, {payload}) => {
      state.paymentCall=payload.paymentCall
    },
    newSampleData:()=>{
      
    }
   
   
  },
});

export const {cartCallData,wishCallData,paymentCallData} = apiSlice.actions;

export default apiSlice.reducer;
