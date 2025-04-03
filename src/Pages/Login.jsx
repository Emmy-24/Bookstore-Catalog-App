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

        navigate('/shop'); 
    };
    return (
        <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">
            Log In
          </button>
        </form>
        <div>
          <p>Yet to have an account?</p>
          <button onClick={() => navigate('/signup')}>SignUp Here</button>   
        </div>
      </div>
    );
}


export default Login