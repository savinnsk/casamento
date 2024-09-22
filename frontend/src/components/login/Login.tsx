import { useState } from 'react';
import './index.css'
import * as Yup from 'yup';

const celularRegex = /^\(\d{2}\) \d{5}-\d{4}$/;

const schema = Yup.object().shape({
    celular: Yup.string()
      .matches(celularRegex, 'Número de celular inválido. Use o formato (xx) xxxxx-xxxx')
      .required('O número de celular é obrigatório.'),
  });

export function Login(){
    const [celular, setCelular] = useState('');
    const [errors, setErrors] = useState('');

    const handleInputChange = (e: any) => {
        const input = e.target.value;
        const apenasNumeros = input.replace(/\D/g, '');
        const formatted = formatarCelular(apenasNumeros);
        setCelular(formatted);
    }

    const handleSubmit = async (e : any) => {
        e.preventDefault();
        try {
            await schema.validate({ celular });
            console.log('Validação bem-sucedida!');
            setErrors('');
        } catch (err : any) {
            setErrors(err.errors[0]); 
        }
    };

    const formatarCelular = (value : any) => {
        if (value.length <= 2) return `(${value}`;
        if (value.length <= 7) return `(${value.slice(0, 2)}) ${value.slice(2)}`;
        return `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
    };


    return (
        <div className="LoginContainer">
            <form onSubmit={handleSubmit}>
                <div>
                    Celular: 
                    <input 
                        type="text" 
                        value={celular} 
                        onChange={handleInputChange} 
                    />
                </div>
                {errors && <div className="error">{errors}</div>}
                <button type="submit">Enviar</button>
            </form>
        </div>
    );


}