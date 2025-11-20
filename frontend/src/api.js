import axios from 'axios';


const API = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'https://noteapp-h0j3.onrender.com' });


API.interceptors.request.use((config) => {
const token = localStorage.getItem('token');
if (token) config.headers.Authorization = `Bearer ${token}`;
return config;
});


export default API;