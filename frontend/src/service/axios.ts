import axios from 'axios';

export const axiosInstance = axios.create({
        baseURL: 'http://18.188.156.208:3002', 
        timeout: 5000,
    });
