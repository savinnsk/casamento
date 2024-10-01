import axios from "axios";
import { axiosInstance } from "./axios"

export async function getGiftsAvailable() {
    try {
        const response = await axiosInstance.get('/gifts'); 
        return response.data; 
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Erro ao fazer login');
        } else {
            throw new Error('Erro desconhecido');
        }
    }
}

export async function sendGifts( data : {gifts : any, user:any} ) {
    try {
        const response = await axiosInstance.post('/gifts/send',data); 
        return response.data; 
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Erro ao fazer login');
        } else {
            throw new Error('Erro desconhecido');
        }
    }
}

export async function  getUserGiftsAvailable( data : { user:any} ) {
    try {
        const response = await axiosInstance.post('/gifts/user',data); 
       
        return response.data; 
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Erro ao fazer login');
        } else {
            throw new Error('Erro desconhecido');
        }
    }
}


export async function cancelGifts( data : {gifts : any, user:any} ) {
    try {
        const response = await axiosInstance.post('/gifts/cancel',data); 
        console.log("respnse", response)
        return response.data; 
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Erro ao fazer login');
        } else {
            throw new Error('Erro desconhecido');
        }
    }
}
