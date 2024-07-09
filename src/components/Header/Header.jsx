import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ isLoggedIn, user, setIsLoggedIn, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser({ _id: '', name: '' });
    navigate('/login');
  };

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl"><Link to="/">Linkly</Link></h1>
      <nav aria-label="Main navigation">
        {isLoggedIn ? (
          <div className="flex items-center">
            <span className="mr-4">Welcome, {user.name || 'User'}</span>
            <button onClick={handleLogout} className="button button-login">Logout</button>
          </div>
        ) : (
          <div className="flex items-center">
            <Link to="/login" className="button button-login mr-4">
              Login
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M6 3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4h1V3a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v4h1V3z"/>
                <path fillRule="evenodd" d="M11.5 8a.5.5 0 0 0-.5.5v3h-5v-3a.5.5 0 0 0-1 0v3A1.5 1.5 0 0 0 6.5 14h5A1.5 1.5 0 0 0 13 12.5v-3a.5.5 0 0 0-.5-.5z"/>
                <path fillRule="evenodd" d="M10.854 8.854a.5.5 0 0 0-.708-.708L8.5 9.793l-1.646-1.647a.5.5 0 0 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2z"/>
              </svg>
            </Link>
            <Link to="/register" className="button button-register">Register Now</Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
