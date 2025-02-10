import {createSlice} from '@reduxjs/toolkit';

type tempPayload = {
  tempVar: boolean;
};

export const authSlice = createSlice({
  name: 'counter',
  initialState: {
    loading: true,
    userData: null,
    isSignOut: false,
    token: null,
    tempVar: false,
    userPayload: {},
    mobileNumber:0,
  },
  reducers: {
    IsSignOut: state => {
      state.isSignOut = true;
      state.userData = null;
    },
    IsSignIn: (state, payload) => {
      
      state.loading = false;
      state.userData = payload?.payload?.userData;
    },
    IsRestoreToken: (state, payload) => {
      state.loading = false;
      state.token = payload?.payload?.token;
    },
    UserToken: (state, payload) => {
      state.loading = false;
      state.token = payload?.payload?.token;
    },
    IsTempVar: (state, payload) => {
      state.tempVar = payload?.payload?.tempVar;
    },
    userPayload: (state, payload) => {
      state.userPayload = payload?.payload?.userPayload;
    },
    userNumber: (state, payload) => {
      
      state.mobileNumber = payload?.payload?.mobileNumber;
    },
  },
});

// Action creators are generated for each case reducer function
export const { IsSignOut,UserToken, IsSignIn, IsRestoreToken, IsTempVar, userPayload,userNumber } =  authSlice.actions;

export default authSlice.reducer;
