import axios from 'axios';

export const axiosInstance = axios.create({
        baseURL: 'http://127.0.0.1:3002', 
        timeout: 2000,
    });
