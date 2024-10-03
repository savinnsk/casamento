import { showUserGiftsService } from "../../service/gifts-service";
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


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
      
         const result = await showUserGiftsService({phone : id});
       
        setShowUserGifts(result.data)   
        
    };

    return (
        <div className="user-card">
            <h3>{name}</h3>
            <p>Telefone: {phone}</p>
            <p>Status: {isConfirmed ? 'Confirmado' : 'Não Confirmado'}</p>
           { ( (showUserGifts && showUserGifts.user?.id == id)  ? <>{showUserGifts.userGifts.map((item: any)=>{

        return <p>{item.name}</p>
           })}</> : (<button onClick={handleSubmit}> Presentes</button>) ) }
 
        </div>
    );
};
