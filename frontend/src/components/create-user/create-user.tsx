import React, { useState } from 'react';
import { create } from '../../service/user-provider';
import './index.css'; // Importando o CSS
import * as Yup from 'yup';


const celularRegex = /^\(\d{2}\) \d{5}-\d{4}$/;

const schema = Yup.object().shape({
    celular: Yup.string()
      .matches(celularRegex, 'Número de celular inválido. Use o formato (xx) xxxxx-xxxx')
      .required('O número de celular é obrigatório.'),
  });

export function CreateUser() {
    const [name, setName] = useState('');
   // const [phone, setPhone] = useState('');
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [userGifts, setUserGifts] = useState<number | undefined>(undefined);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [celular, setCelular] = useState('');
  

    const formatarCelular = (value : any) => {
        if (value.length <= 2) return `(${value}`;
        if (value.length <= 7) return `(${value.slice(0, 2)}) ${value.slice(2)}`;
        return `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
    };

    const handleInputChange = (e: any) => {
        const input = e.target.value;
        const apenasNumeros = input.replace(/\D/g, '');
        const formatted = formatarCelular(apenasNumeros);
        setCelular(formatted);
    }



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        await schema.validate({ celular });
        const cleanedPhone = celular.replace(/\D/g, '');
        
        const userData = {
            name,
            phone : cleanedPhone,
            isConfirmed,
            userGifts,
        };

        try {
            const result = await create(userData);
            console.log(result);
            setSuccess('Usuário criado com sucesso!');
            setName('');
            setCelular('');
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
                        value={celular}
                        onChange={handleInputChange}
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
