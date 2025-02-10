import {createSlice} from '@reduxjs/toolkit';
import {filterState, paymentState} from '../state/initialState';

export const fitlerSlice = createSlice({
  name: 'counter',
  initialState: {
    ...filterState,
  },
  reducers: {
     CourseName:(state,{payload})=>{
          state.courseName=payload;
     },
    CourseCode:(state,{payload})=>{
            state.courseCode=payload
    },
    Department:(state,{payload})=>{
        state.department=payload
    },
    UniversityData:(state,{payload})=>{
        state.university=payload
    },
    InstructorData:(state,{payload})=>{
        state.instructor=payload
    },
    RatingData:(state,{payload})=>{
      state.rating=payload
  },
    
    

  },
});

export const {InstructorData,CourseCode,CourseName,Department,UniversityData,RatingData} = fitlerSlice.actions;

export default fitlerSlice.reducer;
