import React from 'react';
import './Navbar.css';
// import Predictor from '../../Images/Predictor.gif'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <a href='/'>
            <span>P</span>
            <span>R</span>
            <span>E</span>
            <span>D</span>
            <span>i</span>
            <span>C</span>
            <span>T</span>
            <span>O</span>
            <span>R</span>
          </a>
        </div>
        <div className="navbar-right">
          <a href="dijf">Offers</a>
          <a href="sjdn">Contact</a>
          <a href="/about">About</a>
          <a href="sdkfnh">Features</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
