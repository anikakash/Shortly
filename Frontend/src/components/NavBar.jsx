import React, { useState } from 'react';
import './navBar.css';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">Shortly</div>
      <div className="menu-toggle" onClick={toggleMenu}>
        <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
        <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
        <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
      </div>
      <div className={`navbar-buttons ${menuOpen ? 'open' : ''}`}>
        <button className="navbar-button">Login</button>
        <button className="navbar-button">About Me</button>
      </div>
    </nav>
  );
};

export default NavBar;
