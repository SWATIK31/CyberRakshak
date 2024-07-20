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
        <ul className="header-container">
          <li><Link to="/" onClick={(event) => scrollToSection('hero', event)}>Home</Link></li>
          <li><Link to="/" onClick={(event) => scrollToSection('quiz', event)}>Quiz</Link></li>
          <li><Link to="/" onClick={(event) => scrollToSection('articles', event)}>Articles</Link></li>
          <li><Link to="/" onClick={(event) => scrollToSection('safety-tips', event)}>Safety Tips</Link></li>
          <li><Link to="/" onClick={(event) => scrollToSection('resources', event)}>Resources</Link></li>
          <li><Link to="/" onClick={(event) => scrollToSection('Blog', event)}>Blog</Link></li>
        </ul>
        <Link className="login-btn" to="/login">Login</Link>
      </nav>
    </header>
  );
}

export default Header;
