import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext.jsx';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/Firebase.js';
import './Header.css';
import logo from '../assets/logo.png';

function Header() {
  const { currentUser, userLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [userInitials, setUserInitials] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser && currentUser.uid) {
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          if (userData.name) {
            setUserInitials(userData.name.charAt(0).toUpperCase());
          }
        }
      }
    };

    fetchUserData();
  }, [currentUser]);

  const handleProfileClick = () => {
    if (userLoggedIn) {
      navigate('/dashboard');
    }
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <div className="logo">
        <Link to="/"><img src={logo} alt="Logo" /></Link>
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <nav className={isMenuOpen ? 'open' : ''}>
        {userLoggedIn ? (
          <div className="user-profile" onClick={handleProfileClick}>
            <div className="profile-icon">
              {userInitials || 'U'}
            </div>
          </div>
        ) : (
          <Link className="login-btn" to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
        )}
      </nav>
    </header>
  );
}

export default Header;