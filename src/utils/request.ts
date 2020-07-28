import axios from 'axios';
import config from 'config';
import history from './history';

const request = axios.create({
  baseURL: config.baseurl,
});

const TOKEN_WHITELIST = ['/auth/signin', '/auth/signup'];

request.interceptors.request.use((config) => {
  const token = localStorage.getItem('lanting-token');

  if (token && config.url && !TOKEN_WHITELIST.includes(config.url)) {
    config.headers.Authorization = 'Bearer ' + token;
  }

  return config;
});

request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.log(error.response);
    if (error?.response?.status === 401) {
      history.push('/signin');
    }
    return Promise.reject(error?.response?.data);
  }
);

export default request;
