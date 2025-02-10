import {createSlice} from '@reduxjs/toolkit';
import {couponCode} from '../state/initialState';

export const couponSlice = createSlice({
  name: 'couponCode',
  initialState: {
    ...couponCode,
  },
  reducers: {
    couponCodeData: (state, {payload}) => {
        
      state.codeDetail=payload.codeDetail
    },

   
   
  },
});

export const {couponCodeData} = couponSlice.actions;

export default couponSlice.reducer;
