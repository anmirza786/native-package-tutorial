import axios from 'axios';
import {API_URL} from './config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ToastAndroid} from 'react-native';

const axiosInitialization = () => {
  axios.defaults.baseURL = API_URL;
  axios.interceptors.request.use(
    async config => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers.Authorization = 'Bearer ' + token;
      }
      // config.headers['Content-Type'] = 'application/json';
      return config;
    },
    error => {
      Promise.reject(error);
    },
  );
  axios.interceptors.response.use(
    response => response.data,
    error => {
      if (error?.response?.status === 401) {
        // Unauthorized user, token expired, etc.
        AsyncStorage.clear();
      } else if (error.message === 'Network Error' && !error.response) {
        ToastAndroid.show(
          "It seems like you're currently offline. Please check your internet connection.",
          ToastAndroid.LONG,
        );
      } else {
        if (!(axios.isCancel(error) || error.code === 'ECONNABORTED')) {
          ToastAndroid.show(
            'Oops! Something unexpected happened.',
            ToastAndroid.LONG,
          );
        }
      }
      return Promise.reject(error);
    },
  );
};

export default axiosInitialization;
