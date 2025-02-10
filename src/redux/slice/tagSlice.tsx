import {createSlice} from '@reduxjs/toolkit';
import {tagData} from '../state/initialState';

export const tagSlice = createSlice({
  name: 'counter',
  initialState: {
    ...tagData,
  },
  reducers: {
    IsWishlistTagData: (state, {payload}) => {
      state.wishlistTag=payload.tag
    },

    IsRecording:(state,{payload})=>{
      
      state.userRecording=payload.userRecording
    }
   
  },
});

export const {IsWishlistTagData,IsRecording} = tagSlice.actions;

export default tagSlice.reducer;
