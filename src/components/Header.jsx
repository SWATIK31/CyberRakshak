import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../assets/logo.png';

function Header() {
  const scrollToSection = (sectionId, event) => {
    event.preventDefault(); // Prevent default link behavior
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header>
      <div className="logo">
        <Link to="/"><img src={logo} alt="Logo" /></Link>
      </div>
      <nav>
        <Link className="login-btn" to="/login">Login</Link>
      </nav>
    </header>
  );
}

export default Header;
