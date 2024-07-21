import React from 'react';
import { Link } from 'react-router-dom';
import './Help.css';

const HelpSection = () => {
    return (
        <section className="victim-section">
          <h2 className="victim-question">Are you a victim?</h2>
          <div className="icon-container">
            <Link to="https://cybercrime.gov.in/Webform/Accept.aspx" className="icon-link">
              <i className="fas fa-female"></i>
              <span>Women/Children Online Abuse</span>
            </Link>
            <Link to="https://cybercrime.gov.in/Webform/Accept.aspx" className="icon-link">
              <i className="fas fa-credit-card"></i>
              <span>Online Transaction Fraud</span>
            </Link>
            <Link to="https://cybercrime.gov.in/Webform/Accept.aspx" className="icon-link">
              <i className="fas fa-mask />"></i>
              <span>Other Fraud</span>
            </Link>
          </div>
          <p className='helppara'>Visit these links for help</p>
        </section>
      );
};

export default HelpSection;