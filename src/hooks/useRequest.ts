import axios from 'axios';
import useToast from 'components/Toast/useToast';
import config from 'config';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const TOKEN_WHITELIST = ['/auth/login', '/auth/signup'];

const useRequest = () => {
  const navigate = useNavigate();
  const [toast] = useToast()

  const request = useMemo(() => {
    const instance = axios.create({
      baseURL: config.baseurl,
    });

    instance.interceptors.request.use((config) => {
      const token = localStorage.getItem('lanting-token');

      if (token && config.url && !TOKEN_WHITELIST.includes(config.url)) {
        config.headers!.Authorization = 'Bearer ' + token;
      }

      return config;
    });

    instance.interceptors.response.use(
      (response) => {
        return response.data;
      },
      (error) => {
        toast(error?.response?.data?.message || error?.message)

        if (error?.response?.status === 401) {
          localStorage.setItem('lanting-token', '')
          navigate('/login');
        }

        return Promise.reject(error?.response?.data);
      }
    );

    return instance;
  }, [navigate]);

  return [request];
};

export default useRequest;
