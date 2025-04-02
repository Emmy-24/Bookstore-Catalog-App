import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (onLogin) {
            onLogin({ email, password });
        }

        navigate('/dashboard'); 
    };
    return (
        <div>
            <h1>Login</h1>
        </div>
    );
}


export default Login