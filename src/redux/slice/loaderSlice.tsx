import {createSlice} from '@reduxjs/toolkit';
import { loaderHome } from '../state/initialState';
type tempPayload = {
  tempVar: boolean;
};

export const loaderSlice = createSlice({
  name: 'loader',
  initialState: {
   ...loaderHome
  },
  reducers: {
   
   
    FeatureListLoader: (state, {payload}) => {
      
      state.featureList = payload.loader;
    },
      CouponsListLoader: (state, {payload}) => {
        
        state.couponList = payload.loader;
      },
      CategoryListLoader: (state, {payload}) => {
        
        state.categoryList = payload.loader;
      },
      InstructorListLoader: (state, {payload}) => {
        
        state.instructorList = payload.loader;
      },
      PackageList: (state, {payload}) => {
        
        state.packageList = payload.loader;
      },
      FinalLoader: (state, {payload}) => {
        
        state.finalLoader = payload.loader;
      },
  },
});

// Action creators are generated for each case reducer function
export const { FeatureListLoader, InstructorListLoader,FinalLoader, PackageList, CategoryListLoader, CouponsListLoader } =  loaderSlice.actions;

export default loaderSlice.reducer;
