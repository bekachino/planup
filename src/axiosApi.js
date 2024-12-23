import axios from 'axios';
import { API_URL } from './constants';
import { logout } from './features/user/usersSlice';

export const addInterceptors = (store) => {
  axiosApi.interceptors.request.use((config) => {
    const { url } = config;
    const isSignIn = url?.includes('/token');
    if (!isSignIn) {
      const token = store.getState().userState.user?.token;
      if (!!token) {
        const headers = config.headers;
        headers.set('Authorization', `Bearer ${token}`);
      }
    }
    return config;
  });

  axiosApi.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response) {
        if (error.response.status === 401) {
          const dispatch = store.dispatch;
          dispatch(logout());
        }
      }
      return Promise.reject(error);
    }
  );
};

const axiosApi = axios.create({
  baseURL: API_URL,
});

export default axiosApi;
