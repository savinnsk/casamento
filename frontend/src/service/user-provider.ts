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