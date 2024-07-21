import React, { useState } from 'react';
import './Login.css';
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { doSignInWithEmailAndPassword } from "../config/FirebaseAuth";

const Login = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await doSignInWithEmailAndPassword(email, password);
      if (onSuccess) onSuccess();
      navigate('/');
    } catch (error) {
      setError('Failed to log in. Please check your credentials.');
      console.error("Login error:", error);
    }
  };

  return (
    <div className='wrapper'>
      <div className='form-box login'>
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          {error && <p className="error-message">{error}</p>}
          <div className="input-box">
            <input 
              type="email" 
              placeholder='Email' 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FaUser className='icon' />
          </div>
          <div className="input-box">
            <input 
              type="password" 
              placeholder='Password' 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FaLock className='icon'/>
          </div>
          <button type='submit'>Login</button>
          <div className="register-link">
            <p>Don't have an account? <span onClick={() => navigate('/register')}>Register Now</span></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;