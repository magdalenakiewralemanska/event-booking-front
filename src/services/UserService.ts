import axios, { AxiosResponse } from 'axios';
import { User } from 'src/models/User';

interface HttpErrorResponse extends AxiosResponse<any> {
  data: any;
}

const UserService = {
  localhost: process.env.REACT_APP_API_URL,

  saveUser: async (user: User): Promise<User | HttpErrorResponse> => {
    try {
      const response = await axios.post<User>(`${UserService.localhost}/user/add`, user, { headers: { 'Content-Type': 'application/json' } });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },

  updateUser: async (user: User): Promise<User | HttpErrorResponse> => {
    try {
      const response = await axios.post<User>(`${UserService.localhost}/user/update`, user, { headers: { 'Content-Type': 'application/json' } });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },

  getAllUsers: async (): Promise<User[] | HttpErrorResponse> => {
    try {
      const response = await axios.get<User[]>(`${UserService.localhost}/user/list`);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },

  deleteUser: async (id: number): Promise<AxiosResponse<any> | HttpErrorResponse> => {
    try {
      const response = await axios.delete<AxiosResponse<any>>(`${UserService.localhost}/user/delete/${id}`);
      return response;
    } catch (error) {
      return error.response;
    }
  },

  addUsersToCache: (users: User[]): void => {
    localStorage.setItem('users', JSON.stringify(users));
  },

  getUsersFromCache: (): User[] | null => {
    const usersJson = localStorage.getItem('users');
    return usersJson ? JSON.parse(usersJson) : null;
  },
};

export default UserService;
