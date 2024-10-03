import React, { useState } from 'react';
import './index.css'; // Importando o CSS
import { createGifts } from '../../service/gifts-service';

export function CreateGift() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isAvaliable, setIsAvailable] = useState(false);
    const [userId, setUserId] = useState<string | undefined>(undefined);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const giftData = {
            name,
            description,
            isAvaliable,
            userId,
        };

        try {
            const result = await createGifts(giftData);
            console.log(result);
            setSuccess('Presente criado com sucesso!');
            setName('');
            setDescription('');
            setIsAvailable(false);
            setUserId(undefined);
            setError(null);
        } catch (err) {
            setError('Erro ao criar presente.');
            setSuccess(null);
        }
    };

    return (
        <div className="form-container">
            <h2 className="form-title">Adicionar Presente</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nome do Presente:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Descrição:</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="form-group checkbox-group">
                    <label>
                        <input
                            type="checkbox"
                            checked={isAvaliable}
                            onChange={(e) => setIsAvailable(e.target.checked)}
                        />
                        <p> Disponível</p>
                    </label>
                </div>
          
                <button type="submit" className="submit-button">Criar Presente</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
        </div>
    );
}
