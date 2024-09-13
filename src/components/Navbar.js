import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <h1>Medicare</h1>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About Us</Link>
        </li>
        <li>
          <Link to="/services">Services</Link>
        </li>
       
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
      <div className="nav-buttons">
        <Link to="/SignIn" className="btn login-btn">SignIn</Link>
        <Link to="/signup" className="btn signup-btn">Sign Up</Link>
      </div>
    </nav>
  );
};

export default Navbar;
