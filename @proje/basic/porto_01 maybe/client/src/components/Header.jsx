import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  // Mock authentication state
  const isLoggedIn = localStorage.getItem('token');
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };
  
  return (
    <header className="bg-blue-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Final Round AI</Link>
        
        <nav>
          <ul className="flex space-x-6">
            {isLoggedIn ? (
              <>
                <li>
                  <Link to="/" className="hover:text-blue-300">Dashboard</Link>
                </li>
                <li>
                  <button 
                    onClick={handleLogout}
                    className="hover:text-blue-300"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="hover:text-blue-300">Login</Link>
                </li>
                <li>
                  <Link to="/register" className="hover:text-blue-300">Register</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 