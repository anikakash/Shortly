import React from 'react';
import './navBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Shortly</div>
      <div className="navbar-buttons">
        <button className="navbar-button">Login</button>
        <button className="navbar-button">About Me</button>
      </div>
    </nav>
  );
};

export default NavBar;
