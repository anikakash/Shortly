import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        Made by 
        <a
          href="https://www.linkedin.com/in/anikakash/"
          target="_blank"
          className="footer-link-left"
          >
          anikakash
        </a>
        </div>
      <div className="footer-right">
        <a
          href="https://github.com/anikakash/urlShortner"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          Star on GitHub
        </a>
      </div>
    </footer>
  );
};

export default Footer;
