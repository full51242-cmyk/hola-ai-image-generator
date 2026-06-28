import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { darkMode, toggleDarkMode, isAuthenticated, currentUser, logout } = useApp();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Generate', path: '/generate' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 glass border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">AI</span>
            </div>
            <span className="text-2xl font-bold text-gradient">Image Banalo</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors font-medium ${
                  isActive(link.path) ? 'text-primary-500' : ''
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/dashboard"
                  className="text-gray-700 dark:text-gray-300 hover:text-primary-500 transition-colors font-medium"
                >
                  Dashboard
                </Link>
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {currentUser?.name?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                  <button
                    onClick={logout}
                    className="text-gray-700 dark:text-gray-300 hover:text-red-500 transition-colors font-medium"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 dark:text-gray-300 hover:text-primary-500 transition-colors font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="btn-primary text-sm py-2 px-4"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-gray-700 dark:text-gray-300 hover:text-primary-500 transition-colors font-medium ${
                    isActive(link.path) ? 'text-primary-500' : ''
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <button
                onClick={toggleDarkMode}
                className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-primary-500 transition-colors font-medium"
              >
                {darkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-gray-700 dark:text-gray-300 hover:text-primary-500 transition-colors font-medium"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-gray-700 dark:text-gray-300 hover:text-red-500 transition-colors font-medium text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-gray-700 dark:text-gray-300 hover:text-primary-500 transition-colors font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn-primary text-center"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
