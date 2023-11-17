import React from 'react';
import './Navbar.css';


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
          <a href="/offers">Offers</a>
          <a href="/contact">Contact</a>
          <a href="/about">About</a>
          <a href="/predict">Predict</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
