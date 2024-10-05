import { useStore } from "../../hooks/store";
import { showUserGiftsService } from "../../service/gifts-service";
import { deleteUser } from "../../service/user-provider";
import "./index.css"
import React, { useState } from 'react';

interface UserCardProps {
    id: string;
    name: string;
    phone: string;
    isConfirmed: boolean;
}

export const UserCard: React.FC<UserCardProps> = ({ id, name, phone, isConfirmed }) => {

    const [showUserGifts, setShowUserGifts] = useState<any>([]);
    const { setUsers} = useStore();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
      
         const result = await showUserGiftsService({phone : id});
        console.log("presentes usuarios",result)
        setShowUserGifts(result.data)   
        
    };


    
    const handleSubmitDelete = async (e: React.FormEvent) => {
        e.preventDefault();
      
         const result = await deleteUser({user : id});

         if(result?.data?.users){
            setUsers(result?.data?.users)
         }
        console.log("usuario deletado",result)  
        
    };

    return (
        <div className="user-card">
            <h3>{name}</h3>
            <p>Telefone: {phone}</p>
            <p>Status: {isConfirmed ? 'Confirmado' : 'Não Confirmado'}</p>
           { ( (showUserGifts && showUserGifts.user?.id == id)  ? <>{showUserGifts.userGifts.map((item: any)=>{

        return <p>{item.name}</p>
           })}</> : (<> <button onClick={handleSubmit}> Presentes</button> <button onClick={handleSubmitDelete}> Remover</button> </> ) ) }
 
        </div>
    );
};
