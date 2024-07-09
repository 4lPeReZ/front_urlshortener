import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
    <header className="bg-transparent text-white py-4 px-8 fixed top-0 left-0 right-0 z-10 flex justify-between items-center w-full">
      <h1 className="text-2xl"><Link to="/">Linkly</Link></h1>
      <nav aria-label="Main navigation">
        {isLoggedIn ? (
          <div className="flex flex-col md:flex-row items-center">
            <span className="md:mr-4 mb-2 md:mb-0">Welcome, {user.name || 'User'}</span>
            <button onClick={handleLogout} className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-full shadow-md transition duration-300">Logout</button>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row items-center">
            <Link to="/login" className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-full shadow-md transition duration-300 mr-0 md:mr-4 mb-2 md:mb-0 flex items-center">
              Login
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="ml-2" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M6 3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4h1V3a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v4h1V3z"/>
                <path fillRule="evenodd" d="M11.5 8a.5.5 0 0 0-.5.5v3h-5v-3a.5.5 0 0 0-1 0v3A1.5 1.5 0 0 0 6.5 14h5A1.5 1.5 0 0 0 13 12.5v-3a.5.5 0 0 0-.5-.5z"/>
                <path fillRule="evenodd" d="M10.854 8.854a.5.5 0 0 0-.708-.708L8.5 9.793l-1.646-1.647a.5.5 0 0 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2z"/>
              </svg>
            </Link>
            <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-full shadow-md transition duration-300">Register Now</Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
