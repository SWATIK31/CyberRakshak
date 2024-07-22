import React, { useState } from 'react';
import { useAuth } from '../context/authContext.jsx';
import { doSignInWithEmailAndPassword } from '../config/FirebaseAuth';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { FaUser, FaLock } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const userCredential = await doSignInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      login(user);
      toast.success('Logged in successfully!');
      navigate('/dashboard');
    } catch (error) {
      setError('Failed to log in. Please check your credentials.');
      console.error('Login error:', error);
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
      <ToastContainer />
    </div>
  );
}

export default Login;