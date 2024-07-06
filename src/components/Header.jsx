// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ isLoggedIn, user }) => (
  <header className="bg-blue-600 p-4 text-white flex justify-between items-center">
    <h1 className="text-2xl">Linkly</h1>
    <nav className="flex items-center">
      {isLoggedIn ? (
        <>
          <span className="mr-4">Welcome, {user.name}</span>
          <Link to="/logout" className="mr-4">Logout</Link>
          <button className="relative">
            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full h-4 w-4 flex items-center justify-center">1</span>
            <i className="fa fa-bell"></i>
          </button>
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

export default Header;
