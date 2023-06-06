import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { User } from 'src/models/User';

interface HttpResponse<T> extends AxiosResponse {
  parsedBody?: T;
}

const AuthenticationService = () => {
  const localhost = process.env.REACT_APP_API_URL; 
  const [token, setToken] = useState<string | null>(null);
  const [loggedInUsername, setLoggedInUsername] = useState<string | null>(null);

  useEffect(() => {
    loadTokenFromLocalStorage();
  }, []);

  const login = async (user: User): Promise<HttpResponse<User>> => {
    try {
      const response = await axios.post<User>(`${localhost}/user/login`, user, { headers: { 'Content-Type': 'application/json' } });
      return {
        ...response,
        parsedBody: response.data,
      };
    } catch (error) {
      return error.response;
    }
  };

  const register = async (user: User): Promise<User> => {
    try {
      const response = await axios.post<User>(`${localhost}/user/register`, user, { headers: { 'Content-Type': 'application/json' } });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

  const logout = (): void => {
    setToken(null);
    setLoggedInUsername(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('users');
  };

  const addUserToCache = (user: User): void => {
    localStorage.setItem('user', JSON.stringify(user));
  };

  const getUserFromCache = (): User | null => {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  };

  const loadTokenFromLocalStorage = (): void => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  };

  const getToken = (): string | null => {
    return token;
  };

  const saveToken = (token: string): void => {
    setToken(token);
    localStorage.setItem('token', token);
  };

  const isUserLoggedIn = (): boolean => {
    if (token !== null && token !== '') {
      try {
        // Split the token to get the payload
        const tokenParts = token.split('.');
        if (tokenParts.length === 3) {
          const payloadBase64 = tokenParts[1];
          const payloadJson = Buffer.from(payloadBase64, 'base64').toString('utf-8');
          const decodedToken = JSON.parse(payloadJson);

          if (decodedToken.sub != null || '') {
            if (decodedToken.exp && Date.now() / 1000 > decodedToken.exp) {
              setLoggedInUsername(decodedToken.sub);
            }
          }
        } else {
          console.error('Invalid token format');
          return false;
        }
      } catch (error) {
        console.error('Invalid token:', error);
      }
    } else {
      logout();
      return false;
    }
    return true;
  };

  return {
    login,
    register,
    logout,
    addUserToCache,
    getUserFromCache,
    getToken,
    saveToken,
    isUserLoggedIn,
    loadTokenFromLocalStorage
  };
};

export default AuthenticationService;
