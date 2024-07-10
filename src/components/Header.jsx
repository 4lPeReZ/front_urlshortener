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
      <h1 className="text-3xl"><Link to="/"><span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Linkly</span></Link></h1>
      <nav aria-label="Main navigation">
        {isLoggedIn ? (
          <div className="flex flex-col md:flex-row items-center">
            <span className="bg-gray-800 hover:bg-gray-600 text-white py-2 px-4 rounded-full shadow-md transition duration-300 flex items-center md:mr-4 mb-2 md:mb-0 border border-gray-600">
              {user.name || 'User'}
            </span>
            <button onClick={handleLogout} className="bg-blue-700 hover:bg-blue-600 text-white py-2 px-4 rounded-full shadow-md transition duration-300 flex items-center">
              <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.50166 11.2379C9.08744 11.237 8.75092 11.572 8.75 11.9862C8.74909 12.4004 9.08413 12.737 9.49834 12.7379L9.50166 11.2379ZM20.995 12.5436C21.2885 12.2514 21.2896 11.7765 20.9973 11.483L16.2349 6.69945C15.9427 6.40591 15.4678 6.40486 15.1743 6.69711C14.8807 6.98936 14.8797 7.46423 15.1719 7.75777L19.4052 12.0098L15.1532 16.243C14.8596 16.5353 14.8586 17.0101 15.1508 17.3037C15.4431 17.5972 15.9179 17.5983 16.2115 17.306L20.995 12.5436ZM9.49834 12.7379L20.4642 12.7621L20.4675 11.2621L9.50166 11.2379L9.49834 12.7379Z" fill="white"/>
                <path d="M14.5 3H5.5C4.39543 3 3.5 3.89543 3.5 5V20.0526V20.0526C3.5 20.5758 3.92415 21 4.44737 21H14.5" stroke="white" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </button>
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
