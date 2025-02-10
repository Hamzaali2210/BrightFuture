import axios from 'axios';
import {API_URL_2} from './urls';
import React from 'react';
import RNSecureStorage, {ACCESSIBLE} from 'rn-secure-storage';
import {store} from '../redux/store';
import { Alert } from 'react-native';
import { userPayload, UserToken } from '../redux/slice/authSlice';

const api = axios.create({
  baseURL: API_URL_2,
  headers: {
    'Content-Type': 'application/json', // Adjust content type based on your API requirements
    // Other headers if needed
  },
});

export const getToken = async () => {
  try {
    const token = await RNSecureStorage.getItem('token');
    return token;
  } catch (error) {
    console.error('Error retrieving token:', error);
    // throw error;
  }
};

api.interceptors.request.use(
  async function (config) {
    // Do something before request is sent

    console.log(config?.baseURL+config?.url, config.data,"request ++++++");
    

    const token = await getToken();
    if (token) {
      console.log(token, "token token token ");
      config.headers.Authorization = `Bearer ${token}`;
      
    }
    return config;
  },
  function (error) {
    console.log(error,"request ++++++");
    // Do something with request error
    return Promise.reject(error);
    
  },
);

// Add a response interceptor
api.interceptors.response.use(
  async function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    console.log("response ++++++",response.config.baseURL+response.config.url,response?.data);
    

    if (response?.status === 200 && response?.data?.authorization) {
      const responseKey = await RNSecureStorage.setItem(
        'token',
        response?.data?.authorization?.token,
        {
          accessible: ACCESSIBLE.WHEN_UNLOCKED,
        },
      );
    }
    return response;
  },
  async function (error) {

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error ,
   
    
    

    // data outside of 2XX will go into the error->response object so handle all your error in here.
    if (error?.response?.status === 401 || error?.response?.data) {
      const errorMessage = error?.response?.data?.message;
      const errorType  = error?.response?.data?.error_type;
      if(errorType){
        return Promise.reject(JSON.stringify(error?.response?.data));
      }  

      try {
        const token = await RNSecureStorage.getItem('token');
        if (error?.response?.status === 401) {
          await RNSecureStorage.removeItem('token');
          await RNSecureStorage.removeItem('userData');
          store.dispatch(userPayload({userPayload:null}))
          store.dispatch(UserToken({token:null}))
          
         
        }
      } catch (error) {
        return Promise.reject(errorMessage || 'Unauthorized');
      }
    
      return Promise.reject(error?.response?.data?.message || 'Unauthorized');
    }

    
    
    return Promise.reject(error?.response?.data?.message);
  },
);

export default api;
