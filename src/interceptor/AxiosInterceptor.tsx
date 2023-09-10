import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ACCESS_TOKEN } from 'src/constants/constants';
import { UserContext } from 'src/contexts/UserContext';

export const authorizedApi = axios.create();

export function withAxiosInterceptor<T extends JSX.IntrinsicAttributes>(
  Component: React.ComponentType<T>
) {
  return function AxiosInterceptor(props: T) {
    const navigate = useNavigate();
    const [isInitialized, setIsInitialized] = useState<boolean>(false);
    const { userModifier } = useContext(UserContext);

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
          if (error.response.status === 401) {
            const responseMessage = error.response.data.message;
            if (responseMessage === 'Token expired') {
              localStorage.removeItem(ACCESS_TOKEN);
              userModifier(null);
              navigate('/user/login');
              return Promise.resolve();
            }
            // Handle other unauthorized scenarios
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
