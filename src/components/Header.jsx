import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext.jsx';
import './Header.css';
import logo from '../assets/logo.png';

function Header() {
  const { currentUser, userLoggedIn } = useAuth();
  const navigate = useNavigate(); // For programmatic navigation

  // Function to handle profile icon click
  const handleProfileClick = () => {
    if (userLoggedIn) {
      navigate('/dashboard');
    }
  };

  return (
    <header>
      <div className="logo">
        <Link to="/"><img src={logo} alt="Logo" /></Link>
      </div>
      <nav>
        {userLoggedIn ? (
          <div className="user-profile" onClick={handleProfileClick}>
            <div className="profile-icon">
              {currentUser?.displayName ? currentUser.displayName.charAt(0).toUpperCase() : 'U'}
            </div>
          </div>
        ) : (
          <Link className="login-btn" to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
}

export default Header;