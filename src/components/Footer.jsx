import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faQuestionCircle, faNewspaper, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h2>About Us</h2>
          <p>We are committed to educating users on cybersecurity best practices through interactive quizzes, tutorials, and real-world scenarios.</p>
        </div>
        <div className="footer-section links">
          <h2>Quick Links</h2>
          <ul>
            <li><a href="#hero"><FontAwesomeIcon icon={faHome} />Home</a></li>
            <li><a href="#quiz"><FontAwesomeIcon icon={faQuestionCircle} /> Quiz</a></li>
            <li><a href="#articles"><FontAwesomeIcon icon={faNewspaper} /> Articles</a></li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h2>Contact Us</h2>
          <p><FontAwesomeIcon icon={faEnvelope} /> Email: support@example.com</p>
          <p><FontAwesomeIcon icon={faPhone} /> Phone: (123) 456-7890</p>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; 2024 CyberRakshak | All Rights Reserved
      </div>
    </footer>
  );
}

export default Footer;