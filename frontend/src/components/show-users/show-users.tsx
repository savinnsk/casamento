import "./index.css"

import  { useEffect, useState } from 'react';

import { getUsers } from '../../service/user-provider';
import { UserCard } from './user-card';
import { useStore } from "../../hooks/store";

export const UserList = () => {
    const {users, setUsers} = useStore();
    const [error, setError] = useState<string | null>(null);
    

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const result = await getUsers();
                console.log(result)
                setUsers(result.users);
            } catch (err) {
                setError('Erro ao carregar usuários.');
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="user-list">
            <h2>Usuários</h2>
            {error && <p className="error-message">{error}</p>}
            <div className="user-cards">
                {users.map((user : any) => (
                    <UserCard
                        key={user.id}
                        id={user.id}
                        name={user.name}
                        phone={user.phone}
                        isConfirmed={user.isConfirmed}
                    />
                ))}
            </div>
        </div>
    );
};
