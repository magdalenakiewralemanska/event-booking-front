import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ACCESS_TOKEN } from 'src/constants/constants';

export const authorizedApi = axios.create();

export function withAxiosInterceptor<T extends JSX.IntrinsicAttributes>(
  Component: React.ComponentType<T>
) {
  return function AxiosInterceptor(props: T) {
    const navigate = useNavigate();
    const [isInitialized, setIsInitialized] = useState<boolean>(false);
    useEffect(() => {
      axios.interceptors.request.use((config) => {
        return {
          ...config,
          baseURL: process.env.REACT_APP_API_URL
        };
      });

      authorizedApi.interceptors.request.use((config) => {
        if (config.headers) {
          config.headers['Authorization'] = `Bearer ${localStorage.getItem(
            ACCESS_TOKEN
          )}`;
        }
        return {
          ...config,
          baseURL: process.env.REACT_APP_API_URL
        };
      });
      authorizedApi.interceptors.response.use(
        (response: AxiosResponse) => response.data,
        (error) => {
          if (error.response.status === 403) {
            navigate('/user/login');
            return Promise.resolve();
          }
          return Promise.reject(error);
        }
      );
      setIsInitialized(true);
    }, []);

    return isInitialized ? <Component {...props} /> : <></>;
  };
}
