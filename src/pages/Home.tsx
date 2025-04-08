import React from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/AuthService';

const Home = () => {
  const navigate = useNavigate();
  const isLoggedIn = authService.isAuthenticated();
  const user = authService.getUser();
  const username = user?.username ?? 'Undefined';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-200 px-4">
      <div className="max-w-3xl text-center">
        {!isLoggedIn ? (
          <>
            <h1 className="text-5xl lg:text-5xl sm:text-7xl font-extrabold text-gray-900 dark:text-white mb-6">
              Welcome to Open AI connect project
            </h1>
            <p className="text-xl lg:text-xl sm:text-3xl text-gray-700 dark:text-gray-300 mb-8">
            </p>
            <button
              onClick={() => navigate('/login')}
              className="cursor-pointer w-full sm:w-auto text-xl lg:text-xl sm:text-2xl px-6 lg:px-6 sm:px-8 py-4 lg:py-4 sm:py-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-md transition-colors duration-200"
            >
              Get Started
            </button>
          </>
        ) : (
          <>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              Welcome back, {username}!
            </h1>
            <p className="mt-3 text-gray-700 dark:text-gray-300 text-base text-xl lg:text-xl sm:text-3xl leading-relaxed">
              
            </p>
            <ul className="mt-6 space-y-2 text-gray-600 dark:text-gray-400 text-left text-xl lg:text-xl sm:text-3xl text-base">
              
            </ul>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;