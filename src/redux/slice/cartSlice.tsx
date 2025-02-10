import {createSlice} from '@reduxjs/toolkit';
import {paymentState} from '../state/initialState';

export const cartSlice = createSlice({
  name: 'counter',
  initialState: {
    ...paymentState,
  },
  reducers: {
    IsCartData: (state, {payload}) => {
      state.cartData = payload.cartData;
      state.fullCourse = payload.fullCourse;
    },
    IsAddedCartData: (state, {payload}) => {
      
      state.addedCartData = payload.addedCartData;
    },
    CourseData:(state,{payload})=>{
      
          
          state.courseData=payload.courseData
    },
    CouponApplied:(state,{payload})=>{
          state.couponApplied = payload.couponApplied 
    }
  },
});

export const {IsCartData, IsAddedCartData,CourseData,CouponApplied} = cartSlice.actions;

export default cartSlice.reducer;
