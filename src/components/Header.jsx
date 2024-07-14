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
    <header className="bg-slate-800 text-white py-4 px-6 md:px-8 fixed top-0 left-0 right-0 z-10 flex justify-between items-center w-full">
      <h1 className="text-2xl md:text-3xl font-bold"><Link to="/"><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Linkly</span></Link></h1>
      <nav aria-label="Main navigation" className="flex items-center">
        {isLoggedIn ? (
          <div className="flex items-center space-x-4">
            <span className="bg-gray-800 hover:bg-gray-600 text-white py-2 px-4 rounded-full shadow-md transition duration-300 flex items-center border border-gray-600">
              {user.name || 'User'}
            </span>
            <button onClick={handleLogout} className="bg-blue-700 hover:bg-blue-600 text-white py-2 px-4 rounded-full shadow-md transition duration-300 flex items-center">
              <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.50166 11.2379C9.08744 11.237 8.75092 11.572 8.75 11.9862C8.74909 12.4004 9.08413 12.737 9.49834 12.7379L9.50166 11.2379ZM20.995 12.5436C21.2885 12.2514 21.2896 11.7765 20.9973 11.483L16.2349 6.69945C15.9427 6.40591 15.4678 6.40486 15.1743 6.69711C14.8807 6.98936 14.8797 7.46423 15.1719 7.75777L19.4052 12.0098L15.1532 16.243C14.8596 16.5353 14.8586 17.0101 15.1508 17.3037C15.4431 17.5972 15.9179 17.5983 16.2115 17.306L20.995 12.5436ZM9.49834 12.7379L20.4642 12.7621L20.4675 11.2621L9.50166 11.2379L9.49834 12.7379Z" fill="white"/>
                <path d="M14.5 3H5.5C4.39543 3 3.5 3.89543 3.5 5V20.0526V20.0526C3.5 20.5758 3.92415 21 4.44737 21H14.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
          <Link to="/login" className="bg-gray-600 hover:bg-gray-500 text-white py-2 px-4 rounded-full shadow-md transition duration-300 flex items-center">
            Login
            <svg className="ml-2" width="16" height="16" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.3672 9.96875C14.6016 9.73438 14.6016 9.30469 14.3672 9.07031L9.36719 4.07031C9.13281 3.83594 8.70312 3.83594 8.46875 4.07031C8.23438 4.30469 8.23438 4.73438 8.46875 4.96875L12.4141 8.875H1.4375C1.08594 8.875 0.8125 9.1875 0.8125 9.5C0.8125 9.85156 1.08594 10.125 1.4375 10.125H12.4141L8.46875 14.0703C8.23438 14.3047 8.23438 14.7344 8.46875 14.9688C8.70312 15.2031 9.13281 15.2031 9.36719 14.9688L14.3672 9.96875ZM13.9375 17C13.5859 17 13.3125 17.3125 13.3125 17.625C13.3125 17.9766 13.5859 18.25 13.9375 18.25H17.6875C19.4062 18.25 20.8125 16.8828 20.8125 15.125V3.875C20.8125 2.15625 19.4062 0.75 17.6875 0.75H13.9375C13.5859 0.75 13.3125 1.0625 13.3125 1.375C13.3125 1.72656 13.5859 2 13.9375 2H17.6875C18.7031 2 19.5625 2.85938 19.5625 3.875V15.125C19.5625 16.1797 18.7031 17 17.6875 17H13.9375Z" fill="#C9CED6"/>
            </svg>
          </Link>
          <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-full shadow-md transition duration-300 flex items-center">
            Register Now
            <svg className="ml-2" width="16" height="16" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_4_630)">
                <path d="M19 13V8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <path d="M16.5 10.5H21.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="10.5" cy="7" r="3" stroke="white" strokeWidth="2"/>
                <path d="M16.9672 17.9385C17.0944 18.2895 17.1993 18.6496 17.2813 19.016C17.5228 20.0939 16.6046 21 15.5 21H10.5L5.5 21C4.39543 21 3.47724 20.0939 3.71867 19.016C3.80074 18.6496 3.90563 18.2895 4.03284 17.9385C4.38463 16.9679 4.90024 16.086 5.55025 15.3431C6.20026 14.6003 6.97194 14.011 7.82122 13.609C8.67049 13.2069 9.58075 13 10.5 13C11.4193 13 12.3295 13.2069 13.1788 13.609C14.0281 14.011 14.7997 14.6003 15.4497 15.3431C16.0998 16.086 16.6154 16.9679 16.9672 17.9385Z" stroke="white" strokeWidth="2"/>
              </g>
              <defs>
                <clipPath id="clip0_4_630">
                  <rect width="24" height="24" fill="white" transform="translate(0.5)"/>
                </clipPath>
              </defs>
            </svg>
          </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
