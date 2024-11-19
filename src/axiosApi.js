import axios from 'axios';
import { apiUrl } from './constants';

export const addInterceptors = (store) => {
  //axiosApi.interceptors.request.use((config) => {
  //  const { url } = config;
  //  const isSignIn = url?.includes('/token');
  //  if (!isSignIn) {
  //    const { access } = store.getState().userState.user;
  //    const headers = config.headers;
  //    headers.set('Authorization', `Bearer ${access}`);
  //  }
  //  return config;
  //});
};

const axiosApi = axios.create({
  baseURL: apiUrl,
});

export default axiosApi;
