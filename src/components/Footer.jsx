import React from 'react';
import { FaGithub, FaInstagram, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../styles/App.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
        
        <div className="footer-content">
          <h4>About</h4>
          <ul>
            <li><Link to="/about">Our Story</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
          </ul>
        </div>

        <div className="footer-content">
          <h4>Follow Us</h4>
          <ul style={{ display: 'flex', gap: '20px', paddingLeft: 0 }}>
            <li>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" style={{ fontSize: '20px' }}>
                <FaTwitter />
              </a>
            </li>
            <li>
              <a href="https://github.com" target="_blank" rel="noreferrer" style={{ fontSize: '20px' }}>
                <FaGithub />
              </a>
            </li>
            <li>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ fontSize: '20px' }}>
                <FaInstagram />
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-content">
          <h4>NamaWeb</h4>
          <p style={{ color: '#bbbbbb', fontSize: '14px', lineHeight: '1.6' }}>
            Building the web, one pixel at a time. <br />
            &copy; {new Date().getFullYear()} NamaWeb. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
