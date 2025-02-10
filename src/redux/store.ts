import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import cartReducer from './slice/cartSlice';
import tagReducer from './slice/tagSlice';
import couponReducer from './slice/couponSlice';
import chapterReducder from './slice/chapterSlice';
import loaderReducer from './slice/loaderSlice'
import filterReducer from './slice/filterSlice'
import apiReducer from './slice/apiSlice';



export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    tag: tagReducer,
    filter:filterReducer,
    coupon : couponReducer,
    chapter: chapterReducder,
    loaderReducer,
    apiCall:apiReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  })

});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
