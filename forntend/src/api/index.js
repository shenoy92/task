import axios from 'axios';

import Auth from "../common/helper/auth";

const API = axios.create({ baseURL: 'https://task-app-profile.herokuapp.com/user'});

API.interceptors.request.use((req) => {
  const token = Auth.getAuthToken();
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const loginApi = (data) => API.post('/login', data);
export const registerationApi = (data) => API.post('/registration', data);
export const profileDataApi = () => API.get('/');