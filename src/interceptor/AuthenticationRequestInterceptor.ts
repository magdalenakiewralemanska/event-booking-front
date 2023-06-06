import { useEffect } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import AuthenticationService from 'src/services/AuthenticationService';


const AuthenticationRequestInterceptor = (request: AxiosRequestConfig): AxiosRequestConfig => {
  const authenticationService = AuthenticationService();
  const localhost = process.env.REACT_APP_API_URL;

  if (request.url?.includes(`${localhost}/user/login`)) {
    return request;
  }

  if (request.url?.includes(`${localhost}/user/register`)) {
    return request;
  }

  authenticationService.loadTokenFromLocalStorage();
  const token = authenticationService.getToken();
  const headers = { ...request.headers, Authorization: `Bearer ${token}` };
  const updatedRequest = { ...request, headers };

  useEffect(() => {
    if (!authenticationService.isUserLoggedIn()) {
      axios.post('/login');
    }
  }, []);

  return updatedRequest;
};

export default AuthenticationRequestInterceptor;
