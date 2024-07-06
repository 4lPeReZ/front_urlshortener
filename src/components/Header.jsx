// src/components/Header.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { handleLogout } from '../handlers/authHandlers';

const Header = ({ isLoggedIn, user, setIsLoggedIn, setUser }) => {
  const navigate = useNavigate();

  return (
    <header className="bg-blue-600 p-4 text-white flex justify-between items-center">
      <h1 className="text-2xl">Linkly</h1>
      <nav className="flex items-center">
        {isLoggedIn ? (
          <>
            <span className="mr-4">Welcome, {user.name}</span>
            <button onClick={() => handleLogout(setIsLoggedIn, setUser, navigate)} className="mr-4">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
