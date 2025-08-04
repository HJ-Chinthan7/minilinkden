import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import '../styles/Navbar.css';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="nav-logo">
          <span className="logo-text">MiniLinkedIn</span>
        </Link>

        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          {user ? (
            <>
              <Link to="/public-feed" className="nav-link">
                <i className="nav-icon">📰</i>
                Feed
              </Link>
              <Link to={`/profile/${user?.id || ''}`} className="nav-link">
                <i className="nav-icon">👤</i>
                Profile
              </Link>
              <button onClick={handleLogout} className="nav-link logout-btn">
                <i className="nav-icon">🚪</i>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                <i className="nav-icon">🔑</i>
                Sign In
              </Link>
              <Link to="/register" className="nav-link signup-btn">
                <i className="nav-icon">📝</i>
                Sign Up
              </Link>
            </>
          )}
        </div>

        <div className="hamburger" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
