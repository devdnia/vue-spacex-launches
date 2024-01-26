import axios from 'axios';

const API_URL = 'http://localhost:3001';

export const authService = {
  login: async (username, password) => {
    const response = await axios.post(`${API_URL}/users`, { "email": username, "password": password });
    console.log("USUARIO", username, password );
    const token  = await response.data;
    console.log("AUTH token ", token);
    await localStorage.setItem('token', JSON.stringify(token));
    return token;
  },
  register: async ( email, name, lastname, password) => {
    const response = await axios.post(`${API_URL}/register`, { "email": email, "name": name, "lastname": lastname, "password": password });
    const token  = await response.data;
    await localStorage.setItem('token', JSON.stringify(token));
    return token;
  },
  logout: () => {
    localStorage.removeItem('token');
  },
  getToken: () => {
    return localStorage.getItem('token');
  },
};
