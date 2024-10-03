import axios from 'axios';

export const axiosInstance = axios.create({
        baseURL: 'https://casamento.savinnsk.com/', 
        timeout: 5000,
    });
