import axios from "axios";
import { axiosInstance } from "./axios"

interface UserLogin{
    phone : string
}

export async function LoginUser(data: UserLogin) {
    try {
        const response = await axiosInstance.post('/users/login', data); 
        return response.data; 
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Erro ao fazer login');
        } else {
            throw new Error('Erro desconhecido');
        }
    }
}

export async function create(data: any) {
    try {
        const response = await axiosInstance.post('/users', data); 
        return response.data; 
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Erro para criar');
        } else {
            throw new Error('Erro desconhecido');
        }
    }
}



export async function getUsers() {
    try {
        const response = await axiosInstance.get('/users/all'); 
        return response.data; 
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Erro para pegar usuarios');
        } else {
            throw new Error('Erro desconhecido');
        }
    }
}


export async function ConfirmUserPresence(phone: { phone : string}) {
    try {
        const response = await axiosInstance.put(`/users/confirm?phone=${phone.phone}`); 
        return response.data; 
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Erro to confirm');
        } else {
            throw new Error('Erro desconhecido');
        }
    }
}

export async function deleteUser(user :any) {
    try {
        const response = await axiosInstance.post('/users/delete',user); 
        return response.data; 
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Erro ao fazer login');
        } else {
            throw new Error('Erro desconhecido');
        }
    }
}

