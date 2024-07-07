// src/components/Header.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ isLoggedIn, user, setIsLoggedIn, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser({ name: '' });
    navigate('/login');
  };

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl"><Link to="/">Linkly</Link></h1>
      <nav>
        {isLoggedIn ? (
          <>
            <span className="mr-4">Welcome, {user.name}</span>
            <button onClick={handleLogout} className="bg-red-500 p-2 rounded">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4">Login</Link>
            <Link to="/register" className="bg-green-500 p-2 rounded">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
