import axios from 'axios';
import { API_URL } from './constants';

export const addInterceptors = (store) => {
  axiosApi.interceptors.request.use((config) => {
    const { url } = config;
    const isSignIn = url?.includes('/token');
    if (!isSignIn) {
      const { token } = store.getState().userState.user;
      const headers = config.headers;
      headers.set('Authorization', `Bearer ${token}`);
    }
    return config;
  });
};

const axiosApi = axios.create({
  baseURL: API_URL,
});

export default axiosApi;
