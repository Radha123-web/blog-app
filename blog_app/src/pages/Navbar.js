import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Page.css';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');
  const userEmail = localStorage.getItem('email');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="logo">BlogApp</div>
      <div className="nav-links">
        {isLoggedIn ? (
          <>
            <Link to="/" style={{  marginRight: '18px' }}>All Blogs</Link>
            {/* <span style={{ marginRight: '18px' }}>{userEmail}</span> */}
            <span className="user-email" style={{ marginRight: '18px' }}>{userEmail}</span>

            <Link to="/create" style={{  marginRight: '18px' }}>Writing Blogs</Link>
            <span style={{ cursor: 'pointer'}} onClick={handleLogout}>Logout</span>
          </>
        ) : (
          <>
            <Link to="/" style={{  marginRight: '20px' }}>All Blogs</Link>
            <Link to="/login" >Login</Link>
            <Link to="/Signup"><button className="signup-btn" >Sign Up</button></Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
