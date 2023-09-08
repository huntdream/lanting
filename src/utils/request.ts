import axios from 'axios';
import config from 'config';

const request = axios.create({
  baseURL: config.baseurl,
});

const TOKEN_WHITELIST = ['/auth/login', '/auth/signup'];

request.interceptors.request.use((config) => {
  const token = localStorage.getItem('lanting-token');

  if (token && config.url && !TOKEN_WHITELIST.includes(config.url)) {
    config.headers!.Authorization = 'Bearer ' + token;
  }

  return config;
});

request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error?.response?.data || { message: error.message });
  }
);

export default request;
