import React from 'react';
import './Navbar.css';
// import Predictor from '../../Images/Predictor.gif'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <img src='ljj' alt="Logo" className="logo" />
        </div>
        <div className="navbar-right">
          <a href="dijf">Offers</a>
          <a href="sjdn">Contact</a>
          <a href="ksdnh">About</a>
          <a href="sdkfnh">Features</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
