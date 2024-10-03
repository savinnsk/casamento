import React, { useState } from 'react';
import { create } from '../../service/user-provider';
import './index.css'; // Importando o CSS

export function CreateUser() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [userGifts, setUserGifts] = useState<number | undefined>(undefined);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const userData = {
            name,
            phone,
            isConfirmed,
            userGifts,
        };

        try {
            const result = await create(userData);
            console.log(result);
            setSuccess('Usuário criado com sucesso!');
            setName('');
            setPhone('');
            setIsConfirmed(false);
            setUserGifts(undefined);
            setError(null);
        } catch (err) {
            setError('Erro ao criar usuário.');
            setSuccess(null);
        }
    };

    return (
        <div className="form-container">
            <h2 className="form-title">Adicionar Convidado</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nome:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Telefone:</label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group checkbox-group">
                    <label>
                        <input
                            type="checkbox"
                            checked={isConfirmed}
                            onChange={(e) => setIsConfirmed(e.target.checked)}
                        />
                        <p> Confirmado Presença</p>
                    </label>
                </div>
                <button type="submit" className="submit-button">Criar Usuário</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
        </div>
    );
}
