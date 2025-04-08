import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav className="fixed w-full bg-white dark:bg-gray-800 shadow-lg transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex space-x-4 items-center">
            <button 
              onClick={() => navigate('/')}
              className="cursor-pointer text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              <span className="text-lg font-semibold">Open AI project</span>
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              {isDark ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;